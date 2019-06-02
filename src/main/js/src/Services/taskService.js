import { authHeader } from '@/Utilities';
import { handleResponse, handleNotification } from '@/Utilities';

export const taskService = {
    completeTask,
    getTasksDashboard,
    getTasks,
    create
};

function getTasks(scope, date) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${process.env.API_URL}/tasks/${scope}?date=${date}`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Tasks")
        });

}

function getTasksDashboard() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${process.env.API_URL}/tasks/dashboard`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Tasks")
        });

}

function completeTask(data) {
    const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(data) };
    return fetch(`${process.env.API_URL}/tasks/task/complete`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Complete Tasks")
        });

}


function create(description, date, time, tag, important) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ description, date, time, tag, important })
    };

    return fetch(`${process.env.API_URL}/tasks`, requestOptions)
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
