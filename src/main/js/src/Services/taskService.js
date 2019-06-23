import { authHeader, useHandleResponse } from '@/Utilities';
import { useSnackbar } from 'notistack';

export function useGetTasks() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const getTasks = (category, scope) => {
        const requestOptions = { method: 'GET', headers: authHeader() };
        return fetch(
            `${process.env.API_URL}/tasks?category=${category}&scope=${scope}`,
            requestOptions
        )
            .then(handleResponse)
            .catch(function(error) {
                enqueueSnackbar('Unable to Fetch Tasks', {
                    variant: 'error',
                });
            });
    };

    return getTasks;
}

export function useCompleteTask() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const completeTask = data => {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(data),
        };
        return fetch(
            `${process.env.API_URL}/tasks/task/complete`,
            requestOptions
        )
            .then(handleResponse)
            .then(response => {
                if (response.status) {
                    enqueueSnackbar('Task Marked Complete', {
                        variant: 'success',
                    });
                } else {
                    enqueueSnackbar('Task Marked Incomplete', {
                        variant: 'info',
                    });
                }
            })
            .catch(function() {
                enqueueSnackbar('Unable to Complete Tasks', {
                    variant: 'error',
                });
            });
    };

    return completeTask;
}

export function useCreateTask() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const create = (description, date, time, tag, important) => {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ description, date, time, tag, important }),
        };

        return fetch(`${process.env.API_URL}/tasks`, requestOptions)
            .then(handleResponse)
            .then(function(response) {
                if (response.success)
                    enqueueSnackbar('Task Created Successfully', {
                        variant: 'success',
                    });
                return response.message;
            })
            .catch(function(error) {
                enqueueSnackbar('Unable to Create Task', {
                    variant: 'error',
                });
            });
    };

    return create;
}
