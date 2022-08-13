import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import 'easymde/dist/easymde.min.css'

export default function EventForm({ onChangeHandler }) {
	return (
		<form className='space-y-6' action='#' method='POST'>
			<div className='py-3 bg-transparent sm:rounded-lg'>
				<div className='md:grid md:grid-cols-3 md:gap-6'>
					<div className='md:col-span-1'>
						<h3 className='text-lg font-medium leading-6 text-gray-900'>Calendar</h3>
						<p className='mt-1 text-sm text-gray-500'>This is the information that will be synchronised with the Google Calendar API.</p>
					</div>
					<div className='mt-5 space-y-6 md:mt-0 md:col-span-2'>
						<div className='grid grid-cols-3 gap-6'>
							<div className='col-span-3 sm:col-span-2'>
								<label htmlFor='company-website' className='block text-sm font-medium text-gray-700'>
									Title
								</label>
								<div className='flex mt-1 rounded-md shadow-sm'>
									{/* <span className='inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50'>http://</span> */}
									<input
										onChange={onChangeHandler}
										name='title'
										// placeholder='Title'
										// value={event.title}
										className='w-full py-2 text-xl font-bold border-b-2 focus:outline-none'
									/>
								</div>
							</div>
						</div>

						<div>
							<label htmlFor='about' className='block text-sm font-medium text-gray-700'>
								Description / notes
							</label>
							<div className='mt-1'>
								<SimpleMDE
									// value={event.content}
									onChange={(value) => setEvent({ ...event, content: value })}
								/>
							</div>
						</div>

						{/* <div>
							<label className='block text-sm font-medium text-gray-700'>Photo</label>
							<div className='flex items-center mt-1 space-x-5'>
								<span className='inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full'>
									<svg className='w-full h-full text-gray-300' fill='currentColor' viewBox='0 0 24 24'>
										<path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
									</svg>
								</span>
								<button
									type='button'
									className='px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
								>
									Change
								</button>
							</div>
						</div> */}

						{/* <div>
							<label className='block text-sm font-medium text-gray-700'>Cover photo</label>
							<div className='flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md'>
								<div className='space-y-1 text-center'>
									<svg className='w-12 h-12 mx-auto text-gray-400' stroke='currentColor' fill='none' viewBox='0 0 48 48' aria-hidden='true'>
										<path
											d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
											strokeWidth={2}
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
									<div className='flex text-sm text-gray-600'>
										<label
											htmlFor='file-upload'
											className='relative font-medium text-yellow-600 bg-white rounded-md cursor-pointer hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500'
										>
											<span>Upload a file</span>
											<input id='file-upload' name='file-upload' type='file' className='sr-only' />
										</label>
										<p className='pl-1'>or drag and drop</p>
									</div>
									<p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
								</div>
							</div>
						</div> */}
            
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
