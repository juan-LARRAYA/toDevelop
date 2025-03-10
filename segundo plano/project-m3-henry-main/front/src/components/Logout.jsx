import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userReducer';
import { Link } from 'react-router-dom';

export default function Logout() {
	const dispatch = useDispatch();

	const isLogged = useSelector((state) => state.user.user.isLogged);

	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<>
			{isLogged ? (
				<button onClick={handleLogout} className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
					Cerrar sesión
				</button>
			) : (
				<>
					<Link className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium' to='/login'>
						Iniciar sesión
					</Link>
					<span className='text-gray-300 px-3 text-lg'>o</span>
					<Link className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium' to='/register'>
						Registrase
					</Link>
				</>
			)}
		</>
	);
}
