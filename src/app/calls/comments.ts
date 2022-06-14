import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from 'firebase/firestore'
import { IComment } from '../../types'
import db, { auth } from '../firebase'

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
