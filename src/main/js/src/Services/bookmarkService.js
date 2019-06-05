import { authHeader } from '@/Utilities';
import { useHandleResponse } from '@/Utilities';


export function useGetCategories() {
    const handleResponse = useHandleResponse();

    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${process.env.API_URL}/bookmarks/category?page=0&size=20`, requestOptions)
        .then(handleResponse)
}

export function useGetBookmarks(category) {

    const handleResponse = useHandleResponse();

    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${process.env.API_URL}/bookmarks?id=${category}&page=0&size=20`, requestOptions)
        .then(handleResponse)
}
