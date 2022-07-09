import { useEffect } from 'react'
import { Auth } from '@supabase/ui'
import supabaseClient from '@utils/client'
import signIn from '@utils/signIn'

export default function Home() {
	const { user } = Auth.useUser()

	useEffect(() => {
		const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
			fetch('/api/auth', {
				method: 'POST',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				credentials: 'same-origin',
				body: JSON.stringify({ event, session }),
			}).then((res) => res.json())
		})

		return () => {
			authListener.unsubscribe()
		}
	}, [user])

	console.log(user)

	return (
		<div className={'flex items-center justify-center absolute top-0 left-0 w-full h-full'}>
			<Auth.UserContextProvider supabaseClient={supabaseClient}>
				<button className={'px-5 py-2 font-bold text-black hover:bg-green-500 bg-green-400'} onClick={() => signIn(supabaseClient)}>
					Log in
				</button>
			</Auth.UserContextProvider>
		</div>
	)
}
