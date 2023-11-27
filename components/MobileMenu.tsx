import React from 'react'

interface MobileMenuProps {
    visible?:boolean
}

 const  MobileMenu:React.FC<MobileMenuProps> = ({visible})=> {
   
  return visible ?  (
    <div className='bg-black w-56 absolute top-8 py-5 left-0 flex-col border-2 border-gray-800 flex'>
        <div className='flex flex-col gap-4'>
            <div className='px-3 text-center text-white hover:underline'>Home</div>
            <div className='px-3 text-center text-white hover:underline'>Series</div>
            <div className='px-3 text-center text-white hover:underline'>Films</div>
            <div className='px-3 text-center text-white hover:underline'>New & Popular</div>
            <div className='px-3 text-center text-white hover:underline'>My List</div>
            <div className='px-3 text-center text-white hover:underline'>Browse by languages</div>
        </div>
    </div> 
  ) : <></>
}


export default MobileMenu