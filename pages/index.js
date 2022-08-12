import { useEffect, useState } from 'react'

import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import LayoutComponent from '@components/layout'

export default function Dashboard({ user }) {
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

	return (
		<LayoutComponent pageTitle={'Dashboard'} user={user}>
			<div>Hello {user.email}</div>
		</LayoutComponent>
	)
}

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
