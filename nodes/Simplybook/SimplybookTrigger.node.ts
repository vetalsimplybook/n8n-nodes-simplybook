import {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData, NodeConnectionType
} from 'n8n-workflow';
import {simplybookApiRequest, snakeCase} from "./GenericFunctions";

export class SimplybookTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SimplyBook.me Trigger',
		name: 'simplybookTrigger',
		icon: 'file:simplybook.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Handle SimplyBook.me events via webhooks.',
		defaults: {
			name: 'SimplyBook.Me Trigger',
		},
		inputs: [],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
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
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				default: 'newBooking',
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: "Cancelled Booking",
						description: 'Triggers when a booking is canceled',
						value: "cancelBooking"
					},
					{
						name: "New Booking",
						description: 'Triggers when a new booking is created',
						value: "newBooking"
					},
					{
						name: "New Invoice",
						description: 'Triggers when a new invoice is created',
						value: "newInvoice"
					},
					{
						name: "Updated Booking Details",
						description: 'Triggers when the following booking details are updated: date, time, service, or provider',
						value: "changeBooking"
					},
					{
						name: "New Client",
						description: 'Triggers when new client created',
						value: "newClient"
					},
					{
						name: "New Offer",
						description: 'Triggers when a new offer is created',
						value: "newOffer"
					}
				],
				required: true,
			},
		],
	};


	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;
				const webhooks = await simplybookApiRequest.call(this, 'GET', '/webhooks');

				for (const webhook of webhooks) {
					if (webhook.url === webhookUrl && webhook.event === snakeCase(event)) {
						webhookData.webhookId = webhook.id;
						return true;
					}
				}
				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const event = this.getNodeParameter('event') as string;
				const body: IDataObject = {
					event: snakeCase(event),
					url: webhookUrl,
				};
				const webhook = await simplybookApiRequest.call(this, 'POST', '/webhooks', body);
				webhookData.webhookId = webhook.id;
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				try {
					await simplybookApiRequest.call(this, 'DELETE', `/webhooks/${webhookData.webhookId}`);
				} catch (error) {
					return false;
				}
				delete webhookData.webhookId;
				return true;
			},
		}
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		return {
			workflowData: [this.helpers.returnJsonArray(req.body as IDataObject[])],
		};
	}

}
