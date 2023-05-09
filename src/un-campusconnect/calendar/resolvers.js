import { generalRequest } from '../../utilities';
import { CALENDAR_MS_URL as url, Event_MS_PORT as port } from '../../server';
import { entryPoint } from './entryPoint';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		getEvent: (_) => {
            const response = generalRequest({ url:`${URL}/Event`, method:'GET'});
            return response;
          },
        getEventid: (_,{id}) => {
            const response = generalRequest({ url:`${URL}/Event/${id}`, method:'GET'});
            return response;
        },
        
	},
    Mutation: {
        createEvent: (_, { Event: { id, description, link, start_time, end_time, satus} }) => {
            return generalRequest({
              url: `${URL}/Event/new`,
              method: 'POST',
              body: { id, description, link, start_time, end_time, satus }
            }).then(response => {
              return { message: 'Event added successfully' };
            });
        },

        updateEvent: (_, { id, Event: { id, description, link, start_time, end_time, satus } }) => {
            return generalRequest({
              url: `${URL}/Event/update/${id}`,
              method: 'PUT',
              body: { id, description, link, start_time, end_time, satus }
            }).then(response => {
              return { message: 'Event update successfully' };
            });
        },

        deleteEvent: (_, { id }) => {
            const response = generalRequest({
              url: `${URL}/Event/delete/${id}`,
              method: 'DELETE',
            });
            console.log(response);
            return response;
        }


	}
}

export default resolvers;