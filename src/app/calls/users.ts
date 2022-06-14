import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  refEqual,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { default_user_photo } from '../../custom-data'
import { IUser } from '../../types'
import db, { auth, storage } from '../firebase'
import { v4 as uuidv4 } from 'uuid'
import isImage from '../../functions/isImage'

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
