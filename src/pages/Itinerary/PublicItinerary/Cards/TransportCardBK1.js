import React, { useLayoutEffect } from 'react';
import styled from "styled-components";
import moment from 'moment';
import { Typography, Grid } from "@material-ui/core";
import { colors } from "styles/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {previewStyles} from "styles/previewStyles";
import {dateToMyDate, dateToMyTimeAMPM} from "utils";


const CruiseMapContainer = styled.div`
    width: 100%;
    height: 450px;
    background: #FFF;
    & svg > g > g > g:last-child {
        display: none;
    }
`

export const RoomInfo = styled.div`
  display: flex;
    10px;
`;

const CruiseMainContainer = styled.div`
`

const CruiseImagesContainer = styled.div`
    height: 500px;
    position: relative;
    top: -80px;
    @media (max-width:600px) {
        top: 0px;
    }
`

const CruiseDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 70px;
    padding-left: 75px;
    padding-right: 110px;
    height: 100%;
    @media (max-width:600px) {
        padding-bottom: 150px;
        padding-top: 30px;
        padding-right: 30px;
        padding-left: 30px;
    }
    & h4 {
        font-family: 'Cormorant';
        font-size: 32px;
        line-height: 50px;
        color: #FFF;
        margin-bottom: 20px;
    }
    & p {
        font-size: 16px;
        line-height: 24px;
        color: #FFF;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    & h6 {
        font-size: 16px;
        line-height: 24px;
        color: #FFF;
    },
   
`

const CheckPriceInformation = styled.div`
    display: block;
    label {
        font-size: 16px;
        color: #FFF;
        line-height: 24px;
        font-family: 'Raleway';
        font-style: 'normal';
        font-weight: bold;        
    }
    p {
        margin-bottom: 0;
        font-size: 15px;
        color: #FFF;       
        line-height: 19px;
        font-family: 'Poppins';
        display: inline-block;
        margin-left: 10px;
    }
`;


const TransportCardBK1 = ({booking, showPriceOnShare, itineraryPropertyDesignId, ...rest}) => {
    const {
        categoryBookingId, 
        bookingId,
        customHeaderTitle,
        notes, 
        title,
        pictures,
        fromGeolocation,
        toGeolocation,
        transportFrom,
        transportTo,
        departureDatetime,
        departureDatetimeLocale,
        arrivalDatetime,
        arrivalDatetimeLocale,
        vehicle
    } = booking;  

    const themeStyle = previewStyles[itineraryPropertyDesignId - 1];

    const option = {
        day : 'numeric',
        month : 'long',
        year : 'numeric'
    }

    const checkInDateInfo = moment(departureDatetimeLocale); 
    // const endDate = moment(disembarkationDatetimeLocale);
    // const startDate = moment(departureDatetimeLocale);
    // const duration = endDate.diff(startDate);
    // const night = parseInt(duration/ (1000 * 3600 * 24));


    const useStyles = makeStyles({
        root: {
            background: themeStyle.transportcardRoot1BackgroundColor,
            marginTop: '150px',
            marginBottom: '0px !important',
            '@media (max-width:600px)': {
                background: 'transparent',
                marginBottom: '0px !important',
                display: 'block'
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
            height: '500px',
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
        checkDate: {
            marginLeft: '5px',
            color: '#242424',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '24px'
        },
        transportFromInfo: {
            marginLeft: '5px',
            color: '#BA886E',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '24px',
            '@media (max-width:600px)': {
                marginLeft: '0px',
            }
        },
        transportToInfo: {
            marginLeft: '5px',
            color: '#BA886E',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '24px'
        },
        price: {
            marginLeft: '5px',
            color: '#242424',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '24px'
        },
        flexDiv: {
            display: 'flex',
            '@media (max-width:600px)': {
                display: 'block',
            }
        },
        priceDiv: {
            display: 'flex'
        },
        amentitiesIcon: {
            marginRight: '5px',
            '& svg path': {
                fill: '#FFF'
            }
        },
        amentitiesContentDiv: {
            margin: '0px 0px 25px 0px'
        },
        mainContainerGrid: {
            minHeight: '450px',
            '@media (max-width:600px)': {
                backgroundColor: themeStyle.transportcardRoot1BackgroundColor,
            }
        },
        imageContainerGrid: {
            '@media (max-width:600px)': {
                marginTop: '0px',
            }
        }
    });


    const classes = useStyles();

    useLayoutEffect(() => {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        const bookingFrom = "Start Point";
        const bookingTo = "End Point";

        let geolocationIsValid = false;

        var fromLatitude = null;
        var fromLongitude = null;
        var toLatitude = null;
        var toLongitude = null;

        if (fromGeolocation) {
            fromLatitude = fromGeolocation.latitude;
            fromLongitude = fromGeolocation.longitude;
        }

        if (toGeolocation) {
            toLatitude = fromGeolocation.latitude;
            toLongitude = fromGeolocation.longitude;
        }

        if (fromLatitude && fromLongitude && toLatitude && toLongitude) {
            geolocationIsValid =  true;
        }

        // Create map instance
        var chart = am4core.create("chartdiv2_" + booking.bookingId, am4maps.MapChart);
        chart.geodata = am4geodata_worldLow;
        chart.projection = new am4maps.projections.Miller();
        chart.homeZoomLevel = 5.5;
        chart.homeZoomLevel = 1;

        if (geolocationIsValid) {
            chart.homeGeoPoint = {
                latitude: (fromLatitude * 1 + toLatitude * 1)/2,
                longitude: (fromLongitude * 1 + toLongitude * 1)/2
            };
        } else {
            chart.homeGeoPoint = {
                latitude: (39.0742 + 29.6100)/2,
                longitude: (28.2336 + 21.8243)/2
            };
        }

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
        polygonSeries.mapPolygons.template.nonScalingStroke = true;
        polygonSeries.exclude = ["AQ"];

        // Add line bullets
        var cities = chart.series.push(new am4maps.MapImageSeries());
        cities.mapImages.template.nonScaling = true;

        var city = cities.mapImages.template.createChild(am4core.Circle);
        city.radius = 6;
        city.fill = chart.colors.getIndex(0).brighten(-0.2);
        city.strokeWidth = 2;
        city.stroke = am4core.color("#fff");

        function addCity(coords, title) {
            var city = cities.mapImages.create();
            city.latitude = coords.latitude;
            city.longitude = coords.longitude;
            city.tooltipText = title;
            return city;
        }

        if (geolocationIsValid) {
        
            var fromlocation = addCity({ "latitude": fromLatitude * 1, "longitude": fromLongitude * 1 }, bookingFrom);
            var tolocation = addCity({ "latitude": toLatitude * 1, "longitude": toLongitude * 1 }, bookingTo);

            // Add lines
            var lineSeries = chart.series.push(new am4maps.MapArcSeries());
            lineSeries.mapLines.template.line.strokeWidth = 2;
            lineSeries.mapLines.template.line.strokeOpacity = 0.5;
            lineSeries.mapLines.template.line.stroke = city.fill;
            lineSeries.mapLines.template.line.nonScalingStroke = true;
            lineSeries.mapLines.template.line.strokeDasharray = "1,1";
            lineSeries.zIndex = 10;

            var shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
            shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
            shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
            shadowLineSeries.mapLines.template.shortestDistance = false;
            shadowLineSeries.zIndex = 5;

            function addLine(from, to) {
                var line = lineSeries.mapLines.create();
                line.imagesToConnect = [from, to];
                line.line.controlPointDistance = -0.3;

                var shadowLine = shadowLineSeries.mapLines.create();
                shadowLine.imagesToConnect = [from, to];

                return line;
            }

            addLine(fromlocation, tolocation);
        }
       
    }, [fromGeolocation, toGeolocation]);

    return (
        <>
            <Grid container className={classes.root}>
                <Grid item md={5} className={classes.mainContainerGrid}>
                    <CruiseMainContainer>
                        <CruiseDataContainer>
                            <Typography id={bookingId} component="h4" style={{color: themeStyle.transportcardTitleColor, fontFamily: themeStyle.transportcardTitleFontFamily}}>{title}</Typography>
                            <div className={classes.flexDiv}>
                                <Typography className={classes.transportFromLabel} component="h6">Depart from</Typography>
                                <Typography className={classes.transportFromInfo} component="h5">{transportFrom}</Typography>
                            </div>
                            <div className={classes.flexDiv}>
                                <Typography className={classes.transportFromLabel} component="h6">Arrive at</Typography>
                                <Typography className={classes.transportToInfo} component="h5">{transportTo}</Typography>
                            </div>
                            <div className={classes.descriptionDiv}> 
                                {notes && <Typography component="p" dangerouslySetInnerHTML={{__html: notes}} />} 
                            </div>
                            {/* {notes && <Typography component="p">{notes}</Typography>} */}
                            {/* {
                                departureDatetimeLocale && (
                                    <div className={classes.flexDiv}>
                                        <Typography className={classes.transportFromLabel} component="h6">Departure time</Typography>
                                        <Typography className={classes.transportFromInfo} component="h5">{dateToMyDate(departureDatetimeLocale).toLocaleDateString('en-US', option)} - {dateToMyTimeAMPM(departureDatetimeLocale)}</Typography>
                                    </div>
                                )
                            }
                            {
                                arrivalDatetimeLocale && (
                                    <div className={classes.flexDiv}>
                                        <Typography className={classes.transportFromLabel} component="h6">Arrival time</Typography>
                                        <Typography className={classes.transportToInfo} component="h5">{dateToMyDate(arrivalDatetimeLocale).toLocaleDateString('en-US', option)} - {dateToMyTimeAMPM(arrivalDatetimeLocale)}</Typography>
                                    </div>
                                )
                            }
                            <div className={classes.flexDiv}>
                                <Typography className={classes.transportFromLabel} component="h6">Vehicle</Typography>
                                <Typography className={classes.transportToInfo} component="h5">{vehicle}</Typography>
                            </div> */}
                        </CruiseDataContainer>
                    </CruiseMainContainer>
                </Grid>
                <Grid item md={7} className={classes.imageContainerGrid}>
                    
                    {typeof pictures !== 'undefined' && pictures.length > 0 &&
                        (
                            <CruiseImagesContainer className={classes.sliderContainer}>
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
                                >
                                    {pictures.map((img, index) => (
                                        <div key={index} className={classes.sliderImage}>
                                            <img alt="" src={img.imageUrl} />
                                        </div>
                                    ))}
                                </Carousel>
                            </CruiseImagesContainer>
                        )}
                    

                </Grid>
            </Grid>
            {/* <CruiseMapContainer id={`chartdiv2_${bookingId}`}>
            </CruiseMapContainer> */}
        </>
    );
}

export default TransportCardBK1;
