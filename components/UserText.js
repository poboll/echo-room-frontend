import { useState } from 'react';
import { useChat } from './ChatContext';
import styles from '../styles/chatroom.module.css';

export default function UserText() {
    const { state, dispatch } = useChat();
    const { stomp, currentSession, currentUser } = state;
    const [content, setContent] = useState('');

    const addMessage = () => {
        if (!content.trim()) return;
        const msgObj = { content, messageTypeId: 1, fromNickname: currentUser.nickname, self: true };
        if (currentSession.username === '群聊') {
            stomp.publish({ destination: '/ws/groupChat', body: JSON.stringify(msgObj) });
        } else if (currentSession.username === '机器人') {
            msgObj.to = '机器人';
            stomp.publish({ destination: '/ws/robotChat', body: JSON.stringify(msgObj) });
            dispatch({ type: 'ADD_MESSAGE', payload: msgObj });
        } else {
            msgObj.from = currentUser.username;
            msgObj.to = currentSession.username;
            stomp.publish({ destination: '/ws/chat', body: JSON.stringify(msgObj) });
            dispatch({ type: 'ADD_MESSAGE', payload: msgObj });
        }
        setContent('');
    };

    return (
        <div className={`${styles.usertext} glass`}>
      <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyUp={(e) => e.ctrlKey && e.keyCode === 13 && addMessage()}
          placeholder="Press Ctrl + Enter to send"
      />
            <button onClick={addMessage}>Send</button>
        </div>
    );
}