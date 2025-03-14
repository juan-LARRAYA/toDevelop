/* eslint-disable react-hooks/exhaustive-deps */
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { navigation } from '../links/links';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logout from './Logout';
import { useSelector } from 'react-redux';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}
export default function Links() {
	const [links, setLinks] = useState(navigation);
	const location = useLocation();
	const isLogged = useSelector((state) => state.user.user.isLogged);
	useEffect(() => {
		if (!isLogged) {
			const newLinks = [links[0]];
			setLinks(newLinks);
		} else {
			if (location.pathname === '/home') {
				const newLinks = [...links];
				newLinks[0].current = true;
				newLinks[1].current = false;
				newLinks[2].current = false;
				setLinks(newLinks);
			} else if (location.pathname === '/turns') {
				const newLinks = [...links];
				newLinks[0].current = false;
				newLinks[1].current = true;
				newLinks[2].current = false;
				setLinks(newLinks);
			} else if (location.pathname === '/schedule') {
				const newLinks = [...links];
				newLinks[0].current = false;
				newLinks[1].current = false;
				newLinks[2].current = true;
				setLinks(newLinks);
			}
		}
	}, [location.pathname]);
	return (
		<>
			<Disclosure as='nav' className='transparent'>
				{({ open }) => (
					<>
						<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
							<div className='relative flex h-16 items-center justify-between'>
								<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
									{/* Mobile menu button*/}
									<DisclosureButton className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
										<span className='absolute -inset-0.5' />
										<span className='sr-only'>Open main menu</span>

										{open ? <XMarkIcon className='block h-6 w-6' aria-hidden='true' /> : <Bars3Icon className='block h-6 w-6' aria-hidden='true' />}
									</DisclosureButton>
								</div>
								<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
									<div className='flex flex-shrink-0 items-center'>
										<img className='h-8 w-auto' src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500' alt='Your Company' />
									</div>
									<div className='hidden sm:ml-6 sm:block'>
										<div className='flex space-x-4'>
											{links.map((item) => (
												<Link
													key={item.name}
													to={item.href}
													className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
													aria-current={item.current ? 'page' : undefined}
												>
													{item.name}
												</Link>
											))}
										</div>
									</div>
								</div>
								<Logout />
							</div>
						</div>

						<DisclosurePanel className='sm:hidden  '>
							<div className='space-y-1 px-2 pb-3 pt-2 duration-500'>
								{links.map((item) => (
									<DisclosureButton
										key={item.name}
										as={Link}
										to={item.href}
										className={classNames(
											item.current ? 'bg-gray-900 text-white duration-500' : 'text-gray-300 hover:bg-gray-700 hover:text-white duration-500',
											'block rounded-md px-3 py-2 text-base font-medium duration-500',
										)}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</DisclosureButton>
								))}
							</div>
						</DisclosurePanel>
					</>
				)}
			</Disclosure>
		</>
	);
}
