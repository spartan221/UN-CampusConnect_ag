export const userTypeDef = `
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
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
    getUserInfo: User!
    getUsers: [User]!
`;
export const userMutations = `
    unsubscribe: String!
`