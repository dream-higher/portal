import { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import toast from 'react-hot-toast'
import { PencilIcon, TrashIcon, ShareIcon, ArrowLeftIcon } from '@heroicons/react/outline'
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs'
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false })

import LayoutComponent from '@components/layout'
import Link from 'next/link'

export default function Post({ post, user }) {
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const [showShareLink, setShowShareLink] = useState(false)

	const router = useRouter()

	async function deletePost(id) {
		const loadingToast = toast.loading('Deleting...')

		await supabaseClient
			.from('posts')
			.delete()
			.match({ id })
			.then(() => {
				toast.dismiss(loadingToast)
				toast.success(`Post deleted.`)
				router.push(`/posts`)
			})
	}

	if (router.isFallback) {
		return <div>Loading...</div>
	}
	return (
		<LayoutComponent pageTitle={`Post ID ${post.id}`} user={user}>
			<h1 className='mt-4 text-5xl font-semibold tracking-wide'>{post.title}</h1>
			<p className='my-4 text-sm font-light'>by {post.user_email}</p>
			<div className={'flex gap-x-2'}>
				<Link href={`/posts`} passHref>
					<div className={'group outline-gray-400 outline px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer'}>
						<ArrowLeftIcon className={'w-6 h-6 group-hover:text-gray-400 cursor-pointer'} />
					</div>
				</Link>
				<Link href={`/posts/edit/${post.id}`} passHref>
					<div className={'group outline-yellow-500 outline px-3 py-2 rounded-xl hover:bg-yellow-100 cursor-pointer'}>
						<PencilIcon className={'w-6 h-6 group-hover:text-yellow-600 cursor-pointer'} />
					</div>
				</Link>
				<button className={'cursor-pointer'} onClick={() => setShowDeleteConfirmation(true)}>
					<div className={`group outline-red-500 outline px-3 py-2 rounded-xl hover:bg-red-100 ${showDeleteConfirmation ? 'bg-red-100' : ''}`}>
						<TrashIcon className={`w-6 h-6 ${showDeleteConfirmation ? 'text-red-600' : ''} group-hover:text-red-600 cursor-pointer`} />
					</div>
				</button>
				<button onClick={() => setShowShareLink(true)}>
					<div className={`group outline-green-500 outline px-3 py-2 rounded-xl hover:bg-green-100 ${showShareLink ? 'bg-green-100' : ''} cursor-pointer`}>
						<ShareIcon className={'w-6 h-6 group-hover:text-green-400'} />
					</div>
				</button>
			</div>
			{showDeleteConfirmation && (
				<div className={'bg-red-100 px-3 py-1 mt-3'}>
					Do you want to delete this post?{' '}
					<span className={'font-bold cursor-pointer hover:underline'} onClick={() => deletePost(post.id)}>
						Yes
					</span>
					, delete this.{' '}
					<span className={'font-bold cursor-pointer hover:underline'} onClick={() => setShowDeleteConfirmation(false)}>
						No
					</span>
					, cancel.
				</div>
			)}
			{showShareLink && (
				<div className={'relative bg-green-100 px-3 py-1 mt-3 h-10'}>
					<textarea className={'w-full bg-transparent border-none outline-none h-full absolute top-0 left-0 focus:outline-none'}>
						To do: create and display share link.
					</textarea>
				</div>
			)}
			<div className='mt-8'>
				<ReactMarkdown>{post.content}</ReactMarkdown>
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
