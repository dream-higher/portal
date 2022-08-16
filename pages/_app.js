import { Toaster } from 'react-hot-toast'

import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

import { SessionProvider } from 'next-auth/react'

import '@styles/tailwind.css'
import '@styles/global.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<UserProvider supabaseClient={supabaseClient}>
				<Component {...pageProps} />
				<Toaster />
			</UserProvider>
		</SessionProvider>
	)
}
