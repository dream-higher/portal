import toast from 'react-hot-toast'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { withPageAuth, supabaseClient } from '@supabase/auth-helpers-nextjs'

import LayoutComponent from '@components/layout'

function AllPosts({ user }) {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchPosts()
	}, [])
	async function fetchPosts() {
		const { data, error } = await supabaseClient.from('posts').select()
		setPosts(data)
		setLoading(false)
		const loadingToast = toast.loading('Loading...')
		toast.dismiss(loadingToast)
	}
	if (loading)
		return (
			<LayoutComponent pageTitle={'Please wait...'} user={user}>
				<p>Loading data</p>
			</LayoutComponent>
		)
	if (!posts.length) return <p className='text-2xl'>No posts.</p>
	return (
		<LayoutComponent pageTitle={'Posts'} user={user}>
			<div className={'grid grid-cols-1'}>
				{posts
					.sort((a, b) => b.id - a.id)
					.map((post, i) => (
						<Link key={post.id} href={`/posts/${post.id}`} passHref>
							<div className='cursor-pointer'>
								<h2 className='text-xl font-semibold'>{post.title}</h2>
								<p className='mt-2 text-gray-500'>Author: {post.user_email}</p>
								{i < posts.length - 1 && <hr className={'my-5'} />}
							</div>
						</Link>
					))}
			</div>
		</LayoutComponent>
	)
}

export default AllPosts

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
