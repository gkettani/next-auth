import { signIn, getCsrfToken, getProviders } from 'next-auth/react';

export default function SignIn({ csrfToken, providers }) {
  return (
    <div className="flex flex-col items-center m-auto mt-20 border p-10 gap-6 max-w-md">
      <h1 className="text-2xl font-bold">Sign in</h1> 
      <form 
        className='flex flex-col w-full gap-3'
        method="post" 
        action="/api/auth/signin/email">
        <h2>Sign in with magic link</h2>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <input name="callbackUrl" type="hidden" defaultValue="http://localhost:3000/profile" />
        <label>
          Email address
        </label>
        <input className='border' type="email" name="email" />
        <button className='border px-3 py-1 shadow rounded-md' 
          type="submit" 
          >Sign in</button>
      </form>
      <hr className='w-full' />

      <form
        className="flex flex-col w-full gap-3" 
        method="post" 
        action="/api/auth/callback/credentials">
        <h2>Sign in with credentials</h2>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <input name="callbackUrl" type="hidden" defaultValue="http://localhost:3000/profile" />
        <label>
          Username
        </label>
        <input className="border" type="text" name="username" />
        <label>
          Password
        </label>
        <input className="border" type="password" name="password" />
        <button className='border px-3 py-1 shadow rounded-md'
          type="submit" 
          >Sign in</button>
      </form>

      <button
        className='border px-3 py-1 shadow rounded-md w-full' 
        onClick={() => signIn('discord', { callbackUrl: "http://localhost:3000/profile" })}>
        Sign in with Discord
      </button>
    </div>
  )
}


export async function getServerSideProps(context) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken
    },
  }
}