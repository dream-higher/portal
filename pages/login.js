import { useRouter } from 'next/router'

import { Auth } from '@supabase/ui'
import { useUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

import LoginButton from '@components/google/login-button'

const LoginPage = () => {
	const { user, error } = useUser()

	const router = useRouter()

	// if (!user) {
	// 	return (
	// 		<div className={'w-full h-full absolute top-0 left-0 flex justify-center items-center'}>
	// 			<div>
	// 				{error && <p>{error.message}</p>}
	// 				<Auth
	// 					supabaseClient={supabaseClient}
	// 					onlyThirdPartyProviders
	// 					providers={['google']}
	// 					socialLayout='horizontal'
	// 					socialButtonSize={'xlarge'}
	// 					redirectTo={process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL}
	// 				/>
	// 			</div>
	// 		</div>
	// 	)
	// } else {
	// 	router.push(process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL)
	// 	return null
	// }
	return (
		<div className={'w-full h-full absolute top-0 left-0 flex justify-center items-center'}>
			<LoginButton />
		</div>
	)
}

export default LoginPage
