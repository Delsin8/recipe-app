import { useRef, useState } from 'react'
import { BsClockHistory, BsTag } from 'react-icons/bs'
import { GiCook } from 'react-icons/gi'
import { GrCertificate } from 'react-icons/gr'
import { IoPeopleOutline } from 'react-icons/io5'
import { IFilter, IUser } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import FilterItem from './FilterItem'

interface IFilterElement {
  users: IUser[]
  filters: IFilter[]
  setFilters: React.Dispatch<React.SetStateAction<IFilter[]>>
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Filter: React.FC<IFilterElement> = ({
  users,
  filters,
  setFilters,
  setFilterOpen,
}) => {
  const [userInput, setUserInput] = useState('')
  const userRef = useRef<HTMLInputElement>(null)

  const addFilter = ({ type, value }: IFilter) => {
    const exists = filters.find(
      filter => filter.type === type && filter.value === value
    )
    if (exists) {
      const d = filters.filter(filter => filter.value !== value)
      setFilters(d)
    } else setFilters([...filters, { type, value }])
  }

  const getUserResults = (input: string): IUser[] => {
    const result = users.filter(
      user => user.name.includes(input) || user.id.includes(input)
    )
    return result
  }

  const getFilterUsers = (): IUser[] => {
    return users.filter(
      u =>
        u.id === filters.find(f => f.type === 'user' && f.value === u.id)?.value
    )
  }

  const removeUserFilter = (user: IUser) => {
    const newFilter = filters.filter(f => f.value !== user.id)
    setFilters(newFilter)
  }

  return (
    <div>
      <div className="filter flex direction-column gap-medium">
        {/* time */}
        <div className="filter-section flex align-center gap-medium">
          <BsClockHistory className="icon fsize-2" />
          <div className="tags flex gap-small wrap">
            {['Quick', 'Medium', 'Long'].map(v => (
              <FilterItem
                key={uuidv4()}
                filterItem={{ type: 'time', value: v }}
                addFilter={addFilter}
                filters={filters}
              />
            ))}
          </div>
        </div>
        {/* difficulty */}
        <div className="filter-section flex align-center gap-medium">
          <GiCook className="fsize-3" />
          <div className="tags flex gap-small wrap">
            {['Beginner', 'Intermediate', 'Advanced'].map(v => (
              <FilterItem
                key={uuidv4()}
                filterItem={{ type: 'difficulty', value: v }}
                addFilter={addFilter}
                filters={filters}
              />
            ))}
          </div>
        </div>
        {/* tags */}
        <div className="filter-section flex align-center gap-medium">
          <BsTag className="icon fsize-3" />
          <div className="tags flex gap-tiny wrap">
            {['Vegan', 'Healthy', 'Italian'].map(v => (
              <FilterItem
                key={uuidv4()}
                filterItem={{ type: 'tag', value: v }}
                addFilter={addFilter}
                filters={filters}
              />
            ))}
          </div>
        </div>
        {/* rating */}
        <div className="filter-section flex align-center gap-medium">
          <GrCertificate className="fsize-2" />
          <div
            className="pointer text-underline"
            onClick={() => addFilter({ type: 'rating', value: '' })}
          >
            Approval rating: 80% and higher
          </div>
        </div>
        <div className="filter-section user-search flex align-center gap-medium">
          <IoPeopleOutline className="fsize-3" />
          <input
            placeholder="Search by user"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            ref={userRef}
          />
          {document.activeElement === userRef.current && (
            <ul className="users-wrapper flex direction-column gap-tiny">
              {getUserResults(userInput).map(user => (
                <li
                  key={uuidv4()}
                  onClick={() => addFilter({ type: 'user', value: user.id })}
                  className="flex align-center gap-small pointer"
                >
                  <div className="user-icon">
                    <img src={user.photoURL || 'DEFAULT_IMAGE'} />
                  </div>
                  <div>{user.name}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {getFilterUsers().length > 0 && (
          <div className="users-filter flex gap-small wrap">
            {getFilterUsers().map(u => (
              <div key={uuidv4()} onClick={() => removeUserFilter(u)}>
                {u.name}
              </div>
            ))}
          </div>
        )}
        <div className="text-center" onClick={() => setFilterOpen(false)}>
          Hide
        </div>
      </div>
    </div>
  )
}

export default Filter
