export default async function signIn(supabaseClient) {
	const env = process.env.NODE_ENV || 'development'
	console.log(env)
	const redirectURL = env === 'development' ? 'https://localhost:3000/dashboard' : 'https://dreamhigher.vercel.app/dashboard'

	console.log(redirectURL)

	const { error } = await supabaseClient.auth.signIn(
		{ provider: 'google' },
		{
			redirectTo: redirectURL,
		}
	)
	if (error) console.log(error)
}
