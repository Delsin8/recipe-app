import styled from 'styled-components'

const RecipePageStyled = styled.div`
  .t {
    position: relative;
    width: 100%;

    .s {
      position: absolute;
      left: 50%;
      bottom: -6px;
      transform: translate(-50%, 0);

      background: ${({ theme }) => theme.colors.wheat};
      border-radius: 1.5rem;
      padding: 0.5rem 1.5rem;
      white-space: nowrap;

      .first {
        font-size: 1.25rem;
        text-align: center;
      }

      .second {
        letter-spacing: 0.5px;
      }
    }

    img {
      border-radius: 2rem;
      height: 100%;
      width: 100%;
      aspect-ratio: 16/9;
    }
  }

  .ingredients-section {
    background: ${({ theme }) => theme.colors.darkPurple};
    color: ${({ theme }) => theme.colors.wheat};

    padding: 1rem;
    border-radius: 1.25rem;

    h3 {
      text-align: center;
      margin-top: 0;
      font-weight: 500;
    }
  }

  .ingredient {
    display: flex;
    justify-content: space-between;

    font-size: 0.8rem;

    border-bottom: 1px solid ${({ theme }) => theme.colors.wheat + '40'};
  }

  .servings-input {
    width: 2.5rem;
    border: none;
    border-radius: 0.25rem;
    text-align: center;
    outline: none;
  }

  .steps-section {
    .step {
      position: relative;
      background-color: ${({ theme }) => theme.colors.darkPurple + '80'};
      color: white;
      border-radius: 0.75rem;
      padding: 0.5rem 1.5rem;

      .step-order {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-0.5rem, -0.5rem);

        background: ${({ theme }) => theme.colors.teal};
        width: 28px;
        line-height: 28px;
        border-radius: 50%;

        text-align: center;
      }
    }

    h4 {
      margin: 0 0 0.75rem 0;
    }
  }

  .like {
    width: 25%;
    background-color: ${({ theme }) => theme.colors.seaGreen};
    border-radius: 1rem 0 0 1rem;
    padding: 0.4rem;
  }
  .dislike {
    width: 25%;
    background-color: ${({ theme }) => theme.colors.darkPurple};
    color: white;
    border-radius: 0 1rem 1rem 0;
    padding: 0.4rem;
  }

  .tips-section {
    h3 {
      margin-top: 0;
    }
    li {
      opacity: 0.75;
    }
  }
`

export default RecipePageStyled
