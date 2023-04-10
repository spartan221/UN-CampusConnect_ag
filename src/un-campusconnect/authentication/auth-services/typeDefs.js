export const authQueries = `
    signin(user: LoginUserInput!): String!
    resendEmail(email: String!): String!
`;
export const authMutations = `
    signup(user: CreateUserInput!): String!
    confirmEmail(token: String!): String!
`