import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import { useGetBookmarks } from '@/Services';

const styles = theme => ({
})

const BookmarksListComponent = (props) => {
    const [bookmarks, setBookmarks] = useState(null);

    const getBookmarks = useGetBookmarks();
    const { classes } = props;

    useEffect(() => {
        if (props.category != null) {
            getBookmarks(props.category).then(bookmarks => {
                setBookmarks(bookmarks.content);
            })
        }
    }, [props]);

    const handleAddClick = () => {
        console.log
    }


    return (
            <React.Fragment>
                {bookmarks&&
                    <Grid container spacing={2}>
                        {bookmarks.map(bookmark =>
                            <Grid item xs={12} sm={6} md={4} key={bookmark.id}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="h6" component="h2" gutterBottom>
                                            {bookmark.name}
                                        </Typography>
                                        <Link variant="body1" href={bookmark.url} target="_blank">
                                            {bookmark.url}
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                }
            </React.Fragment>
    )
}

BookmarksListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

const BookmarksList = withStyles(styles)(BookmarksListComponent);

export { BookmarksList };
