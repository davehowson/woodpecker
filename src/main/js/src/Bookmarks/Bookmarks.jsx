import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import { bookmarkService } from '@/Services';
import { BookmarksList } from '@/Bookmarks';

const styles = theme => ({
    card: {
        minHeight: "75vh"
    },
    fab: {
        position: 'fixed',
        bottom: 20,
        right: 20,
        top: 'auto',
        left: 'auto',
    },
    addIcon: {
        marginRight: theme.spacing(1),
        fontSize: 20,
    },
    header: {
        textAlign: "center",
        marginTop: theme.spacing(4)
    }
})

const BookmarksComponent = (props) => {
    const [categories, setCategories] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { classes } = props;

    useEffect(() => {
        bookmarkService.getCategories().then(categories => {
            setCategories(categories.content);
        })
    }, []);

    const handleAddClick = () => {
        console.log("clicked add")
    };

    const handleCategory = (category) => {
        setActiveCategory(category);
        setSelectedIndex(category)
    };


    return (
        <React.Fragment>
            <Helmet>
                <title>Woodpecker - Bookmarks</title>
            </Helmet>
            {false&&
                <Grid container spacing={2} >
                    <Grid item sm={3}>
                        <Card className={classes.card}>
                            <CardContent>
                                <List component="nav">
                                    {categories.map(category =>
                                        <ListItem
                                            button
                                            selected={selectedIndex === category.id}
                                            onClick={() => handleCategory(category.id)}
                                            key={category.id}
                                        >
                                              <ListItemText primary={category.name} />
                                        </ListItem>
                                    )}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={9}>
                        <BookmarksList category={activeCategory}/>
                    </Grid>

                </Grid>
            }
            <Grid container alignItems="center" justify="center">
                <Grid item xs={6}>
                    <Typography variant="h6" component="h2" className={classes.header}>
                        This feature has not been implemented yet
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

BookmarksComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

const Bookmarks = withStyles(styles)(BookmarksComponent);

export { Bookmarks };
