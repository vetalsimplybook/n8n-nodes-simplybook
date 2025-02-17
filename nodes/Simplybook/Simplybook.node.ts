import {INodeType, INodeTypeDescription, NodeConnectionType} from 'n8n-workflow';

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
				options: [
					{
						name: 'Service',
						value: 'service',
					},
				],
				default: 'service',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'service',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get services',
						description: 'Get services with filter search',
						routing: {
							request: {
								url: '=/services',
							},
							output: {
								postReceive: [
									{
										type: 'rootProperty',
										properties: {
											property: 'data',
										},
									},
									{
										type: 'setKeyValue',
										properties: {
											id: '={{$responseItem.id}}',
											name: '={{$responseItem.name}}',
											description: '={{$responseItem.description}}',
											price: '={{$responseItem.price}}',
											currency: '={{$responseItem.currency}}',
											duration: '={{$responseItem.duration}}',
											picture: '={{$responseItem.picture_preview}}',
											is_active: '={{$responseItem.is_active}}',
											is_visible: '={{$responseItem.is_visible}}',
											tax_ratio: '={{$responseItem.tax? $responseItem.tax.ratio : 0}}',
											params: '={{$responseItem}}',
										},
									},
									{
										type: 'sort',
										properties: {
											key: 'name',
										},
									},
								],
							}
						},


					},

				],
				default: 'get',
			},
		],
	};
}
