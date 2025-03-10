import { PORT } from './config/env';
import server from './server/server';
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';

AppDataSource.initialize().then(() => {
	try {
		console.log('Base de datos inicializada');
		server.listen(PORT, () => {
			console.log('Servidor escuchando en el puerto:', PORT);
		});
	} catch (err) {
		console.log('A ocurrido un error al iniciar la base de datos.');
	}
});
