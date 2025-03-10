/* eslint-disable react/prop-types */

import { formatDate } from '../helpers/formatDate';
import { CancelTurn } from './CancelTurn';
export function TurnMobile({ turn }) {
	return (
		<>
			<div className='mb-2 w-full rounded-md  p-4'>
				<div className='flex items-center justify-between border-b pb-4'>
					<div>
						<div className='mb-2 flex items-center text-xl'>
							<p>{formatDate(turn.date)}</p>
						</div>
						<p className='text-sm text-gray-500 font-semibold text-xl'>{turn.time}</p>
					</div>

					<div>
						<div>{turn.status === 'active' && <CancelTurn id={turn.id} status={turn.status} />}</div>
						<p className={[turn.status === 'active' ? 'text-green-500' : 'text-red-600', 'text-sm font-semibold text-xl'].join(' ')}>
							{turn.status.replace(turn.status[0], turn.status[0].toUpperCase())}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export function TurnDesktop({ turn }) {
	return (
		<tr className='w-full border-b text-sm last-of-type:border-none'>
			<td className='whitespace-nowrap px-3 py-3'>
				<p>{formatDate(turn.date)}</p>
			</td>
			<td className='whitespace-nowrap px-3 py-3'>{turn.time}</td>
			<td className='whitespace-nowrap px-3 py-3'>
				<p className={[turn.status === 'active' ? 'text-green-500' : 'text-red-500', 'font-semibold text-xl'].join(' ')}>{turn.status.replace(turn.status[0], turn.status[0].toUpperCase())}</p>
			</td>
			<td className='w-[12%] whitespace-nowrap px-3 py-3 text-center'>
				<CancelTurn id={turn.id} status={turn.status} />
			</td>
		</tr>
	);
}
