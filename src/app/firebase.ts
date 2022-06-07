import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  setDoc,
  DocumentData,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'
import { IRecipe, IUser } from '../types'

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

export default db
