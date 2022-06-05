import styled from 'styled-components'
import { FiMenu } from 'react-icons/fi'
import { BsBell } from 'react-icons/bs'
import { useEffect, useState } from 'react'
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
    padding: 1rem;
    border-radius: 0.75rem;

    z-index: 100;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      white-space: nowrap;

      li:not(:last-child) {
        margin-bottom: 0.25rem;
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
  return (
    <HeaderStyled>
      {isMobile ? (
        <>
          <h1 className="fsize-3">Recipe app</h1>
          <div className="icons-wrapper">
            <BsBell className="icon bell fsize-2" />
            <div className="pos-relative">
              <FiMenu
                className="icon fsize-2 flex align-center"
                onClick={() => setOpenMenu(!openMenu)}
              />
              {openMenu && (
                <div className="mobile-menu">
                  <ul>
                    <li>Browse Recipes</li>
                    <li>My Collection</li>
                    <li>Profile</li>
                    <li
                      className="text-underline text-center"
                      onClick={() => setOpenMenu(false)}
                    >
                      Hide
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="fsize-3">Recipe app</h1>
          <div className="desktop-wrapper flex align-center gap-large">
            <div className="item">Browse Recipes</div>
            <div className="item">My collection</div>
            <div className="item">
              <BsBell />
            </div>
            <div className="item">Profile</div>
          </div>
        </>
      )}
    </HeaderStyled>
  )
}

export default Header
