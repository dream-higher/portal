import { supabase } from '@/utils/client'

export default function handler(req, res) {
	supabase.auth.api.setAuthCookie(req, res)
}
