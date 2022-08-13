import { useState } from 'react'
import { useRouter } from 'next/router'
import { withPageAuth, supabaseClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import { v4 as uuid } from 'uuid'
import LayoutComponent from '@components/layout'
import EventForm from '@components/forms/createEvent'

const initialState = {
	title: '',
	content: '',
	startDate: '',
	startTime: '',
	endDate: '',
	endTime: '',
	isFullDay: false,
	isMultipleDay: false,
	participants: [],
	coaches: [],
	location: [],
	categories: [],
}

function CreateEvent({ user }) {
	const [event, setEvent] = useState(initialState)
	const { title, content, startDate, startTime, endDate, endTime, isFullDay, isMultipleDay, participants, coaches, location, categories } = event

	const router = useRouter()

	function onChange(e) {
		setEvent(() => ({ ...event, [e.target.name]: e.target.value }))
	}

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

	return (
		<LayoutComponent pageTitle={'Create new event'} user={user}>
      <EventForm />
			<button type='button' className='px-8 py-2 mb-4 font-semibold text-white bg-green-600 rounded-lg' onClick={() => createNewEvent()}>
				Create event
			</button>
		</LayoutComponent>
	)
}

export default CreateEvent

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })
