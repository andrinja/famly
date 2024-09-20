export const api = {
	baseUrl: 'https://app.famly.co/api',

	async get<T>(path: string, params: Record<string, string> = {}) {
		const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
		const query = new URLSearchParams(params).toString();
		const url = `${this.baseUrl}${path}?accessToken=${accessToken}&${query}`;

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error fetching data: ${response.statusText}`);
			}

			return (await response.json()) as T;
		} catch (error) {
			console.error('GET request failed:', error);
			throw error;
		}
	},

	async post(path: string, body: Record<string, unknown> = {}) {
		const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

		const url = `${this.baseUrl}${path}`;

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Famly-Accesstoken': accessToken,
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new Error(`Error posting data: ${response.statusText}`);
			}
			return await response.json();
		} catch (error) {
			console.error('POST request failed:', error);
			throw error;
		}
	},
};
