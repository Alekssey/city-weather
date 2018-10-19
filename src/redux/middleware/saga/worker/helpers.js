export const weatherApiRequest = (url) => {
    return fetch(url)
        .then(response => response.json())
};