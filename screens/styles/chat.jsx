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
  background-color: #333cb4;
`;

export const HeaderText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

export const MessageList = styled(FlatList)`
  flex: 1;
  padding: 8px;
  flex-direction: column;
`;

export const MessageContainer = styled(View)`
  align-self: flex-start;
  align-items: center;
  flex-wrap: wrap;
  background-color: #943b86;
  border-radius: 10px;
  padding: 5px 5px 5px 5px;
  margin-bottom: 10px;
`;

export const MessageContent = styled(View)`
  flex-direction: row;
  width: 80%;
`;

export const MessageText = styled(Text)`
  color: #dad9d9;
  padding-left: 5px;
`;

export const DeleteButton = styled(TouchableOpacity)`
  margin-right: 8px;
`;

export const UserName = styled(Text)`
  padding: 1px;
`;


export const MessageInput = styled(TextInput)`
  flex: 1;
  margin-right: 8px;
  padding: 8px;
  border-width: 1px;
  border-color: #0000f3;
  border-radius: 4px;
`;


