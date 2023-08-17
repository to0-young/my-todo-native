import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import {useSelector,  connect} from 'react-redux';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import actionCreator from "../store/action-creator";


const Messages = () => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const session = useSelector((state) => state.session.details);
  const user = useSelector((state) => state.session.details.user);


  const ws = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`http://192.168.1.101:3000/messages`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        // const data = await res.json();
        setMessages();
      }
    };

    fetchMessages();

    ws.current = new WebSocket(`http://192.168.1.101:3000/cable`);
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
  };

  const handleSubmit = async () => {
    const res = await fetch(`http://192.168.1.101:3000/messages`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: msg,
        first_name: session.user.first_name,
      }),
    });
    setMsg('');
  }



  const handleMessageDelete = async (messageId) => {
    const res = await fetch(`http://192.168.1.101:3000/messages/${messageId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
  };

  // const formattedTime = (timestamp) => {
  //   const time = new Date(timestamp);
  //   return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
  // };


  useEffect(() => {
    // const timer = setTimeout(() => {
    //   const endElement = bottomRef.current
    //   if (!endElement) return
    //   endElement.scrollIntoView({ block: 'start', behavior: 'auto' })
    // }, 100)
    // return () => clearTimeout(timer)
  }, [messages])



  return (
    <View style={{ flex: 1 }}>
      <View style={styles.chatHeader}>
        <Text style={styles.headerText}>Messages</Text>
      </View>

      <View style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View
            key={`chat__apt-message-${index}`}
            style={[
              styles.message,
              { alignSelf: message.user_id === session.user.id ? 'flex-end' : 'flex-start' },
            ]}
          >
            {message.user_id === session.user.id && (
              <TouchableOpacity onPress={() => handleMessageDelete(message.id)}>
                <DeleteIcon name="delete" size={20} color="red" />
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
        ))}
        <View ref={bottomRef} />
      </View>

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
};

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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  avatarContainer: {
    marginRight: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    textAlign: 'center',
  },
  messageTime: {
    fontSize: 12,
    color: '#ce1111',
  },
  messageForm: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopWidth: 1,
    color: '#ce1111',
    padding: 8,
  },
  messageInput: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#0745e3',
    borderRadius: 4,
  },
};
