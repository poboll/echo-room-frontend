import '../styles/global.css';
import { ChatProvider } from '../components/ChatContext';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <ChatProvider>{children}</ChatProvider>
        </body>
        </html>
    );
}
