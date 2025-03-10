/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { cancelTurn } from '../redux/appointmentReducer';

export function CancelTurn({ id, status }) {
	const dispatch = useDispatch();

	const handleOnClick = () => {
		dispatch(cancelTurn(id));
	};
	return (
		<button
			onClick={handleOnClick}
			className={['transition ease duration-300 bg-red-500 text-white font-bold py-2 px-4 rounded', status === 'active' && 'hover:bg-red-700'].join(' ')}
			disabled={status !== 'active'}
		>
			Cancel
		</button>
	);
}
