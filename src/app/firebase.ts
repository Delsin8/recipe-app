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

export default db
