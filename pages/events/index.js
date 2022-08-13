import toast from 'react-hot-toast'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/outline'

import { withPageAuth, supabaseClient } from '@supabase/auth-helpers-nextjs'

import LayoutComponent from '@components/layout'

function AllEvents({ user }) {
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchEvents()
	}, [])

	async function fetchEvents() {
		const { data, error } = await supabaseClient.from('posts').select()
		setEvents(data)
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
	if (!events.length) return <p className='text-2xl'>No events.</p>
	return (
		<LayoutComponent
			pageTitle={'Events'}
			user={user}
			pageLinks={[{ title: 'Create event', href: '/events/create', icon: <PlusCircleIcon className={'w-6 h-6 inline'} /> }]}
		>
			<div className={'grid grid-cols-1'}>
				{events
					.sort((a, b) => b.id - a.id)
					.map((event, i) => (
						<Link key={event.id} href={`/events/${event.id}`} passHref>
							<div className='cursor-pointer'>
								<h2 className='text-xl font-semibold'>{event.title}</h2>
								<p className='mt-2 text-gray-500'>Author: {event.user_email}</p>
								{i < events.length - 1 && <hr className={'my-5'} />}
							</div>
						</Link>
					))}
			</div>
		</LayoutComponent>
	)
}

export default AllEvents

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
