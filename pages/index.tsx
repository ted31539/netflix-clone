import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { getSession,signOut } from 'next-auth/react';
import { NextPageContext } from 'next'

import useCurrentUser from '@/hooks/useCurrentUser';

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}


export default function Home() {
  const {data:user} = useCurrentUser()


  return (
    <>
<div className="text-red-500">hi</div>
<p className='text-white'>logged in as : {user?.email} </p>
<button onClick={()=>signOut()} className='w-full bg-white h-10'>logout</button>
    </>
  )
}
