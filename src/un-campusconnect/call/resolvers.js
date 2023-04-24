import { generalRequest } from '../../utilities';
import { CALL_MS_URL as url, CALL_MS_PORT as port } from '../../server';
import { entryPoint } from './entryPoint';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		getListParticipants: (_, {id}) => 
			generalRequest({ url:`${URL}/listParticipants/${id}`, method:'GET'})
		,
        getCall:(_, {id}) =>
            generalRequest({ url:`${URL}/call/${id}`, method:'GET'})
        ,
        getCalls:(_, args, context) =>
            generalRequest({ url:`${URL}/allCalls`, method:'GET'})
        
	},
	Mutation: {
		enrollmentCall: (_, {email,id}) =>
            generalRequest({ url: `${URL}/enrollment/${email}/${id}`, method:'PUT'})
        ,
        closeCall: (_, {id}) =>
            generalRequest({ url: `${URL}/updateStatus/${id}`, method:'PUT'})
        ,
        //deleteCall: (_, args, context) => {
            //const {id} = args
            //generalRequest({ url: `${URL}/deleteCall/${id}`, method:'DELETE', token:context.token })
        //},
		updateCall: (_, {Call: { maximunParticipants, nameGroup, place, schedule,deadline,status,participants },id}) =>
            generalRequest({ url: `${URL}/updateCall/${id}`, method:'PUT',body: { maximunParticipants, nameGroup, place, schedule,deadline,status,participants }})
        ,
        addCall: (_, {Call: { maximunParticipants, nameGroup, place, schedule,deadline,status,participants, }}) =>
            generalRequest({ url: `${URL}/addCall`, method:'POST',body: { maximunParticipants, nameGroup, place, schedule,deadline,status,participants }})
        ,
	}
}

export default resolvers;