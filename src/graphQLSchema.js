import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLDateTime } from 'graphql-iso-date';

import { mergeSchemas } from './utilities';

import { DateTimeTypeDefinition } from 'graphql-scalars';

import {
	userTypeDef,
	userQueries,
	userMutations
} from './un-campusconnect/authentication/user-services/typeDefs';

import {
	authQueries,
	authMutations
} from './un-campusconnect/authentication/auth-services/typeDefs';

import {
	callTypeDef,
	callQueries,
	callMutations
} from './un-campusconnect/call/typeDefs';

import {
	bienestarTypeDef,
	bienestarQueries,
	bienestarMutations
} from './un-campusconnect/bienestar/typeDefs';

import {
	tutorprofileTypeDef,
	tutorprofileQueries,
	tutorprofileMutations
} from './un-campusconnect/tutorprofile/typeDefs';

import {
	calendarTypeDef,
	calendarQueries,
	calendarMutations
} from './un-campusconnect/calendar/typeDefs';

import userResolvers from './un-campusconnect/authentication/user-services/resolvers';
import authResolvers from './un-campusconnect/authentication/auth-services/resolvers';
import callResolvers from './un-campusconnect/call/resolvers';
import bienestarResolvers from './un-campusconnect/bienestar/resolvers';
import tutorprofileResolvers from './un-campusconnect/tutorprofile/resolvers';
import calendarResolvers from './un-campusconnect/calendar/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		DateTimeTypeDefinition,
		userTypeDef,
		callTypeDef,
		bienestarTypeDef,
		tutorprofileTypeDef,
		calendarTypeDef,
	],
	[
		userQueries,
		authQueries,
		callQueries,
		bienestarQueries,
		tutorprofileQueries,
		calendarQueries
	],
	[
		userMutations,
		authMutations,
		callMutations,
		bienestarMutations,
		tutorprofileMutations,
		calendarMutations
	],
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers:
		[
			merge(
				{ JSON: GraphQLJSON }, // allows scalar JSON
				userResolvers,
				authResolvers,
				callResolvers,
				bienestarResolvers,
				tutorprofileResolvers,
				calendarResolvers,
			),
			{DateTime: GraphQLDateTime}
		]
});
