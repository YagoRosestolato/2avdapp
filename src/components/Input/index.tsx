import { TextInputProps } from 'react-native'

import {
  Container,
  InputStyle
} from './styles'

type InputProps = TextInputProps

export function Input({ ...rest }: InputProps) {
  return (
    <Container>
      <InputStyle {...rest} />
    </Container>
  )
}