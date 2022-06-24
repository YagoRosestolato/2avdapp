import { TextInputProps } from 'react-native'

import {
  Container,
  InputStyle
} from './styles'

type InputProps = TextInputProps

export function InputMaskBankBranch({ ...rest }: InputProps) {
  return (
    <Container>
      <InputStyle
        type={'custom'}
        options={{
          mask: '999/9999'
        }}
        {...rest}
      />
    </Container>
  )
}

