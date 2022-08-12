import { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

import { PencilIcon, TrashIcon, ShareIcon } from '@heroicons/react/outline'
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs'
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false })

import LayoutComponent from '@components/layout'
import Link from 'next/link'

export default function Post({ post, user }) {
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const [deleteConfirmed, setDeleteConfirmed] = useState(false)

	const router = useRouter()

	async function deletePost(id) {
		await supabaseClient
			.from('posts')
			.delete()
			.match({ id })
			.then(() => router.push(`/posts/all`))
	}

	if (router.isFallback) {
		return <div>Loading...</div>
	}
	return (
		<LayoutComponent pageTitle={`Post ID ${post.id}`} user={user}>
			<h1 className='mt-4 text-5xl font-semibold tracking-wide'>{post.title}</h1>
			<p className='my-4 text-sm font-light'>by {post.user_email}</p>
			<div className={'flex gap-x-2'}>
				<Link href={`/posts/edit/${post.id}`} passHref>
					<PencilIcon className={'w-6 h-6 hover:text-yellow-600 cursor-pointer'} />
				</Link>
				<button onClick={() => setShowDeleteConfirmation(true)}>
					<TrashIcon className={`w-6 h-6 ${showDeleteConfirmation ? 'text-red-600' : ''} hover:text-red-600 cursor-pointer`} />
				</button>
				<Link href={`/posts/share/${post.id}`} passHref>
					<ShareIcon className={'w-6 h-6 hover:text-green-400 cursor-pointer'} />
				</Link>
			</div>
			{showDeleteConfirmation && (
				<motion.div className={'bg-red-100 px-3 py-1 mt-3'}>
					Do you want to delete this post?{' '}
					<span className={'font-bold cursor-pointer hover:underline'} onClick={() => deletePost(post.id)}>
						Yes
					</span>
					, delete this.{' '}
					<span className={'font-bold cursor-pointer hover:underline'} onClick={() => setShowDeleteConfirmation(false)}>
						No
					</span>
					, cancel.
				</motion.div>
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
