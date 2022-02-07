import '@/styles/globals.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/utils/client'
import { useRouter } from 'next/router'

function PortalApp({ Component, pageProps }) {
	const router = useRouter()
	const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			handleAuthChange(event, session)
			if (event === 'SIGNED_IN') {
				setAuthenticatedState('authenticated')
				router.push('/profile')
			}
			if (event === 'SIGNED_OUT') {
				setAuthenticatedState('not-authenticated')
			}
		})
		checkUser()
		return () => {
			authListener.unsubscribe()
		}
	}, [])
	async function checkUser() {
		const user = await supabase.auth.user()
		if (user) {
			setAuthenticatedState('authenticated')
		}
	}
	async function handleAuthChange(event, session) {
		await fetch('/api/auth', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			credentials: 'same-origin',
			body: JSON.stringify({ event, session }),
		})
	}
	return (
		<div>
			<nav>
				<Link href='/'>
					<a>Home</a>
				</Link>
				<Link href='/profile'>
					<a>Profile</a>
				</Link>
				{authenticatedState === 'not-authenticated' && (
					<Link href='/sign-in'>
						<a>Sign In</a>
					</Link>
				)}
				<Link href='/protected'>
					<a>Protected</a>
				</Link>
			</nav>
			<Component {...pageProps} />
		</div>
	)
}

export default PortalApp
