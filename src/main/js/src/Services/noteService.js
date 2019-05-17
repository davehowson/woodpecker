import config from 'config';
import { authHeader } from '@/Utilities';
import { handleResponse, handleNotification } from '@/Utilities';

export const noteService = {
    getNotesByTag,
    getNote,
    deleteNote,
    update,
    create
};

function getNotesByTag(pageNumber, tag) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let url = `${config.apiUrl}/notes?page=${pageNumber}`;;
    if (tag != null) {
        url = `${config.apiUrl}/notes/tag?tag=${tag}&page=${pageNumber}`;
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Notes")
        });
}

function getNote(noteId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/notes/note?noteId=${noteId}`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Notes")
        });
}

function deleteNote(noteId) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    return fetch(`${config.apiUrl}/notes/${noteId}`, requestOptions)
        .then(handleResponse)
        .then(() => {
            handleNotification("success", "Note Deleted Successfully")
        })
        .catch(function(error){
            handleNotification("error", "Unable to Delete Note")
        });
}


function create(title, description, tagNames) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ title, description, tagNames })
    };

    return fetch(`${config.apiUrl}/notes`, requestOptions)
        .then(handleResponse)
        .then(function(response){
            if (response.success)
                handleNotification("success", "Note Created Successfully")
                return response.message  
        })
        .catch(function(error) {
            handleNotification("error", "Unable to Create Note")
        })
}

function update(id, title, description, tagNames) {
    const requestOptions = {
        method: 'PATCH',
        headers: authHeader(),
        body: JSON.stringify({ id, title, description, tagNames })
    };

    return fetch(`${config.apiUrl}/notes`, requestOptions)
        .then(handleResponse)
        .then(function(response){
            if (response.success)
                handleNotification("success", "Note Updated Successfully")
                return response.message
        })
        .catch(function(error) {
            handleNotification("error", "Unable to Update Note")
        })
}