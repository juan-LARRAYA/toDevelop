import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateLogin } from '../helpers/validateLogin';
import { divStylesParent, inputStyles, errorStyles } from './Register';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isLogged } from '../redux/userReducer';
import { clearAppointments } from '../redux/appointmentReducer';

export default function Login() {
	const [errorRequest, setErrorRequest] = useState({ message: '' });
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleOnSubmit = (values) => {
		axios
			.post('http://localhost:3000/users/login', values)
			.then((res) => {
				if (res.status === 200) {
					dispatch(isLogged(res.data));
					dispatch(clearAppointments());
					navigate('/home');
				}
			})
			.catch((err) => {
				setErrorRequest({ message: err.response.data.message });
			});
	};
	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			validate={validateLogin}
			onSubmit={handleOnSubmit}
		>
			<div className='h-screen flex flex-col items-center justify-center'>
				<div className='w-[90%] md:border-2 p-10 text-white rounded-3xl md:shadow-2xl md:w-[450px]'>
					<div className='mb-3'>
						<h2 className='font-semibold text-3xl text-center mb-10'>Inicio sesión</h2>
						<Form className='m-[auto]'>
							<div className={divStylesParent}>
								<label htmlFor='username'>
									Username{' '}
									<span className={errorStyles}>
										<ErrorMessage name='username' />
									</span>
								</label>
								<Field type='text' name='username' placeholder='Username' className={inputStyles} />
							</div>

							<div className={divStylesParent}>
								<label htmlFor='password'>
									Password{' '}
									<span className={errorStyles}>
										<ErrorMessage name='password' />
									</span>
								</label>
								<Field type='password' name='password' placeholder='Password' className={inputStyles} />
							</div>

							<div className='flex justify-center mt-10'>
								<button type='submit' className='bg-sky-500 hover:bg-sky-700 text-white font-bold text-xl py-2 px-4 rounded'>
									Iniciar Sesión
								</button>
							</div>
						</Form>
						<div className='flex justify-center mt-10 md:mt-5'>
							<Link to='/register' className='text-center text-sky-500 hover:text-sky-700'>
								¿No tienes cuenta?, regístrate
							</Link>
						</div>
					</div>
					{errorRequest.message && <h3 className='text-center text-red-600 text-xl font-semibold mt-10'>{errorRequest.message}</h3>}
				</div>
			</div>
		</Formik>
	);
}
