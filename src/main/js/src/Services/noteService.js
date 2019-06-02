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
    let url = `${config.apiUrl}/notes?page=${pageNumber}&size=8`;;
    if (tag != 'all') {
        url = `${config.apiUrl}/notes/tag?tag=${tag.toUpperCase()}&page=${pageNumber}&size=8`;
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
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Notes")
        });
}


function create(title, description, tag, important) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ title, description, tag, important })
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

function update(id, title, description, tag, important) {
    const requestOptions = {
        method: 'PATCH',
        headers: authHeader(),
        body: JSON.stringify({ id, title, description, tag, important })
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
