import { generalRequest } from '../../utilities';
import { SUBJECT_MS_URL as url, SUBJECT_MS_PORT as port } from '../../server';
import { entryPoint } from './entryPoint';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		getSubject: (_) => {
            const response = generalRequest({ url:`${URL}/subject`, method:'GET'});
            return response;
          },
        getSubjectid: (_,{id}) => {
            const response = generalRequest({ url:`${URL}/subject/${id}`, method:'GET'});
            return response;
        },
        
	},
    Mutation: {
        createSubject: (_, { subject: { id, name, description, category, satus, file } }) => {
            return generalRequest({
              url: `${URL}/subject/new`,
              method: 'POST',
              body: { id, name, description, category, satus, file }
            }).then(response => {
              return { message: 'Subject added successfully', };
            });
        },

        updateSubject: (_, { id, subject: { name, description, category, satus, file } }) => {
            return generalRequest({
              url: `${URL}/subject/update/${id}`,
              method: 'PUT',
              body: { name, description, category, satus, file }
            }).then(response => {
              return { message: 'Subject update successfully' };
            });
        },

        deleteSubject: (_, { id }) => {
            const response = generalRequest({
              url: `${URL}/subject/delete/${id}`,
              method: 'DELETE',
            });
            console.log(response);
            return response;
        }


	}
}

export default resolvers;