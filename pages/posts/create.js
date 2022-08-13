import toast from 'react-hot-toast'

import { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { v4 as uuid } from 'uuid'
import { withPageAuth, supabaseClient } from '@supabase/auth-helpers-nextjs'

import LayoutComponent from '@components/layout'
import 'easymde/dist/easymde.min.css'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
const initialState = { title: '', content: '' }

function CreatePost({ user }) {
	const [post, setPost] = useState(initialState)
	const { title, content } = post

	const router = useRouter()

	function onChange(e) {
		setPost(() => ({ ...post, [e.target.name]: e.target.value }))
	}

	async function createNewPost() {
		if (!title || !content) {
			toast.error('Fill out title and content.')
			return
		}
		const id = uuid()
		post.id = id

		const loadingToast = toast.loading('Saving...')

		await supabaseClient
			.from('posts')
			.insert([{ title, content, user_id: user.id, user_email: user.email }])
			.single()
			.then((data) => {
				toast.dismiss(loadingToast)
				toast.success(`Post ${data.data.id} saved.`)
				router.push(`/posts/${data.data.id}`)
			})
	}

	return (
		<LayoutComponent pageTitle={'Create new post'} user={user}>
			<input
				onChange={onChange}
				name='title'
				placeholder='Title'
				value={post.title}
				className='w-full px-2 pb-2 my-4 text-lg font-bold text-gray-800 placeholder-gray-500 border-b-2 border-slate-200 focus:outline-none y-2'
			/>
			<SimpleMDE value={post.content} onChange={(value) => setPost({ ...post, content: value })} />
			<button type='button' className='px-8 py-2 mb-4 font-semibold text-white bg-green-600 rounded-lg' onClick={() => createNewPost()}>
				Create post
			</button>
		</LayoutComponent>
	)
}

export default CreatePost

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
