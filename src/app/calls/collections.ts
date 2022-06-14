import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { IUser } from '../../types'
import db, { auth } from '../firebase'

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
