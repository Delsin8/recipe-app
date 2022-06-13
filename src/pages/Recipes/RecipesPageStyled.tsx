import styled from 'styled-components'

const RecipesPageStyled = styled.div`
  .recipes {
    img {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
    }
  }

  .user-search {
    position: relative;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid grey;

    input {
      width: 100%;
      background: none;
      outline: none;
      border: none;

      &::placeholder {
        color: black;
        opacity: 0.6;
      }
    }

    .users-wrapper {
      position: absolute;
      top: 1rem;
      left: 0;
      width: 99%;
      width: -webkit-fill-available;

      max-height: 300px;
      overflow-y: auto;

      background: ${({ theme }) => theme.colors.white};
      padding: 0.5rem;

      li {
        padding: 0.25rem;
        :hover {
          background: ${({ theme }) => theme.colors.brown};
        }
      }

      .user-icon {
        height: 32px;
        width: 32px;

        img {
          border-radius: 50%;
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  .users-filter {
    div {
      padding: 0.25rem 0.5rem;
      background: ${({ theme }) => theme.colors.brown};
      border-radius: 1rem;
      cursor: pointer;
    }
  }
`
export default RecipesPageStyled
