import type { NextApiRequest, NextApiResponse } from 'next';
import DBClient from '@/utils/database';
const prisma = DBClient.getInstance().prisma;

const save = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const accountData = JSON.parse(req.body);
  const saveAccount = await prisma.author.findFirst({
    where: {
      email: accountData.email,
      name: accountData.name
    }
  });
  console.log(saveAccount);
  if (saveAccount === null) {
    res.json({ error: "Error: account not found" });
  } else {
    res.json(saveAccount);
  }
};
export default save;
