import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

{
	/* 

Querying for data:

import { supabase } from '../path/to/api'

const { data, error } = await supabase
  .from('posts')
  .select()

*/
}

{
	/*

Creating new items in the database:

const { data, error } = await supabase
  .from('posts')
  .insert([
    {
      title: "Hello World",
      content: "My first post",
      user_id: "some-user-id",
      user_email: "myemail@gmail.com"
    }
  ])

*/
}

{
	/* 

Authentication – signing up:

const { user, session, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})
Authentication – signing in:

const { user, session, error } = await supabase.auth.signIn({
  email: 'example@email.com',
  password: 'example-password',
})

*/
}
