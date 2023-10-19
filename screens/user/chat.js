import React, {useState, useEffect, useRef} from 'react';
import {useSelector, connect} from 'react-redux';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import actionCreator from "../store/action-creator";
import {Button} from 'react-native'
import {deleteMessageRequest, fetchMessagesApi, sendMessageRequest} from "../reusable/requests/user/userRequest";
import {
  MessageForm,
  ChatHeader,
  HeaderText,
  MessageList,
  MessageContainer,
  DeleteButton,
  // AvatarContainer,
  UserName,
  MessageContent,
  MessageInput,
  MessageText,
  Container,
} from '../styles/chat';

const Messages = () => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const session = useSelector((state) => state.session.details);
  const user = useSelector((state) => state.session.details.user);

  const ws = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetchMessagesApi();
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    }

    fetchMessages();

    ws.current = new WebSocket(`http://192.168.1.112:3000/cable`);
    // ws.current = new WebSocket(`http://192.168.1.112:3000/cable`);

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

  return (
    <Container>
      <ChatHeader>
        <HeaderText>Messages</HeaderText>
      </ChatHeader>

      <MessageList
        data={messages}
        keyExtractor={(message) => `chat__apt-message-${message.id}`}
        renderItem={({item: message}) => (
          <MessageContainer userMessage={message.user_id === session.user.id}>

            {/*<Avatar source={{ uri: message.user.avatar.url }} />*/}

            <MessageContent>
              {message.user_id === session.user.id && (
                <DeleteButton onPress={() => handleMessageDelete(message.id)}>
                  <DeleteIcon name="delete" size={20} color="black"/>
                </DeleteButton>
              )}

              <UserName>{message.user.first_name}</UserName>
              <MessageText>{message.body}</MessageText>

            </MessageContent>
          </MessageContainer>
        )}
        ref={bottomRef}
      />

      <MessageForm>
        <MessageInput
          value={msg}
          onChangeText={handleMessageChange}
          placeholder="Write a message..."
        />
        <Button
          title="Send"
          onPress={handleSubmit}
          disabled={!msg.trim()}
        />
      </MessageForm>
    </Container>
  );
}


const ConnectedMessages = connect(null, actionCreator)(Messages);
export default ConnectedMessages;
