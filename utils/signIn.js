export default async function signIn(supabaseClient) {
	const env = process.env.NODE_ENV || 'development'
	console.log(env)
	const redirectURL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL

	console.log(redirectURL)

	const { error } = await supabaseClient.auth.signIn(
		{ provider: 'google' },
		{
			redirectTo: redirectURL,
		}
	)
	if (error) console.log(error)
}
