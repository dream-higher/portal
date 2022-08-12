import Link from 'next/link'

import { Auth } from '@supabase/ui'
import { useUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

const LoginPage = () => {
	const { user, error } = useUser()
	const [data, setData] = useState()

	useEffect(() => {
		async function loadData() {
			const { data } = await supabaseClient.from('posts').select('*')
			setData(data)
			console.log(data)
		}
		// Only run query once user is logged in.
		if (user) loadData()
	}, [user])

	if (!user)
		return (
			<div className={'w-full h-full absolute top-0 left-0 flex justify-center items-center'}>
				<div>
					{error && <p>{error.message}</p>}
					<Auth
						supabaseClient={supabaseClient}
						onlyThirdPartyProviders
						providers={['google']}
						socialLayout='horizontal'
						socialButtonSize={'xlarge'}
						redirectTo={process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL}
					/>
				</div>
			</div>
		)

	return (
		<div className={'w-full h-full absolute top-0 left-0 flex justify-center items-center'}>
			<div className={'flex flex-col gap-3 justify-center items-center'}>
				<Link href={'/'} passHref>
					<button className={'bg-slate-50 rounded-full px-5 py-3 hover:shadow-lg'}>Go to dashboard</button>
				</Link>
				<button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
			</div>
		</div>
	)
}

export default LoginPage
