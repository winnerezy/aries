'use client'

import { useEffect, useRef, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { socket } from '@/app/socket'; // Assuming socket is correctly imported
import { ChatCard } from '@/components/ChatCard';
import { FaPlus } from 'react-icons/fa6';
import { Message, User } from '@/types';

export default function PrivateMessage({ params: { userId } }: { params: { userId: string } }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetchedMessages, setFetchedMessages] = useState<Message[]>([])
  const [user, setUser] = useState<string>('');
  const [userStatus, setUserStatus] = useState<string>('')
  const [receiver, setReceiver] = useState<User | null>(null)
  
  const chatBoxRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, fetchedMessages]);
  
  useEffect(() => {
    async function fetchCurrentUserId() {
      try {
        const res = await fetch('/api/currentUser');
        const ans = await res.json();
        setUser(ans.userId);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchCurrentUserId();

    return () => {
      socket.off('chat');
    };
  }, []);

  useEffect(() => {
    async function fetchReceiver() {
      try {
        const res = await fetch(`/api/user/${userId}`);
        const ans: User = await res.json();
        console.log(ans)
        setReceiver(ans);
      } catch (error: any) {
        console.log(error.message);
      }
    }
    fetchReceiver();

    return () => {
      socket.off('chat');
    };
  }, [userId]);

  useEffect(() => {
    socket.emit('register', user);

    socket.on('chat', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('status', (status)=> {
      setUserStatus(status)
    })

    return () => {
      socket.off('chat');
    };
  }, [user]);

  useEffect(()=> {
    async function fetchMessages(userId: string) {
      const res = await fetch(`/api/messages/${userId}`)
      const ans = await res.json()
      setFetchedMessages(ans.messages)
    }
    fetchMessages(userId)
  }, [userId])

  useEffect(()=> {
    inputRef.current?.focus()
  })

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const currentMessage = {
    sender: user,
    receiver: userId,
    content: message,
  };

  const sendMessage = () => {
    if(currentMessage.content.trim() === ''){
      return;
    }
    socket.emit('chat', currentMessage);
    setMessage('');
  };

  return (
    <section className='flex flex-col w-full px-2 items-center gap-2'>
      <header className='w-full h-10 border'>
        <p>
          { receiver?.username && userStatus ? `${receiver?.username} is ${userStatus}` : "" }
        </p>
      </header>

      <div className="flex flex-col gap-4 w-full max-w-[700px] p-2 h-[550px] overflow-y-auto px-4" ref={chatBoxRef}>
        {
          fetchedMessages && fetchedMessages.length !== 0 ? 
          fetchedMessages.map((msg: Message, index) => (
            <ChatCard key={index} className={`${msg.receiver === userId ? 'self-start': 'self-end'}`} {...msg}/>
         ))
         : 
         ''
        }
        {messages.map((msg: Message, index) => (
           <ChatCard key={index} className={`${msg.receiver === userId ? 'self-start': 'self-end'}`} {...msg}/>
        ))}
      </div>

      <div className='fixed bottom-16 z-40 flex gap-2 items-center p-2 w-full max-w-[700px]'>
        <section className='w-full flex items-center px-2 border border-[--border-bg] rounded-[5px] '>
          <button>
            <FaPlus className='rounded-full text-[--secondary-text] size-5'/>
          </button>
          <input 
            type="text" 
            className='w-full h-8 outline-none p-2 placeholder:text-xs text-sm font-light'
            placeholder='Send Message'
            value={message}
            onChange={(e) => handleMessage(e)}
            onKeyDown={(e)=> {
              if(e.code === 'Enter'){
                sendMessage()
              }
            }}
            ref={inputRef}
          />
        </section>
        <button 
          onClick={sendMessage}
          className='border border-[--border-bg] w-12 h-8 p-2 grid place-content-center rounded-[5px] hover:opacity-80'>
          <IoSendSharp className='text-[--secondary-text]'/>
        </button>
      </div>
    </section>
  );
}
