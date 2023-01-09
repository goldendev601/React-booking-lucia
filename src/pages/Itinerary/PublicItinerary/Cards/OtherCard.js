import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from "./CardComponents/CardContent";
import CardNote from "./CardComponents/CardNote";
import {makeStyles} from "@material-ui/core/styles";
import {StyledP} from "./CardComponents/StyledComponents";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles({
    cardcontentDiv: {
        textAlign: 'left'
    },
    cardTitle: {
        color: '#BA886E',
        fontSize: '32px',
        fontFamily: 'Cormorant',
        fontStyle: 'normal',
    },
    cardTitleDiv: {
        textAlign: 'left'
    },
    cardPhoneAddress: {
        color: '#242424',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontSize: '14px',
        padding: '10px 0px 10px 0px',
        fontWweight: 'normal',
        lineHeight: '24px',
    },
    cardPhoneAddressDiv: {
        textAlign: 'left'
    },
    priorityDiv: {
        textAlign: 'left'
    }
});

const OtherCard = ({booking, ...rest}) => {
    const {
        title,
        notes,
        priority
    } = booking;
    const classes = useStyles()

    return (
        <Card {...rest} style={{borderRadius: '0px', maxWidth: 'unset'}}>
            <CardContent>
                <div className={classes.cardTitleDiv}>
                    <Typography variant="h3" component="h3" className={classes.cardTitle}>
                        {title}
                    </Typography>
                </div>
                <CardNote notes={notes}/>
                <div className={classes.priorityDiv}>
                    {priority && <StyledP mb="20px">{priority || ''}</StyledP>}
                </div>
            </CardContent>
        </Card>
    );
}

export default OtherCard;
