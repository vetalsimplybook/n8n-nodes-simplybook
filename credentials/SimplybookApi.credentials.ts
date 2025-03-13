import {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';

export class SimplybookApi implements ICredentialType {
	name = 'simplybookApi';
	displayName = 'SimplyBook API';
	documentationUrl = 'https://help.simplybook.me/index.php/User_API_guide';
	//icon = { light: 'file:icons/simplybook.svg', dark: 'file:icons/SimplyBook.dark.svg' } as const;

	httpRequestNode = {
		name: 'SimplyBook',
		docsUrl: 'https://help.simplybook.me/index.php/User_API_guide',
		apiBaseUrl: 'https://user-api-v2.simplybook.me/admin',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Simplybook API URL (without trailing slash)',
			name: 'url',
			type: 'string',
			required: true,
			default: 'https://user-api-v2.simplybook.me/admin',
		},
		{
			displayName: 'Company',
			name: 'company',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Login',
			name: 'login',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			required: true,
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Session Token',
			name: 'sessionToken',
			type: 'hidden',
			typeOptions: {
				expirable: true,
			},
			default: '',
		},
		{
			displayName: 'Refresh Token',
			name: 'refreshToken',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Token Expiry',
			name: 'tokenExpiry',
			type: 'hidden',
			default: '',
		},
	];


	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const { company, login, password } = credentials;

		const url = credentials.url as string;

		const	tokenLiveTime = 45; // Token will be valid for 60 minutes

		const authResponse = await this.helpers.httpRequest({
			method: 'POST',
			url: `${url.endsWith('/') ? url.slice(0, -1) : url}/auth`,
			headers: { 'Content-Type': 'application/json' },
			body: {
				company,
				login,
				password,
			},
			json: true,
		});


		return {
			sessionToken: authResponse.token,
			refreshToken: authResponse.refresh_token,
			tokenExpiry: Date.now() + tokenLiveTime * 60 * 1000,
		};
	}


	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Company-Login': '={{$credentials.company}}',
				'X-Token': '={{$credentials.sessionToken}}',
			},
		},
	};



	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.url}}',
			url: '/services',
		},
	};
}
