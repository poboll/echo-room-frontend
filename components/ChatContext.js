'use client';

import React, { createContext, useReducer, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatContext = createContext();

const initialState = {
    sessions: {},
    users: [],
    currentUser: null,
    currentSession: { username: '群聊', nickname: '群聊' },
    currentList: '群聊',
    filterKey: '',
    stomp: null,
    isDot: {},
};

const chatReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return { ...state, currentUser: action.payload };
        case 'SET_CURRENT_SESSION':
            return { ...state, currentSession: action.payload, isDot: { ...state.isDot, [`${state.currentUser.username}#${action.payload.username}`]: false } };
        case 'SET_CURRENT_LIST':
            return { ...state, currentList: action.payload };
        case 'ADD_MESSAGE':
            const { from, to, content, messageTypeId, fromNickname, self } = action.payload;
            const key = `${state.currentUser.username}#${to}`;
            const newSessions = { ...state.sessions };
            if (!newSessions[key]) newSessions[key] = [];
            newSessions[key].push({ content, date: new Date(), fromNickname, messageTypeId, self });
            return { ...state, sessions: newSessions };
        case 'ADD_GROUP_MESSAGE':
            const groupSessions = state.sessions['群聊'] || [];
            return { ...state, sessions: { ...state.sessions, '群聊': [...groupSessions, action.payload] } };
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'SET_STOMP':
            return { ...state, stomp: action.payload };
        case 'SET_DOT':
            return { ...state, isDot: { ...state.isDot, [action.payload.key]: action.payload.value } };
        default:
            return state;
    }
};

export const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    const connectWebSocket = () => {
        const stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8082/ws/ep'),
            onConnect: () => {
                stompClient.subscribe('/topic/greetings', (msg) => {
                    const receiveMsg = JSON.parse(msg.body);
                    if (state.currentSession.username !== '群聊') {
                        dispatch({ type: 'SET_DOT', payload: { key: `${state.currentUser.username}#群聊`, value: true } });
                    }
                    dispatch({ type: 'ADD_GROUP_MESSAGE', payload: receiveMsg });
                });

                stompClient.subscribe('/user/queue/chat', (msg) => {
                    const receiveMsg = JSON.parse(msg.body);
                    if (!state.currentSession || receiveMsg.from !== state.currentSession.username) {
                        dispatch({ type: 'SET_DOT', payload: { key: `${state.currentUser.username}#${receiveMsg.from}`, value: true } });
                    }
                    dispatch({ type: 'ADD_MESSAGE', payload: { ...receiveMsg, to: receiveMsg.from, self: false } });
                });

                dispatch({ type: 'SET_STOMP', payload: stompClient });
            },
        });
        stompClient.activate();
    };

    return (
        <ChatContext.Provider value={{ state, dispatch, connectWebSocket }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
