import {
	IDataObject,
	IExecuteFunctions, IHttpRequestMethods, IHttpRequestOptions,
	ILoadOptionsFunctions, JsonObject, NodeApiError,
} from 'n8n-workflow';

export async function simplybookApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,

	body: any = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('SimplybookApi');
	const url = credentials.url as string;

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
		return await this.helpers.httpRequestWithAuthentication.call(this, 'SimplybookApi', options);
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

	return returnData;
}

