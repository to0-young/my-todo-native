import styled from "styled-components/native";
import { View, Text, TextInput,  TouchableOpacity, FlatList } from 'react-native';

export const Container = styled(View)`
  flex: 1;
`;
export const MessageForm = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

export const ChatHeader = styled(View)`
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #68f8e1;
`;

export const HeaderText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

export const MessageList = styled(FlatList).attrs({
  inverted: true,
})`
  flex: 1;
  padding: 8px;
  flex-direction: column;
`;

export const MessageContainer = styled(View)`
  flex-wrap: wrap;
  align-self: ${props => props.message.user.id === props.session.user.id ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.message.user.id === props.session.user.id ? '#6a726c' : '#b44e4e'};
  border-radius: ${props => props.message.user.id === props.session.user.id ? '10px 10px 0px 10px' : '10px 10px 10px 0px'};
  padding: 5px 4px 5px 4px;
  margin-top: 10px;
`;

export const MessageContent = styled(View)` 
  flex-direction: row;
  width: 82%;
`;

export const MessageText = styled(Text)`
  color: #eadbdb;
  padding-left: 10px;
`;

export const DeleteButton = styled(TouchableOpacity)`
  margin-right: 3px;
`;

export const UserName = styled(Text)`
  padding-left: 8px;
`;


export const MessageInput = styled(TextInput)`
  flex: 1;
  margin-right: 8px;
  padding: 8px;
  border-width: 1px;
  border-color: #000000;
  border-radius: 10px;
`;


