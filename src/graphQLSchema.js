import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	userTypeDef,
	userQueries,
	userMutations
} from './un-campusconnect/authentication/user-services/typeDefs';

import {
	authTypeDef,
	authQueries,
	authMutations
} from './un-campusconnect/authentication/auth-services/typeDefs';

import userResolvers from './un-campusconnect/authentication/user-services/resolvers';
import authResolvers from './un-campusconnect/authentication/auth-services/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		userTypeDef,
	],
	[
		userQueries,
		authQueries
	],
	[
		userMutations,
		authMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		userResolvers,
		authResolvers
	)
});
