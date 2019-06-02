import { authHeader } from '@/Utilities';
import { handleResponse, handleNotification } from '@/Utilities';

export const bookmarkService = {
    getCategories,
    getBookmarks
};

function getCategories() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${process.env.API_URL}/bookmarks/category?page=0&size=20`, requestOptions)
        .then(handleResponse)
}

function getBookmarks(category) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${process.env.API_URL}/bookmarks?id=${category}&page=0&size=20`, requestOptions)
        .then(handleResponse)
}
