import React, {useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, TextField } from "@material-ui/core";
import { itinerariesSelector, advisorRequestsApplyDiscount, clearState, clearAdvisorApplyDiscountFlags } from "redux/features/itineraries/itinerariesSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button
} from "@core/components";
import {error, success} from "../../../styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import {createErrorMessage} from "../../../utils";


const RequestSummary = ({stepChange, stepIndexChange}) => {
    const dispatch = useDispatch();
    const { advisorRequest, isApplyDiscountError, isApplyDiscountSuccess, errorMessage, advisorRequestDiscounted } = useSelector(itinerariesSelector);

    const [code, setCode] = React.useState('');

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const handleClick = () => {
        stepChange('advisorPay');
        stepIndexChange(3);
    }

    const applyCode = () => {
        const formData = {
            'discount_code': code
        }
        const apiPayload = {
            advisorId: advisorRequest.id,
            data: formData,
        }
        dispatch(advisorRequestsApplyDiscount(apiPayload));
    }

    useEffect(() => {
        if (isApplyDiscountError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearAdvisorApplyDiscountFlags())
        }

        if (isApplyDiscountSuccess) {
            openSnackbarSuccess('Discount Applied!');
            dispatch(clearAdvisorApplyDiscountFlags())
        }
    }, [isApplyDiscountError, isApplyDiscountSuccess]);

    // const handleBack = () => {
    //     stepChange('requestContent');
    //     stepIndexChange(1);
    // }

    const useStyles = makeStyles({
        requestBtn: {
            fontSize: 12,
            marginTop: 12
        },
        nextBtn: {
            fontSize: 16
        },
        applyBtn: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#BA886E',
            textTransform: 'uppercase',
            marginLeft: '20px',
            '&:hover': {
                cursor: "pointer"
            } 
        },
        requestTitleContent: {
            marginTop: 28,
            color: '#242424',
            fontSize: 14,
            fontWeight: '600'
        },
        deadlineDescription: {
            color: '#000',
            fontSize: 14,
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 'normal',
            marginTop: 8
        },
        validationErrorNotification: {
            fontStyle: 'italic',
            color: 'red',
            marginTop: '5px !important',
            marginBottom: '5px !important',
            fontSize: '12px'
        },
        contentDiv: {
            minHeight: 600
        },
        selectField: {
            width:'100%',
            background: '#FFFFFF',
            border: '1px solid #E8E8E8',
            letterSpacing: '0.08em',
            padding: '7px 18px',
            textTransform: 'uppercase',
            fontFamily: 'Raleway',
            fontWeight: '600',
            fontSize: '12px',
            lineHeight: '30px',
            color:' #242424',
            appearance:'none',
            outline: 'none',
            marginTop:'12px !important',
            '&:before':{
                outline:'none',
                content: '" "',
                borderBottom: '0px',
                background: '#BA886E',
                borderRadius: '0px',
                position:'absolute',
                left:'auto',
                right:'0',               
                height: '100%',
                width: '54px',
            },
        },
        tasksContainer: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '20px'
        },
        taskpriceContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        requestCheckBoxWrapper: {
            marginTop: '15px',
            marginBottom: '15px'
        },
        documentContainer: {
            display: 'flex',
            flexDirection: 'column',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#E8E8E8',
            padding: '10px',
            borderRadius: '5px'
        },
        pdfIconDiv: {
            backgroundColor: '#E3555F',
            borderRadius: '5px',
            width: '49px',
            height: '29px',
            fontSize: '12px',
            color: '#FFF',
            paddingTop: '5px',
            textAlign: 'center',
            marginRight: '10px'
        },
        documentDetailInfo: {
            color: '#000 !important',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 12,
            alignItems: 'center',
            paddingLeft: '10px',
            paddingTop: '5px'
        },    
        priceContainer: {
            width: '100%',
            padding: '16px',
            textAlign: 'left',
            backgroundColor: '#F8F8F8',
            marginTop: '32px',
        },
        totalPriceContainer: {
            width: '100%',
            padding: '16px',
            textAlign: 'left',
            backgroundColor: '#F8F8F8',
            marginTop: '0px',
        },
        priceTitle: {
            color: '#242424',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '20px',
            letterSpacing: '0.05em'
        }
    });

    const classes = useStyles();

    

    return (
        <>  
            <Grid container className={classes.contentDiv}>
                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>Name for Request</Typography>
                    <Typography className={classes.deadlineDescription}>
                        {advisorRequest.requestTitle}
                    </Typography>
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>Tasks</Typography>
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    {advisorRequest && advisorRequest.tasks && advisorRequest.tasks.map((task, index) =>
                        <div>
                            <div className={classes.tasksContainer}>
                                <div style={{display: 'flex'}}>
                                    <Typography style={{fontFamily: 'Raleway', marginRight: '16px', fontWeight: '400', color: '#242424', fontSize: '16px', lineHeight: '20px'}}>
                                        {index + 1}.
                                    </Typography>
                                    <div>
                                        <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '16px', lineHeight: '20px'}}>
                                            {task.advisorRequestType}
                                        </Typography>
                                        <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '10px', lineHeight: '20px'}}>
                                            {task.explanation}
                                        </Typography>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    )}
                </Grid>
                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>Additional Notes</Typography>
                    <Grid item>
                        <Typography className={classes.deadlineDescription}>
                            {advisorRequest.notes}
                        </Typography>
                    </Grid>
                </Grid>
                {
                    advisorRequest && advisorRequest.advisorRequestAttachments.length > 0 && (
                        <Grid item md={12} style={{marginTop: '20px', width: '100%'}}>
                            <Typography className={classes.requestTitleContent}>Supporting Documents</Typography>
                        </Grid>
                    )
                }
                <Grid item md={12} style={{width: '100%'}}>
                    {advisorRequest && advisorRequest.advisorRequestAttachments.map((document, documentIndex) =>
                        <div className={classes.documentContainer}  key={documentIndex}>
                            <div style={{display: 'flex', marginTop: '10px'}}>
                                <div className={classes.pdfIconDiv}>PDF</div>
                                {
                                    document.name && (
                                        <a className={classes.documentDetailInfo} 
                                        > 
                                            {document.name.substring(0, 45)}
                                        </a>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </Grid>

                <Grid item md={12} style={{width: '100%'}}>
                    <Typography className={classes.requestTitleContent}>Discount Code</Typography>
                    {
                        advisorRequestDiscounted ? (
                            <div style={{display: 'flex'}}>
                                <TextField
                                    name="discountCode"
                                    placeholder="Enter Discount Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    style={{width: '150px'}}
                                    disabled={true}
                                />
                            </div>
                        ) : (
                            <div style={{display: 'flex'}}>
                                <TextField
                                    name="discountCode"
                                    placeholder="Enter Discount Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    style={{width: '150px'}}
                                />
                                <Typography 
                                    className={classes.applyBtn}
                                    onClick={() => {
                                        applyCode()
                                    }}
                                >
                                    Apply
                                </Typography>
                            </div>
                        )
                    }
                    
                </Grid>

                {
                    advisorRequest.tasks && advisorRequest.tasks.length > 0 && (
                        <Grid item md={12} style={{width: '100%'}}>
                            <div className={classes.priceContainer}>
                                {
                                    advisorRequest.tasks.length === 1 ? (
                                        <Typography className={classes.priceTitle}>Task total: 1 task</Typography>
                                    ) : (
                                        <Typography className={classes.priceTitle}>Task total: {advisorRequest.tasks.length} tasks</Typography>
                                    )
                                }
                                <div style={{marginTop: '15px'}}>
                                    {advisorRequest && advisorRequest.tasks && advisorRequest.tasks.map((task, index) =>
                                        <div>
                                            <div className={classes.taskpriceContainer}>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>                                                
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        {task.advisorRequestType}
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        ${task.amount}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <hr/>
                            </div>
                            {
                                advisorRequestDiscounted ? (
                                    <div className={classes.totalPriceContainer}>
                                        <div>
                                            <div className={classes.taskpriceContainer}>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>                                                
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        Subtotal
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        ${advisorRequestDiscounted.subAmount.toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={classes.taskpriceContainer}>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>                                                
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        Fee
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        ${advisorRequestDiscounted.feeAmount.toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={classes.taskpriceContainer}>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>                                                
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        Discount
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        ${advisorRequestDiscounted.discount.toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{marginTop: '28px'}}>
                                            <div className={classes.taskpriceContainer}>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>                                                
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '600', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        Total price
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '600', color: '#BA886E', fontSize: '32px', lineHeight: '38px'}}>
                                                        ${advisorRequestDiscounted.totalAmount.toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={classes.totalPriceContainer}>
                                        <div>
                                            <div className={classes.taskpriceContainer}>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>                                                
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        Subtotal
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        ${advisorRequest.subAmount.toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={classes.taskpriceContainer}>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>                                                
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        Fee
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '400', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        ${advisorRequest.feeAmount.toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{marginTop: '28px'}}>
                                            <div className={classes.taskpriceContainer}>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>                                                
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '600', color: '#242424', fontSize: '14px', lineHeight: '20px'}}>
                                                        Total price
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Raleway', fontWeight: '600', color: '#BA886E', fontSize: '32px', lineHeight: '38px'}}>
                                                        ${advisorRequest.totalAmount.toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            
                        </Grid>
                    )
                }
                
                <Grid item md={12} style={{marginTop: '30px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                    <Button
                        $primary
                        className={classes.nextBtn}
                        $width='100%'
                        onClick={() => {
                            handleClick()
                        }}
                    >
                        Next
                    </Button>
                </Grid>
                {/* <Grid item md={12} style={{marginTop: '30px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                    <Button
                        $outlined
                        className={classes.nextBtn}
                        $width='45%'
                        onClick={() => {
                            handleBack()
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        $primary
                        className={classes.nextBtn}
                        $width='45%'
                        onClick={() => {
                            handleClick()
                        }}
                    >
                        Next
                    </Button>
                </Grid> */}
            </Grid>
        </>
    )
}

export default RequestSummary