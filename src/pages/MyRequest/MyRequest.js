import React, { useEffect, useRef, useState } from 'react';
import { Typography, Grid, TextField, LinearProgress, IconButton, Popover } from "@material-ui/core";
import styled from "styled-components";
import { Button } from "@core/components";
import { Check, Attachment, EditPencil } from "iconoir-react";
import { useSnackbar } from 'react-simple-snackbar';
import { error, success } from "styles/snackbarStyles/snackbarStyles";
import { makeStyles } from "@material-ui/core/styles";
import MyRequestList from "./MyRequestList";
import { useDispatch, useSelector } from "react-redux";
import { markCompleted, sendMessage, sendFile, listChats, requestSelector, getMyRequests, clearState, selectMyRequest } from "redux/features/request/requestSlice";
import HireAdvisor from "../ItinerariesDashboard/HireAdvisor/HireAdvisor";
import { dateToMyDate, dateToMyTime, createErrorMessage } from "utils";
import userDefaultAvatar from 'assets/person.png'
import Info from 'assets/info.png';
import fileDownload from 'js-file-download';
import axios from 'axios';
import Download from 'assets/download.png';
import { useHistory } from "react-router-dom";
import {
    setDeadlineFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import { colors } from "styles/colors";


export const RequestDetailContainer = styled.div`
  margin-left: 44px;
  padding-top: 29px;
  margin-right: 44px;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;


const MyRequest = () => {


    const useStyles = makeStyles({
        root: {
            height: '85vh',
            maxHeight: '85vh',
            overflowY: 'auto',
            backgroundColor: '#FFF !important'
        },
        requestIdInfo: {
            color: '#242424',
            fontSize: '32px',
            fontWeight: 'normal',
            fontFamily: 'MADE Mirage',
            fontStyle: 'normal'
        },
        openRequestDetailWrapper: {
            backgroundColor: '#C4C4C412 !important'
        },
        requestNote: {
            color: '#242424',
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            textTransform: 'uppercase',
            marginTop: 15
        },
        requestDescription: {
            color: '#000000',
            fontSize: '14px',
            fontWeight: '300',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            opacity: 0.6
        },
        requestBtn: {
            width: '80%',
            height: 42,
            padding: '0 5px',
            backgroundColor: '#BA886E',
            color: '#FFFFFF',
            textAlign: 'center',
            alignItems: 'center',
            fontFamily: 'Raleway',
            paddingTop: 10,
            marginTop: 94,
            float: 'right',
            '&:hover': {
                cursor: "pointer"
            }
        },
        requestDetailBlockWrapper: {
            width: '50%',
            textAlign: 'right',
            margin: 'auto',
            marginBottom: 70,
            marginTop: 20,
        },
        messagesBlockWrapper: {
            width: '100%',
            marginLeft: 11
        },
        messageDetailBlock: {
            width: '100%',
            textAlign: 'left',
            padding: '17px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            backgroundColor: '#FFF'
        },
        messageDetailBlockSender: {
            width: '100%',
            textAlign: 'left',
            padding: '17px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            backgroundColor: '#BA886E'
        },
        notificationBlock: {
            width: '100%',
            textAlign: 'center',
            padding: '17px',
            border: '1px solid #BA886E',
            marginTop: 150
        },
        // requestDetailBlock: {
        //     width: '100%',
        //     backgroundColor: '#BA886E',
        //     textAlign: 'left',
        //     padding: '17px',    
        //     borderRadius: '10px'       
        // },
        requestDetailBlock: {
            width: '100%',
            backgroundColor: '#FFF',
            textAlign: 'left',
            padding: '24px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        senderNameSender: {
            color: '#FFF',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: '11px'
        },
        messageDetailInfo: {
            color: '#000',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 16,
        },
        senderName: {
            color: '#000',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16
        },
        notificationInfo: {
            color: '#BA886E',
            fontFamily: 'Raleway',
            fontStyle: 'italic',
            fontWeight: '300',
            fontSize: 16,
        },
        requestDetailInfo: {
            color: '#FFF',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 16
        },
        requestDate: {
            fontSize: 14,
            fontFamily: 'Raleway',
            color: '#000',
            marginTop: 15,
            float: 'right'
        },
        requestTime: {
            fontSize: 12,
            fontFamily: 'Raleway',
            color: '#000',
            marginTop: 15,
            float: 'right',
            marginLeft: 10
        },
        messageDate: {
            fontSize: 14,
            fontFamily: 'Raleway',
            color: '#000',
            marginTop: 15,
            float: 'left'
        },
        messageTime: {
            fontSize: 12,
            fontFamily: 'Raleway',
            color: '#000',
            marginTop: 15,
            float: 'left',
            marginLeft: 10
        },
        markRequestAsComplete: {
            fontSize: '12px',
            borderRadius: '15px'
        },
        addBookingBtn: {
            fontSize: '14px',
            marginRight: '10px'
        },
        messageInput: {
            backgroundColor: '#FFF',
            boxShadow: '0px 14px 34px rgba(0, 0, 0, 0.05)',
            padding: 8,
            width: '100%',
            borderRadius: '5px'
        },
        messageinputWrapper: {
            // position: 'absolute',
            // bottom: '50px',
            width: '100%',
            marginTop: '50px'
        },
        mainContainer: {
            padding: '20px',
            height: 'calc(100vh - 450px)',
            overflowY: 'scroll'
        },
        messagesImageWrapper: {
            width: 40,
            height: 40,
            borderRadius: 20,
            overflow: 'hidden'
        },
        messagesSenderImage: {
            width: 40,
            height: 40
        },
        messagesDiv: {
            display: 'flex',
            textAlign: 'left',
            marginTop: 25,
        },
        requestStatusInfo: {
            fontSize: 10,
            textTransform: 'uppercase',
            fontWeight: '600',
            fontStyle: 'normal',
            width: 78,
            height: 12,
            textAlign: 'right',
            marginTop: 15,
            marginLeft: 5
        },
        warningTitle: {
            color: '#4F4F4F',
            fontSize: '23px',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            textAlign: 'center',
        },
        warningDescription: {
            color: '#4F4F4F',
            fontSize: '12px',
            fontWeight: '400',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            textAlign: 'center',
            width: '489px',
            margin: '17px auto'
        },
        hireAdvisorBtn: {
            height: '30px',
            fontSize: '12px'
        },
        countDownBar: {
            width: '216px'
        },
        colorPrimary: {
            backgroundColor: '#C4C4C4',
        },
        barColorPrimary: {
            backgroundColor: '#BA886E',
        },
        requestSteps: {
            fontFamily: 'Raleway',
            fontSize: '12px',
            fontWeight: '700',
            fontStyle: 'normal',
            lineHeight: '30px',
            textAlign: 'left',
            marginLeft: '15px',
            marginRight: '10px',
            color: '#000'
        },
        requestDeadlineInfo: {
            fontSize: '12px',
            textTransform: 'uppercase',
            fontWeight: '600',
            fontStyle: 'normal',
            lineHeight: '30px',
            textAlign: 'right',
            marginTop: '13px',
            marginLeft: '15px',
            color: '#EB5757'
        },
        messagesDiv1: {
            display: 'flex',
            textAlign: 'left',
            marginTop: 25,
        },
        modalUserInfoWrapper: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
        },
        modalUserInfo: {
            fontWeight: '700',
            fontSize: '16px',
            color: '#242424',
            lineHeight: '19px',
            fontFamily: 'Raleway'
        },
        modalTasksWrapper: {
            width: '100%',
            alignItems: 'center',
            padding: '24px',
            backgroundColor: 'rgba(186, 136, 110, 0.1)',
            marginTop: '32px'
        },
        modalTasksTitle: {
            fontWeight: '600',
            fontSize: '14px',
            color: '#242424',
            lineHeight: '20px',
            fontFamily: 'Raleway',
            marginRight: '10px'
        },
        tasksContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        attachmentContainer: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        },
        attachmentNameContainer: {
            display: 'flex',
            borderColor: '#E8E8E8',
            borderWidth: '1px',
            borderStyle: 'solid',
            width: '90%',
            padding: '10px',
            marginTop: '5px'
        },
        popoverDiv: {
            backgroundColor: '#FFFFFF',
            padding: 20
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
            marginRight: '20px'
        },
        clockImage: {
            width: '16px',
            height: '16px'
        },
        messageDetailInfoSender: {
            color: '#FFF !important',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 16
        },

    });

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    const { selectedMyRequest, myRequests, isMarkCompleted, isMarkCompletedError, errorMessage } = useSelector(requestSelector);

    // console.log(selectedMyRequest);

    const [showHireAdvisor, setShowHireAdvisor] = useState(false);

    const [message, setMessage] = React.useState('');
    const [messageFile, setMessageFile] = React.useState();

    const [anchorElClock, setAnchorElClock] = useState(null);

    const openClock = Boolean(anchorElClock);
    const idClock = openClock ? 'simple-popover' : undefined;

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const messagesRef = useRef();
    const attachRef = useRef();


    const option = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }

    const handleClickClock = (event2) => {
        setAnchorElClock(event2.currentTarget);
    };

    const handleCloseClock = () => {
        setAnchorElClock(null);
    };

    useEffect(() => {
        dispatch(clearState());
        dispatch(getMyRequests())
    }, [dispatch])

    useEffect(() => {
        if (myRequests) {
            dispatch(selectMyRequest(myRequests[0]))
        }
    }, [myRequests])

    const handleMarkCompleted = (request) => {
        dispatch(markCompleted({ advisorId: request.id }))
    }

    useEffect(() => {
        if (isMarkCompletedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }
        if (isMarkCompleted) {
            openSnackbarSuccess('This request has been completed successfully!');
            dispatch(clearState());
            history.push(`/`);
        }
    }, [dispatch, isMarkCompleted, isMarkCompletedError]);


    const downloadFile = (url, filename) => {
        axios.get(url, {
            responseType: 'blob',
        })
            .then((res) => {
                fileDownload(res.data, filename)
            })
    }


    function changeFile() {
        if (attachRef.current) {
            attachRef.current.click()
        }
    }

    function handleChange(event) {
        if (event.target.files) {
            // setMessageFile(event.target.files)
            const formData = new FormData();
            for (const file of Array.from(event.target.files)) {
                formData.append('document', file)
            }
            dispatch(sendFile({ advisorId: selectedMyRequest.id, data: formData }))
        }

    }


    const handleSendMessage = (request) => {
        const data = {
            'plain_text': message
        }
        dispatch(sendMessage({ advisorId: request.id, data: data }))
        // if (messageFile) {
        //     const formData = new FormData();
        //     for (const file of Array.from(messageFile)) {
        //         formData.append('document', file)
        //     }
        //     dispatch(sendFile({advisorId: request.id, data: formData}))
        // }
        if (request.advisorRequestStatusId === 4 || request.advisorRequestStatusId === 3) {
            dispatch(listChats({ advisorId: request.id }))
        }
        setMessage('');
    }

    useEffect(() => {
        if (selectedMyRequest) {
            const interval = setInterval(() => {
                if (selectedMyRequest.advisorRequestStatusId === 4 || selectedMyRequest.advisorRequestStatusId === 3) {
                    dispatch(listChats({ advisorId: selectedMyRequest.id }))
                }
            }, 5000);
            return () => clearInterval(interval);
        }

    }, [selectedMyRequest]);

    const clickHireAdvisor = () => {
        setShowHireAdvisor(true);
    }

    const handleOpenEditDeadline = () => {
        dispatch(setDeadlineFormOpen(true));
    };


    const { messages } = useSelector(requestSelector);

    useEffect(() => {
        if (messages) {
            if (messagesRef.current) {
                messagesRef.current.scrollIntoView()
            }
        }
    }, [messages])

    const requestStatusSymbolList = ['Draft', 'Pending', 'In Progress', 'Approved'];
    const requestStatusSymbolColorList = ['#828282', '#828282', '#81A03F', '#BA886E'];

    return (
        <>
            <Grid container className={classes.root}>
                <Grid item md={3} sm={3} style={{ height: '100%', overflow: 'auto' }}>
                    <MyRequestList>
                    </MyRequestList>
                </Grid>
                <Grid item md={9} sm={9} className={classes.openRequestDetailWrapper}>
                    {
                        myRequests && myRequests.length > 0 && selectedMyRequest && (
                            <RequestDetailContainer>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        {selectedMyRequest.requestTitle &&
                                            <Typography component="h1" className={classes.requestIdInfo}> {selectedMyRequest.requestTitle} </Typography>
                                        }
                                        <div style={{ display: 'flex' }}>
                                            {
                                                selectedMyRequest.owner && (
                                                    <Typography component="h6" className={classes.requestNote}> Request for {selectedMyRequest.owner} </Typography>
                                                )
                                            }
                                            <Typography component="h5" className={classes.requestStatusInfo} style={{ color: requestStatusSymbolColorList[selectedMyRequest.advisorRequestStatusId - 1] }} >{requestStatusSymbolList[selectedMyRequest.advisorRequestStatusId - 1]}</Typography>
                                            {
                                                selectedMyRequest && selectedMyRequest.dueMinutesLeft !== 0 && Math.floor(selectedMyRequest.dueMinutesLeft / 1440) !== 0 && (
                                                    <Typography component="h5" className={classes.requestDeadlineInfo} >Due in {Math.floor(selectedMyRequest.dueMinutesLeft / 1440)} days and {Math.floor(selectedMyRequest.dueMinutesLeft / 60) - Math.floor(selectedMyRequest.dueMinutesLeft / 1440) * 24} hours</Typography>
                                                )
                                            }
                                            {
                                                selectedMyRequest && selectedMyRequest.dueMinutesLeft !== 0 && Math.floor(selectedMyRequest.dueMinutesLeft / 1440) === 0 && (
                                                    <Typography component="h5" className={classes.requestDeadlineInfo} >Due in {Math.floor(selectedMyRequest.dueMinutesLeft / 60)} hours</Typography>
                                                )
                                            }
                                            {
                                                selectedMyRequest.advisorRequestStatusId === 3 && (
                                                    <IconButton
                                                        color="secondary"
                                                        aria-label="edit-deadline"
                                                        onClick={handleOpenEditDeadline}
                                                        style={{ marginTop: '15px' }}
                                                    >
                                                        <EditPencil width="22px" height="22px" color={colors.brand} />
                                                    </IconButton>
                                                )
                                            }
                                        </div>
                                        {
                                            selectedMyRequest && selectedMyRequest.tasks && selectedMyRequest.tasks.length !== 0 && (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className={classes.countDownBar}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={(selectedMyRequest.taskCompletedCount / selectedMyRequest.tasks.length) * 100}
                                                            classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
                                                        />
                                                    </div>
                                                    {
                                                        selectedMyRequest.tasks.length === 1 ? (
                                                            <Typography component="h5" className={classes.requestSteps} >{selectedMyRequest.taskCompletedCount}/{selectedMyRequest.tasks.length} task completed</Typography>
                                                        ) : (
                                                            <Typography component="h5" className={classes.requestSteps} >{selectedMyRequest.taskCompletedCount}/{selectedMyRequest.tasks.length} tasks completed</Typography>
                                                        )
                                                    }
                                                    <img className={classes.clockImage} src={Info} alt="img" onClick={handleClickClock} />
                                                    <Popover
                                                        id={idClock}
                                                        open={openClock}
                                                        anchorEl={anchorElClock}
                                                        onClose={handleCloseClock}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'center',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'center',
                                                        }}
                                                    >
                                                        <div className={classes.popoverDiv}>
                                                            {selectedMyRequest && selectedMyRequest.tasks && selectedMyRequest.tasks.map((task, index) =>
                                                                <div>
                                                                    <div className={classes.tasksContainer}>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <Typography style={{ fontFamily: 'Raleway', marginRight: '16px', fontWeight: '400', color: '#000', fontSize: '12px' }}>
                                                                                {index + 1}.
                                                                            </Typography>
                                                                            <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '12px', paddingRight: '5px' }}>
                                                                                {task.advisorRequestType}
                                                                            </Typography>
                                                                            {
                                                                                task.completed && (
                                                                                    <Check width={'15px'} color={'#219653'} />
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Popover>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div>
                                        {
                                            selectedMyRequest.advisorRequestStatus === 'ACCEPTED' && (
                                                <Button
                                                    $primary
                                                    $width={'250px'}
                                                    iconstart={<Check width={'25px'} />}
                                                    className={classes.markRequestAsComplete}
                                                    onClick={() => handleMarkCompleted(selectedMyRequest)}
                                                >
                                                    Mark request as complete
                                                </Button>
                                            )
                                        }
                                    </div>
                                </div>
                                <Grid container spacing={1}>
                                    <Grid item lg={2} md={1} sm={0}></Grid>
                                    <Grid item lg={8} md={10} sm={12}>
                                        {
                                            selectedMyRequest.advisorRequestStatus === 'ACCEPTED' ? (
                                                <>
                                                    <div className={classes.mainContainer}>
                                                        <Grid container spacing={0}>
                                                            <Grid item lg={12} md={12} sm={12}>
                                                            
                                                                <div className={classes.messagesDiv1}>
                                                                    <div className={classes.messagesBlockWrapper}>
                                                                        <div className={classes.requestDetailBlock}>
                                                                            <div className={classes.modalUserInfoWrapper}>
                                                                                <Typography className={classes.modalUserInfo}>{selectedMyRequest.owner}</Typography>
                                                                            </div>
                                                                            <div className={classes.modalTasksWrapper}>
                                                                                <div style={{ display: 'flex' }}>
                                                                                    <Typography className={classes.modalTasksTitle}>Tasks</Typography>
                                                                                </div>
                                                                                <div style={{ marginTop: '12px' }}>
                                                                                    {selectedMyRequest && selectedMyRequest.tasks && selectedMyRequest.tasks.map((task, index) =>
                                                                                        <div>
                                                                                            <div className={classes.tasksContainer}>
                                                                                                <div style={{ display: 'flex' }}>
                                                                                                    <Typography style={{ fontFamily: 'Raleway', marginRight: '16px', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                                        {index + 1}.
                                                                                                    </Typography>
                                                                                                    <div>
                                                                                                        <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                                            {task.advisorRequestType}
                                                                                                        </Typography>
                                                                                                        <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#4F4F4F', fontSize: '10px' }}>
                                                                                                            {task.explanation}
                                                                                                        </Typography>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                {
                                                                                    selectedMyRequest.notes && (
                                                                                        <div style={{ marginTop: '32px' }}>
                                                                                            <Typography style={{ fontFamily: 'Raleway', fontWeight: '300', color: '#333', fontSize: '14px' }}>
                                                                                                {selectedMyRequest.notes}
                                                                                            </Typography>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {
                                                                    selectedMyRequest.advisorRequestAttachments && selectedMyRequest.advisorRequestAttachments.length > 0 && (
                                                                        <div className={classes.messagesDiv1}>
                                                                            <div className={classes.messagesBlockWrapper}>
                                                                                <div className={classes.requestDetailBlock}>
                                                                                    {selectedMyRequest.advisorRequestAttachments.map((document, index) =>
                                                                                        <div className={classes.attachmentContainer}>
                                                                                            <div className={classes.attachmentNameContainer} >
                                                                                                <div className={classes.pdfIconDiv}>PDF</div>
                                                                                                <div>
                                                                                                    {
                                                                                                        document.name.length < 20 ? (
                                                                                                            <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                                                {document.name}
                                                                                                            </Typography>
                                                                                                        ) : (
                                                                                                            <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                                                {document.name.substring(0, 20)}...
                                                                                                            </Typography>
                                                                                                        )
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                            <IconButton style={{
                                                                                                padding: '0 5px 0 5px',
                                                                                                marginLeft: 'auto'
                                                                                            }} onClick={() => downloadFile(document.documentUrl, document.name)}>
                                                                                                <img className={classes.clockImage} src={Download} alt="img" />
                                                                                            </IconButton>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }

                                                            </Grid>
                                                            <Grid item lg={0} md={0} sm={0}>
                                                            </Grid>
                                                        </Grid>


                                                        {
                                                            messages && messages.map((messageInfo, index) => {
                                                                return (
                                                                    <Grid container spacing={0}>
                                                                        {
                                                                            messageInfo.loggedInUserIsSender ? (
                                                                                <>
                                                                                    <Grid item lg={3} md={2} sm={2}>
                                                                                    </Grid>
                                                                                    <Grid item lg={9} md={10} sm={10}>
                                                                                        <div key={index} className={classes.messagesDiv} >
                                                                                            <div className={classes.messagesBlockWrapper} style={{marginRight: '10px'}} >
                                                                                                <div className={classes.messageDetailBlockSender}>
                                                                                                    <Typography component="h4" className={classes.senderNameSender}>
                                                                                                        {messageInfo.sender.firstName}
                                                                                                    </Typography>
                                                                                                    {
                                                                                                        messageInfo && messageInfo.chatContentType === "TEXT" && (
                                                                                                            <Typography component="h8" className={classes.messageDetailInfoSender}>
                                                                                                                {messageInfo.plainText}
                                                                                                            </Typography>
                                                                                                        )
                                                                                                    }
                                                                                                    {
                                                                                                        messageInfo && messageInfo.chatContentType === "DOCUMENT" && (
                                                                                                            <a className={classes.messageDetailInfoSender}
                                                                                                                onClick={() => downloadFile(messageInfo.documentUrl, messageInfo.plainText)}
                                                                                                            >
                                                                                                                {messageInfo.plainText}
                                                                                                            </a>
                                                                                                        )
                                                                                                    }
                                                                                                </div>
                                                                                                <div style={{display: 'flex', justifyContent: 'end'}}>
                                                                                                    <Typography component="label" className={classes.messageDate}> Submitted on {dateToMyDate(messageInfo.createdAt).toLocaleDateString('en-US', option)}, </Typography>
                                                                                                    <Typography component="p" className={classes.messageTime}> {dateToMyTime(messageInfo.createdAt)} </Typography>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={classes.messagesImageWrapper}>
                                                                                                {
                                                                                                    messageInfo.sender.profileImageUrl ? (
                                                                                                        <img className={classes.messagesSenderImage} src={messageInfo.sender.profileImageUrl} alt="senderImg" />
                                                                                                    ) : (
                                                                                                        <img className={classes.messagesSenderImage} src={userDefaultAvatar} alt="senderImg" />
                                                                                                    )
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    </Grid>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <Grid item lg={9} md={10} sm={10}>
                                                                                        <div key={index} className={classes.messagesDiv} >
                                                                                            <div className={classes.messagesImageWrapper}>
                                                                                                {
                                                                                                    messageInfo.sender.profileImageUrl ? (
                                                                                                        <img className={classes.messagesSenderImage} src={messageInfo.sender.profileImageUrl} alt="senderImg" />
                                                                                                    ) : (
                                                                                                        <img className={classes.messagesSenderImage} src={userDefaultAvatar} alt="senderImg" />
                                                                                                    )
                                                                                                }

                                                                                            </div>
                                                                                            <div className={classes.messagesBlockWrapper}>
                                                                                                <div className={classes.messageDetailBlock}>
                                                                                                    <Typography component="h4" className={classes.senderName}>
                                                                                                        {messageInfo.sender.firstName}
                                                                                                    </Typography>
                                                                                                    {
                                                                                                        messageInfo && messageInfo.chatContentType === "TEXT" && (
                                                                                                            <Typography component="h8" className={classes.messageDetailInfo}>
                                                                                                                {messageInfo.plainText}
                                                                                                            </Typography>
                                                                                                        )
                                                                                                    }
                                                                                                    {
                                                                                                        messageInfo && messageInfo.chatContentType === "DOCUMENT" && (
                                                                                                            <a className={classes.messageDetailInfo}
                                                                                                                onClick={() => downloadFile(messageInfo.documentUrl, messageInfo.plainText)}
                                                                                                            >
                                                                                                                {messageInfo.plainText}
                                                                                                            </a>
                                                                                                        )
                                                                                                    }
                                                                                                </div>
                                                                                                <Typography component="label" className={classes.messageDate}> Submitted on {dateToMyDate(messageInfo.createdAt).toLocaleDateString('en-US', option)}, </Typography>
                                                                                                <Typography component="p" className={classes.messageTime}> {dateToMyTime(messageInfo.createdAt)} </Typography>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Grid>
                                                                                    <Grid item lg={3} md={2} sm={2}>
                                                                                    </Grid>
                                                                                </>
                                                                            )
                                                                        }
                                                                    </Grid>
                                                                )
                                                            })
                                                        }
                                                        <div ref={messagesRef} />
                                                    </div>
                                                    <div className={classes.messageinputWrapper}>
                                                        <input type="file" className={classes.fileInput} multiple onChange={handleChange} ref={attachRef} style={{ display: 'none' }} />
                                                        <TextField
                                                            placeholder="Type Message Here..."
                                                            variant='outlined'
                                                            className={classes.messageInput}
                                                            value={message}
                                                            multiline
                                                            disabled={selectedMyRequest.advisorRequestStatus === 'COMPLETED'}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                            InputProps={{
                                                                style: {
                                                                    maxHeight: 200,
                                                                    overflow: 'auto'
                                                                },
                                                                endAdornment: <>
                                                                    <Attachment width={'50px'} color={'#636671'} onClick={() => changeFile()} />
                                                                    <Button $primary $width={'100px'} onClick={() => handleSendMessage(selectedMyRequest)}>Send</Button>
                                                                </>
                                                            }}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    {/* <div className={classes.requestDetailBlockWrapper}> 
                                                <div className={classes.requestDetailBlock}> 
                                                    <Typography component="h8" className={classes.requestDetailInfo}> 
                                                        {selectedMyRequest.notes}
                                                    </Typography>
                                                </div>
                                                <Typography component="p" className={classes.requestTime}> {dateToMyTime(selectedMyRequest.createdAt)} </Typography>
                                                <Typography component="label" className={classes.requestDate}> Submitted on {dateToMyDate(selectedMyRequest.createdAt).toLocaleDateString('en-US', option)}, </Typography>
                                            </div> */}

                                                    <div className={classes.mainContainer}>

                                                        <div className={classes.messagesDiv1}>
                                                            <div className={classes.messagesBlockWrapper}>
                                                                <div className={classes.requestDetailBlock}>
                                                                    <div className={classes.modalUserInfoWrapper}>
                                                                        <Typography className={classes.modalUserInfo}>{selectedMyRequest.owner}</Typography>
                                                                    </div>
                                                                    <div className={classes.modalTasksWrapper}>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <Typography className={classes.modalTasksTitle}>Tasks</Typography>
                                                                        </div>
                                                                        <div style={{ marginTop: '12px' }}>
                                                                            {selectedMyRequest && selectedMyRequest.tasks && selectedMyRequest.tasks.map((task, index) =>
                                                                                <div>
                                                                                    <div className={classes.tasksContainer}>
                                                                                        <div style={{ display: 'flex' }}>
                                                                                            <Typography style={{ fontFamily: 'Raleway', marginRight: '16px', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                                {index + 1}.
                                                                                            </Typography>
                                                                                            <div>
                                                                                                <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                                    {task.advisorRequestType}
                                                                                                </Typography>
                                                                                                <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#4F4F4F', fontSize: '10px' }}>
                                                                                                    {task.explanation}
                                                                                                </Typography>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        {
                                                                            selectedMyRequest.notes && (
                                                                                <div style={{ marginTop: '32px' }}>
                                                                                    <Typography style={{ fontFamily: 'Raleway', fontWeight: '300', color: '#333', fontSize: '14px' }}>
                                                                                        {selectedMyRequest.notes}
                                                                                    </Typography>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {
                                                            selectedMyRequest.advisorRequestAttachments && selectedMyRequest.advisorRequestAttachments.length > 0 && (
                                                                <div className={classes.messagesDiv1}>
                                                                    <div className={classes.messagesBlockWrapper}>
                                                                        <div className={classes.requestDetailBlock}>
                                                                            {selectedMyRequest.advisorRequestAttachments.map((document, index) =>
                                                                                <div className={classes.attachmentContainer}>
                                                                                    <div className={classes.attachmentNameContainer} >
                                                                                        <div className={classes.pdfIconDiv}>PDF</div>
                                                                                        <div>
                                                                                            {
                                                                                                document.name.length < 20 ? (
                                                                                                    <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                                        {document.name}
                                                                                                    </Typography>
                                                                                                ) : (
                                                                                                    <Typography style={{ fontFamily: 'Raleway', fontWeight: '400', color: '#000', fontSize: '14px' }}>
                                                                                                        {document.name.substring(0, 20)}...
                                                                                                    </Typography>
                                                                                                )
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <IconButton style={{
                                                                                        padding: '0 5px 0 5px',
                                                                                        marginLeft: 'auto'
                                                                                    }} onClick={() => downloadFile(document.documentUrl, document.name)}>
                                                                                        <img className={classes.clockImage} src={Download} alt="img" />
                                                                                    </IconButton>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }


                                                        {
                                                            messages && messages.map((messageInfo, index) => {
                                                                return (
                                                                    <div key={index} className={classes.messagesDiv} >
                                                                        <div className={classes.messagesImageWrapper}>
                                                                            {
                                                                                messageInfo.sender.profileImageUrl ? (
                                                                                    <img className={classes.messagesSenderImage} src={messageInfo.sender.profileImageUrl} alt="img" />
                                                                                ) : (
                                                                                    <img className={classes.messagesSenderImage} src={userDefaultAvatar} alt="img" />
                                                                                )
                                                                            }

                                                                        </div>
                                                                        <div className={classes.messagesBlockWrapper}>
                                                                            <div className={classes.messageDetailBlock}>
                                                                                <Typography component="h4" className={classes.senderName}>
                                                                                    {messageInfo.sender.firstName}
                                                                                </Typography>
                                                                                {
                                                                                    messageInfo && messageInfo.chatContentType === "TEXT" && (
                                                                                        <Typography component="h8" className={classes.messageDetailInfo}>
                                                                                            {messageInfo.plainText}
                                                                                        </Typography>
                                                                                    )
                                                                                }
                                                                                {
                                                                                    messageInfo && messageInfo.chatContentType === "DOCUMENT" && (
                                                                                        <a className={classes.messageDetailInfo}
                                                                                            onClick={() => downloadFile(messageInfo.documentUrl, messageInfo.plainText)}
                                                                                        >
                                                                                            {messageInfo.plainText}
                                                                                        </a>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                            <Typography component="label" className={classes.messageDate}> Submitted on {dateToMyDate(messageInfo.createdAt).toLocaleDateString('en-US', option)}, </Typography>
                                                                            <Typography component="p" className={classes.messageTime}> {dateToMyTime(messageInfo.createdAt)} </Typography>
                                                                        </div>
                                                                    </div>

                                                                )
                                                            })
                                                        }
                                                        <div ref={messagesRef} />
                                                    </div>

                                                    {
                                                        selectedMyRequest.advisorRequestStatus === 'PAID' && (
                                                            <div className={classes.notificationBlock}>
                                                                <Typography component="h8" className={classes.notificationInfo}>
                                                                    Your request is in pending status. If anyone will accept this request, chat will be enabled.
                                                                </Typography>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        selectedMyRequest.advisorRequestStatus === 'COMPLETED' && (
                                                            <div className={classes.notificationBlock}>
                                                                <Typography component="h8" className={classes.notificationInfo}>
                                                                    This request has been completed and the chat has been disabled.
                                                                </Typography>
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </Grid>
                                    <Grid item lg={2} md={1} sm={0}></Grid>
                                </Grid>

                            </RequestDetailContainer>
                        )
                    }
                    {
                        myRequests && myRequests.length === 0 && (
                            <RequestDetailContainer>
                                <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                                    <Typography component="h2" className={classes.warningTitle}> Your requests will appear here </Typography>
                                    <Typography className={classes.warningDescription}>
                                        Create a new request below and start receiving support from our CoPilots. You can choose the urgency for the request and even set a deadline. Start now!
                                    </Typography>
                                    <Button
                                        $primary
                                        $width={'150px'}
                                        className={classes.hireAdvisorBtn}
                                        onClick={() => clickHireAdvisor()}
                                    >
                                        Hire CoPilot
                                    </Button>
                                </div>
                            </RequestDetailContainer>
                        )
                    }
                </Grid>

            </Grid>
            <HireAdvisor
                showHireAdvisor={showHireAdvisor}
                setShowHireAdvisor={setShowHireAdvisor}
            />
        </>
    );
}

export default MyRequest;
