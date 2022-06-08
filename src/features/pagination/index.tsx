import styled from 'styled-components'

const PaginationStyled = styled.div`
  margin: 0 auto;

  div {
    width: 28px;
    line-height: 28px;
    background: ${({ theme }) => theme.colors.seaGreen};
    color: ${({ theme }) => theme.colors.tan};
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }

  .page-active {
    background: ${({ theme }) => theme.colors.teal};
    cursor: not-allowed;
  }
`

interface pagination {
  coursesAmount: number
  coursesPerPage: number
  currentPage: number
  setPage: Function
}

const Pagination: React.FC<pagination> = ({
  coursesAmount,
  coursesPerPage,
  currentPage,
  setPage,
}) => {
  const arr: number[] = []
  const pages = Math.ceil(coursesAmount / coursesPerPage)
  for (let i = 1; i <= pages; i++) {
    arr.push(i)
  }

  const isActive = (page: number) => {
    if (currentPage === page) return true
    return false
  }

  return (
    <PaginationStyled className="flex gap-tiny">
      {arr.map(p => (
        <div
          key={`page_${p}`}
          className={isActive(p) ? 'page-active' : ''}
          onClick={() => setPage(p)}
        >
          {p}
        </div>
      ))}
    </PaginationStyled>
  )
}

export default Pagination
