import { generalRequest } from '../../utilities';
import { BIENESTAR_MS_URL as url, BIENESTAR_MS_PORT as port } from '../../server';
import { entryPoint } from './entryPoint';

const URL = `http://${url}:${port}/${entryPoint}`;

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
        createPublication: (_, { publication: { title, content_publication, author_publication, publication_date, image } }) => {
            return generalRequest({
              url: `${URL}/publications/new`,
              method: 'POST',
              body: { title, content_publication, author_publication, publication_date, image }
            }).then(response => {
              return { message: 'Se ha creado la publicación' };
            });
        },

        updatePublication: (_, { id, publication: { title, content_publication, author_publication, publication_date, image } }) => {
            return generalRequest({
              url: `${URL}/publications/update/${id}`,
              method: 'PUT',
              body: { title, content_publication, author_publication, publication_date, image }
            }).then(response => {
              return { message: 'Se ha modificado la publicación' };
            });
        },

        deletePublication: (_, { id }) => {
            const response = generalRequest({
              url: `${URL}/publications/delete/${id}`,
              method: 'DELETE',
            });
            console.log(response);
            return response;
        }


	}
}

export default resolvers;