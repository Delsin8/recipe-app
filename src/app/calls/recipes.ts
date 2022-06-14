import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  runTransaction,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { default_recipe_photo } from '../../custom-data'
import isImage from '../../functions/isImage'
import { IRecipe } from '../../types'
import db, { auth, storage } from '../firebase'
import { v4 as uuidv4 } from 'uuid'

export const fetchRecipes = async (populateIngredients: boolean) => {
  const recipesCollection = collection(db, 'recipes')
  const recipeSnapshot = await getDocs(recipesCollection)

  if (!populateIngredients)
    return recipeSnapshot.docs.map(r => {
      return { ...r.data(), id: r.id }
    }) as IRecipe[]

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
      created_at: Timestamp.fromDate(new Date()),
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

export const getAmountOfRecipes = async (userID?: string) => {
  if (!userID) return
  try {
    const q = query(collection(db, 'recipes'), where('author', '==', userID))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.length
  } catch (error) {
    console.log(error)
  }
}

export const like = async (recipeID: string) => {
  const recipeDoc = doc(db, `recipes/${recipeID}`)
  runTransaction(db, async transaction => {
    return await transaction.get(recipeDoc).then(async (data: DocumentData) => {
      const ratingsCol = collection(db, `recipes/${recipeID}/ratings`)
      await getDocs(ratingsCol)
        .then(async rating => {
          const currentUserID = auth.currentUser?.uid

          const candidate = rating.docs.find(
            r => r.data().user == currentUserID
          )

          if (!candidate) {
            return await addDoc(collection(db, `recipes/${recipeID}/ratings`), {
              user: currentUserID,
              type: 'like',
            }).then(d =>
              transaction.update(recipeDoc, {
                likes: data.data().likes ? data.data().likes + 1 : 1,
              })
            )
          }
          if (candidate.data().type === 'dislike') {
            return await setDoc(candidate.ref, {
              user: currentUserID,
              type: 'like',
            }).then(q => {
              const d = data.data()
              transaction.update(recipeDoc, {
                likes: d.likes ? d.likes + 1 : 1,
                dislikes: d.dislikes && d.dislikes > 0 && d.dislikes - 1,
              })
            })
          }
        })
        .then(() =>
          updateDoc(doc(db, `users/${auth.currentUser?.uid}`), {
            likes: arrayUnion(recipeID),
            dislikes: arrayRemove(recipeID),
          })
        )
    })
  })
}

export const dislike = async (recipeID: string) => {
  const recipeDoc = doc(db, `recipes/${recipeID}`)
  runTransaction(db, async transaction => {
    return await transaction.get(recipeDoc).then(async (data: DocumentData) => {
      const ratingsCol = collection(db, `recipes/${recipeID}/ratings`)
      await getDocs(ratingsCol)
        .then(async rating => {
          const currentUserID = auth.currentUser?.uid

          const candidate = rating.docs.find(
            r => r.data().user == currentUserID
          )

          if (!candidate) {
            return await addDoc(collection(db, `recipes/${recipeID}/ratings`), {
              user: currentUserID,
              type: 'dislike',
            }).then(d =>
              transaction.update(recipeDoc, {
                dislikes: data.data().dislikes ? data.data().dislikes + 1 : 1,
              })
            )
          }
          if (candidate.data().type === 'like') {
            return await setDoc(candidate.ref, {
              user: currentUserID,
              type: 'dislike',
            }).then(q => {
              const d = data.data()
              transaction.update(recipeDoc, {
                likes: d.likes && d.likes > 0 && d.likes - 1,
                dislikes: d.dislikes ? d.dislikes + 1 : 1,
              })
            })
          }
        })
        .then(() =>
          updateDoc(doc(db, `users/${auth.currentUser?.uid}`), {
            dislikes: arrayUnion(recipeID),
            likes: arrayRemove(recipeID),
          })
        )
    })
  })
}
