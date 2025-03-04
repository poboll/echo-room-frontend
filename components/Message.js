'use client';

import { useEffect, useRef } from 'react';
import { useChat } from './ChatContext';
import styles from '../styles/chatroom.module.css';

export default function Message() {
    const { state } = useChat();
    const { sessions, currentSession, currentUser } = state;
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [sessions]);

    const renderMessages = () => {
        if (!currentSession) return null;
        const key = currentSession.username === '群聊' ? '群聊' : `${currentUser.username}#${currentSession.username}`;
        const messages = sessions[key] || [];

        return messages.map((entry, index) => (
            <li key={index}>
                <p className={styles.time}><span>{new Date(entry.date || entry.createTime).toLocaleTimeString()}</span></p>
                <div className={`${styles.main} ${entry.self ? styles.self : ''}`}>
                    <p className={styles.username}>{entry.fromNickname || entry.fromName}</p>
                    <img src={entry.self ? currentUser.userProfile : (currentSession.userProfile || entry.fromProfile)} alt="" className={styles.avatar} />
                    {entry.messageTypeId === 1 ? (
                        <p className={styles.text} dangerouslySetInnerHTML={{ __html: entry.content }}></p>
                    ) : (
                        <img src={entry.content} alt="Message" className={styles.img} />
                    )}
                </div>
                <div ref={messagesEndRef} />
            </li>
        ));
    };

    return (
        <div className={styles.message}>
            <ul>{renderMessages()}</ul>
        </div>
    );
}
