import { generalRequest } from '../../../utilities';
import { AUTH_MS_URL as url, AUTH_MS_PORT as port } from '../../../server';
import { entryPoint } from './entryPoint';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		getMyInfo: (_, args, context) => 
			generalRequest({ url:`${URL}/myInfo`, method:'GET', token:context.token })
		,
		getUsers: (_, args, context) => 
			generalRequest({ url: URL, method:'GET', token:context.token })
		,
		getUserInfo: (_, { id }) =>
			generalRequest({ url: `${URL}/${id}` , method:'GET'})
		,
	},
	Mutation: {
		unsubscribe: (_, args, context) => 
			generalRequest({ url: URL, method:'DELETE', token:context.token })
	}
}

export default resolvers;
