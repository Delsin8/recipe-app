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
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'
import { IComment, IRecipe, IUser } from '../types'
import { database } from 'firebase-admin'

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
          photoURL:
            'https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account.jpg',
        })
        await setDoc(doc(db, `users/${r.user.uid}`), {
          id: r.user.uid,
          name: r.user.displayName,
          photoURL:
            'https://cambodiaict.net/wp-content/uploads/2019/12/computer-icons-user-profile-google-account-photos-icon-account.jpg',
        })
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
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
  }
}

export const signout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.log(error)
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

export const createRecipe = async (recipe: IRecipe) => {
  console.log(recipe)
  try {
    const {
      cooking_time,
      difficulty,
      name,
      ingredients,
      steps,
      tags,
      tips,
      portion,
    } = recipe
    await addDoc(collection(db, 'recipes'), {
      cooking_time,
      difficulty,
      name,
      steps,
      tags,
      tips,
      portion,
    }).then(data =>
      ingredients?.map(ingredient =>
        addDoc(collection(db, `recipes/${data.id}/ingredients`), ingredient)
      )
    )
  } catch (error) {
    console.log(error)
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
    await addDoc(collection(db, `recipes/${recipeID}/comments`), {
      body: comment,
      author: doc(db, 'users', auth.currentUser.uid),
      created_at: new Date(),
    })
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

export default db
