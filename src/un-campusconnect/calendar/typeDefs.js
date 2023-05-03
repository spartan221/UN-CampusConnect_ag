export const calendarTypeDef = `
input EventInput {
    description: String!
    link: String!
    start_time: DateTime!
    end_time: DateTime!
    status: Boolean!
}
type Event {
    id: ID!
    description: String!
    link: String!
    start_time: DateTime!
    end_time: DateTime!
    status: Boolean!
}
  
`;

export const calendarQueries = `
    getevents: [Event]
    geteventid(id: String!): Event
`;

export const calendarMutations = `
    createEvent(Event: EventInput!): Event
    updateEvent(id: String!, Event: EventInput!): Event
    deleteEvent(id: String!): Event
`;