export const userTypeDef = `
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        status: String!
    }
    type ExternalUsers {
        numUsers: Int!
    }
    input CreateUserInput {
        username: String!
        email: String!
        password: String!
        role: String!
    }
    input LoginUserInput {
        email: String!
        password: String!
    }
`;
export const userQueries = `
    getMyInfo: User!
    getUsers: [User]!
    getUserInfo(id: String!): User!
    getExternalUsers: ExternalUsers!
`;
export const userMutations = `
    unsubscribe: String!
`