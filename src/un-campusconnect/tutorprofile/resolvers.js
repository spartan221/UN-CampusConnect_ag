import { generalRequest } from "../../utilities";
import { TUTORPROFILE_MS_URL as url, TUTORPROFILE_MS_PORT as port } from "../../server";
import { entryPoint } from "./entryPoint";
import { AUTH_MS_URL as auth_url, AUTH_MS_PORT as auth_port } from "../../server";
import { entryPoint as AUTH_ENTRY_POINT } from "../authentication/user-services/entryPoint";

const URL = `http://${url}:${port}/${entryPoint}`;
const AUTH_URL = `http://${auth_url}:${auth_port}/${AUTH_ENTRY_POINT}`;

const resolvers = {
    Query: {
        getTutorProfile: (_, { id }) =>
            generalRequest({ url: `${URL}/${id}`, method: "GET" }),
        getTutorProfiles: (_, args, context) =>
            generalRequest({ url: `${URL}`, method: "GET" }),
    },
    Mutation: {
        createTutorProfile: async (_, { tutor }, context) => {
            const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token })
            if ( userInfo.hasOwnProperty('error') ) return userInfo; 
            if ( userInfo.role !== 'tutor' ) return { error: 'You are not a tutor' };
            tutor.tutor.user_id = userInfo.id;
            return generalRequest({ url: `${URL}`, method: "POST", body: tutor })
        },
        updateTutorProfile: async (_, { id, tutor }, context) => {
            const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token })
            if ( userInfo.hasOwnProperty('error') ) return userInfo; 
            if ( userInfo.role !== 'tutor' || userInfo.id !== id) return { error: 'You are not authorized' };
            return generalRequest({ url: `${URL}/${id}`, method: "PUT", body: tutor })
        },
        deleteTutorProfile: async (_, { id }, context) => {
            const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token })
            console.log({userInfo});
            if ( userInfo.hasOwnProperty('error') ) return userInfo; 
            if ( userInfo.role !== 'tutor' || userInfo.id !== id) return { error: 'You are not authorized' };
            return generalRequest({ url: `${URL}/${id}`, method: "DELETE" })
        },
    }
};

export default resolvers;