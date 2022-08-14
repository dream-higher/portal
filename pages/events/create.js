import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { withPageAuth, supabaseClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import { v4 as uuid } from 'uuid'
import LayoutComponent from '@components/layout'
import EventForm from '@components/forms/createEvent'

const initialState = {
	title: '',
	description: '',
	startDate: '',
	startTime: '',
	endDate: '',
	endTime: '',
	email: '',
	participants: [],
	mainCoachId: '',
	additionalCoaches: [],
	location: [],
	categories: [],
	street: '',
	city: '',
	state: '',
	zip: '',
}

// Todo: Fetch all COACHES from Supabase DB first
const allCoaches = [
	{
		key: 0,
		value: 'John Doe',
	},
	{
		key: 1,
		value: 'Jane Doe',
	},
	{
		key: 2,
		value: 'Mary Phillips',
	},
	{
		key: 3,
		value: 'Robert',
	},
	{
		key: 4,
		value: 'Karius',
	},
]

// Todo: Fetch all MEMBERS from Supabase DB first
const allMembers = [
	{
		key: 0,
		value: 'John Doe',
	},
	{
		key: 1,
		value: 'Jane Doe',
	},
	{
		key: 2,
		value: 'Mary Phillips',
	},
	{
		key: 3,
		value: 'Robert',
	},
	{
		key: 4,
		value: 'Karius',
	},
]

function CreateEvent({ user }) {
	const [event, setEvent] = useState(initialState)
	const {
		title,
		content,
		startDate,
		startTime,
		endDate,
		endTime,
		isFullDay,
		isMultipleDay,
		participants,
		additionalCoaches,
		location,
		categories,
		email,
		street,
	} = event

	const router = useRouter()

	function onChange(data) {
		setEvent(() => ({ ...event, ...data }))
	}

	useEffect(() => {
		console.group('Event logging')
		console.table(event)
		console.groupEnd()
	}, [event])

	async function createNewEvent() {
		if (!title || !content) {
			toast.error('Fill out title and content.')
			return
		}
		if (!startDate && !endDate && isMultipleDay) {
			toast.error('Fill out start and end date.')
			return
		}
		if (startDate && !startTime && !isFullDay) {
			toast.error('Add start time.')
			return
		}
		if (endDate && !endTime && !isFullDay) {
			toast.error('Add end time.')
			return
		}
		if (!location) {
			toast.error('Add a location.')
			return
		}

		const uid = uuid()
		event.id = uid

		const googleToast = toast.loading('Saving to Google Calendar.')

		// To do: Save / sync event with Google Calendar API
		toast.dismiss(googleToast)

		// Once done, save / sync event to Supabase:
		const supabaseToast = toast.loading('Saving to database.')
		await supabaseClient
			.from('events')
			.insert([
				{
					title,
					content,
					startDate,
					startTime,
					endDate,
					endTime,
					isFullDay,
					isMultipleDay,
					participants,
					coaches,
					location,
					categories,
					user_id: user.id,
					user_email: user.email,
				},
			])
			.single()
			.then((data) => {
				toast.dismiss(supabaseToast)
				toast.success(`Event ${data.data.id} saved.`)
				router.push(`/posts/${data.data.id}`)
			})
	}

	let leftoverCoaches = allCoaches.filter((o1) => !additionalCoaches.some((o2) => o1.key === o2.item.key))
	let leftoverMembers = allMembers.filter((o1) => !participants.some((o2) => o1.key === o2.item.key))

	return (
		<LayoutComponent pageTitle={'Create new event'} user={user}>
			<EventForm onChangeHandler={onChange} coaches={leftoverCoaches} members={leftoverMembers} />
			<div className={'flex justify-center mt-3'}>
				<button type='button' className='px-8 py-2 mb-4 font-semibold text-white bg-green-600 rounded-lg' onClick={() => createNewEvent()}>
					Create event
				</button>
			</div>
		</LayoutComponent>
	)
}

export default CreateEvent

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
