import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {colors} from "styles/colors";

const useStyles = makeStyles(() => ({
    root: {
        fontFamily: 'Raleway, sans-serif',
        fontSize: '15px',
        width: '350px',
        height: '90px',
        backgroundColor: 'white',
        boxShadow: '0px 15px 50px rgba(0, 0, 0, 0.05)',
        borderRadius: '8px',
        padding: '13px 20px'
    },
    rowName: {
        fontWeight: '400'
    },
    itemCenter: {
        display: 'flex',
        alignItems: 'center',
    },
    itemEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    amount: {
        fontSize: '20px',
        fontWeight: '700'
    },
    totalRevenue: {
        color: colors.brand,
    },
    sent: {
        color: '#81A03F',
    },
    pending: {
        color: colors.gray2,
    },
    bookings: {
        color: colors.black1,
    }
}));

const TotalCard = ({name, amount}) => {
    const classes = useStyles();

    const textColor = (name) => {
        switch (name){
            case 'Total booking revenue':
                return classes.totalRevenue;
            case 'Sent':
                return classes.sent;
            case 'Pending':
                return classes.pending;
            case 'Bookings':
                return classes.bookings;
            default:
                return null
        }
    }

    return (
        <Grid container className={classes.root}>
            <Grid className={`${classes.rowName} ${classes.itemCenter}`} item xs={12}>
                {name}
            </Grid>
            <Grid className={`${classes.itemCenter} ${classes.itemEnd} ${classes.amount} ${textColor(name)}`} item>
                {name === 'Bookings' ? amount : `$${amount}`}
            </Grid>
        </Grid>
    );
}

export default TotalCard;