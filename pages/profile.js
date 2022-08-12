import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import LayoutComponent from '@components/layout'

export default function Profile({ user }) {
	return (
		<LayoutComponent pageTitle={'Your profile'} user={user}>
			<div>Hello {user.email}</div>
		</LayoutComponent>
	)
}

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
