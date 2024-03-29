export async function fetchRestEndpoint(route, httpMethod, data) {
    let options = { method: httpMethod };
    if (data) {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(data);
    }
    const response = await fetch(route, options);
    if (response.ok) {
        return response;
    }
    else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}
//# sourceMappingURL=client-server.js.map