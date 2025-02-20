import {INodeProperties} from 'n8n-workflow';

export const apiFilters: INodeProperties[] = [

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
	{
		displayName: 'Calendar Data Filter',
		name: 'additionalCalendarDataFilter',
		type: 'collection',
		default: {},
		placeholder: 'Add Filter',
		displayOptions: {
			show: {
				resource: [
					'bookings',
				],
				operation: [
					'getBookings',
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
			},
			//client_id
			{
				displayName: 'Client Name or ID',
				name: 'client_id',
				type: 'options',
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				typeOptions: {
					loadOptionsMethod: 'getClientsWithEmpty',
				},
				default: '',
				routing: {
					request: {
						qs: {
							filter: {
								client_id: '={{$value}}',
							}
						},
					},
				}
			},
		],
	},

	{
		displayName: 'Clients Filter',
		name: 'clientsFilter',
		type: 'collection',
		default: {},
		placeholder: 'Add Filter',
		displayOptions: {
			show: {
				resource: [
					'clients',
				],
				operation: [
					'getClients',
				],
			},
		},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				description: 'Search for clients by name or email or phone number',
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

];
