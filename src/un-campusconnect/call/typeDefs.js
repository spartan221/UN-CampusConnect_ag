export const callTypeDef = `
input CallInput {
    maximunParticipants: Int!
    nameGroup: String!
    place: String!
    schedule: String!
    deadline: String!
    status: String!
    participants: [String]
}
type Call {
    id: ID!
    maximunParticipants: Int!
    nameGroup: String!
    place: String!
    schedule: String!
    deadline: String!
    status: String!
    participants: [String]!
}
type ListParticipants{
    participants: [String]!
}
input ListParticipantsInput{
    participants: [String]!
}
`;

export const callQueries = `
    getListParticipants(id: String!): [String]!
    getCall(id: String!): Call!
    getCalls: [Call]
`;

export const callMutations = `
    enrollmentCall( id: String!): Call
    closeCall(id: String!): Call
    updateCall(Call: CallInput!,id: String! ): Call
    addCall(Call: CallInput!): Call
    deleteCall(id: String!):Call
`