import React from 'react';

// import useMovieList from '@/hooks/useMovieList';
import MovieCard from '@/components/MovieCard';

interface MovieListProps {
    data:Record<string, any>[],
    title:string
}

const MovieList:  React.FC<MovieListProps>= ({data,title})=> {


  return (
    <div className='px-4 md:px-12 mt-4 space-y-8'>
        <div>
            <p className='text-white text-md md:text-xl lg:text-2xl font-semibold'>{title}</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
            {
                data.map((movie)=>(
                    <MovieCard data={movie} key={movie.id} />
                ))
            }
        </div>
    </div>
  )
}


export default MovieList
