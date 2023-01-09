import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from "./CardComponents/CardContent";
import CardNotePopover from './CardComponents/CardNotePopover';
import CardPolicyPopover from './CardComponents/CardPolicyPopover';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { dateToMyTimeAMPM } from "utils";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {previewStyles} from "styles/previewStyles";

const ImagesContainer = styled.div`
    height: 300px;    
`


const useStyles = makeStyles({
    cardcontentDiv: {
        textAlign: 'left'
    },
    cardTitle: {
        fontSize: '38px',
        fontWeight: '300',
        fontStyle: 'normal',        
    },
    vehicleTitle: {
        color: '#000',
        fontSize: '14px',
        lineHeight: '24px',
        fontWeight: '400',
        fontFamily: 'Raleway',
        fontStyle: 'normal', 
        letterSpacing: '0.05em'       
    },
    vehicleInfo: {
        fontSize: '14px',
        lineHeight: '24px',
        fontWeight: '700',
        fontFamily: 'Raleway',
        fontStyle: 'normal', 
        letterSpacing: '0.05em',
        marginLeft: '10px'       
    },
    cardTitleDiv: {
        display: 'flex',
        justifyContent: 'space-between'
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
    cardNotesPolicyDiv: {
        textAlign: 'left',
        display: 'flex',
        marginTop: '20px'
    },
    cardNotesInfo: {
        fontSize: '16px',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        lineHeight: '24px',
        fontWeight: '700',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
});

const TransportCard = ({booking, showPriceOnShare, itineraryPropertyDesignId, ...rest}) => {
    const {
        customHeaderTitle,
        notes,
        transportFrom,
        transportTo,
        vehicle,
        departureDatetimeLocale,
        arrivalDatetimeLocale
    } = booking;

    const classes = useStyles()

    const themeStyle = previewStyles[itineraryPropertyDesignId - 1];

    return (
        <Card {...rest} style={{borderRadius: '0px', maxWidth: 'unset'}}>
            {/* <CardPicture firstPicture={pictures[0]}/> */}
            {/* <ImagesContainer className={classes.sliderContainer}>
            {typeof pictures !== 'undefined' && pictures.length > 0 ?
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
            </ImagesContainer> */}
            <CardContent>
                <div className={classes.cardTitleDiv}>
                    <Typography variant="h3" component="h3" className={classes.cardTitle} style={{color: themeStyle.transportcardTitleColor, fontFamily: themeStyle.transportcardTitleFontFamily}}>
                        {customHeaderTitle}
                    </Typography>
                    {
                        vehicle && (
                            <div style={{display: 'flex'}}>
                                <Typography className={classes.vehicleTitle}>
                                    Vehicle
                                </Typography>
                                <Typography className={classes.vehicleInfo} style={{color: themeStyle.transportcardDescriptionColor}}>
                                    {vehicle}
                                </Typography>
                            </div>
                        )
                    }
                </div>

                {
                    transportFrom && (
                        <div style={{display: 'flex'}}>
                            <Typography className={classes.vehicleTitle}>
                                Depart from
                            </Typography>
                            <Typography className={classes.vehicleInfo} style={{color: themeStyle.transportcardDescriptionColor}}>
                                {transportFrom}
                            </Typography>
                            {
                                departureDatetimeLocale && (
                                    <>
                                        <Typography className={classes.vehicleTitle} style={{marginLeft: '10px'}}>
                                            at
                                        </Typography>
                                        <Typography className={classes.vehicleInfo} style={{color: themeStyle.transportcardDescriptionColor}}>
                                            {dateToMyTimeAMPM(departureDatetimeLocale)}
                                        </Typography>
                                    </>
                                )
                            }
                            
                        </div>
                    )
                }

                {
                    transportTo && (
                        <div style={{display: 'flex'}}>
                            <Typography className={classes.vehicleTitle}>
                                Arrive to
                            </Typography>
                            <Typography className={classes.vehicleInfo} style={{color: themeStyle.transportcardDescriptionColor}}>
                                {transportTo}
                            </Typography>
                            {
                                arrivalDatetimeLocale && (
                                    <>
                                        <Typography className={classes.vehicleTitle} style={{marginLeft: '10px'}}>
                                            at
                                        </Typography>
                                        <Typography className={classes.vehicleInfo} style={{color: themeStyle.transportcardDescriptionColor}}>
                                            {dateToMyTimeAMPM(arrivalDatetimeLocale)}
                                        </Typography>
                                    </>
                                )
                            }
                            
                        </div>
                    )
                }

                <div className={classes.cardNotesPolicyDiv}>
                    <CardNotePopover notes={notes} />

                    <Typography variant="h5" component="h5" className={classes.cardNotesInfo} style={{color: themeStyle.transportcardDescriptionColor}}>
                        Notes
                    </Typography>

                </div>

            </CardContent>
        </Card>
       
    );
}

export default TransportCard;
