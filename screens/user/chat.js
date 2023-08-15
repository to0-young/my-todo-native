import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {MaterialIcons} from "@expo/vector-icons";
import actionCreator from "../store/action-creator";
// import DeleteIcon from 'react-native-vector-icons/MaterialIcons';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const bottomRef = useRef(null);
  const session = useSelector((state) => state.session.details);
  const user = useSelector((state) => state.session.details.user);
  const dispatch = useDispatch();

  const ws = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`http://192.168.31.101:3000/messages`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    };

    fetchMessages();

    ws.current = new WebSocket(`http://192.168.31.101:3000/cable`);
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
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== data.message.id));
        if (data.message.user_id === session.user.id) {
          // handle user's own message deletion
        }
      } else {
        setMessages((prevMessages) => [...prevMessages, data.message]);
        if (data.message.user_id !== user.id) {
          clickNotify(data.message.body);
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
  }, [])



  const handleMessageChange = (text) => {
    setMsg(text);
  };

  const handleSubmit = async () => {
    const res = await fetch(`http://192.168.31.101:3000/messages`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: msg,
        first_name: session.user.first_name,
      }),
    });
    setMsg('');
  };

  const handleMessageDelete = async (messageId) => {
    const res = await fetch(`http://192.168.31.101:3000/messages/${messageId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const formattedTime = (timestamp) => {
    const time = new Date(timestamp);
    return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
  };

  const clickNotify = (msg) => {
    if (Notification.permission === 'granted') {
      new Notification('New Message', {
        body: msg,
        // icon: logo,
        duration: 4000,
        onClick: () => (window.location = '/chat'),
      })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('New Message', {
            body: msg,
            // icon: logo,
            duration: 4000,
            onClick: () => (window.location = '/chat'),
          })
        }
      })
    }
  }
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (bottomRef.current) {
  //       bottomRef.current.scrollIntoView({ behavior: 'auto' });
  //     }
  //   }, 100);
  //   return () => clearTimeout(timer);
  // }, [messages]);

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
            <TouchableOpacity style={styles.taskButton} onPress={() => handleMessageDelete(item)}>
              <MaterialIcons name="delete-forever" size={20} />
            </TouchableOpacity>
            )}

            <View style={styles.avatarContainer}>
              <Image source={{ uri: message.user.avatar.url }} style={styles.userAvatar} />
              <Text style={styles.userName}>{message.user.first_name}</Text>
            </View>

            <View>
              <Text>{message.body}</Text>
              <Text style={styles.messageTime}>{formattedTime(message.created_at)}</Text>
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


const styles = {
  chatHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    color: 'gray',
  },
  messageForm: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
  messageInput: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
};

const ConnectedMessages = connect(null, actionCreator)(Messages)
export default ConnectedMessages