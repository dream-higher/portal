/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

// const user = {
// 	name: 'Tom Cook',
// 	email: 'tom@example.com',
// 	imageUrl:
// 		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }

const navigation = [
	{ name: 'Dashboard', href: '/', current: true },
	{ name: 'Calendar', href: '/calendar', current: false },
	{ name: 'Events', href: '/events', current: false },
	{ name: 'Team', href: '/team', current: false },
	{ name: 'Posts', href: '/posts', current: false },
	// { name: 'Projects', href: '/projects', current: false },
	// { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
	{ name: 'Your Profile', href: '/profile' },
	{ name: 'Settings', href: '/settings' },
	{ name: 'Sign out', href: '/login', onClick: () => supabaseClient.auth.signOut() },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function LayoutComponent({ children, pageTitle, user, pageLinks }) {
	return (
		<>
			<div className='min-h-full'>
				<div className='pb-32 bg-gray-800'>
					<Disclosure as='nav' className='bg-gray-800'>
						{({ open }) => (
							<>
								<div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
									<div className='border-b border-gray-700'>
										<div className='flex items-center justify-between h-16 px-4 sm:px-0'>
											<div className='flex items-center'>
												<div className='flex-shrink-0'>
													<span className={'block relative w-8 h-8'}>
														<Image layout={'fill'} src='/logo-nav.png' alt='Workflow' />
													</span>
												</div>
												<div className='hidden md:block'>
													<div className='flex items-baseline ml-10 space-x-4'>
														{navigation.map((item) => (
															<a
																key={item.name}
																href={item.href}
																className={classNames(
																	item.name === pageTitle ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
																	'px-3 py-2 rounded-md text-sm font-medium'
																)}
																aria-current={item.name === pageTitle ? 'page' : undefined}
															>
																{item.name}
															</a>
														))}
													</div>
												</div>
											</div>
											<div className='hidden md:block'>
												<div className='flex items-center ml-4 md:ml-6'>
													{/* <button
														type='button'
														className='p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
													>
														<span className='sr-only'>View notifications</span>
														<BellIcon className='w-6 h-6' aria-hidden='true' />
													</button> */}

													{/* Profile dropdown */}
													<Menu as='div' className='relative ml-3'>
														<div>
															<Menu.Button className='flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
																<span className='sr-only'>Open user menu</span>
																<span className={'relative block w-10 h-10'}>
																	<Image
																		layout={'fill'}
																		className={'w-full h-full absolute top-0 left-0 rounded-full'}
																		src={user?.user_metadata.picture}
																		alt=''
																	/>
																</span>
															</Menu.Button>
														</div>
														<Transition
															as={Fragment}
															enter='transition ease-out duration-100'
															enterFrom='transform opacity-0 scale-95'
															enterTo='transform opacity-100 scale-100'
															leave='transition ease-in duration-75'
															leaveFrom='transform opacity-100 scale-100'
															leaveTo='transform opacity-0 scale-95'
														>
															<Menu.Items className='absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
																{userNavigation.map((item) => (
																	<Menu.Item key={item.name}>
																		{({ active }) => (
																			<a
																				href={item.href}
																				className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
																				onClick={item.onClick}
																			>
																				{item.name}
																			</a>
																		)}
																	</Menu.Item>
																))}
															</Menu.Items>
														</Transition>
													</Menu>
												</div>
											</div>
											<div className='flex -mr-2 md:hidden'>
												{/* Mobile menu button */}
												<Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
													<span className='sr-only'>Open main menu</span>
													{open ? <XIcon className='block w-6 h-6' aria-hidden='true' /> : <MenuIcon className='block w-6 h-6' aria-hidden='true' />}
												</Disclosure.Button>
											</div>
										</div>
									</div>
								</div>

								<Disclosure.Panel className='bg-gray-700 border-b border-gray-700 md:hidden'>
									<div className='px-2 py-3 space-y-1 sm:px-3'>
										{navigation.map((item) => (
											<Disclosure.Button
												key={item.name}
												as='a'
												href={item.href}
												className={classNames(
													item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'block px-3 py-2 rounded-md text-base font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</Disclosure.Button>
										))}
									</div>
									<div className='pt-4 pb-3 border-t border-gray-700'>
										{/* <div className='flex items-center px-5'>
											<div className='relative w-10 h-10 flex-shrink-1'>
												<Image layout={'fill'} className='rounded-full' src={user?.imageUrl} alt='' />
											</div>
											<div className='ml-3'>
												<div className='text-base font-medium leading-none text-white'>{user?.name}</div>
												<div className='text-sm font-medium leading-none text-gray-400'>{user?.email}</div>
											</div>
											<button
												type='button'
												className='flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
											>
												<span className='sr-only'>View notifications</span>
												<BellIcon className='w-6 h-6' aria-hidden='true' />
											</button>
										</div> */}
										<div className='px-2 mt-3 space-y-1'>
											{userNavigation.map((item) => (
												<Disclosure.Button
													key={item.name}
													as='a'
													href={item.href}
													className='block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700'
												>
													{item.name}
												</Disclosure.Button>
											))}
										</div>
									</div>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<header className='py-10'>
						<div className='flex justify-between px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 gap-x-3'>
							<h1 className='text-3xl font-bold text-white'>{pageTitle}</h1>
							{pageLinks &&
								pageLinks.map((el) => {
									return (
										<Link href={el.href} passHref key={`nav-${el.title}`}>
											<button className={'text-slate-50 px-3 py-1 flex items-center gap-x-1 justify-center hover:text-slate-300'}>
												{el.icon} {el.title}
											</button>
										</Link>
									)
								})}
						</div>
					</header>
				</div>

				<main className='-mt-32'>
					<div className='px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8'>
						{/* Replace with your content */}
						<div className='px-5 py-6 bg-white rounded-lg shadow sm:px-6'>{children}</div>
						{/* /End replace */}
					</div>
				</main>
			</div>
		</>
	)
}
