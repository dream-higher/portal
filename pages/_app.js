import { Toaster } from 'react-hot-toast'

import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

import '@styles/tailwind.css'
import '@styles/global.css'
import 'react-datepicker/dist/react-datepicker.css'

export default function App({ Component, pageProps }) {
	return (
		<UserProvider supabaseClient={supabaseClient}>
			<Component {...pageProps} />
			<Toaster />
		</UserProvider>
	)
}
