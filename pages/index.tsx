import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { getSession,signOut } from 'next-auth/react';
import { NextPageContext } from 'next'

import useMovieList from '@/hooks/useMovieList';
import useCurrentUser from '@/hooks/useCurrentUser';
import Navbar from '@/components/Navbar';
import BillBoard from '@/components/Billboard'
import MovieList from '@/components/MovieList'

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
   const {data:movies=[]} = useMovieList();


  return (
    <>
    <Navbar />
    <BillBoard />
    <div className='pb-40'>
    <MovieList title="Trending Now" data={movies}/>

    </div>
    </>
  )
}
