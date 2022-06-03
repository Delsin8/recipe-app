import styled from 'styled-components'
import Button from '../../components/button'
import Layout from '../../components/layout'
import { BsClockHistory } from 'react-icons/bs'
import { IoPeopleOutline } from 'react-icons/io5'
import { GoThumbsup, GoThumbsdown } from 'react-icons/go'

import { Link } from 'react-router-dom'

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus natus sapiente quo quod? Ut ipsum tenetur suscipit recusandae dignissimos ducimus natus voluptas error voluptatum id sint, eveniet hic quibusdam! Praesentium?'

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
    width: 20px;
    border: none;
    border-radius: 0.25rem;
    text-align: center;
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
      margin-top: 0;
    }
  }

  .like {
    width: 25%;
    background-color: ${({ theme }) => theme.colors.seaGreen};
    border-radius: 1rem 0 0 1rem;
    padding: 0.3rem;
  }
  .dislike {
    width: 25%;
    background-color: ${({ theme }) => theme.colors.darkPurple};
    color: white;
    border-radius: 0 1rem 1rem 0;
    padding: 0.3rem;
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

const RecipePage = () => {
  return (
    <Layout>
      <RecipePageStyled className="content">
        <div className="t">
          <img src="https://www.zastavki.com/pictures/1280x720/2009/Food___Pizza_Pizza_011915_26.jpg" />
          <div className="s">
            <div className="first">Dish Name</div>
            <div className="second">Difficulty: Easy to make</div>
          </div>
          {/* clock, portion */}
        </div>
        <div className="flex gap-medium justify-center">
          <div className="flex align-center gap-small">
            <BsClockHistory />
            <div>10m of cooking</div>
          </div>
          <div className="flex align-center gap-small">
            <IoPeopleOutline />
            <div>Portion for 2</div>
          </div>
        </div>
        <div className="text-center">
          <Button
            textColor="wheat"
            background="teal"
            fontSize="1.25rem"
            width="100%"
            padding=".4rem 0"
          >
            Add to collection
          </Button>
        </div>
        {/* ingredients */}
        <div className="ingredients-section">
          <h3>Ingredients</h3>
          {['Potato', 'Tomato', 'Fried cucumber'].map(i => (
            <div className="ingredient" key={i}>
              <div>{i}</div>
              <div>100g</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          Number of servings{' '}
          <span>
            <input type="number" className="servings-input" defaultValue={2} />
          </span>
        </div>
        {/* steps */}
        <div className="steps-section">
          <h4>Step-by-step guide</h4>
          <div className="flex direction-column gap-medium">
            {[0, 1, 22].map(s => (
              <div key={`step_${s}`} className="step">
                <div>{lorem}</div>
                <div className="step-order">{s}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          Author:{' '}
          <Link to="" className="link frame">
            Username
          </Link>
        </div>
        <div className="flex justify-center align-center">
          <div className="like flex justify-center align-center gap-small">
            <GoThumbsup /> 145
          </div>
          <div className="dislike flex justify-center align-center gap-small">
            <GoThumbsdown /> 5
          </div>
        </div>
        <div className="tips-section">
          <h3>Tips</h3>
          <ul>
            {[0, 1, 2].map(l => (
              <li key={`l_${l}`}>{lorem}</li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <Button
            textColor="wheat"
            background="darkPurple"
            padding="0.5rem 16%"
          >
            Comments
          </Button>
        </div>
      </RecipePageStyled>
    </Layout>
  )
}

export default RecipePage
