import type { NextApiRequest, NextApiResponse } from 'next';
import DBClient from '@/utils/database';
const prisma = DBClient.getInstance().prisma;


const save = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed'});
  }
  const postData = JSON.parse(req.body);
  const savePost = await prisma.post.create({
    data: postData
  })

  res.json(savePost)
}
export default save