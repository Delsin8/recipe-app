import styled from 'styled-components'
import Layout from '../../components/layout'
import { ImEye, ImEyeBlocked } from 'react-icons/im'
import { BsClockHistory, BsTag } from 'react-icons/bs'
import { GiCook } from 'react-icons/gi'
import { GrCertificate } from 'react-icons/gr'
import { useState } from 'react'
import Recipe from '../../components/recipe'
import Recipes from '../../components/recipe/Recipes'

const RecipesPageStyled = styled.div`
  .filter {
    //
    margin: 0 auto;
    width: 90%;
    //
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.wheat};
    border-radius: 1rem;

    .filter-section {
      .tags {
        flex-basis: fit-content;
      }

      .tag {
        padding: 2px 1rem;
        border-radius: 1rem;
      }

      .tag-time {
        background: white;
      }

      .tag-level {
        color: black;
      }
      .tag-level-beginner {
        background: #a7dd86;
      }
      .tag-level-intermediate {
        background: #f4f771;
      }
      .tag-level-advanced {
        background: #e89774;
      }

      .tag-category {
        background: ${({ theme }) => theme.colors.teal};
        color: white;
        font-size: 0.8rem;
      }
    }
  }

  .recipes {
    img {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
    }
  }
`

const RecipesPage = () => {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <Layout>
      <RecipesPageStyled className="content">
        <div>
          <div
            className="flex align-center gap-tiny"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Filter{' '}
            {filterOpen ? (
              <ImEyeBlocked className="icon" />
            ) : (
              <ImEye className="icon" />
            )}
          </div>

          {filterOpen && (
            <div className="filter flex direction-column gap-medium">
              {/* time */}
              <div className="filter-section flex align-center gap-medium">
                <BsClockHistory className="icon fsize-2" />
                <div className="tags flex gap-small">
                  {['Quick', 'Medium', 'Long'].map(t => (
                    <div key={`time_${t}`} className="tag tag-time">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              {/* difficulty */}
              <div className="filter-section flex align-center gap-medium">
                <GiCook className="fsize-3" />
                <div className="tags flex gap-small wrap">
                  <div className="tag tag-level tag-level-beginner">
                    Beginner
                  </div>
                  <div className="tag tag-level tag-level-intermediate">
                    Intermediate
                  </div>
                  <div className="tag tag-level tag-level-advanced">
                    Advanced
                  </div>
                </div>
              </div>
              {/* tags */}
              <div className="filter-section flex align-center gap-medium">
                <BsTag className="icon fsize-3" />
                <div className="tags flex gap-tiny wrap">
                  {[
                    'Vegan',
                    'Veasdasdasdgan',
                    'Vegasdan',
                    'Vegasdaan',
                    'Vegadaan',
                    'Vegan',
                    'Vegsdasan',
                    'Vegdaan',
                    'Vegsdan',
                    'Vegasdan',
                    'Vegasddan',
                    'Vegasan',
                    'Vedasgan',
                  ].map(t => (
                    <div key={Math.random()} className="tag tag-category">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              {/* rating */}
              <div className="filter-section flex align-center gap-medium">
                <GrCertificate className="fsize-2" />
                <div className="pointer text-underline">
                  Approval rating: 80% and higher
                </div>
              </div>
              <div className="text-center" onClick={() => setFilterOpen(false)}>
                Hide
              </div>
            </div>
          )}
        </div>
        {/* recipes */}
        <Recipes recipes={[{ name: 'asd' }]} />
      </RecipesPageStyled>
    </Layout>
  )
}

export default RecipesPage
