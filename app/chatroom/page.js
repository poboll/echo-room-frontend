'use client';

import { useEffect } from 'react';
import Toolbar from '../../components/Toolbar';
import Card from '../../components/Card';
import List from '../../components/List';
import ChatTitle from '../../components/ChatTitle';
import Message from '../../components/Message';
import UserText from '../../components/UserText';
import { useChat } from '../../components/ChatContext';
import styles from '../../styles/chatroom.module.css';

export default function ChatRoom() {
    const { state, connectWebSocket, dispatch } = useChat();
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

    useEffect(() => {
        if (user) {
            dispatch({ type: 'SET_CURRENT_USER', payload: user });
            connectWebSocket();
        }
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('state', JSON.stringify(state));
        });
        return () => window.removeEventListener('beforeunload', () => {});
    }, [user, dispatch, connectWebSocket, state]);

    return (
        <div className="container">
            <div className={`${styles.toolbar} glass`}>
                <Toolbar />
            </div>
            <div className={`${styles.sidebar} glass`}>
                <Card />
                <List />
            </div>
            <div className={`${styles.main} glass`}>
                <ChatTitle />
                <Message />
                <UserText />
            </div>
        </div>
    );
}
