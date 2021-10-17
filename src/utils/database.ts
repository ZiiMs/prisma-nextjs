import { PrismaClient } from '@prisma/client';

class DBClient {
  public prisma: PrismaClient;
  private static instance: DBClient;
  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance = () => {
    return DBClient.instance || (this.instance = new DBClient());
  };
}

export default DBClient;
