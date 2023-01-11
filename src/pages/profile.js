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
    <>
      <div>Welcome {session.user.name}</div>
      <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/'})}>Sign Out</button>
    </>
  )
}

export default Profile;
