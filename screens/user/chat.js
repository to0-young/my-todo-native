import React, { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button,} from 'react-native'
import { connect, useSelector } from 'react-redux'
import actionCreator from '../store/action-creator'

const Messages = () => {
  const [messages, setMessages] = React.useState([]);
  const [msg, setMsg] = React.useState('');
  const session = useSelector((state) => state.session.details);
  const user = useSelector((state) => state.session.details.user);
  const ws = React.useRef(null);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     const res = await fetch('http://192.168.1.101:3000/messages', {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
  //       setMessages(data);
  //     }
  //   };
  //
  //   fetchMessages();
  // }, []);


  // const handleMessageChange = (value) => {
  //   setMsg(value)
  // }


  // const handleMessageDelete = async (message) => {
  //   const res = await fetch(`http://192.168.1.101:3000//messages/${message}`, {
  //     method: 'DELETE',
  //     credentials: 'include',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  // }


  return (
    <View style={styles.container}>
      <View style={styles.messageHeader}>
        <Text style={styles.headerText}>Messages</Text>
      </View>

      {/*<ScrollView style={styles.messagesContainer}>*/}
      {/*  {messages.map((message, index) => (*/}
      {/*    <View*/}
      {/*      key={`chat__apt-message-${index}`}*/}
      {/*      style={[*/}
      {/*        styles.messageItem,*/}
      {/*        message.user_id === session.user.id && styles.myMessageItem,*/}
      {/*      ]}*/}
      {/*    >*/}
            {/*{message.user_id === session.user.id && (*/}
            {/*  <TouchableOpacity*/}
            {/*    style={styles.deleteButton}*/}
            {/*    onPress={() => handleMessageDelete(message.id)}*/}
            {/*  >*/}
            {/*    <Text>Delete</Text>*/}
            {/*  </TouchableOpacity>*/}
            {/*)}*/}

            {/*<View style={styles.avatarContainer}>*/}
              {/*<Image*/}
              {/*  source={{ uri: message.user.avatar.url }}*/}
              {/*  style={styles.userAvatar}*/}
              {/*/>*/}
              {/*<Text style={styles.userName}>{message.user.first_name}</Text>*/}
            {/*</View>*/}

            {/*<Text>{message.body}</Text>*/}
            {/*<Text style={styles.messageTime}>*/}
            {/*  {formattedTime(message.created_at)}*/}
            {/*</Text>*/}
          {/*</View>*/}
        {/*))}*/}
        {/*<View ref={bottomRef} />*/}
      {/*</ScrollView>*/}

      <View style={styles.messageForm}>
        <TextInput
          style={styles.messageInput}
          // onChangeText={handleMessageChange}
          value={msg}
          placeholder="Write a message..."
        />

        <Button
          title="Send"
          // onPress={handleSubmit}
          disabled={!msg.trim()}
          color="info"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageHeader: {
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  myMessageItem: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightblue',
  },
  deleteButton: {
    marginRight: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    marginTop: 5,
    textAlign: 'center',
  },
  messageTime: {
    marginLeft: 'auto',
  },
  messageForm: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
  },
  messageInput: {
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
});

const ConnectedMessages = connect(null, actionCreator)(Messages);
export default ConnectedMessages;
