import config from 'config';
import { authHeader } from '@/Utilities';
import { handleResponse, handleNotification } from '@/Utilities';

export const bookmarkService = {
    getCategories,
    getBookmarks
};

function getCategories() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/bookmarks/category?page=0&size=20`, requestOptions)
        .then(handleResponse)
}

function getBookmarks(category) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/bookmarks?id=${category}&page=0&size=20`, requestOptions)
        .then(handleResponse)
}
