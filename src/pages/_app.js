import '../styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react';


export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}


function Auth({ children }){
  const { status } = useSession({ required: true })
 
  // when `required: true` is passed,
  // `status` can only be "loading" or "authenticated"
  if (status === 'loading') {
    return <div>Loading...</div>
  }
 
  return children
}
