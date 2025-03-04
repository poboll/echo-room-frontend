import { useChat } from './ChatContext';
import styles from '../styles/chatroom.module.css';

export default function ChatTitle() {
    const { state } = useChat();
    const { currentSession } = state;

    return (
        <div className={`${styles.chatTitle} glass`}>
            <span className={styles.titleName}>{currentSession?.nickname || ''}</span>
            <button className={styles.moreBtn}>...</button>
        </div>
    );
}