import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validate } from '../helpers/validate';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const divStylesParent = 'mb-4 flex flex-col gap-2 font-medium text-xl';
export const inputStyles = 'p-2 border-2 rounded-lg border-slate-600 text-black';
export const errorStyles = 'text-red-600 text-xl font-semibold';

export default function Register() {
	const [errorRequest, setErrorRequest] = useState({ message: '' });
	const navigate = useNavigate();
	const handleOnSubmit = (values) => {
		axios
			.post('http://localhost:3000/users/register', values)
			.then((res) => {
				if (res.status === 201) {
					navigate('/login');
				}
			})
			.catch((err) => {
				setErrorRequest({ message: err.request.response });
			});
	};
	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				birthDate: '',
				nDni: '',
				username: '',
				password: '',
			}}
			validate={validate}
			onSubmit={handleOnSubmit}
		>
			<div className='h-screen flex flex-col items-center justify-center'>
				<div className='w-[90%] md:border-2 p-10 text-white rounded-3xl md:shadow-2xl md:w-[450px]'>
					<div className='mb-10'>
						<h2 className='font-semibold text-3xl text-center'>Registro</h2>
					</div>
					<Form className='m-[auto]'>
						<div className={divStylesParent}>
							<label htmlFor='name'>Nombre completo</label>
							<p className={errorStyles}>
								<ErrorMessage name='name' />
							</p>
							<Field type='text' name='name' placeholder='Name' className={inputStyles} />
						</div>

						<div className={divStylesParent}>
							<label htmlFor='email'>Email</label>
							<p className={errorStyles}>
								<ErrorMessage name='email' />
							</p>
							<Field type='email' name='email' placeholder='Email' className={inputStyles} />
						</div>

						<div className={divStylesParent}>
							<label htmlFor='birthDate'>Fecha de nacimiento</label>
							<p className={errorStyles}>
								<ErrorMessage name='birthDate' />
							</p>
							<Field type='date' name='birthDate' placeholder='Birth Date' className={inputStyles} />
						</div>

						<div className={divStylesParent}>
							<label htmlFor='nDni'>DNI</label>
							<p className={errorStyles}>
								<ErrorMessage name='nDni' />
							</p>
							<Field type='number' name='nDni' placeholder='DNI' className={inputStyles} min={0} />
						</div>

						<div className={divStylesParent}>
							<label htmlFor='username'>Username {errorRequest.message && <span className='text-center text-red-600 text-xl font-semibold mt-10'>{errorRequest.message}</span>}</label>
							<p className={errorStyles}>
								<ErrorMessage name='username' />
							</p>
							<Field type='text' name='username' placeholder='Username' className={inputStyles} />
						</div>

						<div className={divStylesParent}>
							<label htmlFor='password'>Password</label>
							<p className={errorStyles}>
								<ErrorMessage name='password' />
							</p>
							<Field type='password' name='password' placeholder='Password' className={inputStyles} />
						</div>

						<div className='flex justify-center mt-10'>
							<button type='submit' className='bg-sky-500 hover:bg-sky-700 text-white font-bold text-xl py-2 px-4 rounded'>
								Registrarse
							</button>
						</div>
					</Form>
					<div className='flex justify-center mt-10 md:mt-5'>
						<Link to='/login' className='text-center text-sky-500 hover:text-sky-700'>
							Iniciar Sesión
						</Link>
					</div>
				</div>
			</div>
		</Formik>
	);
}
