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

import {
	callTypeDef,
	callQueries,
	callMutations
} from './un-campusconnect/call/typeDefs';

import userResolvers from './un-campusconnect/authentication/user-services/resolvers';
import authResolvers from './un-campusconnect/authentication/auth-services/resolvers';
import callResolvers from './un-campusconnect/call/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		userTypeDef,
		callTypeDef ,
	],
	[
		userQueries,
		authQueries,
		callQueries
	],
	[
		userMutations,
		authMutations,
		callMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		userResolvers,
		authResolvers,
		callResolvers
	)
});
