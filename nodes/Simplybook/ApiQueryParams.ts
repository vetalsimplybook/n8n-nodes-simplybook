import {INodeProperties} from 'n8n-workflow';

export const apiQueryParams: INodeProperties[] = [

	{
		displayName: 'Service Name or ID',
		name: 'service_id',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		//required: true,
		typeOptions: {
			loadOptionsMethod: 'getServicesWithEmpty',
		},
		displayOptions: {
			show: {
				resource: [
					'slots',
					'bookings',
				],
				operation: [
					'getSlots',
					'getAvailableSlots',
					'getFirstAvailableSlot',
					'getSlotsTimeline',
					'getBookings',
					'createBooking',
					'editBooking',
				],
			},
		},
	},
	{
		displayName: 'Provider Name or ID',
		name: 'provider_id',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		//required: true,
		typeOptions: {
			loadOptionsMethod: 'getProvidersWithEmpty',
		},
		displayOptions: {
			show: {
				resource: [
					'slots',
					'bookings'
				],
				operation: [
					'getSlots',
					'getAvailableSlots',
					'getFirstAvailableSlot',
					'getSlotsTimeline',
					'getBookings',
					'createBooking',
					'editBooking',
				],
			},
		},
	},
	//location_id
	{
		displayName: 'Location Name or ID',
		name: 'location_id',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		//required: true,
		typeOptions: {
			loadOptionsMethod: 'getLocationsWithEmpty',
		},
		displayOptions: {
			show: {
				resource: [
					'bookings',
				],
				operation: [
					'createBooking',
					'editBooking',
				],
			},
		},
	},
	{
		displayName: 'Category Name or ID',
		name: 'category_id',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
		//required: true,
		typeOptions: {
			loadOptionsMethod: 'getCategoriesWithEmpty',
		},
		displayOptions: {
			show: {
				resource: [
					'bookings',
				],
				operation: [
					'createBooking',
					'editBooking',
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
					'getAvailableSlots',
					'getFirstAvailableSlot',
				],
			},
		},
	},
	{
		displayName: 'Date and Time',
		name: 'datetime',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'bookings',
				],
				operation: [
					'createBooking',
					'editBooking',
				],
			},
		},
	},
	{
		displayName: 'Date From',
		name: 'date_from',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'slots',
					'bookings',
				],
				operation: [
					'getSlotsTimeline',
					'getBookings',
				],
			},
		},
	},
	{
		displayName: 'Date To',
		name: 'date_to',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'slots',
					'bookings',
				],
				operation: [
					'getSlotsTimeline',
					'getBookings',
				],
			},
		},
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		default: 1,
		required: true,
		displayOptions: {
			show: {
				resource: [
					'slots',
					'bookings',
				],
				operation: [
					'getAvailableSlots',
					'getFirstAvailableSlot',
					'getSlotsTimeline',
					'createBooking',
					'editBooking',
				],
			},
		},
	},
	{
		displayName: 'Product ID Names or IDs',
		name: 'products',
		type: 'multiOptions',
		required: true,
		description: 'Choose product from the list. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		default: [],
		typeOptions: {
			loadOptionsMethod: 'getProductsWithEmpty',
		},
		displayOptions: {
			show: {
				resource: [
					'slots',
				],
				operation: [
					'getAvailableSlots',
					'getSlotsTimeline',
				],
			},
		},
	},

	{
		displayName: 'Skip Min Max Restriction',
		name: 'skip_min_max_restriction',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: [
					'slots',
				],
				operation: [
					'getSlotsTimeline',
				],
			},
		},
	},

	{
		displayName: 'With Available Slots',
		name: 'with_available_slots',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: [
					'slots',
				],
				operation: [
					'getSlotsTimeline',
				],
			},
		},
	},
	{
		displayName: 'Upcomming Bookings Only',
		name: 'upcoming_only',
		type: 'boolean',
		default: false,
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
	},
	//status - booking status (can be confirmed/confirmed_pending/pending/canceled)
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'All',
				value: '',
			},
			{
				name: 'Confirmed',
				value: 'confirmed',
			},
			{
				name: 'Confirmed Pending',
				value: 'confirmed_pending',
			},
			{
				name: 'Pending',
				value: 'pending',
			},
			{
				name: 'Canceled',
				value: 'canceled',
			},
		],
		default: '',
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
	},

	{
		displayName: 'Booking ID',
		name: 'booking_id',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'slots',
				],
				operation: [
					'getSlotsTimeline',
				],
			},
		},
	},
	{
		displayName: 'Booking ID',
		name: 'booking_id_required',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'bookings',
				],
				operation: [
					'editBooking',
				],
			},
		},
	},

	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		required: true,
		displayOptions: {
			show: {
				resource: [
					'bookings',
					'clients',
					// 'services',
					// 'providers',
					// 'locations',
					// 'categories',
				],
				operation: [
					'getBookings',
					'getClients',
					// 'getServices',
					// 'getProviders',
					// 'getLocations',
					// 'getCategories',
				],
			},
		},
	},
	{
		displayName: 'On Page',
		name: 'on_page',
		type: 'number',
		default: 100,
		required: true,
		displayOptions: {
			show: {
				resource: [
					'bookings',
					'clients',
					// 'services',
					// 'providers',
					// 'locations',
					// 'categories',
				],
				operation: [
					'getBookings',
					'getClients',
					// 'getServices',
					// 'getProviders',
					// 'getLocations',
					// 'getCategories',
				],
			},
		},
	},
	//add name, email and phone number
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'clients',
				],
				operation: [
					'createClient',
					'editClient',
				],
			},
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'clients',
				],
				operation: [
					'createClient',
					'editClient',
				],
			},
		},
	},
	{
		displayName: 'Phone Number',
		name: 'phone',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'clients',
				],
				operation: [
					'createClient',
					'editClient',
				],
			},
		},
	},

	//client_id
	{
		displayName: 'Client Name or ID',
		name: 'client_id',
		type: 'options',
		//required: true,
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		typeOptions: {
			loadOptionsMethod: 'getClientsWithEmpty',
		},
		default: '',
		displayOptions: {
			show: {
				resource: [
					'clients',
					'bookings',
				],
				operation: [
					'editClient',
					'deleteClient',
					'createBooking',
					'editBooking',
				],
			},
		},
		routing: {
			request: {
				qs: {
					 client_id: '={{$value}}',
				},
			},
		}
	},


];
