import React from 'react';
import toast from 'toasted-notes';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import Icon from '@material-ui/core/Icon';

const ToastIcon = styled(Icon)({
    display: "inline-block",
    verticalAlign: "middle"
})

const ToastText = styled(Typography)({
    display: "inline-block",
    verticalAlign: "middle"
})

export function handleNotification(status, message) {
    let notifIcon = "";
    if (status == "success") {
        notifIcon = (<ToastIcon color="primary">check_circle</ToastIcon>);
    } else if (status == "warning") {
        notifIcon = (<ToastIcon color="secondary">warning</ToastIcon>);
    } else {
        notifIcon = (<ToastIcon color="error">error</ToastIcon>);
    }
    const notification = (
        <Grid container>
            <Grid item>
                {notifIcon} <ToastText variant="body2" >{message}</ToastText>
            </Grid>
        </Grid>
    )

    toast.notify(
        notification,
        {
            duration: 5000,
            position: 'top',
        }
    );
}
