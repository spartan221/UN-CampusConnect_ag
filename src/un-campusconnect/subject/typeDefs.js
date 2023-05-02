export const SubjectTypeDef = `
input SubjectInput {
    name: String!
    description: String!
    category: String!
    status: Boolean!
    file: string!
}
type Subject {
    id: ID!
    name: String!
    description: String!
    category: String!
    status: Boolean!
    file: string!
}

`;

export const SubjectQueries = ` 
    getSubject: [Subject]
    getSubject(id: String!): Subject
`;

export const SubjectMutations = `
    createSubject(Subject: SubjectInput!): Message!
    updateSubject(id: String!, Subject: SubjectInput!): Message!
    deleteSubject(id: String!): Message!
`