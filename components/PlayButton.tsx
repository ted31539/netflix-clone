import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Router from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { BsFillPlayFill } from "react-icons/bs";

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface PlayButtonProps {
    movieId:string
}

const PlayButton:React.FC<PlayButtonProps> = ({movieId})=> {
    const { mutate: mutateFavorites } = useFavorites();

    const { data: currentUser, mutate } = useCurrentUser();
  
    const isFavorite = useMemo(() => {
      const list = currentUser?.favoriteIds || [];
  
      return list.includes(movieId);
    }, [currentUser, movieId]);
  
    const toggleFavorites = useCallback(async () => {
      let response;
  
      if (isFavorite) 
        response = await axios.delete('/api/favorite', { data: { movieId } });
       else 
        response = await axios.post('/api/favorite', { movieId });
      
  
      const updatedFavoriteIds = response?.data?.favoriteIds;
  
      mutate({ 
        ...currentUser, 
        favoriteIds: updatedFavoriteIds,
      });
      mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? CheckIcon : PlusIcon;

    const handlePlay = ()=> Router.push(`/watch/${movieId}`)

  return (
    <button onClick={handlePlay} className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg  font-semibold flex flex-row items-center hover:bg-neutral-300 transition">
      <BsFillPlayFill size={25} className="mr-1" />
      Play
    </button>
  )
}


export default PlayButton
