import clientPromise from '@/lib/db'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const adminEmails = ['it22560926@my.sliit.lk'];

  
  callbacks: {
    session: ({session , token , user}) => {
      if(adminEmails.includes(session?.user?.email)){
        return session;
      
      }else{
        return false;
      }
      
    }
  }
}

export default NextAuth(authOptions);

export async function isAdminRequest(req,res) {
  const session = await getServerSession(req,res,authOptions);
  
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}
