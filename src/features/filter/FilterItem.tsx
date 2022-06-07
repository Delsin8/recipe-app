import styled from 'styled-components'
import { IFilter } from '../../types'

const FilterItemStyled = styled.div`
  .tag {
    padding: 2px 1rem;
    border-radius: 1rem;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 2px 2px ${({ theme }) => theme.colors.brown};
    }
  }

  .tag-time {
    background: white;
  }

  .tag-difficulty {
    color: black;
  }
  .tag-difficulty-beginner {
    background: #a7dd86;
  }
  .tag-difficulty-intermediate {
    background: #f4f771;
  }
  .tag-difficulty-advanced {
    background: #e89774;
  }

  .tag-tag {
    background: ${({ theme }) => theme.colors.teal};
    color: white;
    font-size: 0.8rem;
  }

  .filter-active {
    transform: scale(1.05);
    box-shadow: 0 0 2px 1px ${({ theme }) => theme.colors.seaGreen};
  }
`

interface IFilterItem {
  filters: IFilter[]
  addFilter: (f: IFilter) => void
  filterItem: IFilter
}

const FilterItem: React.FC<IFilterItem> = ({
  filters,
  addFilter,
  filterItem,
}) => {
  const isFilterActive = (filter: IFilter) => {
    return filters.some(f => f.type === filter.type && f.value === filter.value)
  }

  const { type, value } = filterItem

  const getStyles = `tag-${type} ${
    type === 'difficulty' && `tag-${type}-${value.toString().toLowerCase()}`
  }`

  return (
    <FilterItemStyled>
      <div
        className={`tag ${getStyles} ${
          isFilterActive({
            type,
            value,
          })
            ? 'filter-active'
            : ''
        }`}
        onClick={() => addFilter({ type, value })}
      >
        {value}
      </div>
    </FilterItemStyled>
  )
}

export default FilterItem
