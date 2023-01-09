import React from "react";
import {CardContent as CardContentMaterial, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    cardContent: {
        minHeight: '294px',
        padding: '56px 30px 56px 30px !important',
        '@media (max-width:500px)': {
            padding: '20px',
        },
    }
}));

const RoomCardContent = ({children}) => {
    const classes = useStyles();
    return (
        <CardContentMaterial className={`card-content-margin ${classes.cardContent}`}>
            {children}
        </CardContentMaterial>
    );
}

export default RoomCardContent;