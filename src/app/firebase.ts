import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  setDoc,
  DocumentData,
  Timestamp,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  refEqual,
  DocumentReference,
  query,
  where,
  writeBatch,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'
import { ActivityType, IActivity, IComment, IRecipe, IUser } from '../types'
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import isImage from '../functions/isImage'
import { default_recipe_photo, default_user_photo } from '../custom-data'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export const auth = getAuth(app)

export const storage = getStorage(app)

export const signupWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async r => {
        await updateProfile(auth.currentUser!, {
          displayName: name,
          photoURL: default_user_photo,
        })
        await setDoc(doc(db, `users/${r.user.uid}`), {
          id: r.user.uid,
          name: r.user.displayName,
          photoURL: default_user_photo,
        })
      })
      .catch(error => {
        console.log(error)
        throw new Error()
      })
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}
export const signinWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}

export const signout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}

//
export const fetchRecipes = async () => {
  const recipesCollection = collection(db, 'recipes')
  const recipeSnapshot = await getDocs(recipesCollection)

  const result = recipeSnapshot.docs.map(async (doc: DocumentData) => {
    const ingredientSnapshot = await getDocs(collection(doc.ref, 'ingredients'))
    const ingredients = ingredientSnapshot.docs.map(i => i.data())
    const recipe: IRecipe = {
      ...doc.data(),
      id: doc.id,
      ingredients,
    }
    return recipe
  })
  return Promise.all(result)
}

export const fetchUsers = async () => {
  const usersCol = await getDocs(collection(db, 'users'))
  const usersData: IUser[] = usersCol.docs.map((d: DocumentData) => d.data())

  return usersData
}

export const fetchUser = async (userID: string) => {
  try {
    const userDoc = doc(db, `users/${userID}`)
    const user = await getDoc(userDoc)
    return user
  } catch (error) {
    console.log(error)
  }
}

export const createRecipe = async (
  recipe: IRecipe & { image?: File | null }
) => {
  if (!auth.currentUser) throw new Error('You are not authenticated')

  try {
    const {
      cooking_time,
      difficulty,
      name,
      ingredients,
      image,
      steps,
      tags,
      tips,
      portion,
    } = recipe

    const isAppropriateImage = image && isImage(image)

    const getFinalImage = async () => {
      let finalImage = default_recipe_photo

      if (isAppropriateImage) {
        const imageRef = ref(storage, `recipe_images/${uuidv4()}_${image.name}`)
        const dq = await uploadBytes(imageRef, image).then(async snap => {
          return getDownloadURL(snap.ref).then(res => res)
        })
        return Promise.resolve(dq)
      }

      return finalImage
    }

    const finalImage = await getFinalImage()
    const d = await addDoc(collection(db, 'recipes'), {
      cooking_time: cooking_time > 0 ? cooking_time : 1,
      author: auth.currentUser.uid,
      difficulty,
      name,
      steps,
      tags,
      tips,
      portion,
      photo: finalImage,
    }).then(r => {
      ingredients?.map(
        async ingredient =>
          await addDoc(
            collection(db, `recipes/${r.id}/ingredients`),
            ingredient
          ).then()
      )
      return r.id
    })

    return d
  } catch (error) {
    throw new Error('Something went wrong')
  }
}

export const getAmountOfRecipes = async (userRef?: DocumentReference) => {
  if (!userRef) return
  try {
    const q = query(collection(db, 'recipes'), where('author', '==', userRef))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.length
  } catch (error) {
    console.log(error)
  }
}

export const fetchComments = async (recipeID: string) => {
  try {
    const documents = await getDocs(
      collection(db, `recipes/${recipeID}/comments`)
    )
    const comments = documents.docs.map(async (d: DocumentData) => {
      const userDoc = await getDoc(d.data().author)
      const result: IComment = {
        ...d.data(),
        author: userDoc.data(),
      }
      return result
    })
    return Promise.all(comments)
  } catch (error) {
    console.log(error)
  }
}

export const sendComment = async (comment: string, recipeID: string) => {
  if (!auth.currentUser) {
    return
  }
  try {
    const docRef = doc(db, 'recipes', recipeID)
    const recipe = await getDoc(docRef)
    if (!recipe.exists()) {
      throw new Error("Recipe with that ID doesn't exist")
    }

    const res = addDoc(collection(db, 'recipes', recipeID, 'comments'), {
      body: comment,
      author: doc(db, 'users', auth.currentUser.uid),
      created_at: new Date(),
    }).then(async d => {
      const result = await getDoc(d)
      return result.data() as IComment
    })

    return Promise.resolve(res)
  } catch (error) {
    console.log(error)
  }
}

export const createActivity = async (type: ActivityType, other: string) => {
  const user = auth.currentUser
  if (!user) return

  const activitiesCol = collection(db, 'users', user.uid, 'activities')

  const activity: IActivity = {
    user: user.uid,
    type,
    other,
    checked: false,
    created_at: Timestamp.fromDate(new Date()),
  }
  await addDoc(activitiesCol, activity)
}

export const fetchActivities = async (userID: string) => {
  try {
    const col = collection(db, 'users', userID, 'activities')
    const snapshot = await getDocs(col)
    return snapshot.docs.map<IActivity>((a: DocumentData) => a.data())
  } catch (error) {
    console.log(error)
    return []
  }
}

export const markActivities = async (userID: string) => {
  try {
    const q = query(
      collection(db, 'users', userID, 'activities'),
      where('checked', '==', false)
    )
    const snapshot = await getDocs(q)

    const batch = writeBatch(db)
    snapshot.forEach(s => {
      batch.update(s.ref, {
        checked: true,
      })
    })
    await batch.commit()
  } catch (error) {
    console.log(error)
  }
}

export const subscribeToUser = async (authorID: string) => {
  if (!auth.currentUser || !authorID) return
  const authorRef = doc(db, 'users', authorID)
  const authorDoc = await getDoc(authorRef)
  if (!authorDoc.exists()) return
  // user
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)
  const currentUserDoc = await getDoc(currentUserRef)
  const currentUser: DocumentData = currentUserDoc.data()!

  const isSubscribed = currentUser.subscribed_to?.some((a: DocumentReference) =>
    refEqual(a, authorRef)
  )
  if (isSubscribed) {
    return await updateDoc(currentUserRef, {
      subscribed_to: arrayRemove(authorRef),
    }).then(() =>
      updateDoc(authorRef, { subscribers: arrayRemove(currentUserRef) })
    )
  }
  await updateDoc(currentUserRef, {
    subscribed_to: arrayUnion(authorRef),
  }).then(() =>
    updateDoc(authorRef, { subscribers: arrayUnion(currentUserRef) })
  )
}

export const addRecipeToCollection = async (recipeID?: string) => {
  if (!auth.currentUser || !recipeID) return
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid)
    const user = (await getDoc(userRef).then(d => d.data())) as IUser

    if (user.collection?.includes(recipeID)) {
      await updateDoc(userRef, { collection: arrayRemove(recipeID) })
    } else await updateDoc(userRef, { collection: arrayUnion(recipeID) })
  } catch (error) {
    console.log(error)
  }
}

export const checkIfBelongsToCollection = async (recipeID: string) => {
  if (!auth.currentUser || !recipeID) return
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid)
    const user = (await getDoc(userRef).then(d => d.data())) as IUser

    if (!user.collection?.includes(recipeID)) {
      return false
    }
    return true
  } catch (error) {
    console.log(error)
  }
}

export const uploadImage = async (image: FileList | null) => {
  if (!auth.currentUser) throw new Error('You are not authenticated')
  if (!image?.length || !image[0] || !isImage(image![0]))
    throw new Error('Please choose an image')

  try {
    const img = image[0]

    const imageRef = ref(storage, `user_images/${uuidv4()}_${img.name}`)
    uploadBytes(imageRef, img).then(snap => {
      getDownloadURL(snap.ref).then(async res => {
        await updateProfile(auth.currentUser!, { photoURL: res }).then(
          async () => {
            const userRef = doc(db, 'users', auth.currentUser!.uid)
            await updateDoc(userRef, { photoURL: res })
          }
        )
      })
    })
  } catch (error) {
    throw new Error(
      'Something went wrong, please try again with different image'
    )
  }
}

export default db
