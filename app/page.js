'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
    const router = useRouter();
    const [loginForm, setLoginForm] = useState({ username: '', password: '', code: '' });
    const [verifyCode, setVerifyCode] = useState('/verifyCode');
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 此处使用环境变量确保 API 地址正确
            const res = await axios.post(
                process.env.NEXT_PUBLIC_API_BASE_URL + '/doLogin',
                new URLSearchParams(loginForm).toString(),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data.obj));
                router.push('/chatroom');
            }
        } catch (error) {
            console.error(error);
            setVerifyCode(`/verifyCode?time=${Date.now()}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* 动态背景在全局样式中已实现 */}
            <div className="p-8 w-full max-w-md bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg z-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">SubtleChat</h1>
                <p className="text-center text-gray-600 mb-6">Connect with ease</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="用户名"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="密码"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex space-x-2 items-center">
                        <input
                            type="text"
                            placeholder="验证码"
                            value={loginForm.code}
                            onChange={(e) => setLoginForm({ ...loginForm, code: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                            className="w-2/3 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <img
                            src={verifyCode}
                            alt="验证码"
                            className="w-1/3 cursor-pointer rounded-lg"
                            title="点击切换验证码"
                            onClick={() => setVerifyCode(`/verifyCode?time=${Date.now()}`)}
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-gray-700">记住我一周</span>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => router.push('/register')}
                            className="w-1/2 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
                        >
                            注册
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/2 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                        >
                            {loading ? '登录中...' : '登录'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
