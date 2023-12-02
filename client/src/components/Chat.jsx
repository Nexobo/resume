import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Section from './Section';
import propTypes from 'prop-types';

const Chat = ({ id, className, togglePopup }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  const [chatKey, setChatKey] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initialize WebSocket connection
    console.log(import.meta.env);
    console.log(import.meta.env.VITE_WS_URL);
    const newSocket = io(import.meta.env.VITE_API_URL, {
      query: { 'Chat-Key': chatKey },
      autoConnect: false,
    });

    newSocket.on('connect', () => {
      setConnected(true);
      newSocket.emit('request history');
    });
    newSocket.on('return-key', (key) => {
      setChatKey(key);
    });
    newSocket.on('chat history', (history) => {
      setMessages(history);
    });

    newSocket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    newSocket.on('new message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    newSocket.on('disconnect', () => {
      setConnected(false);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [chatKey]);

  const connectSocket = () => {
    if (chatKey && userName && userEmail && socket) {
      socket.connect();
    } else {
      alert('Please enter all required fields.');
    }
  };
  const requestKey = () => {
    if (userName && userEmail && socket) {
      //attacj request key to socket
      socket.io.opts.query = { 'Request-Key': 'true' };
      socket.connect();
      socket.emit('Request-Key', { userName, userEmail });
    } else {
      alert('Please enter all required fields.');
    }
  };
  const sendMessage = () => {
    if (socket && connected) {
      const message = {
        content: inputValue,
        userName: userName,
        userEmail: userEmail,
      };
      socket.emit('chat message', message);
      setInputValue('');
    }
  };
  const disconnect = () => {
    if (socket && connected) {
      socket.disconnect();
      setMessages([]);
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const renderChat = () => (
    <>
      <button onClick={togglePopup}>Close Chat</button>

      {!connected && (
        <div>
          <div id='user-data'>
            <input
              id='name'
              type='text'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder='Enter Name'
            />

            <input
              id='email'
              type='email'
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder='Enter Email'
            />
          </div>
          <input
            id='chat-key'
            type='text'
            value={chatKey}
            onChange={(e) => setChatKey(e.target.value)}
            placeholder='Enter Chat Key'
          />
          <p>
            To prevent spam, I&apos;ve implemented a key validation system to
            start the chat. You&apos;ll find the key on the front page of the
            resume or in the email you received.
          </p>
          <p>
            <em>
              If you don&apos;t have a key, simply request one; the process is
              immediate, allowing you to chat right away.
            </em>
          </p>
          <p>
            This step isn&apos;t necessary, but it aligns with the
            over-engineered theme of the resume.
          </p>
          <div id='connectbuttons'>
            <button onClick={connectSocket}>Connect</button>
            <button onClick={requestKey}>Request Key</button>
          </div>
        </div>
      )}
      {connected && (
        <>
          <div id='messages'>
            {messages.map((msg, index) => (
              <p key={index}>
                {msg.userName}: {msg.content}
              </p>
            ))}
          </div>
          <div className='ui'>
            <input
              type='text'
              value={inputValue}
              onChange={handleInputChange}
              placeholder='Type a message'
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </>
  );

  return <Section render={renderChat} id={id} className={className} />;
};

//proptypes validation
Chat.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
  togglePopup: propTypes.func,
};
export default Chat;
