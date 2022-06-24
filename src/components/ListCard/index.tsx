import { TouchableOpacityProps } from 'react-native'

import {
    Container,
    ButtonCard,
    TextCard
} from './styles'

interface ListEmployeesCNABProps {
    id: string,
    bank?: string,
    agency?: string,
    payingBankAccount?: string,
    bankName?: string,
    bankBranch: string,
    account: string,
    salary: number,
    name: string,
    fgts: number,
    valeTransporte: number,
    irf: number
}

interface ListCardProps extends TouchableOpacityProps {
    item: ListEmployeesCNABProps;
}

export function ListCard({ item, ...rest }: ListCardProps) {
    return (
        <Container>
            <ButtonCard
                {...rest}
                key={item.id}>
                <TextCard>Dados do Recebimento</TextCard>
                <TextCard>Bco/Agencia: {item.bankBranch}</TextCard>
                <TextCard>Conta: {item.account}</TextCard>
                <TextCard>Salario: {item.salary}</TextCard>
                <TextCard>Nome: {item.name}</TextCard>
                <TextCard>Fgts: {item.fgts}</TextCard>
                <TextCard>Vale Transporte: {item.valeTransporte}</TextCard>
                <TextCard>Irf: {item.irf}</TextCard>
            
            </ButtonCard>
        </Container>
    )
}


