import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { handleResponse } from '@/Utilities';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    register,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        })
        .catch(function(error) {
            console.log(error);
        })
}

function register(name, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    };

    return fetch(`${config.apiUrl}/auth/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        })
        .catch(function(error) {
            console.log(error);
        })
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

