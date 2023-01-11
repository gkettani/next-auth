/**
 * This page showcase how to handle auth server-side
 */

import { signOut, getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

function Profile({ session }) {
  return (
    <div className="bg-[#F7F4ED] w-full h-screen">
      <div className="text-2xl w-fit m-auto py-10 font-semibold">Welcome {session.user.name}</div>
      <button 
        className="m-auto border block p-2 rounded-md bg-white shadow-md hover:bg-slate-100" 
        onClick={() => signOut({ callbackUrl: 'http://localhost:3000/'})}>
          Log out
        </button>
    </div>
  )
}

export default Profile;
