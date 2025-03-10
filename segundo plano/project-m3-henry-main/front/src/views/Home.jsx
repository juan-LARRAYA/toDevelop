import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Home() {
	const { isLogged, name } = useSelector((state) => state.user.user);
	const styleLink = 'text-xl leading-7 text-gray-300 hover:text-slate-950 transition duration-300 hover:bg-gray-500 px-2 py-1 rounded-md';
	return (
		<>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='mx-auto max-w-2xl lg:mx-0'>
					<h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>Home</h1>
					<br />
					{!isLogged && <h2 className='text-4xl font-bold tracking-tight text-white sm:text-2xl'>Bienvenido</h2>}
					{isLogged && <h2 className='text-4xl font-bold tracking-tight text-white sm:text-2xl'>Bienvenido {name}</h2>}
					<p className='mt-6 text-lg leading-8 text-gray-300'>Una pequeña aplicación creada con React para la administración de turnos.</p>
					<h3 className='mt-10 text-2xl font-bold tracking-tight text-white sm:text-4xl'>Tecnologías utilizadas para este proyecto</h3>
					<h4 className='mt-10 text-2xl font-bold tracking-tight text-white sm:text-2xl'>Front-end</h4>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link to='https://react.dev/' target='_blank' className={styleLink}>
							React
						</Link>
						<Link to='https://reactrouter.com/en/main' target='_blank' className={styleLink}>
							React Router Dom
						</Link>
						<Link to='https://axios-http.com/' target='_blank' className={styleLink}>
							Axios
						</Link>
						<Link to='https://formik.org/' target='_blank' className={styleLink}>
							Formik
						</Link>
						<Link to='https://redux-toolkit.js.org/' target='_blank' className={styleLink}>
							Redux-Toolkit
						</Link>
					</div>
					<br />
					<h4 className='mt-10 text-2xl font-bold tracking-tight text-white sm:text-2xl'>Back-end</h4>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link to='https://nodejs.org/en' target='_blank' className={styleLink}>
							Node js
						</Link>
						<Link to='https://expressjs.com/' target='_blank' className={styleLink}>
							Express js
						</Link>
						<Link to='https://www.typescriptlang.org/' target='_blank' className={styleLink}>
							TypeScript
						</Link>
						<Link to='https://www.postgresql.org/' target='_blank' className={styleLink}>
							PostgreSQL
						</Link>
						<Link to='https://typeorm.io/' target='_blank' className={styleLink}>
							Typeorm
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
