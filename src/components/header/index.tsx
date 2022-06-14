import styled from 'styled-components'
import { FiMenu } from 'react-icons/fi'
import { BiNews } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import db, { auth } from '../../app/firebase'
import { signout } from '../../app/calls/users'
import { markActivities } from '../../app/calls/activities'
import Button from '../button'
import { Link } from 'react-router-dom'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { notifyFailure, notifySuccess } from '../toast'
import { IActivity } from '../../types'
import Activity from '../../features/activity'
import { v4 as uuidv4 } from 'uuid'
import { orderBy } from 'lodash'
import { BsGithub } from 'react-icons/bs'

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.brown};

  h1 {
    margin: 0;
    font-weight: 200;
    padding-left: 0.5rem;
  }

  .icons-wrapper {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .notifications-amount {
    position: absolute;
    top: 0.75rem;
    right: 0;

    background: ${({ theme }) => theme.colors.teal};
    color: ${({ theme }) => theme.colors.wheat};
    padding: 2px;
    line-height: 0.7;
    font-size: 0.75rem;
    border-radius: 0.25rem;
  }

  .icon {
  }

  .bell {
  }

  .desktop-wrapper {
    justify-content: end;
  }

  .mobile-menu {
    position: absolute;
    top: 2rem;
    right: 0;

    background-color: ${({ theme }) => theme.colors.wheat};
    padding: 0.5rem 0;
    border-radius: 0.75rem;

    z-index: 100;

    .menu-item {
      padding: 0.25rem 0.75rem;
      white-space: nowrap;

      &:hover {
        background: ${({ theme }) => theme.colors.brown};
      }
    }
  }

  .activity-window {
    position: absolute;
    top: 1rem;
    right: 1rem;

    background: ${({ theme }) => theme.colors.wheat};
    border-radius: 1rem;
    padding: 0.75rem;

    max-height: 400px;
    overflow-y: auto;

    z-index: 100;
  }

  @media (min-width: 992px) {
    padding: 1rem 10%;
  }
  @media (min-width: 1200px) {
    padding: 1rem 12%;
  }
  @media (min-width: 1400px) {
    padding: 1rem 20%;
  }
`

const Header = () => {
  const [user, loading, error] = useAuthState(auth)
  const [openMenu, setOpenMenu] = useState(false)
  const [activities, setActivities] = useState<IActivity[]>([])
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const [openNotifications, setOpenNotifications] = useState(false)
  const isMobile = windowWidth < 768

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!user) return
    const activitiesCol = collection(db, 'users', user.uid, 'activities')
    const unsubscribe = () =>
      onSnapshot(activitiesCol, snapshot => {
        setActivities(snapshot.docs.map(s => s.data()) as IActivity[])
      })

    return unsubscribe()
  }, [user])

  const logout = () => {
    signout()
      .then(() => notifySuccess('Logged out'))
      .catch(() => notifyFailure('Something went wrong'))
  }

  const getUncheckedActivitiesLength = () => {
    return activities.filter(a => a.checked === false).length
  }

  const getSortedActivities = () => {
    return orderBy(
      activities,
      ({ created_at }) => new Date(created_at.toDate()),
      'desc'
    )
  }

  return (
    <HeaderStyled>
      {isMobile ? (
        <>
          <Link to="/">
            <h1 className="fsize-3">Recipe app</h1>
          </Link>
          <div className="icons-wrapper">
            <a href="https://github.com/Delsin8/recipe-app" className="fsize-2">
              <BsGithub />
            </a>
            {user && (
              <div
                className="pos-relative"
                onMouseEnter={() => {
                  markActivities(user.uid).then(() =>
                    setOpenNotifications(true)
                  )
                }}
                onMouseLeave={() => setOpenNotifications(false)}
              >
                <BiNews className="icon bell fsize-3" />
                <div className="notifications-amount">
                  {getUncheckedActivitiesLength()}
                </div>
                {openNotifications && (
                  <div className="activity-window flex direction-column gap-medium">
                    {getSortedActivities().map(a => (
                      <Activity key={uuidv4()} {...a} userImg={user.photoURL} />
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="pos-relative">
              <FiMenu
                className="icon fsize-2 flex align-center"
                onClick={() => setOpenMenu(!openMenu)}
              />
              {openMenu && (
                <div className="mobile-menu flex direction-column">
                  <Link to="/recipes" className="menu-item">
                    Browse Recipes
                  </Link>
                  <Link
                    to={`${user?.uid ? `/collection/${user?.uid}` : '/signin'}`}
                    className="menu-item"
                  >
                    My Collection
                  </Link>
                  <Link
                    to={`${user ? '/recipes/create' : '/signin'}`}
                    className="menu-item"
                  >
                    Create Recipe
                  </Link>
                  {user ? (
                    <>
                      <Link to={`/user/${user.uid}`} className="menu-item">
                        Profile
                      </Link>
                      <div onClick={logout} className="menu-item pointer">
                        Log out
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="signin" className="menu-item">
                        Sign in
                      </Link>
                      <Link to="signup" className="menu-item">
                        Sign up
                      </Link>
                    </>
                  )}
                  <div
                    className="text-underline text-center pointer"
                    onClick={() => setOpenMenu(false)}
                  >
                    Hide
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <Link to="/">
            <h1 className="fsize-3">Recipe app</h1>
          </Link>
          <div className="desktop-wrapper flex align-center gap-large">
            <a
              href="https://github.com/Delsin8/recipe-app"
              className="flex align-center fsize-2"
            >
              <BsGithub />
            </a>
            <Link to="/recipes">
              <div className="pointer">Browse Recipes</div>
            </Link>
            <Link to={`${user?.uid ? `/collection/${user?.uid}` : '/signin'}`}>
              <div className="pointer">My collection</div>
            </Link>
            <Link
              to={`${user ? '/recipes/create' : '/signin'}`}
              className="pointer"
            >
              Create Recipe
            </Link>
            <div className="flex align-center gap-medium">
              {user ? (
                <>
                  <div
                    className="pos-relative pointer flex align-center"
                    onMouseEnter={() => {
                      markActivities(user.uid).then(() =>
                        setOpenNotifications(true)
                      )
                    }}
                    onMouseLeave={() => setOpenNotifications(false)}
                  >
                    <BiNews className="icon bell fsize-3" />
                    <div className="notifications-amount">
                      {getUncheckedActivitiesLength()}
                    </div>
                    {openNotifications && (
                      <div className="activity-window flex direction-column gap-medium">
                        {getSortedActivities().map(a => (
                          <Activity
                            key={uuidv4()}
                            {...a}
                            userImg={user.photoURL}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <Link to={`/user/${user.uid}`}>
                    <div className="pointer">Profile</div>
                  </Link>
                  <div className="pointer" onClick={logout}>
                    Log out
                  </div>
                </>
              ) : (
                <div className="flex gap-small">
                  <Link to="/signin">
                    <Button textColor="teal" borderColor="teal">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="signup">
                    <Button textColor="wheat" background="brown">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </HeaderStyled>
  )
}

export default Header
