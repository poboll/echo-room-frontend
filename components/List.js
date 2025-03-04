import { useChat } from './ChatContext';
import styles from '../styles/chatroom.module.css';

export default function List() {
    const { state, dispatch } = useChat();
    const { currentList, currentSession, users, isDot } = state;

    const changeCurrentSession = (session) => dispatch({ type: 'SET_CURRENT_SESSION', payload: session });

    const renderList = () => {
        if (currentList === '群聊') {
            return (
                <ul>
                    <p>Group Chat</p>
                    <li
                        className={currentSession?.username === '群聊' ? styles.active : ''}
                        onClick={() => changeCurrentSession({ username: '群聊', nickname: '群聊' })}
                    >
                        <img src="http://10.3.36.16:888/group1/M00/00/00/CgMkEGfCc-WANTWpAABTZWOctas12.jpeg" alt="Group" className={styles.avatar} />
                        <p className={styles.name}>Group Chat {isDot[`${state.currentUser.username}#群聊`] && <span>●</span>}</p>
                    </li>
                </ul>
            );
        } else if (currentList === '机器人') {
            return (
                <ul>
                    <p>Chat with Robot!</p>
                    <li
                        className={currentSession?.username === '机器人' ? styles.active : ''}
                        onClick={() => changeCurrentSession({ username: '机器人', nickname: '机器人', userProfile: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2548892998,499717296&fm=26&gp=0.jpg' })}
                    >
                        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2548892998,499717296&fm=26&gp=0.jpg" alt="Robot" className={styles.avatar} />
                        <p className={styles.name}>WALL-E (AI Reply)</p>
                    </li>
                </ul>
            );
        } else if (currentList === '私聊') {
            return (
                <ul className={styles.userList}>
                    <p>User List</p>
                    {users.map((item) => (
                        <li
                            key={item.username}
                            className={currentSession?.username === item.username ? styles.active : ''}
                            onClick={() => changeCurrentSession(item)}
                        >
                            <div className={styles.userItem}>
                                <div>
                                    <img src={item.userProfile} alt={item.nickname} className={styles.avatar} />
                                    <p className={styles.name}>{item.nickname} {isDot[`${state.currentUser.username}#${item.username}`] && <span>●</span>}</p>
                                </div>
                                <span>{item.userStateId === 1 ? 'Online' : 'Offline'}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            );
        }
    };

    return <div className={styles.list}>{renderList()}</div>;
}