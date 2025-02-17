import {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';

export class SimplybookApi implements ICredentialType {
	name = 'SimplybookApi';
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
			displayName: 'Simplybook API URL',
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
			type: 'hidden',  // Це поле не буде видно у UI
			typeOptions: {
				expirable: true,  // Це дозволяє маркувати токен як такий, що має термін дії
			},
			default: '',
		},
		{
			displayName: 'Refresh Token',
			name: 'refreshToken',
			type: 'hidden',  // Аналогічно, ховаємо refreshToken
			default: '',
		},
		{
			displayName: 'Token Expiry',
			name: 'tokenExpiry',
			type: 'hidden',  // І також ховаємо поле з терміном дії токену
			default: '',
		},
	];

	// Функція для отримання токену перед аутентифікацією
	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const { company, login, password } = credentials;

		const url = credentials.url as string;

		const	tokenLiveTime = 60; // Token will be valid for 60 minutes

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

		// Повертаємо токен та термін його дії
		return {
			sessionToken: authResponse.token,
			refreshToken: authResponse.refresh_token,
			tokenExpiry: Date.now() + tokenLiveTime * 60 * 1000,
		};
	}

	// Встановлюємо токен для аутентифікації
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Company-Login': '={{$credentials.company}}',
				'X-Token': '={{$credentials.sessionToken}}',
			},
		},
	};


	// Тестування з’єднання для перевірки правильності токену
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.url}}',
			url: '/services', // Приклад запиту для тестування
		},
	};
}
