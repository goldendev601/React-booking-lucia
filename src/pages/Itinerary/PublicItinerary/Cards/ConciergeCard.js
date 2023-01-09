import React from 'react';
import Card from '@material-ui/core/Card';
import CardPicture from "./CardComponents/CardPicture";
import CardContent from "./CardComponents/CardContent";
import CardNote from "./CardComponents/CardNote";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import {dateToMyDate, dateToMyTimeAMPM} from "utils";
import { Carousel } from "react-responsive-carousel";
import {previewStyles} from "styles/previewStyles";
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
        fontWeight: '600'
    },
    cardTitleDiv: {
        textAlign: 'left'
    },
    cardTimeDiv: {
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
});

const ConciergeCard = ({booking, showPriceOnShare, itineraryPropertyDesignId, ...rest}) => {
    const {
        customHeaderTitle,
        notes,
        address,
        phone,
        pictures,
        startDatetime,
        startDatetimeLocale,
        endDatetimeLocale,
        serviceType,
        confirmedBy,
        confirmedFor,
        confirmationReference,
        supplier
    } = booking;
   
    const classes = useStyles()

    const themeStyle = previewStyles[itineraryPropertyDesignId - 1];

    return (
        <Card {...rest} style={{borderRadius: '0px', maxWidth: 'unset'}}>
            {/* <CardPicture firstPicture={pictures[0]}/> */}
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
                    <Typography variant="h3" component="h3" className={classes.cardTitle} style={{color: themeStyle.activitycardTitleColor, fontFamily: themeStyle.activitycardTitleFontFamily}}>
                        {customHeaderTitle}
                    </Typography>
                </div>
                <div className={classes.cardPhoneAddressDiv}>
                    <Typography variant="h5" component="h5" className={classes.cardPhoneAddress}>
                        {address}{address && phone && ','} {phone}
                    </Typography>
                </div>               
                
                {
                    startDatetimeLocale && endDatetimeLocale && (
                        <div className={classes.cardTimeDiv}>
                            {
                                serviceType ? (
                                    <Typography variant="h5" component="h5" className={classes.cardTime}>
                                        {serviceType} at {dateToMyTimeAMPM(startDatetimeLocale)} to {dateToMyTimeAMPM(endDatetimeLocale)}
                                    </Typography>
                                ) : (
                                    <Typography variant="h5" component="h5" className={classes.cardTime}>
                                        {dateToMyTimeAMPM(startDatetimeLocale)} to {dateToMyTimeAMPM(endDatetimeLocale)}
                                    </Typography>
                                )
                            }
                        </div>
                    )
                }

                {
                    supplier && (
                        <div className={classes.cardPhoneAddressDiv}>
                            <Typography variant="h5" component="h5" className={classes.cardPhoneAddress}>
                                {supplier.website}
                            </Typography>
                        </div>
                    )
                }
              
                {
                    notes !== "" && (
                        <CardNote notes={notes}/>
                    )
                }

                {
                    confirmedBy && confirmedFor && confirmationReference &&  (
                        <div className={classes.cardPhoneAddressDiv}>
                            <Typography variant="h5" component="h5" className={classes.cardPhoneAddress}>
                                Confirmed for <b>{confirmedFor}</b> by <b>{confirmedBy}</b> - {confirmationReference}
                            </Typography>
                        </div>
                    )
                }

                {
                    confirmedBy && confirmedFor && !confirmationReference &&  (
                        <div className={classes.cardPhoneAddressDiv}>
                            <Typography variant="h5" component="h5" className={classes.cardPhoneAddress}>
                                Confirmed for <b>{confirmedFor}</b> by <b>{confirmedBy}</b>
                            </Typography>
                        </div>
                    )
                }
                
            </CardContent>
        </Card>

    );
}

export default ConciergeCard;
