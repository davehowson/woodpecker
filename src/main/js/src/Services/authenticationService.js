import { BehaviorSubject } from 'rxjs';
import { useSnackbar } from 'notistack';

import { useHandleResponse } from '@/Utilities';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

export function useLogin() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const login = (email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        return fetch(`${process.env.API_URL}/auth/login`, requestOptions)
            .then(handleResponse)
            .then(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
                return user;
            })
            .catch(function() {
                enqueueSnackbar("Failed to Login", {
                    variant: 'error'
                })
            })
    };

    return login;
}

export function useRegister() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const register = (name, email, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        };

        return fetch(`${process.env.API_URL}/auth/register`, requestOptions)
            .then(handleResponse)
            .then(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);

                return user;
            })
            .catch(function() {
                enqueueSnackbar("Failed to Register", {
                    variant: 'error'
                })
            })
    }

    return register
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
