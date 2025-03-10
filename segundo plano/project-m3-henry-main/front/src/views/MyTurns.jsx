import { useEffect } from 'react';
import { TurnMobile, TurnDesktop } from '../components/Turn';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { chargerAppointment } from '../redux/appointmentReducer';
import axios from 'axios';
import VoidTurns from '../components/VoidTurns';
import { Link } from 'react-router-dom';

export default function MyTurns() {
	const userId = useSelector((state) => state.user.user.id);
	const dispatch = useDispatch();
	const turns = useSelector((state) => state.appointments.appointments);

	useEffect(() => {
		axios('http://localhost:3000/turns', {
			method: 'GET',
			params: {
				userId,
			},
		}).then((res) => {
			dispatch(chargerAppointment(res.data));
		});
	}, [dispatch, userId]);

	return (
		<>
			<div className='mt-6 flow-root'>
				<div className=' mx-auto max-w-7xl px-2 align-middle'>
					<div className='rounded-lgs p-8 md:pt-0'>
						{turns.length < 1 ? (
							<VoidTurns />
						) : (
							<>
								<div className='text-white md:hidden'>
									<div className='fixed z-100 bottom-10 right-10 p-0 m-0 bg-sky-600 p-2 rounded-full'>
										<Link to='/schedule' className=''>
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-10'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
											</svg>
										</Link>
									</div>
									{turns.map((turn) => (
										<TurnMobile key={turn.id} turn={turn} />
									))}
								</div>
								<table className='hidden min-w-full bg-slate-700 text-white rounded-xl md:table'>
									<thead className='rounded-lg text-left text-2xl font-bold'>
										<tr>
											<th className='px-3 py-5'>Fecha</th>
											<th className='px-3 py-5'>Hora</th>
											<th className='px-3 py-5'>Estado</th>
											<th className='px-3 py-0 text-center hover:cursor-pointer hover:text-gray-400'>
												<Link to='/schedule'>Nuevo turno</Link>
											</th>
										</tr>
									</thead>
									<tbody>
										{turns.map((turn) => (
											<TurnDesktop key={turn.id} turn={turn} />
										))}
									</tbody>
								</table>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
