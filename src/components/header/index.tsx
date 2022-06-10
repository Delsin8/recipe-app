import styled from 'styled-components'
import { FiMenu } from 'react-icons/fi'
import { BiNews } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import db, { auth, signout } from '../../app/firebase'
import Button from '../button'
import { Link } from 'react-router-dom'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0.75rem 1.5rem;
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
`

const Header = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth < 769
  const [user, loading, error] = useAuthState(auth)
  const [activities, setActivities] = useState<number>()

  useEffect(() => {
    if (!user) return
    const activitiesCol = collection(db, 'users', user.uid, 'activities')
    const q = query(activitiesCol, where('checked', '==', false))
    const unsubscribe = onSnapshot(q, snapshot => {
      setActivities(snapshot.docs.length)
    })

    return unsubscribe
  }, [user])

  if (loading) return <div>Loading</div>
  // else if (error || !user) return <div>Something went wrong</div>

  return (
    <HeaderStyled>
      {isMobile ? (
        <>
          <Link to="/">
            <h1 className="fsize-3">Recipe app</h1>
          </Link>
          <div className="icons-wrapper">
            {user && (
              <Link to={`/activities/${user.uid}`} className="pos-relative">
                <BiNews className="icon bell fsize-3" />
                <div className="notifications-amount">{activities}</div>
              </Link>
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
                  <Link to="/recipes?user=me" className="menu-item">
                    My Collection
                  </Link>
                  {user ? (
                    <>
                      <Link to="/user" className="menu-item">
                        Profile
                      </Link>
                      <div onClick={signout} className="menu-item pointer">
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
            <Link to="/recipes">
              <div className="pointer">Browse Recipes</div>
            </Link>
            <Link to="/recipes?user=me">
              <div className="pointer">My collection</div>
            </Link>
            <div className="flex align-center gap-medium">
              {user ? (
                <>
                  <Link
                    to={`/activities/${user.uid}`}
                    className="pointer flex align-center"
                  >
                    <BiNews />
                  </Link>
                  <Link to="/user">
                    <div className="pointer">Profile</div>
                  </Link>
                  <div className="pointer" onClick={signout}>
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
