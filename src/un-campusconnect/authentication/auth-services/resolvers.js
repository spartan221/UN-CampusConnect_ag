import { generalRequest } from '../../../utilities';
import { url, port } from '../server';
import { entryPoint } from './entryPoint';

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
		signup: (_, { user: { username, email, password, role } }) =>
			generalRequest({ url: `${URL}/signup`, method: 'POST', body: { username, email, password, role } })
		,
		confirmEmail: (_, { token }) => 
			generalRequest({ url: `${URL}/confirm-email/${token}`, method:'GET' })
		,
	}
}

export default resolvers;
