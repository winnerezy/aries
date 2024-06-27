'use client'

import { useEffect, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { socket } from '@/app/socket'; // Assuming socket is correctly imported
import { ChatCard } from '@/components/ChatCard';

interface Message {
  sender: string
  receiver: string
  content: string
}

export default function PrivateMessage({ params: { userId } }: { params: { userId: string } }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<string>('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/user');
        const ans = await res.json();
        setUser(ans.userId);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchUser();

    return () => {
      socket.off('chat');
    };
  }, []);

  useEffect(() => {
    socket.emit('register', user);

    socket.on('chat', (message: Message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat');
    };
  }, [user]);

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const currentMessage = {
    sender: user,
    receiver: userId,
    content: message,
  };

  const sendMessage = () => {
    
    socket.emit('chat', currentMessage);
    setMessage('');
  };

  return (
    <section className='flex flex-col w-full p-2 items-center gap-2'>
      <header className='w-full h-10 border'>

      </header>
      <div className="flex flex-col gap-4 w-[700px] p-2 h-[600px] overflow-y-auto px-4">
        {messages.map((msg, index) => (
           <ChatCard key={index} className={`${msg.receiver === userId ? 'self-start': 'self-end'}`} content={msg.content}/>
        ))}
      </div>

      <div className='fixed bottom-8 flex gap-2 items-center p-2 w-full max-w-[700px]'>
        <input 
          type="text" 
          className='w-full h-8 outline-none p-2 rounded-[5px] border border-[--border-bg] placeholder:text-xs text-sm font-light'
          placeholder='Send Message'
          value={message}
          onChange={(e) => handleMessage(e)}
        />
        <button 
          onClick={sendMessage}
          className='border border-[--border-bg] w-12 h-8 p-2 grid place-content-center rounded-[5px] hover:opacity-80'>
          <IoSendSharp className='text-[--secondary-text]'/>
        </button>
      </div>
    </section>
  );
}
