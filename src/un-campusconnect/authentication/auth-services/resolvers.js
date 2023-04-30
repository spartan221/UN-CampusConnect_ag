import { generalRequest } from '../../../utilities';
import { AUTH_MS_URL as url, AUTH_MS_PORT as port } from '../../../server';
import { entryPoint } from './entryPoint';
import { sendMessageToRabbitMQ } from '../../../lib/producer';

const URL = `http://${url}:${port}/${entryPoint}`;


const resolvers = {
	Query: {
		signin: (_, { user: { email, password } }) =>
			generalRequest({ url: `${URL}/signin`, method: 'POST', body: { email, password } })
		,
		resendEmail: (_, { email }) =>
			generalRequest({ url: `${URL}/resend-email`, method: 'POST', body: { email } })
	},
	Mutation: {
		signup: async (_, { user: { username, email, password, role } }) => {
			const res = await generalRequest({ url: `${URL}/signup`, method: 'POST', body: { username, email, password, role } })
			if ( res.hasOwnProperty('error') ) return res;
			// Mandar el mensaje al rabbitMQ con el correo del usuario que se registró, solo ejecutar
			// si la peticion anterior fue exitosa codigo 200.
			sendMessageToRabbitMQ( email );
			return res;
		}
		,
		confirmEmail: (_, { token }) =>
			generalRequest({ url: `${URL}/confirm-email/${token}`, method: 'GET' })
		,
	}
}

export default resolvers;
