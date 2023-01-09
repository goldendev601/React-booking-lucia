import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {colors} from "styles/colors";
import {setTravelerProfileExpanded} from "redux/features/itineraries/itinerariesSlice";
import {IconButton} from "@material-ui/core";
import {DeleteCircledOutline, EditPencil} from "iconoir-react";
import {dateToMyDate} from "utils";
import {useDispatch, useSelector} from "react-redux";
import {
    dialogFormsStateSelector,
    setTravelerFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {EditTraveler} from "pages/Traveler/CreateTraveler/AddTraveler";
import {
    travelersSelector,
    setEdit,
    fetchTraveler,
    setTravelerId
} from "redux/features/travelers/travelersSlice";


const TravelerProfile = ({traveler}) => {
    const dispatch = useDispatch();

    const {travelerMultiFormOpen} = useSelector(dialogFormsStateSelector);
    const {isEdit} = useSelector(travelersSelector);

    const handleOpenEditTraveler = () => {
        dispatch(setTravelerFormOpen(true));
        dispatch(setEdit(true));
        dispatch(fetchTraveler(traveler.id));
        dispatch(setTravelerId(traveler.id));
    };

    const closeTravelerProfile = () => {
        dispatch(setTravelerProfileExpanded(false));
    }

    const option = {
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    }


    const useStyles = makeStyles({
        root: {
            width: '350px',
            backgroundColor: '#FFF',
            height: '100vh',
            boxShadow: '0px 24px 34px rgba(0, 0, 0, 0.35)'
        },
        header: {
            width: '100%',
            height: '66px',
            display: 'flex',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '18px',
            paddingBottom: '18px',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)'
        },
        title: {
            color: '#242424',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontSize: '17px',
            lineHeight: '30px'
        },
        mainContent: {
            width: '100%',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '18px',
            paddingBottom: '18px',
            alignItems: 'center',
            textAlign: 'center',
        },
        profilePicture: {
            textAlign: 'center'
        },
        profileImage: {
            width: '96px',
            height: '96px',
            objectFit: 'cover',
            borderRadius: '96px'
        },
        profileName: {
            textAlign: 'center',
            color: '#242424',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontSize: '20px',
            lineHeight: '20px',
            marginTop: '4px'
        },
        profileInfo: {
            textAlign: 'center',
            color: '#242424',
            fontWeight: '400',
            fontFamily: 'Raleway',
            fontSize: '14px',
            lineHeight: '20px',
            marginTop: '8px'
        },
        label: {
            textAlign: 'left',
            color: '#242424',
            fontWeight: '600',
            fontFamily: 'Raleway',
            fontSize: '14px',
            lineHeight: '20px',
            marginTop: '8px'
        },
        info: {
            textAlign: 'left',
            color: '#242424',
            fontWeight: '400',
            fontFamily: 'Raleway',
            fontSize: '14px',
            lineHeight: '20px',
            marginTop: '8px'
        },
        documentDiv: {
            textAlign: 'center',
            borderRadius: '5px',
            height: '48px',
            width: '100%',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#E8E8E8',
            alignItems: 'center',
            marginTop: '8px',
            paddingLeft: '12px',
            paddingRight: '12px',
            display: 'flex'
        },
        pdfIconDiv: {
            backgroundColor: '#E3555F',
            borderRadius: '5px',
            width: '49px',
            height: '21px',
            fontSize: '12px',
            color: '#FFF',
            paddingTop: '3px',
            marginRight: '10px',
            textAlign: 'center'
        }
    })

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography className={classes.title}>Traveler Profile</Typography>
                <IconButton
                    color="secondary"
                    aria-label="edit-action"
                    onClick={closeTravelerProfile}
                >
                    <DeleteCircledOutline width="18px" height="18px" color="#242424" />
                </IconButton>
            </div>
            <div className={classes.mainContent}>
                <div className={classes.profilePicture}>
                    {
                        traveler.imageUrl ? (
                            <img src={traveler.imageUrl} className={classes.profileImage} />
                        ) : (
                            <img className={classes.profileImage} src="https://s3-lucia-staging.s3.us-east-2.amazonaws.com/fncfranzese3-at-gmailcom-1637321387/profile_picture-LwsKb6LjyOdtvWSI.png"  />
                        )
                    }                    
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '18px'}}>
                    <Typography className={classes.profileName}>{traveler.name}</Typography>
                    <IconButton
                        color="secondary"
                        aria-label="edit-action"
                        onClick={handleOpenEditTraveler}
                    >
                        <EditPencil width="22px" height="22px" color={colors.brand} />
                    </IconButton>
                </div>
                <Typography className={classes.profileInfo}>{traveler.phone}</Typography>
                {
                    traveler.emails && traveler.emails.length > 0 && (
                        <Typography className={classes.profileInfo}>{traveler.emails[0]}</Typography>
                    )
                }
                {<EditTraveler/> && travelerMultiFormOpen && React.cloneElement(<EditTraveler/>, {open: travelerMultiFormOpen && isEdit})}
                
            </div>
            {
                traveler.birthday && (
                    <div className={classes.mainContent}>
                        <Typography className={classes.label}>Birthday</Typography>
                        <Typography className={classes.info}>{dateToMyDate(traveler.birthday).toLocaleDateString('en-US', option)}</Typography>
                    </div>
                )
            }

            {
                traveler.address && traveler.address !== 'null' && (
                    <div className={classes.mainContent}>
                        <Typography className={classes.label}>Address</Typography>
                        <Typography className={classes.info}>{traveler.address}</Typography>
                    </div>
                )
            }

            {
                traveler.supportDocuments && traveler.supportDocuments.length > 0 && (
                    <div className={classes.mainContent}>
                        <Typography className={classes.label}>Supporting Documents</Typography>
                        {
                            traveler.supportDocuments && traveler.supportDocuments.length > 0 && traveler.supportDocuments.map((document, index) => {
                                return (
                                    <div className={classes.documentDiv} key={index}>
                                        <div className={classes.pdfIconDiv}>PDF</div>
                                        <Typography className={classes.info} style={{marginTop: '0px'}}>{document.name}</Typography>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }

            {
                traveler.abstractNote && (
                    <div className={classes.mainContent}>
                        <Typography className={classes.label}>Notes</Typography>
                        <Typography className={classes.info}>{traveler.abstractNote}</Typography>
                    </div>
                )
            }
            
        </div>
    )
}

export default TravelerProfile