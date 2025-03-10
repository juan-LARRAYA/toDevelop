import Background from './components/Background';
import Login from './views/Login';
import Register from './views/Register';
import Navbar from './components/Navbar';
import Home from './views/Home';
import MyTurns from './views/MyTurns';
import NewTurn from './views/NewTurn';

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NotFound from './views/NotFound';
import { RequireAuth } from './components/RequireAuth';

function App() {
	const location = useLocation();
	return (
		<>
			<Background>
				{location.pathname === '/login' ? null : location.pathname === '/register' ? null : <Navbar />}
				<Routes>
					<Route path='/' element={<Navigate to='home' />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/home' element={<Home />} />
					<Route element={<RequireAuth />}>
						<Route path='/turns' element={<MyTurns />} />
						<Route path='/schedule' element={<NewTurn />} />
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</Background>
		</>
	);
}

export default App;
