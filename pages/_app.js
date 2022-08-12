import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

import '@styles/tailwind.css'
import '@styles/global.css'

export default function App({ Component, pageProps }) {
	return (
		<UserProvider supabaseClient={supabaseClient}>
			<Component {...pageProps} />
		</UserProvider>
	)
}
