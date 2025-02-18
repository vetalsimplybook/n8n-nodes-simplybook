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
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'SimplybookApi',
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
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: 'Service',
						value: 'services',
					},
					{
						name: 'Provider',
						value: 'providers',
					},
					{
						name: 'Location',
						value: 'locations',
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
						name: 'Slot',
						value: 'slots',
					},
					{
						name: 'Booking',
						value: 'bookings',
					}
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
	}
}
