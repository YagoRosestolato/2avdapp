import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  width: 100%;
  padding: ${RFValue(10)}px;
`;

export const InputStyle = styled.TextInput`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  padding:${RFValue(10)}px;
  font-size:${RFValue(14)}px;
  margin-top: ${RFValue(2)}px;
`;