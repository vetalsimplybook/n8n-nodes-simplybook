import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

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
						name: 'Slot',
						value: 'slots',
					}
				],
				default: 'services',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'services',
						],
					},
				},
				options: [
					{
						name: 'Get Services',
						value: 'getServices',
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
											//params: '={{$responseItem}}',
											providers: '={{$responseItem.providers}}',
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
				default: 'getServices',
			},

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'providers',
						],
					},
				},
				options: [
					{
						name: 'Get Providers',
						value: 'getProviders',
						action: 'Get providers',
						description: 'Get providers with filter search',
						routing: {
							request: {
								url: '=/providers',
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
											email: '={{$responseItem.email}}',
											phone: '={{$responseItem.phone}}',
											picture: '={{$responseItem.picture_preview}}',
											is_active: '={{$responseItem.is_active}}',
											is_visible: '={{$responseItem.is_visible}}',
											//params: '={{$responseItem}}',
											services: '={{$responseItem.services}}',
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
				default: 'getProviders',
			},

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'locations',
						],
					},
				},
				options: [
					{
						name: 'Get Locations',
						value: 'getLocations',
						action: 'Get locations',
						description: 'Get locations with filter search',
						routing: {
							request: {
								url: '=/locations',
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
											picture: '={{$responseItem.picture_preview}}',
											address: '={{$responseItem.address1 + " " + $responseItem.address2}}',
											city: '={{$responseItem.city}}',
											country: '={{$responseItem.country_id}}',
											zip: '={{$responseItem.zip}}',
											lat: '={{$responseItem.lat}}',
											lon: '={{$responseItem.lng}}',
											is_visible: '={{$responseItem.is_visible}}',
											providers: '={{$responseItem.providers}}',
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
				default: 'getLocations',
			},

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'categories',
						],
					},
				},
				options: [
					{
						name: 'Get Categories',
						value: 'getCategories',
						action: 'Get categories',
						description: 'Get categories with filter search',
						routing: {
							request: {
								url: '=/categories',
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
											picture: '={{$responseItem.picture_preview}}',
											is_visible: '={{$responseItem.is_visible}}',
											services: '={{$responseItem.services}}',
											//params: '={{$responseItem}}',
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
				default: 'getCategories',
			},

			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'slots',
						],
					},
				},
				options: [
					{
						name: 'Get Slots',
						value: 'getSlots',
						action: 'Get slots',
						description: 'Return array of available slots to book as admin',
						routing: {
							request: {
								url: '=/schedule/slots',
								qs: {
									//in mysql format
									date: '={{ new Date($parameter["date"]).toISOString().slice(0, 10) }}',
									provider_id: '={{$parameter["provider_id"]}}',
									service_id: '={{$parameter["service_id"]}}',
								},
							},
							output: {
								postReceive: [
									{
										type: 'setKeyValue',
										properties: {
											data: '={{$responseItem}}',
										},
									},
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
											date: '={{$responseItem.date}}',
											time: '={{$responseItem.time}}',
										},
									},
								],
							},
						},
					},
				],
				default: 'getSlots',
			},

			{
				displayName: 'Service ID',
				name: 'service_id',
				type: 'number',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'slots',
						],
						operation: [
							'getSlots',
						],
					},
				},
			},
			{
				displayName: 'Provider ID',
				name: 'provider_id',
				type: 'number',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'slots',
						],
						operation: [
							'getSlots',
						],
					},
				},
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'slots',
						],
						operation: [
							'getSlots',
						],
					},
				},
			},


			{
				displayName: 'Additional Service Filter',
				name: 'additionalServiceFilter',
				type: 'collection',
				default: {},
				placeholder: 'Add Filter',
				displayOptions: {
					show: {
						resource: [
							'services',
							//'providers',
						],
						operation: [
							'getServices',
							//'getProviders',
						],
					},
				},
				options: [
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						routing: {
							request: {
								// You've already set up the URL. qs appends the value of the field as a query string
								qs: {
									filter: {
										search: '={{$value}}',
									}
								},
							},
						},
					}
				],
			},

			{
				displayName: 'Additional Provider Filter',
				name: 'additionalProviderFilter',
				type: 'collection',
				default: {},
				placeholder: 'Add Filter',
				displayOptions: {
					show: {
						resource: [
							'providers',
						],
						operation: [
							'getProviders',
						],
					},
				},
				options: [
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						routing: {
							request: {
								// You've already set up the URL. qs appends the value of the field as a query string
								qs: {
									filter: {
										search: '={{$value}}',
									}
								},
							},
						},
					},
					{
						displayName: 'Provider ID (Filter Providers by Service)',
						name: 'providerId',
						type: 'number',
						default: '',
						routing: {
							request: {
								qs: {
									filter: {
										service_id: '={{parseInt($value)}}',
									}
								},
							},
						},

					}
				],
			},

			{
				displayName: 'Additional Location Filter',
				name: 'additionalLocationFilter',
				type: 'collection',
				default: {},
				placeholder: 'Add Filter',
				displayOptions: {
					show: {
						resource: [
							'locations',
						],
						operation: [
							'getLocations',
						],
					},
				},
				options: [
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						routing: {
							request: {
								qs: {
									filter: {
										search: '={{$value}}',
									}
								},
							},
						},
					}
				],
			},

			{
				displayName: 'Additional Category Filter',
				name: 'additionalCategoryFilter',
				type: 'collection',
				default: {},
				placeholder: 'Add Filter',
				displayOptions: {
					show: {
						resource: [
							'categories',
						],
						operation: [
							'getCategories',
						],
					},
				},
				options: [
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						routing: {
							request: {
								qs: {
									filter: {
										search: '={{$value}}',
									}
								},
							},
						},
					}
				],
			},
		],
	};
}
