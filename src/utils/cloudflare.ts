function formatDate(date: Date): string {
	return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
}

export async function getCloudflareAnalytics({ days = 30 }: { days?: number } = {}): Promise<number | null> {
	try {
		const since = formatDate(new Date(Date.now() - days * 24 * 60 * 60 * 1000));
		const until = formatDate(new Date());

		const query = `
        query AnalyticsQuery {
            viewer {
                zones(filter: { zoneTag: "${process.env.CLOUDFLARE_ZONE_ID}" }) {
                    httpRequests1dGroups(
                        limit: ${days},
                        filter: { date_geq: "${since}", date_leq: "${until}" }
                    ) {
                        sum {
                            countryMap {
                                clientCountryName
                            }
                        }
                    }
                }
            }
        }`;

		const response = await fetch('https://api.cloudflare.com/client/v4/graphql', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query }),
		});

		const data = await response.json();

		// Get unique countries from all days
		const uniqueCountries = new Set();
		data?.data?.viewer?.zones?.[0]?.httpRequests1dGroups?.forEach((group) => {
			group?.sum?.countryMap?.forEach((country) => {
				if (country.clientCountryName) {
					uniqueCountries.add(country.clientCountryName);
				}
			});
		});

		return uniqueCountries.size || null;
	} catch (error) {
		console.error('Failed to fetch Cloudflare analytics:', error);
		return null;
	}
}
