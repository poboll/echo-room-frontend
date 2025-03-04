import { useState } from 'react';
import { useChat } from './ChatContext';
import styles from '../styles/chatroom.module.css';

export default function Card() {
    const { state } = useChat();
    const user = state.currentUser;
    const [filterKey, setFilterKey] = useState('');

    return (
        <div className={styles.card}>
            <header>
                <img src={user?.userProfile || '/default_head.jpg'} alt={user?.nickname} className={styles.avatar} />
                <p className={styles.name}>{user?.nickname}</p>
            </header>
            <footer>
                <input
                    type="text"
                    value={filterKey}
                    onChange={(e) => setFilterKey(e.target.value)}
                    placeholder="Search"
                    className={styles.search}
                />
                <button className={styles.searchBtn}>+</button>
            </footer>
        </div>
    );
}