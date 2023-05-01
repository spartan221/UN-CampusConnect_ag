export const bienestarTypeDef = `
input PublicationInput {
    title: String!
    content_publication: String!
    author_publication: String!
    publication_date: String!
    image: String!
}
type Publication {
    title: String!
    content_publication: String!
    author_publication: String!
    publication_date: String!
    publication_id: String!
    image: String!
}
type Message {
    message: String!
}

  
`;

export const bienestarQueries = `
    getpublications: [Publication]
    getpublicationid(id: String!): Publication
`;

export const bienestarMutations = `
    createPublication(publication: PublicationInput!): Message!
    updatePublication(id: String!, publication: PublicationInput!): Message!
    deletePublication(id: String!): Message!
`