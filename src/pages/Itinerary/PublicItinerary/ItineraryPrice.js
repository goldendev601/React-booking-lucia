import React from "react";
import { Typography, Grid } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../../styles/colors";

const useStyles = makeStyles({
    root: {
        maxWidth: '1600px',
        '@media (max-width:1270px)': {
            justifyContent: 'space-around',
            maxWidth: '1067px',
        },
        margin: 'auto',
        width:'100%',       
        height: '250px',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '144px',
        marginTop: '32px',  
        paddingLeft: '75px',
        paddingTop: '79px',
        background: '#FFF',
        '@media (max-width:600px)': {
            margin: 0,
            padding: 0
        }
    },
    priceDesignations: {
        '& :nth-child(1)': {
            marginBottom: '20px'
        },
        '& :nth-child(2)': {
            marginBottom: '10px'
        },
        '& :nth-child(3)': {
            marginBottom: '10px'
        },
    },
    prices: {
        '& :nth-child(1)': {
            margin: '70px 0 10px 0'
        },
        '& :nth-child(2)': {
            marginBottom: '15px'
        },
    },
    price: {
        fontSize: '24px',
        color: colors.brand,
        fontFamily: 'Raleway, sans-serif',
        fontStyle: 'normal',
        fontWeight: '600',
    },
    label: {
        color: '#242424',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.05em'
    },
    value: {
        color: '#242424',
        fontFamily: 'MADE Mirage',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '40px',
        lineHeight: '60px',
        letterSpacing: '0.05em'
    }
});

const ItineraryPrice = ({total, persons, days, showPriceOnShare}) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            {
                (showPriceOnShare && total && total !== 0) ? (
                    <>
                        <Grid item md={6}>
                            <Typography component="label" className={classes.label}>Price</Typography>
                            <Typography component="h2" className={classes.value}>{total}</Typography>
                        </Grid>
                        <Grid item md={3}>
                            <Typography component="label" className={classes.label}>Persons</Typography>
                            <Typography component="h2" className={classes.value}>{persons}</Typography>
                        </Grid>
                        <Grid item md={3}>
                            <Typography component="label" className={classes.label}>Days</Typography>
                            <Typography component="h2" className={classes.value}>{days}</Typography>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item md={6}>
                            <Typography component="label" className={classes.label}>Persons</Typography>
                            <Typography component="h2" className={classes.value}>{persons}</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Typography component="label" className={classes.label}>Days</Typography>
                            <Typography component="h2" className={classes.value}>{days}</Typography>
                        </Grid>
                    </>
                )
            }
        </Grid>
    );
}

export default ItineraryPrice;