import { Inter } from '@next/font/google';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import BillBoard from '@/components/Billboard';
import InfoModal from '@/components/InfoModal';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useFavorites from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';
import useMovieList from '@/hooks/useMovieList';

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
   const {data : favorites=[]} = useFavorites();
   const {isOpen, closeModal } = useInfoModal();

  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal} />
    <Navbar />
    <BillBoard />
    <div className='pb-40'>
    <MovieList title="Trending Now" data={movies}/>
    <MovieList title="My List" data={favorites}/>

    </div>
    </>
  )
}
