import styled from 'styled-components'
import Layout from '../../components/layout'
import { BiEditAlt } from 'react-icons/bi'
import Recipe from '../../components/recipe'
import Recipes from '../../components/recipe/Recipes'
import Button from '../../components/button'

const UserPageStyled = styled.div`
  .photo {
    position: relative;
    height: 84px;
    width: 84px;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }

    .upload-picture {
      position: absolute;
      left: 50%;
      bottom: 1rem;
      transform: translate(-50%, 0);

      font-size: 0.6rem;
      background-color: ${({ theme }) => theme.colors.tan};
      padding: 2px;
      white-space: nowrap;
    }
  }

  .info-section {
    justify-content: space-around;

    input {
      //
      width: 35%;
      //
      background: none;
      border: none;
      font-size: 1.25rem;
    }
  }

  h3 {
    margin: 0 0 0.25rem 0;
  }
`

const UserPage = () => {
  return (
    <Layout>
      <UserPageStyled className="content">
        <div className="flex gap-small">
          <div className="photo">
            <img src="https://www.zastavki.com/pictures/1280x720/2009/Food___Pizza_Pizza_011915_26.jpg" />
            <div className="upload-picture">Upload picture</div>
          </div>
          <div className="info-section flex direction-column">
            <div className="flex align-end">
              <input defaultValue="Username" />
              <span>
                <BiEditAlt />
              </span>
            </div>
            <div>
              <div>Recipes: 10</div>
              <div>Subscribers: 405</div>
            </div>
          </div>
        </div>
        {/* recipes */}
        <div>
          <h3 className="inline-block frame">Featured recipes</h3>
          <Recipes recipes={[{ name: 'd' }, { name: 'd' }, { name: 'd' }]} />
        </div>
        <div>
          <h3 className="inline-block frame">Last added to collection</h3>
          <Recipes recipes={[{ name: 'd' }]} />
        </div>
        <div className="text-center">
          <Button
            textColor="wheat"
            background="teal"
            width="50%"
            fontSize="1rem"
            padding=".3 rem 0"
          >
            All recipes
          </Button>
        </div>
      </UserPageStyled>
    </Layout>
  )
}

export default UserPage
