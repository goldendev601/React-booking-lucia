import React, {useEffect, useRef, useState} from 'react';
import { Typography, Grid, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import {Button} from "@core/components";
import {useFormik} from "formik";
import { submitFeedback } from 'redux/features/request/requestSlice';



const RateMyCopilot = () => {
    

    const useStyles = makeStyles({
        root: {
            width: '100%',
            height: '88vh',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            display: 'flex'
        },
        container: {
            width: '520px',
            height: '490px',
            backgroundColor: '#FFF',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: '40px',
            borderWidth: '1px',
            borderColor: '#4242',
            borderStyle: 'solid'
        },  
        fieldBox: {
            width: '100%',
            display: 'flex',
            marginTop: '45px'
        },
        fieldLabel: {
            width: '260px',
            textAlign: 'left',
            fontFamily: 'Cormorant',
            fontSize: '20px',
            lineHeight: '24px',
            color: '#191919',
            fontWeight: '400'
        },
        title: {
            textAlign: 'center',
            fontFamily: 'Cormorant',
            fontSize: '30px',
            lineHeight: '42px',
            color: '#191919',
            fontWeight: '400'
        },
        formActions: {
            marginTop: '50px'
        }     

    });
    
    const classes = useStyles();

    let {id} = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const [efficiency, setEfficiency] = React.useState(0);
    const [accuracy, setAccuracy] = React.useState(0);
    const [completion, setCompletion] = React.useState(0);
    const [friendliness, setFriendliness] = React.useState(0);

    const handleClose = () => {
        history.push(`/signin`);
    }

    const handleSubmit = () => {
        // formik.submitForm();
        const formData = new FormData();
        formData.append('efficiency', efficiency)
        formData.append('accuracy', accuracy)
        formData.append('completion', completion)
        formData.append('friendliness', friendliness)
        dispatch(submitFeedback({advisorId: id, data: formData}))

    }

    // const formik = useFormik({
    //     initialValues: {
    //         efficiency: 0,
    //         accuracy: 0,
    //         completion: 0,
    //         friendliness: 0,
    //     },
    //     onSubmit: (values) => {
    //         let data = {...values}
    //         let payload = {...apiPayload};
       
    //         const formData = new FormData();
    //         formData.append('efficiency', data.efficiency)
    //         formData.append('accuracy', data.accuracy)
    //         formData.append('completion', data.completion)
    //         formData.append('friendliness', data.friendliness)

    //         payload.data = formData;
    //         dispatch(addItineraryBooking(payload));
    //     }
    // });

    return (
        <>
            <Grid className={classes.root}>
                <div className={classes.container}>
                    <Typography className={classes.title}>How would you rate?</Typography>
                    <Box borderColor="transparent" className={classes.fieldBox}>
                        <Typography className={classes.fieldLabel}>Efficiency*</Typography>
                        <Rating
                            name="efficiency"
                            value={efficiency}
                            onChange={(event, newValue) => {
                                setEfficiency(newValue);
                            }}
                        />
                    </Box>
                    <Box borderColor="transparent" className={classes.fieldBox}>
                        <Typography className={classes.fieldLabel}>Accuracy*</Typography>
                        <Rating
                            name="accuracy"
                            value={accuracy}
                            onChange={(event, newValue) => {
                                setAccuracy(newValue);
                            }}
                        />
                    </Box>
                    <Box borderColor="transparent" className={classes.fieldBox}>
                        <Typography className={classes.fieldLabel}>Task Completion*</Typography>
                        <Rating
                            name="completion"
                            value={completion}
                            onChange={(event, newValue) => {
                                setCompletion(newValue);
                            }}
                        />
                    </Box>
                    <Box borderColor="transparent" className={classes.fieldBox}>
                        <Typography className={classes.fieldLabel}>Friendliness*</Typography>
                        <Rating
                            name="friendliness"
                            value={friendliness}
                            onChange={(event, newValue) => {
                                setFriendliness(newValue);
                            }}
                        />
                    </Box>
                    <div className={classes.formActions}>
                        <Button
                            $outlined
                            $width={'50%'}
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </Button>
                        <Button
                            $primary
                            $width={'50%'}
                            type={"submit"}
                            form={'submitFeedback' }
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Grid>
            
        </>
    );
}

export default RateMyCopilot;
