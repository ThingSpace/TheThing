export function logError(context: string, error: unknown) {
	if (error instanceof Error) {
		console.error(`[${new Date().toISOString()}] [${context}]`, error.message, error.stack);
	} else {
		console.error(`[${new Date().toISOString()}] [${context}]`, error);
	}
}
