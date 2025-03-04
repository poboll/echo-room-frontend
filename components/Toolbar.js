'use client';

import { FaComments, FaAddressBook, FaAndroid, FaUser, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useChat } from './ChatContext';
import styles from '../styles/chatroom.module.css';

export default function Toolbar() {
    const { state, dispatch } = useChat();
    const user = state.currentUser;

    const chooseChatList = (listName) => dispatch({ type: 'SET_CURRENT_LIST', payload: listName });
    const exitSystem = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className={styles.toolbar}>
            <img src={user?.userProfile || '/default_head.jpg'} alt={user?.nickname} className={styles.imgProfile} />
            <div className={styles.btnBar}>
                <div className={styles.topBtnBar}>
                    <button onClick={() => chooseChatList('群聊')}><FaComments /></button>
                    <button onClick={() => chooseChatList('私聊')}><FaAddressBook /></button>
                    <button onClick={() => chooseChatList('机器人')}><FaAndroid /></button>
                </div>
                <div className={styles.bottomBtnBar}>
                    <button><FaUser /></button>
                    <button><FaBars /></button>
                    <button onClick={exitSystem}><FaSignOutAlt /></button>
                </div>
            </div>
        </div>
    );
}
