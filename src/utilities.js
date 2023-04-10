import request from 'request-promise-native';
import { formatError } from 'graphql';

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
export async function generalRequest({ url, method, body, fullResponse, token }) {
	let parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse,

	};

	if (token) {
		parameters = {
			...parameters, headers: {
				'x-access-token': token,
				'Content-Type': 'application/json'
			}
		}
	}
	
	if (process.env.SHOW_URLS || true) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		// throw new Error('test');
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
export function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
export function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
export function mergeSchemas(typeDefs, queries, mutations) {
	let mergedSchemas = '';

	if (typeDefs) mergedSchemas += `${typeDefs.join('\n')}`;
	if (queries) mergedSchemas += `type Query { ${queries.join('\n')} }`;
	if (mutations) mergedSchemas += `type Mutation { ${mutations.join('\n')} }`;

	return mergedSchemas;
}

export function formatErr(error) {
	const data = formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		// const [message, code, description] = ['esto', 'es', 'una prueba'];
		return { message, code, description, path };
	}
	return data;
}
