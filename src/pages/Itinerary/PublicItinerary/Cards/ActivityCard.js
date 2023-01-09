import React from 'react';
import Card from '@material-ui/core/Card';
import CardPicture from "./CardComponents/CardPicture";
import CardContent from "./CardComponents/CardContent";
import CardNotePopover from './CardComponents/CardNotePopover';
import CardSupplierPopover from './CardComponents/CardSupplierPopover';
import CardPolicyPopover from './CardComponents/CardPolicyPopover';
import { Typography, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import {previewStyles} from "styles/previewStyles";
import {cleanText, dateToMyTimeAMPM} from "utils";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import GenericImage from '../../../../assets/generic-image.jpg';


const ImagesContainer = styled.div`
    height: 300px;    
`

const useStyles = makeStyles({
    cardcontentDiv: {
        textAlign: 'left'
    },
    cardTitle: {
        // color: '#242424',
        fontSize: '32px',
        // fontFamily: 'Cormorant',
        fontStyle: 'normal',
    },
    cardTime: {
        color: '#BA886E',
        fontSize: '16px',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        lineHeight: '24px',
        fontWeight: '600',
        paddingLeft: '5px',
        paddingRight: '5px'
    },
    cardTime1: {
        color: '#BA886E',
        fontSize: '16px',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        lineHeight: '24px',
        fontWeight: '600',
        paddingRight: '5px'
    },
    cardNotesInfo: {
        color: '#BA886E',
        fontSize: '16px',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        lineHeight: '24px',
        fontWeight: '600',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    cardSupplierName: {
        color: '#BA886E',
        fontSize: '16px',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        lineHeight: '24px',
        fontWeight: '600',
        padding: '10px 10px 10px 0px',
    },
    cardTimeBlack: {
        color: '#242424',
        fontSize: '16px',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        lineHeight: '24px',
        fontWeight: '600',
        paddingLeft: '5px',
        paddingRight: '5px'
    },
    cardTitleDiv: {
        textAlign: 'left'
    },
    cardTimeDiv: {
        textAlign: 'left',
        display: 'flex'
    },
    cardPhoneAddress: {
        color: '#242424',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: '14px',
        padding: '10px 0px 10px 0px',
        fontWweight: 'normal',
        lineHeight: '24px',
    },
    cardPhoneAddressDiv: {
        textAlign: 'left'
    },
    cardNotesPolicyDiv: {
        textAlign: 'left',
        display: 'flex',
        marginTop: '20px'
    },
    sliderContainer: {
        '& .control-dots': {
            bottom: '20px !important'
        },
        '& .control-dots > div:only-child': {
            display: 'none'
        }
    },
    sliderImage: {
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        '& img': {
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover'
        }
    },
    selectedDot: {
        width: '10px',
        height: '10px',
        borderRadius: '10px',
        background: '#BA886E',
        margin: '0px 3px',
        display: 'inline-block'
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '10px',
        background: '#FBF8F3',
        margin: '0px 3px',
        display: 'inline-block'
    },
    cardNoteDiv: {
        textAlign: 'left'
    }
});

const ActivityCard = ({booking, showPriceOnShare, itineraryPropertyDesignId, ...rest}) => {
    const {
        confirmationReference, notes, payment, price, description, address, phone, pictures, customHeaderTitle, meetingPoint, startDatetimeLocale, endDatetimeLocale, supplier
    } = booking;  
    
    const themeStyle = previewStyles[itineraryPropertyDesignId - 1];

    const classes = useStyles()

    return (
        <Card {...rest} style={{borderRadius: '0px', maxWidth: 'unset'}}>
            <ImagesContainer className={classes.sliderContainer}>
                {pictures && pictures.length > 0 ?
                    (
                        <Carousel
                            autoPlay
                            height="300px"
                            width="100%"
                            showArrows={false}
                            showStatus={false}
                            showThumbs={false}
                            dynamicHeight={false}
                            renderIndicator={
                                (clickHandler, isSelected, index, label) => (
                                    <div key={index} className={isSelected ? classes.selectedDot : classes.dot} onClick={clickHandler}></div>
                                )
                            }
                        >
                            {pictures.map((img, index) => (
                                <div key={index} className={classes.sliderImage}>
                                    <img alt="" src={img.imageUrl} />
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <CardPicture firstPicture={GenericImage}/>
                    )
                }
            </ImagesContainer>
            <CardContent>
                <div className={classes.cardTitleDiv}>
                    <Typography variant="h3" component="h3" className={classes.cardTitle} style={{color: themeStyle.activitycardTitleColor, fontFamily: themeStyle.activitycardTitleFontFamily}} >
                        {customHeaderTitle}
                    </Typography>
                </div>
                {
                    startDatetimeLocale && endDatetimeLocale && (
                        <div className={classes.cardTimeDiv}>
                            <Typography variant="h5" component="h5" className={classes.cardTime1}>
                                {meetingPoint}
                            </Typography>
                            <Typography className={classes.cardTimeBlack}>
                                at
                            </Typography>
                            <Typography variant="h5" component="h5" className={classes.cardTime}>
                                {dateToMyTimeAMPM(startDatetimeLocale)}
                            </Typography>
                            <Typography className={classes.cardTimeBlack}>
                                to
                            </Typography>
                            <Typography variant="h5" component="h5" className={classes.cardTime}>
                                {dateToMyTimeAMPM(endDatetimeLocale)}
                            </Typography>
                        </div>
                    )
                }
                
                {
                    notes !== "" && (
                        <div className={classes.cardNoteDiv}>
                            <Typography variant="h5" component="h5" className={classes.cardNote}>
                                <Typography component="p" dangerouslySetInnerHTML={{__html: notes}} />
                            </Typography>
                        </div>
                    )
                }

                

                {
                    confirmationReference &&  (
                        <div className={classes.cardPhoneAddressDiv}>
                            <Typography variant="h5" component="h5" className={classes.cardPhoneAddress}>
                                Conf #{confirmationReference}
                            </Typography>
                        </div>
                    )
                }

                <div className={classes.cardNotesPolicyDiv}>
                    {/* <CardNotePopover notes={notes} />
                    <Typography variant="h5" component="h5" className={classes.cardNotesInfo}>
                        Notes
                    </Typography> */}

                    <CardSupplierPopover supplier={supplier} address={address} phone={phone} />
                    <Typography variant="h5" component="h5" className={classes.cardNotesInfo}>
                        Provider Info
                    </Typography>

                    {
                        description && cleanText(description) && (cleanText(description).length > 1) && (
                            <>
                            <CardPolicyPopover description={description} />
                            <Typography variant="h5" component="h5" className={classes.cardNotesInfo}>
                                Cancellation policy
                            </Typography>
                            </>
                        )
                    }

                    
                </div>
                
            </CardContent>
        </Card>
    );
}

export default ActivityCard;
