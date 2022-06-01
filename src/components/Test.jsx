import { useEffect, useState } from 'react'
import db from '../app/firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

export const Test = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      const col = collection(db, 'recipes')
      const colSnapshot = await getDocs(col)
      const colList = colSnapshot.docs.map(doc => doc.data())
      setData(colList)
    }

    fetchRecipes()
  }, [])

  return (
    <div>
      {data.map(d => (
        <div>
          {d.name} {d.cooking_time} {d.difficulty}
        </div>
      ))}
    </div>
  )
}
