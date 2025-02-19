import {INodeProperties} from 'n8n-workflow';


export const apiOperations: INodeProperties[] = [

	//Get Services operation
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
						qs: {
							page: '={{$parameter["page"]}}',
							on_page: '={{$parameter["on_page"]}}',
						}
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

	//Get Providers operation
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
						qs: {
							page: '={{$parameter["page"]}}',
							on_page: '={{$parameter["on_page"]}}',
						}
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

	//Get Locations operation
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
						qs: {
							page: '={{$parameter["page"]}}',
							on_page: '={{$parameter["on_page"]}}',
						}
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

	//Get Categories operation
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
						qs: {
							page: '={{$parameter["page"]}}',
							on_page: '={{$parameter["on_page"]}}',
						}
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


	//Get Clients operation
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'clients',
				],
			},
		},
		options: [
			{
				name: 'Get Clients',
				value: 'getClients',
				action: 'Get clients',
				description: 'Get clients list',
				routing: {
					request: {
						url: '=/clients',
						qs: {
							page: '={{$parameter["page"]}}',
							on_page: '={{$parameter["on_page"]}}',
						}
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
								type: 'sort',
								properties: {
									key: 'name',
								},
							},
						],
					}
				},
			},

			{
				name: 'Create Client',
				value: 'createClient',
				action: 'Create client',
				description: 'Create new client and return it',
				routing: {
					request: {
						url: '=/clients',
						method: 'POST',
						body: {
							name: '={{$parameter["name"]}}',
							email: '={{$parameter["email"]}}',
							phone: '={{$parameter["phone"]}}',
						},
					},
					output: {
					},
				},
			},

			//edit client
			{
				name: 'Edit Client',
				value: 'editClient',
				action: 'Edit client',
				description: 'Edit client and return it',
				routing: {
					request: {
						url: '=/clients/{{$parameter["client_id"]}}',
						method: 'POST',
						body: {
							name: '={{$parameter["name"]}}',
							email: '={{$parameter["email"]}}',
							phone: '={{$parameter["phone"]}}',
						},
					},
					output: {
					},
				},
			},

			//delete client
			{
				name: 'Delete Client',
				value: 'deleteClient',
				action: 'Delete client',
				routing: {
					request: {
						url: '=/clients/{{$parameter["client_id"]}}',
						method: 'DELETE',
					},
					output: {
					},
				},
			},

		],
		default: 'getClients',
	},

	//Get Slots operations
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
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
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
			{
				name: 'Get Available Slots',
				value: 'getAvailableSlots',
				action: 'Get available slots',
				description: 'Return array of available slots to book',
				routing: {
					request: {
						url: '=/schedule/available-slots',
						qs: {
							//in mysql format
							date: '={{ new Date($parameter["date"]).toISOString().slice(0, 10) }}',
							provider_id: '={{$parameter["provider_id"]}}',
							service_id: '={{$parameter["service_id"]}}',
							count: '={{$parameter["count"]}}',
							products: '={{$parameter["products"]}}',
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
			{
				name: 'Get First Available Slot',
				value: 'getFirstAvailableSlot',
				action: 'Get first available slot',
				description: 'Return first available slot for selected service/provider/date.It can return slot for different date in case all slots are busy for selected date',
				routing: {
					request: {
						url: '=/schedule/first-available-slot',
						qs: {
							//in mysql format
							date: '={{ new Date($parameter["date"]).toISOString().slice(0, 10) }}',
							provider_id: '={{$parameter["provider_id"]}}',
							service_id: '={{$parameter["service_id"]}}',
							count: '={{$parameter["count"]}}',
						},
					},
					// output: {
					// 	postReceive: [
					// 		{
					// 			type: 'setKeyValue',
					// 			properties: {
					// 				data: '={{$responseItem}}',
					// 			},
					// 		},
					// 		{
					// 			type: 'rootProperty',
					// 			properties: {
					// 				property: 'data',
					// 			},
					// 		},
					// 		{
					// 			type: 'setKeyValue',
					// 			properties: {
					// 				id: '={{$responseItem.id}}',
					// 				date: '={{$responseItem.date}}',
					// 				time: '={{$responseItem.time}}',
					// 			},
					// 		},
					// 	],
					// },
				},
			},

			{
				name: 'Get Slots Timeline',
				value: 'getSlotsTimeline',
				action: 'Get slots timeline',
				description: 'Return data for slots timeline per date. It can be used to show slots in calendar view.',
				routing: {
					request: {
						url: '=/timeline/slots',
						qs: {
							//in mysql format
							date_from: '={{ new Date($parameter["date_from"]).toISOString().slice(0, 10) }}',
							date_to: '={{ new Date($parameter["date_to"]).toISOString().slice(0, 10) }}',
							provider_id: '={{$parameter["provider_id"]}}',
							service_id: '={{$parameter["service_id"]}}',
							count: '={{$parameter["count"]}}',
							product_ids: '={{$parameter["products"]}}',
							with_available_slots: '={{$parameter["with_available_slots"]? 1 : 0}}',
							booking_id: '={{$parameter["booking_id"]? $parameter["booking_id"] : ""}}',
							skip_min_max_restriction: '={{$parameter["skip_min_max_restriction"]? 1 : 0}}',
						},
					},
					output: {
						postReceive: [
							//todo: create output with async function to get all slots
						],
					},
				},
			},

		],
		default: 'getSlots',
	},

	//Get bookings operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'bookings',
				],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Get Bookings',
				value: 'getBookings',
				action: 'Get bookings',
				description: 'Return bookings list',
				routing: {
					request: {
						url: '=/bookings',
						qs: {
							page: '={{$parameter["page"]}}',
							on_page: '={{$parameter["on_page"]}}',
							filter: {
								upcoming_only: '={{$parameter["upcoming_only"]? 1 : 0}}',
								status: '={{$parameter["status"]}}',
								services: '={{$parameter["services"]}}',
								providers: '={{$parameter["providers"]}}',
								client_id: '={{$parameter["client_id"]}}',
								date: '={{ new Date($parameter["date"]).toISOString().slice(0, 10) }}',
								search: '={{$parameter["search"]}}',
								additional_fields: '={{$parameter["additional_fields"]}}',
							},
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							}
						],
					},
				},
			},

			/**
			 * Create booking
			 * POST https://user-api-v2.simplybook.me/admin/bookings
			 * Content-Type: application/json
			 * X-Company-Login: <insert your company login>
			 * X-Token: <insert your token from auth step>
			 *
			 * {
			 *   "count": 1,
			 *   "start_datetime": "2020-12-02 09:30:00",
			 *   "location_id": 2,
			 *   "category_id": 2,
			 *   "provider_id": 4,
			 *   "service_id": 3,
			 *   "client_id": 10,
			 */

			{
				name: 'Make New Booking',
				value: 'createBooking',
				action: 'Create booking',
				description: 'Return booking result',
				routing: {
					request: {
						url: '=/bookings',
						method: 'POST',
						body: {
							count: '={{$parameter["count"]}}',
							start_datetime: '={{ new Date($parameter["datetime"]).toISOString().slice(0, 19) }}',
							location_id: '={{$parameter["location_id"]}}',
							category_id: '={{$parameter["category_id"]}}',
							provider_id: '={{$parameter["provider_id"]}}',
							service_id: '={{$parameter["service_id"]}}',
							client_id: '={{$parameter["client_id"]}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'bookings',
								},
							},
						],
					},
				},
			},

			//edit booking
			{
				name: 'Edit Booking',
				value: 'editBooking',
				action: 'Edit booking',
				description: 'Edit booking and return it',
				routing: {
					request: {
						url: '=/bookings/{{$parameter["booking_id_required"]}}',
						method: 'POST',
						body: {
							count: '={{$parameter["count"]}}',
							start_datetime: '={{ new Date($parameter["datetime"]).toISOString().slice(0, 19) }}',
							location_id: '={{$parameter["location_id"]}}',
							category_id: '={{$parameter["category_id"]}}',
							provider_id: '={{$parameter["provider_id"]}}',
							service_id: '={{$parameter["service_id"]}}',
							client_id: '={{$parameter["client_id"]}}',
						},
					},
					output: {
					},
				},
			},


		],
		default: 'getBookings',
	},

];
