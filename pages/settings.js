import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import LayoutComponent from '@components/layout'

export default function Settings({ user }) {
	return (
		<LayoutComponent pageTitle={'Settings'} user={user}>
			<div>Hello {user.email}</div>
		</LayoutComponent>
	)
}

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
