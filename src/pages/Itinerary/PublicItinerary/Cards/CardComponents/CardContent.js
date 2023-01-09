import React from "react";
import {CardContent as CardContentMaterial, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    cardContent: {
        // minHeight: '300px',
        padding: '35px 25px 35px 25px !important',
        '@media (max-width:500px)': {
            padding: '0 20px',
        },
    }
}));

const CardContent = ({children}) => {
    const classes = useStyles();
    return (
        <CardContentMaterial className={`card-content-margin ${classes.cardContent}`}>
            {children}
        </CardContentMaterial>
    );
}

export default CardContent;