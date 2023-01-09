import React, {useEffect} from "react";
import styled from "styled-components";
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardPicture from "./CardComponents/CardPicture";
import CardContent from "./CardComponents/RoomCardContent";
import {useDispatch, useSelector} from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import { colors } from "styles/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {previewStyles} from "styles/previewStyles";
import { constantsSelector, getAmenities } from "redux/features/constants/constantsSlice";
import GenericImage from '../../../../assets/generic-image.jpg';
import {ReactComponent as GenericIcon} from '../../../../assets/icons_amenities/icon-amenities-generic.svg';
import {dateToMyDate} from "utils";



export const RoomInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
`;


const HotelMainContainer = styled.div`
`

const HotelImagesContainer = styled.div`
    height: 500px;
    position: relative;
    top: -80px;
    @media (max-width:960px) {
        margin-top: 100px;
    }
    @media (max-width:600px) {
        margin-top: 0px;
        top: 0px;
    }
`

const HotelAmentitiesContainer = styled.div`   
    padding-right: 75px;
    h5 {
        font-size: 20px;
        color: #242424;
        line-height: 20px;
        font-family: 'MADE Mirage';
        font-weight: normal;
    }
    @media (max-width:960px) {
        margin-left: 80px;
    }
    @media (max-width:600px) {
        margin-left: 30px !important;
        padding-right: 30px;
    } 
`

const HotelAmentitiesContainer1 = styled.div`  
    padding-right: 75px;
    margin-top: 165px;

    h5 {
        font-size: 20px;
        color: #242424;
        line-height: 20px;
        font-family: 'MADE Mirage';
        font-weight: normal;
    }
    @media (max-width:960px) {
        margin-left: 80px;
    }
    @media (max-width:600px) {
        margin-top: 0px;
    }
    @media (max-width:600px) {
        margin-left: 30px !important;
        padding-right: 30px;
    }  
`

const HotelDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 70px;
    padding-left: 75px;
    padding-right: 110px;
    height: 100%;
    & h4 {
        font-size: 32px;
        line-height: 50px;        
        margin-bottom: 20px;
    }
    & p {
        font-size: 16px;
        line-height: 24px;
        margin-top: 20px;
        margin-bottom: 20px;
    } 
    @media (max-width:600px) {
        padding-top: 30px;
        padding-left: 30px;
        padding-right: 30px;
    }  
`

const CheckPriceInformation = styled.div`
    display: block;
    label {
        font-size: 16px;
        line-height: 24px;
        font-family: 'MADE Mirage';
        font-style: normal;
        font-weight: normal;        
    }
    p {
        margin-bottom: 0;
        font-size: 15px;
        line-height: 19px;
        font-family: 'Poppins';
        display: inline-block;
        margin-left: 10px;
    }
`;

const PriceInformation = styled.div`
    display: block;
    padding: 0px 0px 0px 80px;
    margin-bottom: 60px;
    label {
        font-size: 16px;
        line-height: 24px;
        font-family: 'MADE Mirage';
        font-style: normal;
        font-weight: normal;        
    }
    p {
        margin-bottom: 0;
        font-size: 15px;
        line-height: 19px;
        font-family: 'Poppins';
        display: inline-block;
        margin-left: 10px;
    }
`;

const RoomInformation = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: flex-end;
    padding: 0px 110px 0px 80px;
    @media (max-width:1025px) {
        margin-top: 0px;
    }
    @media (max-width:600px) {
        padding-left: 30px;
        padding-right: 30px;
    }
   
    h1 {
        font-family: 'MADE Mirage';
        font-style: normal;
        font-weight: normal;
        font-size: 27px;
        line-height: 60px;
        margin-top: 10px;
        padding-bottom: 26px;
        @media (max-width:960px) {
            font-size: 20px;
        }
        @media (max-width:600px) {
            line-height: 40px;
        }
    }

`;

const RoomInformation1 = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: flex-end;
    padding: 0px 110px 0px 80px;
    @media (max-width:1025px) {
        margin-top: 0px;
    }
    @media (max-width:600px) {
        padding-left: 30px;
        padding-right: 30px;
    }
    h1 {
        font-family: 'MADE Mirage';
        font-style: normal;
        font-weight: normal;
        font-size: 50px;
        line-height: 60px;
        margin-top: 10px;
        padding-bottom: 26px;
        @media (max-width:960px) {
            font-size: 20px;
        }
    }

`;


const HotelCard = ({ booking, showPriceOnShare, itineraryPropertyDesignId, ...rest }) => {
    const {
        bookingId,
        customHeaderTitle,
        notes,
        address,
        checkInDate,
        checkOutDate,
        checkInTime,
        checkOutTime,
        pictures,
        price,
        amenities
    } = booking || {};  

    // console.log(booking);

    const { amenities: amenityList } = useSelector(constantsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAmenities());
    }, [dispatch]);
    
    const themeStyle = previewStyles[itineraryPropertyDesignId - 1];

    const room_info_list = booking.rooms; 
    const room_amount = room_info_list.length;

    const endDate = moment(checkOutDate);
    const startDate = moment(checkInDate);
    const duration = endDate.diff(startDate);
    const night = parseInt(duration/ (1000 * 3600 * 24));

    const option = {
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    }

    const useStyles = makeStyles({
        root1: {
            background: themeStyle.hotelcardRoot1BackgroundColor,
            marginTop: '150px',
            '@media (max-width:600px)': {
                marginTop: '0px',
            },
        },
        root2: {
            background: themeStyle.hotelcardRoot2BackgroundColor,
            marginTop: '150px',
            '@media (max-width:600px)': {
                marginTop: '0px',
                background: themeStyle.hotelcardRoot2MediaBackgroundColor
            },
        },
        itinerary: {
            margin: '69px 0 75px 0',
        },
        body1: {
            textAlign: 'center', color: colors.brand, marginBottom: '5px',
        },
        descriptionDiv: {
            '& p': {
                wordBreak: 'break-word'
            }
        },
        imageInfoGrid: {
            '@media (max-width:600px)': {
                order: '1',
                width: '100%'
            }
        },
        imageInfoGrid2: {
            '@media (max-width:600px)': {
                order: '4',
                width: '100%',
            }
        },
        mainInfoGrid: {
            '@media (max-width:600px)': {
                order: '2'
            }
        },
        bottomInfoGrid: {
            '@media (max-width:600px)': {
                order: '3',
                paddingTop: '25px',
                paddingBottom: '25px'
            }
        },
        bottomInfoGrid1: {
            display: 'flex', 
            paddingLeft: '75px',
            '@media (max-width:600px)': {
                order: '3',
                paddingTop: '25px',
                paddingLeft: '30px',
                paddingBottom: '25px'
            }
        },
        hotelDescriptionInfo: {
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 14,
            letterSpacing: '0.05em',
            backgroundColor: 'transparent !important',
            '& span': {
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: 14,
                letterSpacing: '0.05em',
                backgroundColor: 'transparent !important',
            }
        },
        addressDiv: {
            wordBreak: 'break-word',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '14px',
            lineHeight: '24px',
            letterSpacing: '0.05em',
            color: '#242424',
            '@media (max-width:600px)': {
                fontSize: '12px !important',
            }
        },
        img: {
            marginBottom: '150px',
            width: '100%',
            height: 'auto',
            borderTopLeftRadius: '50px',
            borderTopRightRadius: '50px',
            '@media (max-width:600px)': {
                borderTopLeftRadius: '0',
                borderTopRightRadius: '0',
            },
        },
        itineraryName: {
            '@media (max-width:600px)': {
                fontSize: '56px',
            },
            textAlign: 'center',
        },
        sliderContainer: {
            '& .control-dots': {
                bottom: '20px !important'
            },
            '& .control-dots > div:only-child': {
                display: 'none'
            },
            '@media (max-width:600px)': {
                height: '250px !important',
            }
        },
        crouselContainer: {
            height: '500px',
            '@media (max-width:600px)': {
                height: '250px !important',
            }
        },
        sliderImage: {
            width: '100%',
            height: '500px',
            overflow: 'hidden',
            '@media (max-width:600px)': {
                height: '250px',
            },
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
        modal: {
            width: '100%',
            maxHeight: '500px',
            borderTopLeftRadius: '50px',
            borderTopRightRadius: '50px',
            objectFit: 'cover',
            '@media (max-width:600px)': {
                borderTopLeftRadius: '0',
                borderTopRightRadius: '0',
            },
        },
        imgModal: {
            margin: '0',
            height: 'auto',
            width: '100%'
        },
        itineraryLogo: {
            maxWidth: '160px',
            maxHeight: '160px',
        },
        abstractRoot: {
            position: 'relative',
            maxWidth: '850px',
            top: '-100px',
            background: 'white',
            margin: '0 auto',
            padding: '60px 65px 90px',
            boxShadow: '0px 15px 50px 0px #0000000D'
        },
        abstractText: {
            fontSize: '17px',
            lineHeight: '30px',
            textAlign: 'center'
        },
        quoteLeft: {
            left: '10px'
        },
        quoteRight: {
            right: '10px'
        },
        priceValue: {
            marginTop: '5px',
            fontFamily: 'MADE Mirage',
            fontStyle: 'normal',
            fontSize: '27px'
        },
        priceDescription: {
            marginTop: '6px',
            fontFamily: 'MADE Mirage',
            fontStyle: 'normal',
            fontSize: '16px'
        },
        checkDate: {
            marginTop: '5px',
            fontFamily: 'MADE Mirage',
            fontStyle: 'normal',
            fontSize: '27px',
            '@media (max-width:1032px)': {
                fontSize: '18px',
            },
        },
        price: {
            marginLeft: '5px',
            color: '#242424',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '24px'
        },
        checkDateDiv: {
            display: 'block',
            '& label': {
                fontFamily: 'MADE Mirage',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '35px'
            },
        },
        priceDiv: {
            display: 'block',
            '& label': {
                fontFamily: 'MADE Mirage',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px',
                lineHeight: '35px'
            },
        },
        priceInfo: {
            display: 'flex',
        },  
        hotelIcon: {
            marginRight: '8px',
            width: '20px',
            height: '20px',
            '& svg path': {
                fill: '#BA886E'
            }
        },
        amentitiesContentDiv: {
            margin: '0px 0px 25px 0px',
            '@media (max-width:600px)': {
                display: 'block'
            }, 
        },
        selectedDotRoom: {
            width: '10px',
            height: '10px',
            borderRadius: '10px',
            background: '#BA886E',
            margin: '0px 3px',
            display: 'inline-block'
        },
        dotRoom: {
            width: '10px',
            height: '10px',
            borderRadius: '10px',
            background: '#828282',
            margin: '0px 3px',
            display: 'inline-block'
        },
        ContainerRoom: {
            width: '100%',
            '@media (max-width:600px)': {
                order: 6
            }, 
        },
        carouselContainerRoom: {
            '& .carousel-slider': {
                overflow: 'inherit'
            },
            '& .control-dots': {
                textAlign: 'left',
                bottom: '-45px',
                marginLeft: '75px'
            },
            '& .control-dots > div:only-child': {
                display: 'none'
            },
            '& .slider-wrapper': {
                overflowX: 'hidden',
                overflowY: 'inherit'
            },
            '& .slide > div': {
                boxShadow: '0px 4px 6px rgb(0 0 0 / 13%)'
            },
            '& .slide': {
                minWidth: '50% !important'
            },
            '@media (max-width:600px)': {
                order: 4,
                display: 'none'
            },      
        },
        cardTitleDiv: {
            textAlign: 'left',
            '& h4': {
                color: '#242424',
                fontFamily: 'Cormorant',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '38px',
                '@media (max-width:960px)': {
                    fontSize: '25px'
                },
            }
        },
        guestName: {
            display: 'flex',
            marginTop: '20px',
            '& label': {
                color: '#000000',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '16px',
                marginRight: '20px',
            },
            '& p': {
                color: '#000000',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '16px'
            }
        },
        roomTypeRate: {
            display: 'flex'
        },
        nightsDiv: {
            paddingRight: '100px',
            '& label': {
                color: '#242424',
                fontFamily: 'MADE Mirage',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '16px'
            },
        },
        roomsDiv: {
            paddingRight: '100px'
        },
        roomType: {
            display: 'flex',
            marginTop: '20px',
            marginRight: '20px',
            '& label': {
                color: '#000000',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '16px',
                marginRight: '20px',
            },
            '& p': {
                color: '#000000',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '16px'
            }
        },
        roomRate: {
            display: 'flex',
            marginTop: '20px',
            '& label': {
                color: '#000000',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '16px',
                marginRight: '20px',
            },
            '& p': {
                color: '#000000',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '16px'
            }
        },
        roomDescription: {
            marginTop: '20px',
            '& label': {
                color: '#000000',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '16px'
            },
            '& p': {
                color: '#000000',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '12px'
            }
        },
        hotelRoomCard: {
            borderRadius: '0px !important', 
            // maxWidth: 'unset', 
            marginLeft: '65px !important', 
            marginBottom: '20px !important',
            '@media (max-width:600px)': {
                display: 'none !important', 
            },
        }
    });

    const classes = useStyles();

    return (
        <>
            <Grid container className={room_info_list.length > 0 ? classes.root2 : classes.root1}>
                <Grid item md={5} className={classes.mainInfoGrid}>
                    <HotelMainContainer>
                        <HotelDataContainer>
                            <Typography id={bookingId} component="h4" style={{color: themeStyle.hotelcardTitleColor, fontFamily: themeStyle.hotelcardTitleFontFamily}}>{customHeaderTitle}</Typography>
                            <div className={classes.descriptionDiv}> 
                                {notes && <Typography style={{color: themeStyle.hotelcardDescriptionColor}} component="p" className={classes.hotelDescriptionInfo} dangerouslySetInnerHTML={{__html: notes}} />} 
                            </div>
                            {
                                address && (
                                    <Typography className={classes.addressDiv} style={{color: themeStyle.hotelcardDescriptionColor}}>{address}</Typography>
                                )
                            }
                            
                            {typeof pictures !== 'undefined' && pictures.length > 0 && (
                                <CheckPriceInformation>
                                    <div className={classes.checkDateDiv}>
                                        <Typography component="label" style={{color: themeStyle.hotelcardDescriptionColor}}>Check In:</Typography>
                                        <Typography component="h6" className={classes.checkDate} style={{color: themeStyle.checkDateColor}}>{dateToMyDate(checkInDate).toLocaleDateString('en-US', option)} - {checkInTime}</Typography>
                                    </div>
                                    <div className={classes.checkDateDiv} style={{marginTop: '15px'}}>
                                        <Typography component="label" style={{color: themeStyle.hotelcardDescriptionColor}}>Check Out:</Typography>
                                        <Typography component="h6" style={{color: themeStyle.checkDateColor}} className={classes.checkDate}>{dateToMyDate(checkOutDate).toLocaleDateString('en-US', option)} - {checkOutTime}</Typography>
                                    </div>
                                </CheckPriceInformation>   
                            )}
                        </HotelDataContainer>
                    </HotelMainContainer>
                </Grid>
                {typeof pictures !== 'undefined' && pictures.length > 0 ?
                    (
                        <Grid item md={7} className={classes.imageInfoGrid}>
                            <HotelImagesContainer className={classes.sliderContainer}>
                                
                                        <Carousel
                                            autoPlay
                                            height="500px"
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
                                            className={classes.crouselContainer}
                                        >
                                            {pictures.map((img, index) => (
                                                <div key={index} className={classes.sliderImage}>
                                                    <img alt="" src={img.imageUrl} />
                                                </div>
                                            ))}
                                        </Carousel>
                                    
                            </HotelImagesContainer>
                        </Grid>
                    ) : (
                        <Grid item md={7} className={classes.imageInfoGrid2}>
                            { (amenities.length > 0) &&
                                (
                                    <HotelAmentitiesContainer1>
                                        <Typography component="h5" style={{color: themeStyle.hotelcardDescriptionColor}}>Amenities</Typography>
                                        <Grid container spacing={3} className={classes.amentitiesContentDiv}>
                                            {
                                                amenities.map((amenity, index) => {
                                                    const amenityItem = amenityList && amenityList.find((amenityItem) => amenityItem.description === amenity)
                                                    return (
                                                    <Grid item md={4} key={index}>
                                                        <Grid container style={{flexWrap: 'nowrap'}}>
                                                            {
                                                                amenityItem ? (
                                                                    <img src={amenityItem.imageUrl} className={classes.hotelIcon} alt="hotelIcon" />
                                                                ) : (
                                                                    <Typography className={classes.hotelIcon} style={{color: themeStyle.checkDateColor}}><GenericIcon/></Typography>
                                                                )
                                                            }
                                                            <Typography component="p" style={{color: themeStyle.hotelcardDescriptionColor}}>{amenity}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </HotelAmentitiesContainer1>  
                                )
                            }                                         
                        </Grid>
                    )
                }
                {(typeof pictures === 'undefined' || pictures.length === 0) && (
                     <Grid item className={classes.bottomInfoGrid1} sm={12}>
                        <Grid item sm={5}>
                            <CheckPriceInformation>
                                <div className={classes.checkDateDiv}>
                                    <Typography component="label" style={{color: themeStyle.hotelcardDescriptionColor}}>Check In:</Typography>
                                    <Typography component="h6" style={{color: themeStyle.checkDateColor}} className={classes.checkDate}>
                                        {dateToMyDate(checkInDate).toLocaleDateString('en-US', option)} - {checkInTime}
                                    </Typography>
                                </div>
                                <div className={classes.checkDateDiv} style={{marginTop: '15px'}}>
                                    <Typography component="label" style={{color: themeStyle.hotelcardDescriptionColor}}>Check Out:</Typography>
                                    <Typography component="h6" style={{color: themeStyle.checkDateColor}} className={classes.checkDate}>
                                        {dateToMyDate(checkOutDate).toLocaleDateString('en-US', option)} - {checkOutTime}
                                    </Typography>
                                </div>
                            </CheckPriceInformation>   
                        </Grid>
                        <Grid item sm={7}>
                            {price > 0 && (
                                <PriceInformation>
                                    <div className={classes.priceDiv}>
                                        <Typography component="label" style={{color: themeStyle.hotelcardDescriptionColor}}>Price:</Typography>
                                        <div className={classes.priceInfo}>
                                            <Typography component="h6" style={{color: themeStyle.checkDateColor}} className={classes.priceValue}>${price}</Typography>
                                            <Typography component="h8" className={classes.priceDescription} style={{color: themeStyle.hotelcardDescriptionColor}}>(including taxes and fees)</Typography>
                                        </div>  
                                    </div>
                                </PriceInformation>
                            )}
                        </Grid>
                     </Grid>
                )}
                <Grid item sm={12} className={classes.bottomInfoGrid}> 
                    <Grid container className={classes.bottomDiv}>
                        <Grid item md={5} sm={12}>
                            {typeof pictures !== 'undefined' && pictures.length > 0 ?
                                (
                                    <>
                                    <RoomInformation>
                                        <div className={classes.nightsDiv}>
                                            <Typography component="label" style={{color: themeStyle.hotelcardDescriptionColor}}>Nights</Typography>
                                            <Typography style={{color: themeStyle.checkDateColor}} component="h1">{night}</Typography>
                                        </div>
                                        {
                                            room_amount !== 0 && (
                                                <div className={classes.roomsDiv}>
                                                    <Typography component="label" style={{color: themeStyle.hotelcardDescriptionColor}}>Rooms</Typography>
                                                    <Typography style={{color: themeStyle.checkDateColor}} component="h1">{room_amount}</Typography>
                                                </div>
                                            )
                                        }
                                        
                                    </RoomInformation>
                                    {price > 0 && (
                                        <PriceInformation>
                                            <div className={classes.priceDiv}>
                                                <Typography component="label" style={{color: themeStyle.hotelcardDescriptionColor}}>Price:</Typography>
                                                <div className={classes.priceInfo}>
                                                    <Typography component="h6" style={{color: themeStyle.checkDateColor}} className={classes.priceValue}>${price}</Typography>
                                                    <Typography component="h8" className={classes.priceDescription} style={{color: themeStyle.hotelcardDescriptionColor}}>(including taxes and fees)</Typography>
                                                </div>  
                                            </div>
                                        </PriceInformation>
                                    )}
                                    </>
                                ) : (
                                    <>
                                    <RoomInformation1>
                                        <div className={classes.nightsDiv}>
                                            <Typography component="label" style={{color: themeStyle.hotelcardDescriptionColor}}>Nights</Typography>
                                            <Typography style={{color: themeStyle.checkDateColor}} component="h1">{night}</Typography>
                                        </div>
                                        {
                                            room_amount !== 0 && (
                                                <div className={classes.roomsDiv}>
                                                    <Typography component="label" style={{color: themeStyle.hotelcardDescriptionColor}}>Rooms</Typography>
                                                    <Typography style={{color: themeStyle.checkDateColor}} component="h1">{room_amount}</Typography>
                                                </div>
                                            )
                                        }
                                                                             
                                    </RoomInformation1>
                                    </>
                                )
                            }
                                
                        </Grid>
                        {typeof pictures !== 'undefined' && pictures.length > 0 &&
                            (
                                <Grid item md={7} sm={12}>
                                    {(amenities.length > 0) &&
                                        (
                                            <HotelAmentitiesContainer>
                                                <Typography component="h5" style={{color: themeStyle.hotelcardDescriptionColor}}>Amenities</Typography>
                                                <Grid container spacing={3} className={classes.amentitiesContentDiv}>
                                                    {
                                                        amenities.map((amenity, index) => {
                                                            const amenityItem = amenityList && amenityList.find((amenityItem) => amenityItem.description === amenity)
                                                            return (
                                                            <Grid item md={4} key={index}>
                                                                <Grid container style={{flexWrap: 'nowrap'}}>
                                                                    {
                                                                        amenityItem ? (
                                                                            <img src={amenityItem.imageUrl} className={classes.hotelIcon} alt="hotelIcon" />
                                                                        ) : (
                                                                            <Typography className={classes.hotelIcon} style={{color: themeStyle.checkDateColor}}><GenericIcon/></Typography>
                                                                        )
                                                                    }
                                                                    <Typography component="p" style={{color: themeStyle.hotelcardDescriptionColor}}>{amenity}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                            )
                                                        })
                                                    }
                                                
                                                </Grid>
                                            </HotelAmentitiesContainer>
                                        )
                                    }
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>

                
                    {room_info_list.length > 1 &&
                        (
                            <div className={classes.carouselContainerRoom}>
                                <Carousel
                                    centerMode
                                    infiniteLoop={false}
                                    showStatus={false}
                                    showArrows={false}
                                    centerSlidePercentage={50}
                                    renderIndicator={
                                        (clickHandler, isSelected, index, label) => (
                                            <div key={index} className={isSelected ? classes.selectedDotRoom : classes.dotRoom} onClick={clickHandler}></div>
                                        )
                                    }
                                >
                                    {room_info_list.map((room_info, index) =>
                                        (
                                            <Card {...rest} className={classes.hotelRoomCard} style={{maxWidth: "unset"}}>
                                                {
                                                    typeof room_info.imageUrl !== 'undefined' && room_info.imageUrl && room_info.imageUrl.length > 0 ? (
                                                        <CardPicture firstPicture={room_info.imageUrl} />
                                                    ) : (
                                                        <CardPicture firstPicture={GenericImage}/>
                                                    )
                                                }
                                               
                                                <CardContent>
                                                    <div className={classes.cardTitleDiv}>
                                                        <Typography component="h4" className={classes.cardTitle}>
                                                            {room_info.roomType}
                                                        </Typography>
                                                        <div className={classes.roomDescription}>                                                            
                                                            <Typography component="p" className={classes.beddingTypeValue}>
                                                                {room_info.roomDescription}
                                                            </Typography>
                                                        </div>
                                                        {room_info.guestName && room_info.guestName !== "" &&
                                                            (
                                                                <div className={classes.guestName}>
                                                                    <Typography component="label">Guest name:</Typography>
                                                                    <Typography component="p" className={classes.guestNameValue}>
                                                                        {room_info.guestName}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                        }
                                                            
                                                        <div className={classes.roomTypeRate}>
                                                            <div className={classes.roomType}>
                                                                <Typography component="label">Bedding type:</Typography>
                                                                <Typography component="p" className={classes.beddingTypeValue}>
                                                                    {room_info.beddingType}
                                                                </Typography>
                                                            </div>
                                                            {
                                                                showPriceOnShare && room_info.roomRate && room_info.roomRate !== 0 && (

                                                                    <div className={classes.roomRate}>
                                                                        <Typography component="label">Room rate:</Typography>
                                                                        <Typography component="p" className={classes.roomRateValue}>
                                                                            {room_info.roomRate} {room_info.currency}
                                                                        </Typography>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )
                                    )}
                                </Carousel>
                            </div>

                        )
                    }
                    {room_info_list.length === 1 &&
                        (
                            <div className={classes.ContainerRoom}>
                                <Card {...rest} className={classes.hotelRoomCard} style={{maxWidth: "1000px"}}>
                                    {
                                        typeof room_info_list[0].imageUrl !== 'undefined' && room_info_list[0].imageUrl ? (
                                            <CardPicture firstPicture={room_info_list[0].imageUrl}/>
                                        ) : (
                                            <CardPicture firstPicture={GenericImage}/>
                                        )
                                    }
                                    <CardContent>
                                        <div className={classes.cardTitleDiv}>
                                            <Typography component="h4" className={classes.cardTitle}>
                                                {room_info_list[0].roomType}
                                            </Typography>
                                            <div className={classes.roomDescription}>
                                                <Typography component="p" className={classes.beddingTypeValue}>
                                                    {room_info_list[0].roomDescription}
                                                </Typography>
                                            </div>
                                            {room_info_list[0] !== "" && room_info_list[0].guestName &&
                                                (
                                                    <div className={classes.guestName}>
                                                        <Typography component="label">Guest name:</Typography>
                                                        <Typography component="p" className={classes.guestNameValue}>
                                                            {room_info_list[0].guestName}
                                                        </Typography>
                                                    </div>
                                                )
                                            }
                                            <div className={classes.roomTypeRate}>
                                                <div className={classes.roomType}>
                                                    <Typography component="label">Bedding type:</Typography>
                                                    <Typography component="p" className={classes.beddingTypeValue}>
                                                        {room_info_list[0].beddingType}
                                                    </Typography>
                                                </div>
                                                {
                                                    showPriceOnShare && room_info_list.roomRate !== 0 && (

                                                        <div className={classes.roomRate}>
                                                            <Typography component="label">Room rate:</Typography>
                                                            <Typography component="p" className={classes.roomRateValue}>
                                                                {room_info_list[0].roomRate} {room_info_list[0].currencyType}
                                                            </Typography>
                                                        </div>
                                                    )
                                                }
                                            </div>                                           
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    }
                    
                
            </Grid>
            
        </>
    );
}

export default HotelCard;
