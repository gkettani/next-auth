import { signIn, getCsrfToken, getProviders, getSession } from 'next-auth/react';

export default function SignIn({ csrfToken, providers, error }) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#F7F4ED]">
      {error && <span className='borde my-5 bg-white p-5 rounded-md'>{error}</span>}
      <div className="flex flex-col items-center border p-10 gap-6 max-w-md w-[400px] rounded-sm bg-white">
        <h1 className="text-4xl font-bold">Sign in</h1> 
        <form 
          className='flex flex-col w-full'
          method="post" 
          action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input name="callbackUrl" type="hidden" defaultValue="http://localhost:3000/profile" />
          <label className="text-sm font-thin">
            Email
          </label>
          <input className="border h-8 rounded-md bg-slate-100" type="email" name="email" />
          <button 
            className='border px-3 py-1 shadow rounded-md my-4
             border-yellow-500 bg-yellow-100 text-yellow-600 font-semibold hover:bg-yellow-400 hover:text-white'
            type="submit" 
            >Sign in with Email</button>
        </form>

        <hr className='w-full' />

        <form
          className="flex flex-col w-full" 
          method="post" 
          action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input name="callbackUrl" type="hidden" defaultValue="http://localhost:3000/profile" />
          <label className="text-sm font-thin">
            Username
          </label>
          <input className="border h-8 rounded-md bg-slate-100" type="text" name="username" />
          <label className="text-sm font-thin mt-2">
            Password
          </label>
          <input className="border h-8 rounded-md bg-slate-100" type="password" name="password" />
          <button 
            className='border px-3 py-1 shadow rounded-md my-4
             border-yellow-500 bg-yellow-100 text-yellow-600 font-semibold hover:bg-yellow-400 hover:text-white'
            type="submit" 
            >Sign in with credentials</button>
          <a className="underline text-sm text-gray-400" href="/auth/forgot-password">Forgot password?</a>
        </form>

        <hr className='w-full' />
        <button
          className='border px-3 py-1 shadow rounded-md w-full hover:bg-gray-100' 
          onClick={() => signIn('discord', { callbackUrl: "http://localhost:3000/profile" })}>
          Sign in with Discord
        </button>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      }
    }
  }
  let error = null;
  if (context.req.url.includes('error=')) {
    error = context.req.url.split('error=')[1].split('&')[0];
  }

  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken,
      error
    },
  }
}