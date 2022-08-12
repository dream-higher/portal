import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import LayoutComponent from '@components/layout'

export default function Team({ user }) {
	return (
		<LayoutComponent pageTitle={'Team'} user={user}>
			<div>Hello {user.email}</div>
		</LayoutComponent>
	)
}

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
