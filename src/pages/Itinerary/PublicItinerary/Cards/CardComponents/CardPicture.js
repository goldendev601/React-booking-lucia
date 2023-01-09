import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import cardTop from 'assets/Card-Top.jpg'

const useStyles = makeStyles({
    cardTop: {
        display: 'flex',
        justifyContent: 'space-between',
        maxHeight: '300px',
        minHeight: '255px'
    },
});

const CardPicture = ({firstPicture, secondPicture}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.cardTop}>
                <img onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = cardTop
                }} style={{width: secondPicture ? '49.5%' : '100%', height: 'auto', objectFit: 'cover'}} src={firstPicture}
                     alt=""/>
                {secondPicture &&
                <img onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = cardTop
                }} style={{width: secondPicture ? '49.5%' : '100%', height: 'auto', objectFit: 'cover'}} src={secondPicture}
                     alt=""/>}
            </div>
        </React.Fragment>
    );
}

export default CardPicture;