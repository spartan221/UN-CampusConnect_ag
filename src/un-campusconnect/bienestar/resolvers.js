import { generalRequest } from '../../utilities';
import { BIENESTAR_MS_URL as url, BIENESTAR_MS_PORT as port } from '../../server';
import { AUTH_MS_URL as auth_url, AUTH_MS_PORT as auth_port } from "../../server";
import { entryPoint as AUTH_ENTRY_POINT } from "../authentication/user-services/entryPoint";
import { entryPoint } from './entryPoint';

const URL = `http://${url}:${port}/${entryPoint}`;
const AUTH_URL = `http://${auth_url}:${auth_port}/${AUTH_ENTRY_POINT}`;

const resolvers = {
	Query: {
		getpublications: (_) => {
            const response = generalRequest({ url:`${URL}/publications`, method:'GET'});
            return response;
          },
        getpublicationid: (_,{id}) => {
            const response = generalRequest({ url:`${URL}/publications/${id}`, method:'GET'});
            return response;
        },
        
	},
    Mutation: {
      createPublication: async (_, { publication: { title, content_publication, author_publication, publication_date, image } }, context) => {
        try {
          const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token })
          const author_publication = userInfo.id;
          console.log(userInfo.id);
          if (!author_publication) {
            return { message: 'Error al crear la publicación: author_publication es undefined' };
          }
          const response = await generalRequest({
            url: `${URL}/publications/new`,
            method: 'POST',
            body: { title, content_publication, author_publication, publication_date, image }
          });
          if (response.errors) {
            throw new Error(response.errors[0].message);
          }
          return { message: 'Se ha creado la publicación' };
        } catch (error) {
          return { message: `Error al crear la publicación: ${error.message}` };
        }
      },

      updatePublication: async (_, { id, publication: { title, content_publication, author_publication, publication_date, image } }, context) => {
        try {
          const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token });
          const publication = await generalRequest({ url: `${URL}/publications/${id}`, method: 'GET' });
          if (userInfo.id !== publication.author_publication) {
            return { message: 'No tienes permiso para modificar esta publicación' };
          }
          const response = await generalRequest({
            url: `${URL}/publications/update/${id}`,
            method: 'PUT',
            body: { title, content_publication, author_publication, publication_date, image }
          });
          return { message: 'Se ha modificado la publicación' };
        } catch (error) {
          console.error(`Error al actualizar la publicación: ${error}`);
          throw new Error('No se pudo actualizar la publicación. Inténtalo de nuevo más tarde.');
        }
      }
      ,

      deletePublication: async (_, { id }, context) => {
        try {
          const userInfo = await generalRequest({ url:`${AUTH_URL}/myInfo`, method:'GET', token:context.token });
          const publication = await generalRequest({ url: `${URL}/publications/${id}`, method: 'GET' });
          if (userInfo.id !== publication.author_publication) {
            return { message: 'No tienes permiso para modificar esta publicación' };
          }
          const response = await generalRequest({
            url: `${URL}/publications/delete/${id}`,
            method: 'DELETE',
          });
          console.log(response);
          return response;
        } catch (error) {
          console.error(error);
          throw new Error('Error al eliminar la publicación');
        }
      }


	}
}

export default resolvers;