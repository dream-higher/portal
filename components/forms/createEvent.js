import { useState } from 'react'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'

const DatePickerComponent = ({ showTimeSelect, dateFormat, showTimeSelectOnly }) => {
	const [startDate, setStartDate] = useState(new Date())
	const DateTimeInput = ({ date, value, onChange }) => <input value={value} onChange={(e) => onChange(e.target.value)} />

	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => setStartDate(date)}
			showTimeSelect={showTimeSelect}
			showTimeSelectOnly={showTimeSelectOnly}
			timeFormat='p'
			timeIntervals={15}
			month
			dateFormat={dateFormat || 'Pp'}
			customTimeInput={<DateTimeInput />}
		/>
	)
}

export default function EventForm({ onChangeHandler }) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => console.log(data)

	const watchMultipleDays = watch('multipleDays', false)

	return (
		<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
			<div className='py-3 bg-transparent sm:rounded-lg'>
				<div className='md:grid md:grid-cols-3 md:gap-6'>
					<div className='md:col-span-1'>
						<h3 className='text-lg font-medium leading-6 text-gray-900'>Calendar</h3>
						<p className='mt-1 text-sm text-gray-500'>This is the information that will be synchronised with the Google Calendar API.</p>
					</div>

					<div className='mt-5 space-y-6 md:mt-0 md:col-span-2'>
						<div className='grid grid-cols-3 gap-6'>
							<div className='col-span-3 sm:col-span-3'>
								<label htmlFor='company-website' className='block text-sm font-medium text-gray-700'>
									Event title
								</label>
								<div className='flex mt-1'>
									{/* <span className='inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50'>http://</span> */}
									<input
										name='title'
										{...register('title', { required: true })}
										className='w-full px-3 py-2 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none'
										placeholder={'Title'}
									/>
								</div>
								{errors.title && <p className={'text-red-500 pt-2'}>Please enter a valid title for this event.</p>}
							</div>
						</div>

						<div>
							<label htmlFor='about' className='block text-sm font-medium text-gray-700'>
								Description / notes
							</label>
							<div className='mt-1'>
								<textarea
									id='about'
									name='about'
									{...register('description')}
									rows={5}
									className='block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
									placeholder='What is this event about?'
									defaultValue={''}
								/>
							</div>
						</div>

						<div className='mt-8 space-y-4'>
							<div className='flex items-start'>
								<div className='flex items-center h-5'>
									<input
										id='fullDay'
										name='fullDay'
										{...register('fullDay')}
										type='checkbox'
										className='w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500'
									/>
								</div>
								<div className='ml-3 text-sm'>
									<label htmlFor='fullDay' className='font-medium text-gray-700'>
										Full day event
									</label>
									<p className='text-gray-500'>Save the event as a full day event.</p>
								</div>
							</div>
							<div className='flex items-start'>
								<div className='flex items-center h-5'>
									<input
										id='multipleDays'
										name='multipleDays'
										{...register('multipleDays')}
										type='checkbox'
										className='w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500'
									/>
								</div>
								<div className='ml-3 text-sm'>
									<label htmlFor='multipleDays' className='font-medium text-gray-700'>
										Multiple day event
									</label>
									<p className='text-gray-500'>Event does not start and end on the same day.</p>
								</div>
							</div>
						</div>

						{watchMultipleDays ? (
							<div className={'grid grid-cols-1 sm:grid-cols-2'}>
								<div>
									<label htmlFor='about' className='block text-sm font-medium text-gray-700'>
										From
									</label>
									<div className='mt-1'>
										<DatePickerComponent showTimeSelect={true} />
									</div>
								</div>

								<div>
									<label htmlFor='about' className='block text-sm font-medium text-gray-700'>
										To
									</label>
									<div className='mt-1'>
										<DatePickerComponent showTimeSelect={true} />
									</div>
								</div>
							</div>
						) : (
							<div className={'grid grid-cols-1 sm:grid-cols-3'}>
								<div>
									<label htmlFor='about' className='block text-sm font-medium text-gray-700'>
										Date
									</label>
									<div className='mt-1'>
										<DatePickerComponent showTimeSelect={false} />
									</div>
								</div>
								<div>
									<label htmlFor='about' className='block text-sm font-medium text-gray-700'>
										Start time
									</label>
									<div className='mt-1'>
										<DatePickerComponent showTimeSelect={true} dateFormat={'p'} showTimeSelectOnly />
									</div>
								</div>
								<div>
									<label htmlFor='about' className='block text-sm font-medium text-gray-700'>
										End time
									</label>
									<div className='mt-1'>
										<DatePickerComponent showTimeSelect={true} dateFormat={'p'} showTimeSelectOnly />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='py-8 bg-white border-t-2'>
				<div className='md:grid md:grid-cols-3 md:gap-6'>
					<div className='md:col-span-1'>
						<h3 className='text-lg font-medium leading-6 text-gray-900'>People</h3>
						<p className='mt-1 text-sm text-gray-500'>Add coaches and participants to this event.</p>
					</div>
					<div className='mt-5 md:mt-0 md:col-span-2'>
						<div className='grid grid-cols-6 gap-6'>
							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
									First name
								</label>
								<input
									type='text'
									name='first-name'
									id='first-name'
									autoComplete='given-name'
									className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
								/>
							</div>

							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
									Last name
								</label>
								<input
									type='text'
									name='last-name'
									id='last-name'
									autoComplete='family-name'
									className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
								/>
							</div>

							<div className='col-span-6 sm:col-span-4'>
								<label htmlFor='email-address' className='block text-sm font-medium text-gray-700'>
									Email address
								</label>
								<input
									type='text'
									name='email-address'
									id='email-address'
									autoComplete='email'
									className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
								/>
							</div>

							<div className='col-span-6 sm:col-span-3'>
								<label htmlFor='country' className='block text-sm font-medium text-gray-700'>
									Country
								</label>
								<select
									id='country'
									name='country'
									autoComplete='country-name'
									className='block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
								>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>

							<div className='col-span-6'>
								<label htmlFor='street-address' className='block text-sm font-medium text-gray-700'>
									Street address
								</label>
								<input
									type='text'
									name='street-address'
									id='street-address'
									autoComplete='street-address'
									className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
								/>
							</div>

							<div className='col-span-6 sm:col-span-6 lg:col-span-2'>
								<label htmlFor='city' className='block text-sm font-medium text-gray-700'>
									City
								</label>
								<input
									type='text'
									name='city'
									id='city'
									autoComplete='address-level2'
									className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
								/>
							</div>

							<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
								<label htmlFor='region' className='block text-sm font-medium text-gray-700'>
									State / Province
								</label>
								<input
									type='text'
									name='region'
									id='region'
									autoComplete='address-level1'
									className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
								/>
							</div>

							<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
								<label htmlFor='postal-code' className='block text-sm font-medium text-gray-700'>
									ZIP / Postal code
								</label>
								<input
									type='text'
									name='postal-code'
									id='postal-code'
									autoComplete='postal-code'
									className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='py-8 bg-white border-t-2 sm:rounded-lg'>
				<div className='md:grid md:grid-cols-3 md:gap-6'>
					<div className='md:col-span-1'>
						<h3 className='text-lg font-medium leading-6 text-gray-900'>Additional information</h3>
						<p className='mt-1 text-sm text-gray-500'>Categories, notes, etc.</p>
					</div>
					<div className='mt-5 space-y-6 md:mt-0 md:col-span-2'>
						<fieldset>
							<legend className='sr-only'>By Email</legend>
							<div className='text-base font-medium text-gray-900' aria-hidden='true'>
								By Email
							</div>
							<div className='mt-4 space-y-4'>
								<div className='flex items-start'>
									<div className='flex items-center h-5'>
										<input id='comments' name='comments' type='checkbox' className='w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500' />
									</div>
									<div className='ml-3 text-sm'>
										<label htmlFor='comments' className='font-medium text-gray-700'>
											Comments
										</label>
										<p className='text-gray-500'>Get notified when someones posts a comment on a posting.</p>
									</div>
								</div>
								<div className='flex items-start'>
									<div className='flex items-center h-5'>
										<input
											id='candidates'
											name='candidates'
											type='checkbox'
											className='w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500'
										/>
									</div>
									<div className='ml-3 text-sm'>
										<label htmlFor='candidates' className='font-medium text-gray-700'>
											Candidates
										</label>
										<p className='text-gray-500'>Get notified when a candidate applies for a job.</p>
									</div>
								</div>
								<div className='flex items-start'>
									<div className='flex items-center h-5'>
										<input id='offers' name='offers' type='checkbox' className='w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500' />
									</div>
									<div className='ml-3 text-sm'>
										<label htmlFor='offers' className='font-medium text-gray-700'>
											Offers
										</label>
										<p className='text-gray-500'>Get notified when a candidate accepts or rejects an offer.</p>
									</div>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<legend className='text-base font-medium text-gray-900 contents'>Push Notifications</legend>
							<p className='text-sm text-gray-500'>These are delivered via SMS to your mobile phone.</p>
							<div className='mt-4 space-y-4'>
								<div className='flex items-center'>
									<input
										id='push-everything'
										name='push-notifications'
										type='radio'
										className='w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500'
									/>
									<label htmlFor='push-everything' className='block ml-3 text-sm font-medium text-gray-700'>
										Everything
									</label>
								</div>
								<div className='flex items-center'>
									<input id='push-email' name='push-notifications' type='radio' className='w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500' />
									<label htmlFor='push-email' className='block ml-3 text-sm font-medium text-gray-700'>
										Same as email
									</label>
								</div>
								<div className='flex items-center'>
									<input id='push-nothing' name='push-notifications' type='radio' className='w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500' />
									<label htmlFor='push-nothing' className='block ml-3 text-sm font-medium text-gray-700'>
										No push notifications
									</label>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>

			<div className='flex justify-end'>
				<button
					type='button'
					className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
				>
					Cancel
				</button>
				<button
					type='submit'
					className='inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
				>
					Save
				</button>
			</div>
		</form>
	)
}
