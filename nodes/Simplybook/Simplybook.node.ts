import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import {apiOperations} from "./ApiOperations";
import {apiFilters} from "./ApiFilters";
import {apiQueryParams} from "./ApiQueryParams";
import {loadOptionsMethods} from "./LoadOptionsMethods";

export class Simplybook implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SimplyBook.me',
		name: 'simplybook',
		icon: 'file:simplybook.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume SimplyBook.me API',
		defaults: {
			name: 'SimplyBook.Me',
		},
		usableAsTool: true,
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [NodeConnectionType.Main],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'simplybookApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.url}}',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Booking',
						value: 'bookings',
					},
					{
						name: 'Category',
						value: 'categories',
					},
					{
						name: 'Client',
						value: 'clients',
					},
					{
						name: 'Location',
						value: 'locations',
					},
					{
						name: 'Provider',
						value: 'providers',
					},
					{
						name: 'Service',
						value: 'services',
					},
					{
						name: 'Slot',
						value: 'slots',
					},
				],
				default: 'services',
			},

			...apiOperations,
			...apiQueryParams,
			...apiFilters
		],
	};


	methods = {
		loadOptions: {
			...loadOptionsMethods
		}
	};

}
