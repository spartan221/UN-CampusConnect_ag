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

type Message1 {
    message: String!
}
  
`;

export const calendarQueries = `
    getEvents: [Event]
    getEventId(id: String!): Event
`;

export const calendarMutations = `
    createEvent(Event: EventInput!): Message1
    updateEvent(id: ID!, Event: EventInput!): Message1
    deleteEvent(id: String!): Message1
`;