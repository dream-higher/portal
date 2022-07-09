import { useRouter } from 'next/router'
import { Auth } from '@supabase/ui'
import supabaseClient from '@utils/client'
// import { useEffect } from 'react'
// import signIn from '@utils/signIn'

const Container = (props) => {
	const router = useRouter()

	const { user } = Auth.useUser()
	if (user)
		return (
			<>
				<p>Signed in: {user.email}</p>
				<button block onClick={() => props.supabaseClient.auth.signOut()}>
					Sign out
				</button>
			</>
		)
	return props.children
}

export default function Home() {
	return (
		<div className={'absolute top-0 left-0 w-full h-full flex items-center justify-center'}>
			<div className={'w-full h-full max-w-xs flex items-center justify-center flex-col text-center'}>
				<Auth.UserContextProvider supabaseClient={supabaseClient}>
					<Container supabaseClient={supabaseClient}>
						<Auth onlyThirdPartyProviders providers={['google']} supabaseClient={supabaseClient} redirectTo={'http://localhost:3000/dashboard'} />
					</Container>
				</Auth.UserContextProvider>
			</div>
		</div>
	)
}
