import { useState, useEffect, useCallback } from 'react'
import { FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import { Header } from '../../components/Header'
import { Container, Content, TextCard } from './styles'
import { ListCard } from '../../components/ListCard';

interface ListEmployeesProps {
  id: string,
  cpf: string,
  name: string,
  bankBranch: string,
  account: string,
  salary: number,
}

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
  irf: number,
}

const payingBank = [
  { bankCode: '001', agency: '4530', aacount: '102030-1', bankName: 'BB' },
  { bankCode: '237', agency: '1230', aacount: '403020-2', bankName: 'Bradesco' },
  { bankCode: '241', agency: '0140', aacount: '123040-1', bankName: 'Itaú' },
  { bankCode: '033', agency: '1450', aacount: '011220-1', bankName: 'Santander' },
]

export function ListEmployees() {
  const [employeesCNAB, setEmployeesCNAB] = useState<ListEmployeesCNABProps[]>([])
  const [totalSantander, setTotalSantander] = useState(0)
  let employees: ListEmployeesProps[] = []
  let employeesAll: ListEmployeesCNABProps[] = []

  async function loadEmployess() {
    const storagedEmployees = await AsyncStorage.getItem('@si7op:employees')
    if (storagedEmployees) {
      employees = JSON.parse(storagedEmployees)
      employeesAll = employees.map(employee => {
        const [codBank, codAgency] = employee.bankBranch.split('/')
        const dataPayingBank = payingBank.find(pk => pk.bankCode === codBank)
        const data = {
          id: employee.id,
          bank: dataPayingBank?.bankCode,
          agency: dataPayingBank?.agency,
          payingBankAccount: dataPayingBank?.aacount,
          bankName: dataPayingBank?.bankName,
          bankBranch: employee.bankBranch,
          account: employee.account,
          salary: employee.salary,
          name: employee.name,
          fgts: calculateFgts(employee.salary),
          valeTransporte: calculateValeTransporte(employee.salary),
          irf: calculateIrf(employee.salary)
        }
        return data
      })
      setEmployeesCNAB(employeesAll)
      setTotalSantander(employeesAll.filter(emp => emp.bankBranch.slice(0, 3) === '033').length)
    }
  }

  function handleDeleteEmployee(id: string) {
    Alert.alert('Exclusão', 'Tem certeza?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed')
      },
      {
        text: 'OK',
        onPress: () => setEmployeesCNAB(employees =>
          employees.filter(employee => employee.id !== id))
      },
    ])
  }

  function totBancos(banco: string) {
    return employeesCNAB.filter(emp => emp.bankBranch.slice(0, 3) === banco).length
  }

  function totalSalary() {
    return employeesCNAB.reduce((total, v) => total += Number(v.salary), 0)
  }

  function totalSalaryAllBanks(banco: string) {
    return employeesCNAB
      .filter(emp => emp.bankBranch.slice(0, 3) === banco)
      .reduce((total, v) => total += v.salary, 0)
  }

  function calculateFgts(salary: number){
    return salary * 8/100
  }

  function calculateValeTransporte(salary: number){
    return salary * 6/100
  }

  function calculateIrf(salary: number){
    let irf = 0

    if (salary < 1900 ){
      irf = 0
    }else if (salary >= 1900 && salary < 3000) {
      irf = salary * 7.5 / 100
    }else if (salary >= 3000 && salary < 5000) {
      irf = salary * 9 / 100
    }else {
      irf = salary * 11 / 100
    }
    return irf
  }

  useEffect(() => {
    loadEmployess()
  }, [])

  useFocusEffect(useCallback(() => {
    loadEmployess()
  }, []))

  useEffect(() => {
    async function saveEmployees() {
      await AsyncStorage.setItem('@si7op:employees', JSON.stringify(employeesCNAB))
    }
    saveEmployees()
  }, [employeesCNAB])

  return (
    <Container>
      <Header title='Listagem de Funcionários' />
      {/* <Content>
        <TextCard>Total de Contas Itau:{totBancos('241')}</TextCard>
        <TextCard>Total de Contas Santander: {totBancos('033')}</TextCard>
        <TextCard>Total de Contas Bradesco: {totBancos('237')}</TextCard>
        <TextCard>Total de Contas Banco Brasil: {totBancos('001')}</TextCard>
        <TextCard>Total a Pagar:{totalSalary()}</TextCard>
        <TextCard>Total a Pagar no Itau:{totalSalaryAllBanks('241')}</TextCard>
        <TextCard>Total a Pagar no Santander:{totalSalaryAllBanks('033')}</TextCard>
        <TextCard>Total a Pagar no BB:{totalSalaryAllBanks('001')}</TextCard>
        <TextCard>Total a Pagar no Bradesco:{totalSalaryAllBanks('237')}</TextCard>
      </Content> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={employeesCNAB}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListCard
            item={item}
            onPress={() => handleDeleteEmployee(item.id)}
          />
        )}
      />
    </Container>
  )
}
