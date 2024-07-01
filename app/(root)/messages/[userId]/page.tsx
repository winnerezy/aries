'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import { IoImageSharp, IoSendSharp } from 'react-icons/io5';
import { socket } from '@/app/socket';
import { ChatBubble } from '@/components/ChatBubble';
import { FaPlus, FaVideo } from 'react-icons/fa6';
import { Message, User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

export default function PrivateMessage({ params: { userId } }: { params: { userId: string } }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<string>('');
  const [userStatus, setUserStatus] = useState<string>('');
  const [receiver, setReceiver] = useState<User | null>(null);

  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [photo, setPhoto] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result as string
  
          setPhoto(binaryStr)
        }
        reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  useEffect(()=> {
    async function fetchData(){
      try {
        const [currentUserRes, receiverRes] = await Promise.all([
          fetch('/api/currentUser'),
          fetch(`/api/user/${userId}`)
        ])
        const currentUserAns = await currentUserRes.json()
        const receiverAns = await receiverRes.json()
        setUser(currentUserAns.userId)
        setReceiver(receiverAns)
      } catch (error: any) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    socket.emit('register', user);

    socket.on('chat', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('status', (online: { userId: string, status: string }[]) => {
      const receiverStatus = online.find(user => user.userId === userId) // getting the receiver from the array
        setUserStatus(receiverStatus?.status!);
    });


    return () => {
      socket.off('chat');
      socket.off('status');
    };
  }, [user, userId]);

  useEffect(() => {
    async function fetchMessages(userId: string) {
      const res = await fetch(`/api/messages/${userId}`);
      const ans = await res.json();
      setFetchedMessages(ans.messages);
    }
    fetchMessages(userId);
  }, [userId]);

  useEffect(() => {
    inputRef.current?.focus();
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, fetchedMessages]);

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async() => {
    if (message.trim() === '' && !photo) {
      return;
    }
    let photoUrl = null;

    if(photo){
      photoUrl = await handleFileInput(photo)
    }

    
  const currentMessage = {
    sender: user,
    receiver: userId,
    content: message,
    photo: photoUrl
  };

    socket.emit('chat', currentMessage);
    setMessage('');
    setPhoto(null);
  
  };

  const handleFileInput = async(binaryStr: string) => {
    try {
      const res = await fetch('/api/upload-file', { method: 'POST', body: JSON.stringify({ file: binaryStr }) })

      if (!res.ok) {
       throw new Error
      }
      const image: string = await res.json()

      return image.replace(/"/g, "");

    } catch (error: any) {
      console.log(error.message)
      return null;
    }
  };

  return (
    <section className='flex flex-col w-full items-center gap-2'>
      <header className='w-full h-12 border flex gap-4 items-center'>
        <Link href={`/profile/${receiver?.username}`}>
          <Avatar className="border border-[--border-bg] flex items-center justify-center  ml-8">
            <AvatarImage src="" />
            <AvatarFallback className="font-semibold">{receiver?.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
        <p>
          {receiver?.username && userStatus ? `${receiver?.username} is ${userStatus}` : ""}
        </p>
      </header>

      <div className="flex flex-col gap-4 w-full max-w-[700px] p-2 h-[550px] overflow-y-auto px-4" ref={chatBoxRef}>
        {
          fetchedMessages && fetchedMessages.length !== 0 ?
            fetchedMessages.map((msg: Message, index) => (
              <ChatBubble key={index} className={`${msg.receiver === userId ? 'self-end' : 'self-start'}`} {...msg} />
            ))
            :
            ''
        }
        {messages.map((msg: Message, index) => (
          <ChatBubble key={index} className={`${msg.receiver === userId ? 'self-end' : 'self-start'}`} {...msg} />
        ))}
      </div>

      <div className='fixed bottom-16 z-40 flex flex-col gap-2 items-center p-2 w-full max-w-[700px]'>
        {
          photo ?
          <Image src={photo} alt="" width={300} height={300} className="rounded-md"/>
          :
          ""
        }
        <section className='w-full flex items-center px-2 border border-[--border-bg] rounded-[5px] '>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <FaPlus className='rounded-full text-[--secondary-text] size-5' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 h-24 rounded-[5px] bg-[--secondary-bg] font-light tracking-wide p-2">
              <DropdownMenuSeparator />
              <div {...getRootProps()} className='w-full'>
                <input {...getInputProps()} accept="image/*" />
                <div className='flex gap-2 items-center hover:opacity-80 cursor-pointer'>
                  <IoImageSharp />
                  <p>Upload Image</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className='flex gap-2 items-center cursor-pointer'>
                <FaVideo />
                <p>Upload Video</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            type="text"
            className='w-full h-8 outline-none p-2 placeholder:text-xs text-sm font-light'
            placeholder='Send Message'
            value={message}
            onChange={(e) => handleMessage(e)}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                sendMessage();
              }
            }}
            ref={inputRef}
          />
        <button
          onClick={sendMessage}
          className='w-12 h-8 grid place-content-center hover:opacity-80'>
          <IoSendSharp className='text-[--secondary-text]' />
        </button>
        </section>
      </div>
    </section>
  );
}
