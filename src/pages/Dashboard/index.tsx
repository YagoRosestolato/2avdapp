import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
import { InputMaskCpf } from '../../components/InputMaskCpf'
import { InputMaskSalary } from '../../components/InputMaskSalary'
import { InputMaskBankBranch } from '../../components/InputMaskBankBranch'
import { InputMaskBirhDate } from '../../components/InputMaskBirthDate'
export function Dashboard() {
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [bankBranch, setBankBranch] = useState('')
  const [account, setAccount] = useState('')
  const [salary, setSalary] = useState('')
  const [birthDate, setBirthDate] = useState('')

  async function handleAddUser() {
    const employee = {
      id: new Date().getTime(),
      cpf,
      name,
      bankBranch,
      account,
      salary: parseFloat(salary.slice(2, salary.length).replace('.', ',').replace(',','')),
      birthDate: convertDate(birthDate)
    }
    console.log(employee)
    try {
      const data = await AsyncStorage.getItem('@si7op:employees')
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [
        ...currentData,
        employee
      ]
      await AsyncStorage.setItem('@si7op:employees', JSON.stringify(dataFormatted))
    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível gravar o funcionário')
    }
    setCpf('')
    setName('')
    setBankBranch('')
    setAccount('')
    setSalary('')
    setBirthDate('')
  }

  async function loadDataEmployee() {
    const data = await AsyncStorage.getItem('@si7op:employees')
    const currentData = data ? JSON.parse(data) : []
  }

  function convertDate(data: string) {
    const dataArray = data.split('/')
    return new Date(dataArray[1] + '/' + dataArray[0] + '/' + dataArray[2])
  }

  return (
    <Container
    >
      <Header title='Cadastro de Funcionários' />

      <InputMaskCpf
        placeholder='CPF'
        placeholderTextColor='#363F5F'
        value={cpf}
        onChangeText={value => setCpf(value)}
      />

      <Input
        placeholder='Nome'
        placeholderTextColor='#363F5F'
        value={name}
        onChangeText={value => setName(value)}
      />

      <InputMaskBankBranch
        placeholder='banco/agência'
        placeholderTextColor='#363F5F'
        value={bankBranch}
        onChangeText={value => setBankBranch(value)}
      />

      <Input
        placeholder='conta'
        placeholderTextColor='#363F5F'
        value={account}
        onChangeText={value => setAccount(value)}
      />

      <InputMaskSalary
        placeholder='salário'
        placeholderTextColor='#363F5F'
        value={salary}
        onChangeText={value => setSalary(value)}
      />

      <InputMaskBirhDate
        placeholder='Data de nascimento'
        placeholderTextColor='#363F5F'
        value={birthDate}
        onChangeText={value => setBirthDate(value)}
      />

      <Button
        title='Adicionar'
        handleUser={handleAddUser}
      />

    </Container>
  )
}