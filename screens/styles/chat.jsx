import styled from "styled-components/native";
import { View, Text, TextInput, Button, TouchableOpacity, Image,FlatList } from 'react-native';

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
  padding: 12px;
`;

export const MessageContainer = styled(View)`
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${({ userMessage }) => (userMessage ? '#943b86' : '#333cb4')};
  border-radius: 22px;
  padding: 5px;
`;

export const DeleteButton = styled(TouchableOpacity)`
  margin-right: 8px;
`;

export const AvatarContainer = styled(View)`
  margin-right: 8px;
`;

export const Avatar = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const UserName = styled(Text)`
  text-align: center;
`;

export const MessageContent = styled(View)`
  flex: 1;
`;

export const MessageTime = styled(Text)`
  font-size: 12px;
  color: #000000;
`;

export const MessageFormContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

export const MessageInput = styled(TextInput)`
  flex: 1;
  margin-right: 8px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  border-width: 1px;
  border-color: #0000f3;
  border-radius: 4px;
`;

export const SendButton = styled(Button)`
  color: #02e523;
`;

export const MessageText = styled(Text)`
  color: #dad9d9;
`;
