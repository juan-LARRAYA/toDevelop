import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RequireAuth = () => {
	const isLogged = useSelector((state) => state.user.user.isLogged);

	if (!isLogged) {
		return <Navigate to='/home' />;
	} else {
		return <Outlet />;
	}
};
