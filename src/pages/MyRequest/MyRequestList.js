import React, {useEffect} from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Circle } from "iconoir-react";
import { Typography } from "@material-ui/core";
import { stringLimit} from "utils";
import { getMyRequests, requestSelector, selectMyRequest, listChats, markSeen } from "redux/features/request/requestSlice";


export const RequestListContainer = styled.div`
  background-color: white;
  height: 100%; 
  overflow: auto; 
  display: flex;
  flex-direction: column;
`;

const MyRequestList = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyRequests())
    }, [dispatch])

    const { myRequests } = useSelector(requestSelector);

    const useStyles = makeStyles({
        title: {
            fontSize: 26,
            fontFamily: 'MADE Mirage',
            fontWeight: 'normal',
            fontStyle: 'normal',
            paddingLeft: 21,
            paddingTop: 21,
            paddingBottom: 21
        },
        requestInfoDiv: {
            width: '100%',
            border: '1px solid #D5D5D5',
            paddingLeft: 21,
            paddingRight: 21,
            paddingTop: 17,
            paddingBottom: 17,
            '&:hover': {
                backgroundColor: "#BA886E",
                '& h4': {
                    color: '#FFF'
                },
                '& h6': {
                    color: '#FFF'
                },
                '& h8': {
                    color: '#FFF'
                }              
            }
        },
        requestBtn: {
            width: 127,
            height: 34,
            padding: '0 5px',
            backgroundColor: '#BA886E',
            color: '#FFFFFF',
            textAlign: 'center',
            alignItems: 'center',
            fontFamily: 'Raleway',
            paddingTop: 7,
            '&:hover': {
                cursor: "pointer"
            }            
        },
        requestIdInfo: {
            color: '#000000',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'Raleway',
            fontStyle: 'normal'
        },
        requestNote: {
            color: '#000000',
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            textTransform: 'uppercase'
        },
        requestDescription: {
            color: '#000000',
            fontSize: '14px',
            fontWeight: '300',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            opacity: 0.6
        },
        warning: {
            color: '#4F4F4F',
            fontSize: '12px',
            fontWeight: '400',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            textAlign: 'center',
            marginTop: 'auto',
            marginBottom: 'auto'
        },
        requestTitleDiv: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        rightInfo: {
            display: 'flex'
        },
        requestStatusInfo: {
            fontSize: 10,            
            textTransform: 'uppercase',
            fontWeight: '600',
            fontStyle: 'normal',
            width: 78,
            height: 12,
            textAlign: 'right'
        }


    });

    const classes = useStyles();

    const handleRequest = (request) => {
        dispatch(selectMyRequest(request))
        if (request.advisorRequestStatusId === 4 || request.advisorRequestStatusId === 3) {
            dispatch(listChats({advisorId: request.id}))
        }
        if (request.has_unread_messages) {
            dispatch(markSeen({advisorId: request.id}))
        }
    }

    const requestStatusSymbolList = ['Draft', 'Pending', 'In Progress', 'Approved'];
    const requestStatusSymbolColorList = ['#828282', '#828282', '#81A03F', '#BA886E'];

    return (
        <RequestListContainer>
            <Typography component="h1" className={classes.title}> My Requests </Typography>
            {
                myRequests && myRequests.length > 0 && myRequests.map((myRequest, index) => {
                    return (
                        <div className={classes.requestInfoDiv} onClick={() => handleRequest(myRequest)} key={index}>
                            <span className={classes.requestTitleDiv}>
                                {   myRequest.requestTitle && 
                                    <Typography component="h4" className={classes.requestIdInfo}> {myRequest.requestTitle} </Typography>
                                }
                                <div className={classes.rightInfo}>
                                    <Typography component="h5" className={classes.requestStatusInfo} style={{color: requestStatusSymbolColorList[myRequest.advisorRequestStatusId-1]}} >{requestStatusSymbolList[myRequest.advisorRequestStatusId-1]}</Typography>
                                    {   myRequest.has_unread_messages && 
                                            <Circle width={'14px'} color={'#BA886E'} />
                                    }
                                </div>
                            </span>
                            <Typography component="h6" className={classes.requestNote}> Request #{myRequest.id} </Typography>
                            {
                                myRequest.notes && (
                                    <Typography component="h8" className={classes.requestDescription}> 
                                        {stringLimit(myRequest.notes)}
                                    </Typography>
                                )
                            }
                        </div>
                    )
                })
            }

            {
                myRequests && myRequests.length === 0 && (
                    <Typography component="h6" className={classes.warning}> No requests yet</Typography>
                )
            }

        </RequestListContainer>
    );
}

export default MyRequestList;
