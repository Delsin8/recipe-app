import styled from 'styled-components'

const Layout = styled.main`
  margin: 1rem auto;
  width: 95%;
  position: relative;

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 992px) {
    width: 70%;
  }

  @media (min-width: 1200px) {
    width: 55%;
  }

  @media (min-width: 1400px) {
    width: 40%;
  }
`

export default Layout
