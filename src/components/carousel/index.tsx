import React, { useRef } from 'react'
import styled from 'styled-components'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const CarousesStyled = styled.div`
  position: relative;
  .d {
    display: flex;
    overflow-x: scroll;
    scroll-behavior: smooth;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    .control-button {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);

      color: black;
      font-size: 1.5rem;
    }

    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`

interface ICarousel {
  children: JSX.Element
}

const Carousel: React.FC<ICarousel> = ({ children }) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  const slide = (direction: 'left' | 'right') => {
    switch (direction) {
      case 'left':
        return (carouselRef.current!.scrollLeft -= 400)
      default:
        return (carouselRef.current!.scrollLeft += 400)
    }
  }

  return (
    <CarousesStyled>
      <div className="d" ref={carouselRef}>
        <div className="control-button left" onClick={() => slide('left')}>
          <FaArrowLeft />
        </div>
        <div className="control-button right" onClick={() => slide('right')}>
          <FaArrowRight />
        </div>
        {children}
      </div>
    </CarousesStyled>
  )
}

export default Carousel
