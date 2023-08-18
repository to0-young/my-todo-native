import React, { useState, useEffect, useRef } from 'react';
import {View, Text, TextInput, Button,  TouchableOpacity, FlatList} from 'react-native';
import {useSelector,  connect} from 'react-redux';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import actionCreator from "../store/action-creator";
import {deleteMessageRequest, fetchMessagesApi, sendMessageRequest} from "../reusable/requests/user/userRequest";


const Messages = () => {
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([])
  const bottomRef = useRef(null)
  const session = useSelector((state) => state.session.details)
  const user = useSelector((state) => state.session.details.user)

  const ws = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetchMessagesApi()
      if (res.ok) {
        setMessages()
      }
    }

    fetchMessages();

    // ws.current = new WebSocket(`http://192.168.1.101:3000/cable`)
    ws.current = new WebSocket(`http://192.168.31.101:3000/cable`)

    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: JSON.stringify({
            channel: 'MessagesChannel',
          }),
        })
      );
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === 'ping' || data.type === 'welcome' || data.type === 'confirm_subscription') {
        return;
      }
      if (data.message.type === 'message_deleted') {
        setMessages((Messages) => Messages.filter((message) => message.id !== data.message.id));
        if (data.message.user_id === session.user.id) {

        }
      } else {
        setMessages((messages) => [...messages, data.message]);
        if (data.message.user_id !== user.id) {
        }
      }
    };

    return () => {
      ws.current.send(
        JSON.stringify({
          command: 'unsubscribe',
          identifier: JSON.stringify({
            channel: 'MessagesChannel',
          }),
        })
      );
    };
  }, []);

  const handleMessageChange = (text) => {
    setMsg(text);
  }


  const handleSubmit = async () => {
    const res = await sendMessageRequest(msg, session.user.first_name);
    if (res.ok) {
      setMsg('');
    }
  }


  const handleMessageDelete = async (messageId) => {
    const res = await deleteMessageRequest(messageId);
    if (res.ok) {
    }
  };


  useEffect(() => {
  }, [messages])


  return (
    <View style={{flex: 1}}>
      <View style={styles.chatHeader}>
        <Text style={styles.headerText}>Messages</Text>
      </View>

      <FlatList
        style={styles.messagesContainer}
        data={messages}
        keyExtractor={(message) => `chat__apt-message-${message.id}`}
        renderItem={({item: message}) => (

          <View
            style={[
              styles.message,
              {alignSelf: message.user_id === session.user.id ? 'flex-end' : 'flex-start'},
            ]}
          >
            {message.user_id === session.user.id && (
              <TouchableOpacity onPress={() => handleMessageDelete(message.id)}>
                <DeleteIcon name="delete" size={20} color="black"/>
              </TouchableOpacity>
            )}

            <View style={styles.avatarContainer}>
              {/*<Image source={{ uri: message.user.avatar.url }} style={styles.userAvatar} />*/}
              <Text style={styles.userName}>{message.user.first_name}</Text>
            </View>

            <View style={[styles.message]}>
              {/*<Text style={styles.messageTime}>{(message.created_at)}</Text>*/}
              <Text>{message.body}</Text>
            </View>
          </View>

        )}
        ref={bottomRef}
      />

      <View style={styles.messageForm}>
        <TextInput
          style={styles.messageInput}
          value={msg}
          onChangeText={handleMessageChange}
          placeholder="Write a message..."
        />

        <Button
          title="Send"
          onPress={handleSubmit}
          disabled={!msg.trim()}
        />
      </View>
    </View>
  );
}

const ConnectedMessages = connect(null, actionCreator)(Messages)
export default ConnectedMessages


const styles = {
  chatHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#10d6dc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    padding: 12,
  },
  message: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',

  },
  avatarContainer: {
    marginRight: 8,
  },
  // userAvatar: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  // },
  userName: {
    textAlign: 'center',
  },
  messageTime: {
    fontSize: 12,
    color: '#d51b0d',
  },
  messageForm: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#02e523',
    padding: 8,
  },
  messageInput: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#0000f3',
    borderRadius: 4,
  },
};
