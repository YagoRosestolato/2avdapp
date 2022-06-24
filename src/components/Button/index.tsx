import {
  Container,
  ButtonStyle,
  Title
} from './styles'

interface ButtonProps {
  title: string,
  handleUser?: () => void;
}

export function Button({ title, handleUser }: ButtonProps) {
  return (
    <Container>
      <ButtonStyle onPress={handleUser}>
        <Title>{title}</Title>
      </ButtonStyle>
    </Container>
  )
}