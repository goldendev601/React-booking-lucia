import React, {useEffect, useState} from "react";
import {Typography, Menu, MenuItem, ListItemText} from "@material-ui/core";
import {Button} from "@core/components";
import {makeStyles} from "@material-ui/core/styles";
import {Computer, NavArrowDown, ShareAndroid } from "iconoir-react";
import styled from "styled-components";
import {useHistory, useParams} from "react-router-dom";
import {setCategoryFormOpen, setEdit, setFileUploadOpen, setImportBookingOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {useDispatch, useSelector} from "react-redux";
import {ShareItineraryDialog} from "@core/components";
import {clearShareCode, getShareCode, shareCodeSelector} from "../../../../redux/features/shareCode/shareCodeSlice";
import {setEditTab} from "redux/features/dialogForms/itineraryFormSlice";
import {setBookingCategory} from "../../../../redux/features/dialogForms/bookingFormSlice";


export const HeaderActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  @media (max-width: 900px) {
    margin: 0 auto 30px auto;
  }
`;

export const ItineraryTitle = styled.div`
  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

const useStyles = makeStyles({
    headerTypography: {
        margin: '15px 0 0 0',
        display: 'flex',
    },
    headerTitleMain: {
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: '400',
        color: '#242424',
        fontFamily: 'Montserrat'
    },
    headerTitle: {
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: '400',
        color: '#BA886E',
        fontFamily: 'Montserrat'
    },
    shareButton: {
        margin: '0 20px 0 0'
    },
    hireTripKit: {
        margin: '0 20px 0 0'
    },
    hireAdvisor: {
        width: '200px !important',
        margin: '0 20px 0 0'
    }
});

const ItineraryDetailsHeader = ({title}) => {
    const classes = useStyles();
    let {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [shareItineraryOpen, setShareItineraryOpen] = useState(false);
    const [previewItineraryStatus, setPreviewItineraryStatus] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const {shareCode} = useSelector(shareCodeSelector);

    const handleShareItinerary = () => {
        setShareItineraryOpen(prevState => !prevState);
        dispatch(clearShareCode());
    };

    const handleOpenEditItineraryPicture = () => {
        dispatch(setFileUploadOpen(true));
    };

    const importBooking = () => {
        dispatch(setImportBookingOpen(true));
    };

    const previewItinerary = () => setPreviewItineraryStatus(true);

    useEffect(() => {
        if (previewItineraryStatus) {
            if (shareCode) {
                history.push(`/public/itinerary/${shareCode}`);
            } else {
                dispatch(getShareCode(id));
            }
        }
    }, [dispatch, history, id, previewItineraryStatus, shareCode]);

    const returnToItineraries = () => history.push('/itineraries');

    const addNewBooking = () => {
        dispatch(setEdit(false));
        dispatch(setCategoryFormOpen(true));
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            {shareItineraryOpen &&
            <ShareItineraryDialog handleShareItinerary={handleShareItinerary} shareItineraryOpen={shareItineraryOpen}/>}
            <HeaderActions>
                <ItineraryTitle>
                    <div className={classes.headerTypography}>
                        <Typography
                            variant="h2"
                            component="h2"
                            className={classes.headerTitleMain}
                            onClick={returnToItineraries}
                            style={{marginRight: '10px', cursor: 'pointer'}}
                        >
                            Itineraries
                        </Typography>
                        <Typography
                            variant="h2"
                            component="h2"
                            className={classes.headerTitleMain}
                            onClick={returnToItineraries}
                            style={{marginRight: '10px', cursor: 'pointer'}}
                        >
                            /
                        </Typography>
                        <Typography
                            variant="h2"
                            component="h2"
                            className={classes.headerTitle}
                        >
                            {title}
                        </Typography>
                    </div>
                </ItineraryTitle>
                <ButtonsContainer>
                    <Button
                        transparent={true}
                        onClick={previewItinerary}
                        iconstart={<Computer width={'22px'}/>}
                    >
                        Preview
                    </Button>
                    <Button
                        transparent={true}
                        onClick={handleShareItinerary}
                        iconstart={<ShareAndroid width={'22px'}/>}
                        className={classes.shareButton}
                    >
                        Share
                    </Button>
                    {/* <Button
                        transparent={true}                        
                        href={`mailto:${process.env.REACT_APP_MAIL_TO}`}
                        iconstart={<Check width={'22px'}/>}
                        className={classes.hireTripKit}
                    >
                        Hire TripKit
                    </Button> */}
                    {/* <Button
                        transparent={true}
                        onClick={handleHireAdvisor}
                        iconstart={<Language width={'22px'}/>}
                        className={classes.hireAdvisor}
                    >
                        Hire CoPilot
                    </Button> */}
                   
                    <>
                        <Button
                            $primary  
                            className={classes.cancelRequestBtn}
                            aria-controls="filter-list" 
                            aria-haspopup="true"
                            onClick={handleClick}
                            endIcon={<NavArrowDown width={'22px'} />}
                            style={{borderRadius: '5px'}}
                        >
                            Add
                        </Button>
                        <Menu
                            id="filter-list"
                            anchorEl={anchorEl}
                            keepMounted
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            transformOrigin={{ vertical: "top", horizontal: 'right' }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem>
                                <ListItemText onClick={addNewBooking}>
                                    New booking
                                </ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemText onClick={importBooking}>
                                    PDF Import
                                </ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemText onClick={handleOpenEditItineraryPicture}>
                                    Upload documents
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                    </>
                </ButtonsContainer>
            </HeaderActions>
        </React.Fragment>
    );
}

export default React.memo(ItineraryDetailsHeader);
