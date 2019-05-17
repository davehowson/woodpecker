import React from 'react';
import toast from 'toasted-notes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function handleNotification(status, message) {
    let notifClass = "";
    let notifIcon = "";
    if (status == "success") {
        notifClass = "text-success font-weight-bold";
        notifIcon = (<FontAwesomeIcon icon="check-circle" />);
    } else if (status == "warning") {
        notifClass = "text-warning font-weight-bold";
        notifIcon = (<FontAwesomeIcon icon="minus-circle" />);
    } else {
        notifClass = "text-primary font-weight-bold";
        notifIcon = (<FontAwesomeIcon icon="exclamation-circle" />);
    }

    toast.notify(
        <span className={notifClass}>
            {notifIcon}&nbsp;&nbsp;{message}
        </span>, 
        {
            duration: 2000,
            position: 'top-right',
        }
    );
}