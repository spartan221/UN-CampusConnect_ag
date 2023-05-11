import { generalRequest } from '../../utilities';
import { CALENDAR_MS_URL as url, Event_MS_PORT as port } from '../../server';
import { entryPoint } from './entryPoint';

const URL = `http://${url}:${4000}`;

const resolvers = {
  Query: {
    getEvents: async () => {
      try {
        const response = await generalRequest({ url: `${URL}/events`, method: 'GET' });
        console.error(URL);
        return response;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch events');
      }
    },
    getEventId: async (_, { id }) => {
      try {
        const response = await generalRequest({ url: `${URL}/events/${id}`, method: 'GET' });
        return response;
      } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch event with ID ${id}`);
      }
    },
  },
  Mutation: {
    createEvent: async (_, { Event: { description, link, start_time, end_time, status } }) => {
      try {
        const response = await generalRequest({
          url: `${URL}/event`,
          method: 'POST',
          body: { description, link, start_time, end_time, status },
        });
        return { message: 'Event added successfully'};
      } catch (error) {
        console.error(error);
        throw new Error('Failed to add event');
      }
    },
    updateEvent: async (_, { id, Event: { description, link, start_time, end_time, status } }) => {
      try {
        const response = await generalRequest({
          url: `${URL}/event`,
          method: 'PUT',
          body: { id, description, link, start_time, end_time, status },
        });
        return { message: 'Event updated successfully' };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update event');
      }
    },
    deleteEvent: async (_, { id }) => {
      try {
        const response = await generalRequest({ url: `${URL}/event/${id}`, method: 'DELETE' });
        console.log(response);
        return { message: 'Event deleted successfully' };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete event');
      }
    },
  },
};

export default resolvers;