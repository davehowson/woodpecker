import { authHeader, useHandleResponse } from '@/Utilities';
import { useSnackbar } from 'notistack';

export function useGetNotes() {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const getNotes = (pageNumber, tag, sort, direction) => {
        const requestOptions = { method: 'GET', headers: authHeader() };
        let url = `${process.env.API_URL}/notes?page=${pageNumber}&size=8&sort=${sort}&direction=${direction}`;
        if (tag !== 'all') {
            url = `${process.env.API_URL}/notes/tag?tag=${tag.toUpperCase()}&page=${pageNumber}&size=8&sort=${sort}&direction=${direction}`;
        }

        return fetch(url, requestOptions)
            .then(handleResponse)
            .catch(() => enqueueSnackbar('Could not load tasks', {
                variant: 'error'
            }))
    };

    return getNotes;

}

export function useManageNote() {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const getNote = (noteId) => {
        const requestOptions = { method: 'GET', headers: authHeader() };

        return fetch(`${process.env.API_URL}/notes/note?noteId=${noteId}`, requestOptions)
            .then(handleResponse)
            .catch(() => enqueueSnackbar('Could not load task', {
                variant: 'error'
            }));
    };


    const deleteNote = (noteId) => {
        const requestOptions = { method: 'DELETE', headers: authHeader() };

        return fetch(`${process.env.API_URL}/notes/${noteId}`, requestOptions)
            .then(handleResponse)
            .then(function(response){
                if (response.success)
                    enqueueSnackbar("Note Deleted Successfully", {
                        variant: 'warning'
                    });
                return response.message
            })
            .catch(function(){
                enqueueSnackbar("Failed to Delete Note", {
                    variant: 'error'
                });
            });
    };

    const create = (title, description, tag, important) => {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ title, description, tag, important })
        };

        return fetch(`${process.env.API_URL}/notes`, requestOptions)
            .then(handleResponse)
            .then(function(response){
                if (response.success)
                    enqueueSnackbar("Note Created Successfully", {
                        variant: 'success'
                    });
                return response.message
            })
            .catch(function() {
                enqueueSnackbar("Unable to Create Note", {
                    variant: 'error'
                });
            })
    };

    const update = (id, title, description, tag, important) => {
        const requestOptions = {
            method: 'PATCH',
            headers: authHeader(),
            body: JSON.stringify({id, title, description, tag, important})
        };

        return fetch(`${process.env.API_URL}/notes`, requestOptions)
            .then(handleResponse)
            .then(function (response) {
                if (response.success)
                    enqueueSnackbar("Note Updated Successfully", {
                        variant: 'success'
                    });
                return response.message
            })
            .catch(function (error) {
                enqueueSnackbar("Unable to Update Note", {
                    variant: 'error'
                });
            });
    };

    return [getNote, deleteNote, create, update];
}