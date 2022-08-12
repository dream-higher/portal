import { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { BanIcon } from '@heroicons/react/outline'

import toast from 'react-hot-toast'
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

import 'easymde/dist/easymde.min.css'

import LayoutComponent from '@components/layout'
import Link from 'next/link'

export default function EditPost({ post, user }) {
	const [updatedPost, setUpdatedPost] = useState(post)

	const router = useRouter()

	function onChange(e) {
		setUpdatedPost(() => ({ ...post, [e.target.name]: e.target.value }))
	}

	/* Asynchronous save to Supabase */
	const { title, content } = updatedPost
	async function updateCurrentPost(id) {
		if (!title || !content) {
			toast.error('Fill out title and content.')
			return
		}
		const loadingToast = toast.loading('Saving...')

		await supabaseClient
			.from('posts')
			.update([{ title, content }])
			.match({ id })
			.then(() => {
				toast.dismiss(loadingToast)
				toast.success(`Post updated.`)
				router.push(`/posts/${post.id}`)
			})
	}

	if (router.isFallback) {
		return <div>Loading...</div>
	}
	return (
		<LayoutComponent pageTitle={`Edit post ${updatedPost.id}`} user={user}>
			{/* <h1 className='mt-4 text-5xl font-semibold tracking-wide'>{post.title}</h1> */}
			<input
				onChange={onChange}
				name='title'
				placeholder='Title'
				value={updatedPost.title}
				className='w-full pb-2 my-4 text-5xl font-semibold tracking-wide text-gray-800 placeholder-gray-500 border-b focus:outline-none y-2'
			/>
			<p className='my-4 text-sm font-light'>by {post.user_email}</p>
			<div className={'flex gap-x-4'}>
				<div className={'flex gap-x-2'}>
					<Link href={`/posts/edit/${post.id}`} passHref>
						<div
							className={'flex gap-x-2 cursor-pointer group items-center outline-green-500 outline px-3 py-2 rounded-xl hover:bg-green-100'}
							onClick={() => updateCurrentPost(post.id)}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='100pt'
								height='100pt'
								viewBox='0 0 100 100'
								className={'w-5 h-5 hover:text-yellow-600 cursor-pointer fill-current group-hover:text-green-500'}
							>
								<path d='M61.914 20.234h5.957a1.988 1.988 0 001.992-1.992V2.382A1.988 1.988 0 0067.871.392h-5.957a1.988 1.988 0 00-1.992 1.992v15.879c0 1.094.879 1.973 1.992 1.973z'></path>
								<path d='M99.023 14.688L85.312.977a1.997 1.997 0 00-1.406-.586h-4.14v24.805a4.968 4.968 0 01-4.962 4.961H25.195a4.968 4.968 0 01-4.96-4.96V.39h-9.923a9.91 9.91 0 00-9.921 9.922v79.375a9.91 9.91 0 009.921 9.922h79.376a9.91 9.91 0 009.921-9.922V16.094c0-.527-.214-1.035-.586-1.406zM50 84.727c-10.957 0-19.844-8.887-19.844-19.844S39.043 45.039 50 45.039s19.844 8.887 19.844 19.844S60.957 84.727 50 84.727z'></path>
							</svg>
							<span className={'group-hover:text-green-500'}>Save</span>
						</div>
					</Link>
				</div>
				<div className={'flex gap-x-2'}>
					<Link href={`/posts/${post.id}`} passHref>
						<div
							className={'flex gap-x-2 cursor-pointer group outline-red-500 outline px-3 py-2 rounded-xl hover:bg-red-100'}
							onClick={() => updateCurrentPost(post.id)}
						>
							<BanIcon
								className={'flex gap-x-2 cursor-pointer group w-6 h-6 items-center group-hover:text-red-500'}
								onClick={() => updateCurrentPost(post.id)}
							/>
							<span className={'group-hover:text-red-500'}>Cancel</span>
						</div>
					</Link>
				</div>
			</div>
			<div className='mt-8'>
				<SimpleMDE value={post.content} onChange={(value) => setUpdatedPost({ ...post, content: value })} />
			</div>
		</LayoutComponent>
	)
}

export const getServerSideProps = withPageAuth({
	redirectTo: '/',
	async getServerSideProps({ params }) {
		const { id } = params
		const { data } = await supabaseClient.from('posts').select().filter('id', 'eq', id).single()
		return {
			props: {
				post: data,
			},
		}
	},
})
