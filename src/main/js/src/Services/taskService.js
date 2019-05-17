import config from 'config';
import { authHeader } from '@/Utilities';
import { handleResponse, handleNotification } from '@/Utilities';

export const taskService = {
    getTasksToday,
    completeTask,
    getTasksInbox,
    getTasksUpcoming,
    getTasksCompleted,
    getTasksDashboard,
    create
};

function getTasksToday(date) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/tasks/today?date=${date}`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Tasks")
        });
}

function getTasksInbox() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/tasks/inbox`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Tasks")
        });
}

function getTasksUpcoming() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/tasks/upcoming`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Tasks")
        });
}

function getTasksDashboard() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/tasks/dashboard`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Tasks")
        });
}

function getTasksCompleted() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/tasks/completed`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Tasks")
        });
}

function completeTask(data) {
    const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(data) };
    return fetch(`${config.apiUrl}/tasks/task/complete`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Tasks")
        });
}


function create(description, date, time, tags) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ description, date, time, tags })
    };

    return fetch(`${config.apiUrl}/tasks`, requestOptions)
        .then(handleResponse)
        .then(function(response){
            if (response.success)
                handleNotification("success", "Task Created Successfully")
                return response.message
        })
        .catch(function(error) {
            handleNotification("error", "Unable to Create Task")
        })
}