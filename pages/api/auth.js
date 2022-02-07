import supabaseClient from '../../utils/client'

export default function handler(req, res) {
	console.log(req.body)
	supabaseClient.auth.api.setAuthCookie(req, res)
}
