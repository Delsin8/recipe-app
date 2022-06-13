import styled from 'styled-components'

const AuthStyled = styled.div`
  width: 75%;
  margin: 0 auto;
  gap: 0.25rem;

  .icon {
    opacity: 0.75;
  }

  .form-input {
    padding-bottom: 0.25rem;
    border-bottom: 0.5px solid #000000a6;

    input {
      width: 100%;
      background: none;
      outline: none;
      border: none;
      font-size: 0.9rem;

      &::placeholder {
        color: black;
        opacity: 0.7;
        font-family: 'Raleway';
        font-weight: 300;
        letter-spacing: 0.5px;
      }
    }
  }

  @media (min-width: 768px) {
    margin-top: 3rem;
  }
`

export default AuthStyled
