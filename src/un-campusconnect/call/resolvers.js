import { generalRequest } from '../../utilities';
import { CALL_MS_URL as url, CALL_MS_PORT as port } from '../../server';
import { entryPoint } from './entryPoint';
import { AUTH_MS_URL as auth_url, AUTH_MS_PORT as auth_port } from "../../server";
import { entryPoint as AUTH_ENTRY_POINT } from "../authentication/user-services/entryPoint";

const URL = `http://${url}:${port}/${entryPoint}`;
const AUTH_URL = `http://${auth_url}:${auth_port}/${AUTH_ENTRY_POINT}`;
const resolvers = {
	Query: {
		getListParticipants: async(_, {id},context) =>{ 
            const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token })
            if ( userInfo.hasOwnProperty('error') ) return userInfo;
            if ( userInfo.role !== 'admin' ) return { error: 'You are not a admin' };
			return generalRequest({ url:`${URL}/listParticipants/${id}`, method:'GET'})
        },
        getCall:(_, {id},context) =>
            generalRequest({ url:`${URL}/call/${id}`, method:'GET', token:context.token})
        ,
        getCalls:(_, args, context) =>
            generalRequest({ url:`${URL}/allCalls`, method:'GET', token:context.token})
        
	},
	Mutation: {
		enrollmentCall: async (_, {id}, context) =>{
            const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token })
            console.log("hola1")
            if ( userInfo.hasOwnProperty('error') ) return userInfo;
            console.log("hola2")
            if ( userInfo.role !== 'student' ) return { error: 'You are not a student' };
            console.log("hola3")
            return generalRequest({ url: `${URL}/enrollment/${userInfo.email}/${id}`, method:'PUT'})
        },
        closeCall: async (_, {id}, context) =>{
            const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token })
            if ( userInfo.hasOwnProperty('error') ) return userInfo;
            if ( userInfo.role !== 'admin' ) return { error: 'You are not a admin' };
            return generalRequest({ url: `${URL}/updateStatus/${id}`, method:'PUT'})
        },
        deleteCall: async (_, {id}, context) =>{ 
            const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token })
            if ( userInfo.hasOwnProperty('error') ) return userInfo;
            if ( userInfo.role !== 'admin' ) return { error: 'You are not a admin' };
            return generalRequest({ url: `${URL}/deleteCall/${id}`, method:'DELETE'})
        },
		updateCall: async (_, {Call: { maximunParticipants, nameGroup, place, schedule,deadline,status,participants },id},context) =>{
            const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token })
            if ( userInfo.hasOwnProperty('error') ) return userInfo;
            if ( userInfo.role !== 'admin' ) return { error: 'You are not a admin' };
            return generalRequest({ url: `${URL}/updateCall/${id}`, method:'PUT',body: { maximunParticipants, nameGroup, place, schedule,deadline,status,participants }})
        },
        addCall:async (_, {Call: { maximunParticipants, nameGroup, place, schedule,deadline,status,participants, }},context) =>{
            const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token })
            if ( userInfo.hasOwnProperty('error') ) return userInfo;
            if ( userInfo.role !== 'admin' ) return { error: 'You are not a admin' };
            return generalRequest({ url: `${URL}/addCall`, method:'POST',body: { maximunParticipants, nameGroup, place, schedule,deadline,status,participants }})
        },
	}
}

export default resolvers;