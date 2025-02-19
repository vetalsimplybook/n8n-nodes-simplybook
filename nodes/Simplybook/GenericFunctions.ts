import {
	IDataObject,
	IExecuteFunctions, IHookFunctions, IHttpRequestMethods, IHttpRequestOptions,
	ILoadOptionsFunctions, IWebhookFunctions, JsonObject, NodeApiError,
} from 'n8n-workflow';
import * as crypto from "node:crypto";


export var simplybookApiCache: { [key: string]: any } = {};
export var simplybookApiCacheValidTime = 600000; //10 minutes

export async function simplybookApiRequest(
	this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,

	body: any = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('SimplybookApi');
	const url = credentials.url as string;

	//if this not IHookFunctions, check cache
	let cacheKey = await simplybookApiGetHash(JSON.stringify({method, resource, body, qs, uri}) + 'v1', 'SHA-1');
	if(!(this as IHookFunctions)) {
		if (simplybookApiCache[cacheKey] !== undefined) {
			var isCacheValid = (Date.now() - simplybookApiCache[cacheKey + '_timestamp']) < simplybookApiCacheValidTime; //cache is valid for 1 minute
			if (isCacheValid) {
				console.log("Cache hit");
				return simplybookApiCache[cacheKey];
			}
		}
	}

	let options: IHttpRequestOptions = {
		headers: {
			// 'X-Company-Login': credentials.company as string,
			// 'X-Token': credentials.sessionToken as string,
			'User-Agent': 'n8n',
		},
		method,
		qs,
		body,
		url: `${url.endsWith('/') ? url.slice(0, -1) : url}${resource}`,
		json: true,
	};
	options = Object.assign({}, options, option);
	if (Object.keys(options.body as IDataObject).length === 0) {
		delete options.body;
	}

	if (!Object.keys(body).length) {
		delete options.body;
	}
	if (!Object.keys(qs).length) {
		delete options.qs;
	}
	options = Object.assign({}, options, option);

	try {
		// return await this.helpers.request(options);
		let responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'SimplybookApi', options);
		simplybookApiCache[cacheKey] = responseData;
		simplybookApiCache[cacheKey + '_timestamp'] = Date.now();
		return responseData;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an API request to paginated simplybook endpoint
 * and return all results
 */
export async function simplybookApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	propertyName: string,
	method: IHttpRequestMethods,
	resource: string,

	body: any = {},
	query: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];

	let responseData;

	query.on_page = 100;
	let maxApiCalls = 20;

	let uri: string | undefined;

	//create cache key as hash of all parameters
	let cacheKey = await simplybookApiGetHash(JSON.stringify({method, resource, body, query, uri}) + 'av1', 'SHA-1');

	//check if cache key exists
	if (simplybookApiCache[cacheKey] !== undefined) {
		var isCacheValid = (Date.now() - simplybookApiCache[cacheKey + '_timestamp']) < simplybookApiCacheValidTime; //cache is valid for 1 minute
		if (isCacheValid) {
			console.log("Cache hit");
			return simplybookApiCache[cacheKey];
		}
	}

	// do {
	// 	responseData = await simplybookApiRequest.call(this, method, resource, body, query, uri);
	// 	uri = responseData.nextPageLink;
	// 	returnData.push.apply(returnData, responseData[propertyName] as IDataObject[]);
	// } while (responseData.nextPageLink !== undefined && responseData.nextPageLink !== '');

	//check metadata parameter for pagination, with subparameters: items_count, pages_count, page, on_page

	let page = 1;
	responseData = await simplybookApiRequest.call(this, method, resource, body, query, uri);
	returnData.push.apply(returnData, responseData[propertyName] as IDataObject[]);
	while (responseData.metadata.pages_count > page) {
		page++;
		query.page = page;
		responseData = await simplybookApiRequest.call(this, method, resource, body, query, uri);
		returnData.push.apply(returnData, responseData[propertyName] as IDataObject[]);

		if(page > maxApiCalls) {
			break;
		}
	}

	//store data in cache
	simplybookApiCache[cacheKey] = returnData;
	simplybookApiCache[cacheKey + '_timestamp'] = Date.now();

	return returnData;
}

export async function simplybookApiGetHash(str: string | undefined, algo = 'SHA-256') {
	let strBuf = new TextEncoder().encode(str);
	return crypto.subtle.digest(algo, strBuf).then((hash) => {
		//window.hash = hash;
		// here hash is an arrayBuffer,
		// so we'll convert it to its hex version
		let result = '';
		const view = new DataView(hash);
		for (let i = 0; i < hash.byteLength; i += 4) {
			result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
		}
		return result;
	});
}


