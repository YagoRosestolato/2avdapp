import { TextInputProps } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import {
  Container,
  InputStyle
} from './styles'

type InputProps = TextInputProps

export function InputMaskCpf({ ...rest }: InputProps) {
  return (
    <Container>
      <InputStyle
        type={'cpf'}
        {...rest}
      />
    </Container>
  )
}

