import supabaseClient from '../utils/client'
import Image from 'next/image'

export default function Protected({ user }) {
	return (
		<>
			<h1>Hello, {user.user_metadata.full_name}!</h1>
			<p> Your email : {user.email}</p>
			<Image className={'rounded-full'} src={user.user_metadata.avatar_url} width='200' height='200' alt={'User avatar'} />
		</>
	)
}
export async function getServerSideProps({ req }) {
	const { user } = await supabaseClient.auth.api.getUserByCookie(req)
	if (!user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return { props: { user } }
}
