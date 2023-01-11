/**
 * This page showcase how to handle auth client-side
 */

import { useState, useEffect } from "react";
import { signOut, getSession, useSession } from "next-auth/react";

function Home() {

  let session = useSession(); // retrieve the session via global context 
  const [name, setName] = useState('');

  useEffect(() => {
    getSession() // fetch the session, equivalent to fetch('/api/auth/session')
      .then(res => {
        setName(res.user.name);
      })
  }, []);

  return (
    <>
      <div>Welcome {name}</div>
      <div>Welcome {session.data.user.name}</div>
      <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/'})}>Sign Out</button>
    </>
  )

}

Home.auth = true;

export default Home;
