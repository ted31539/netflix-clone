import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method !== "GET") return res.status(405).end();

    try {
       const {currenUser} = await serverAuth(req);

       return res.status(200).json(currenUser);
       
      } catch (error) {
          console.log(error);
      }
}