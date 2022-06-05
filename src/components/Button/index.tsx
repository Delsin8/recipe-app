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
  background?: keyof typeof theme.colors
  padding?: string
  fontSize?: string
  borderRadius?: keyof typeof theme.borderRadius
  borderColor?: keyof typeof theme.colors
  width?: string
  gradient?: string
  cursor?: string
}

const Button = styled(ButtonStyled)<IButton>`
  color: ${({ theme, textColor }) => theme.colors[textColor]};
  background: ${({ theme, background }) =>
    background && theme.colors[background]};
  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
  ${({ theme, borderColor }) =>
    borderColor && `border: 1px solid ${theme.colors[borderColor]};`}
  ${({ width }) => width && `width: ${width};`}
  ${({ gradient }) => gradient && `background: ${gradient};`}
  ${({ cursor }) => (cursor ? `cursor: ${cursor};` : 'cursor: pointer;')}
`

export default Button
