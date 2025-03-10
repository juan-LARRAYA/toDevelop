import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateTurn } from '../helpers/validateTurn';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../redux/appointmentReducer';
import { divStylesParent, errorStyles, inputStyles } from './Register';
export default function NewTurn() {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.user.user.id);

	const handleOnSubmit = (values) => {
		const turn = {
			...values,
			userId,
		};
		dispatch(addAppointment(turn));
	};

	return (
		<>
			<Formik
				initialValues={{
					date: '',
					time: '',
					userId: '',
				}}
				validate={validateTurn}
				onSubmit={handleOnSubmit}
			>
				<div className='h-[calc(100vh-64px)] flex flex-col items-center justify-center'>
					<div className='w-[90%] md:border-2 p-10 text-white rounded-3xl md:shadow-2xl md:w-[450px]'>
						<div className='mb-10'>
							<h2 className='font-semibold text-3xl text-center'>Nuevo Turno</h2>
						</div>
						<Form className='m-[auto]'>
							<div className={divStylesParent}>
								<label htmlFor='date'>
									Fecha{' '}
									<span className={errorStyles}>
										<ErrorMessage name='date' />
									</span>
								</label>
								<Field type='date' name='date' className={inputStyles} />
							</div>

							<div className={divStylesParent}>
								<label htmlFor='time'>
									Hora{' '}
									<span className={errorStyles}>
										<ErrorMessage name='time' />
									</span>
								</label>

								<Field component='select' name='time' id='time' className='mt-1  overflow-y-auto rounded-md p-2 text-xl  text-black'>
									<option value='' disabled>
										Seleccione una hora
									</option>
									<option value='08:00'>08:00</option>
									<option value='08:30'>08:30</option>
									<option value='09:00'>09:00</option>
									<option value='09:30'>09:30</option>
									<option value='10:00'>10:00</option>
									<option value='10:30'>10:30</option>
									<option value='11:00'>11:00</option>
									<option value='11:30'>11:30</option>
									<option value='12:00'>12:00</option>
									<option value='12:30'>12:30</option>
									<option value='13:00'>13:00</option>
									<option value='13:30'>13:30</option>
									<option value='14:00'>14:00</option>
									<option value='14:30'>14:30</option>
									<option value='15:00'>15:00</option>
									<option value='15:30'>15:30</option>
									<option value='16:00'>16:00</option>
									<option value='16:30'>16:30</option>
								</Field>
							</div>

							<div className='flex justify-center mt-10'>
								<button type='submit' className='bg-sky-500 hover:bg-sky-700 text-white font-bold text-xl py-2 px-4 rounded'>
									Agregar Turno
								</button>
							</div>
						</Form>
					</div>
				</div>
			</Formik>
		</>
	);
}

/**
 * 
 * export interface AppointmentDto {
 *	date: string;
 *	time: string;
 *	userId: string;
 *}

 */
