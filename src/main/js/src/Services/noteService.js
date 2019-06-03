import { authHeader } from '@/Utilities';
import { handleResponse, handleNotification } from '@/Utilities';

export const noteService = {
    getNotesByTag,
    getNote,
    deleteNote,
    update,
    create
};

function getNotesByTag(pageNumber, tag, sort, direction) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let url = `${process.env.API_URL}/notes?page=${pageNumber}&size=8&sort=${sort}&direction=${direction}`;
    if (tag != 'all') {
        url = `${process.env.API_URL}/notes/tag?tag=${tag.toUpperCase()}&page=${pageNumber}&size=8&sort=${sort}&direction=${direction}`;
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Notes")
        });
}

function getNote(noteId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${process.env.API_URL}/notes/note?noteId=${noteId}`, requestOptions)
        .then(handleResponse)
        .catch(function(error){
            handleNotification("error", "Unable to Fetch Notes")
        });
}

function deleteNote(noteId) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    return fetch(`${process.env.API_URL}/notes/${noteId}`, requestOptions)
        .then(handleResponse)
        .then(function(response){
            if (response.success)
                handleNotification("success", "Note Deleted Successfully")
            return response.message
        })
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

    return fetch(`${process.env.API_URL}/notes`, requestOptions)
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

    return fetch(`${process.env.API_URL}/notes`, requestOptions)
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
