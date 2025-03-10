import { Link } from 'react-router-dom';

export default function VoidTurns() {
	return (
		<>
			<main className='bg-transparent grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 h-[calc(100vh-196px)]'>
				<div className='text-center'>
					<p className='text-8xl font-semibold text-gray-300'>...</p>
					<h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl'>No hay turnos</h1>
					<p className='mt-6 text-base leading-7 text-gray-400'>Actualmente no tienes turnos creados</p>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link
							to='/home'
							className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Ir al inicio
						</Link>
						<Link
							to='/schedule'
							className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Crear turno
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}
