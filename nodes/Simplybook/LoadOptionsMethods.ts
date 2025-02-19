import {ILoadOptionsFunctions, INodePropertyOptions} from "n8n-workflow";
import {simplybookApiRequestAllItems} from "./GenericFunctions";

export const loadOptionsMethods = {

	async getProducts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		const qs = {
			type: 'product',
		};
		const products = await simplybookApiRequestAllItems.call(this, 'data', 'GET', '/products', {}, qs);
		for (const product of products) {
			const productName = product.name;
			const productId = product.id;
			returnData.push({
				name: productName,
				value: productId,
			});
		}
		return returnData;
	},

	async getServices(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		const services = await simplybookApiRequestAllItems.call(this, 'data', 'GET', '/services');
		for (const service of services) {
			const serviceName = service.name;
			const serviceId = service.id;
			returnData.push({
				name: serviceName,
				value: serviceId,
			});
		}
		return returnData;
	},

	async getProviders(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		const providers = await simplybookApiRequestAllItems.call(this, 'data', 'GET', '/providers');
		for (const provider of providers) {
			const providerName = provider.name;
			const providerId = provider.id;
			returnData.push({
				name: providerName,
				value: providerId,
			});
		}
		return returnData;
	},


	async getLocations(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		const locations = await simplybookApiRequestAllItems.call(this, 'data', 'GET', '/locations');
		for (const location of locations) {
			const locationName = location.name;
			const locationId = location.id;
			returnData.push({
				name: locationName,
				value: locationId,
			});
		}
		return returnData;
	},

	async getCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		const categories = await simplybookApiRequestAllItems.call(this, 'data', 'GET', '/categories');
		for (const category of categories) {
			const categoryName = category.name;
			const categoryId = category.id;
			returnData.push({
				name: categoryName,
				value: categoryId,
			});
		}
		return returnData;
	},


	async getClients(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		const clients = await simplybookApiRequestAllItems.call(this, 'data', 'GET', '/clients');
		for (const client of clients) {
			const clientName = client.name;
			const clientId = client.id;
			returnData.push({
				name: clientName,
				value: clientId,
			});
		}
		return returnData;
	},

	async getServicesWithEmpty(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		returnData.push({
			name: '',
			value: '',
		});
		const services = await loadOptionsMethods.getServices.call(this);
		return returnData.concat(services);
	},

	async getProvidersWithEmpty(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		returnData.push({
			name: '',
			value: '',
		});
		const providers = await loadOptionsMethods.getProviders.call(this);
		return returnData.concat(providers);
	},

	async getProductsWithEmpty(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		returnData.push({
			name: '',
			value: '',
		});
		const products = await loadOptionsMethods.getProducts.call(this);
		return returnData.concat(products);
	},

	async getClientsWithEmpty(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		returnData.push({
			name: '',
			value: '',
		});
		const clients = await loadOptionsMethods.getClients.call(this);
		return returnData.concat(clients);
	},

	async getLocationsWithEmpty(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		returnData.push({
			name: '',
			value: '',
		});
		const locations = await loadOptionsMethods.getLocations.call(this);
		return returnData.concat(locations);
	},

	async getCategoriesWithEmpty(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
		const returnData: INodePropertyOptions[] = [];
		returnData.push({
			name: '',
			value: '',
		});
		const categories = await loadOptionsMethods.getCategories.call(this);
		return returnData.concat(categories);
	},
}
