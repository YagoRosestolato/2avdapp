import styled from 'styled-components/native'
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  width: 100%;
  padding: ${RFValue(8)}px;
`;

export const ButtonStyle = styled.TouchableOpacity`
  width: 100%;
  padding: ${RFValue(10)}px;
  font-size: ${RFValue(10)}px;
  height: ${RFPercentage(8)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${RFValue(10)}px;
  border-radius: ${RFValue(8)}px;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(24)}px;
  font-weight: bold;
`;