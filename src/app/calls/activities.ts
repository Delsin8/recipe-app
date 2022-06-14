import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  Timestamp,
  where,
  writeBatch,
} from 'firebase/firestore'
import { ActivityType, IActivity } from '../../types'
import db, { auth } from '../firebase'

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
