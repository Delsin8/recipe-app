import styled from 'styled-components'
import theme from '../../styles/Theme'

const ButtonStyled = styled.button`
  background: none;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: none;
`

interface IButton {
  textColor: keyof typeof theme.colors
  background: keyof typeof theme.colors
  padding?: string
  fontSize?: string
  borderRadius?: keyof typeof theme.borderRadius
  borderColor?: keyof typeof theme.colors
  width?: string
}

const Button = styled(ButtonStyled)<IButton>`
  background: ${({ theme, background }) => theme.colors[background]};
  color: ${({ theme, textColor }) => theme.colors[textColor]};
  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
  ${({ theme, borderColor }) =>
    borderColor && `border: 1px solid ${theme.colors[borderColor]};`}
  ${({ width }) => width && `width: ${width};`}
`

export default Button
