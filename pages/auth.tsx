import Input from '@/components/Input';
import React, { useCallback, useState } from 'react';
import axios from 'axios'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/router';

import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'

export default function Auth() {
  const router = useRouter()

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [varient, setVareint] = useState('login');

  const toggleVarient = useCallback(() => {
    setVareint((currentVarient) => (currentVarient === 'login' ? 'register' : 'login'));
  }, []);

    const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect:false,
        callbackUrl:"/"

      });

      router.push("/")
    } catch (error) {
        console.log(error);
    }
  }, [email, password,router]); 

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login()
    } catch (error) {
        console.log(error);
    }
  }, [email, name, password,login]);



  return (
    <div className="realtvie h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="mt-2 w-full self-center rounded-md bg-black bg-opacity-70 px-16 py-16 lg:w-2/5 lg:max-w-md">
            <h2 className="font-senibold mb-8 text-4xl text-white">{varient === 'login' ? 'Sign in' : 'Register'}</h2>

            <div className="flex flex-col gap-4">
              {varient === 'register' && (
                <Input label="Username" onChange={(e: any) => setName(e.target.value)} id="name" value={name} />
              )}
              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button onClick={varient === 'login' ? login : register} className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700">
              {varient === 'login' ? 'Login' : 'Sign up'}
            </button>
                <div className="flex flex-row items-start gap-4 mt-8 justify-center">
                  <div onClick={()=>signIn('google',{callbackUrl:'/'})}  className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                  <FcGoogle size={30} />
                  </div>
                  <div onClick={()=>signIn('github',{callbackUrl:'/'})} className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                  <FaGithub size={30} />
                  </div>
                </div>
            <p className="mt-12 text-neutral-500">
              {varient === 'login' ? ' First time using Netflix?' : 'Already have an account'}s
              <span onClick={toggleVarient} className="hover-underline ml-1 cursor-pointer text-white">
                {varient === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
