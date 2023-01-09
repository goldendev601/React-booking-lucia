import React, { useLayoutEffect } from 'react';
import { Typography, Grid, Container } from '@material-ui/core';
import { Airplane } from "iconoir-react";
import moment from 'moment';
import {previewStyles} from "styles/previewStyles";
import {makeStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {dateToMyDate, dateToMyTimeAMPM} from "utils";
import { Carousel } from "react-responsive-carousel";



const FlightCardBk = ({ booking, showPriceOnShare, itineraryPropertyDesignId, ...rest }) => {
    const {
        bookingId,
        customHeaderTitle,
        notes, 
        fromGeolocation, 
        toGeolocation,
        from, 
        to, 
        startDateLocale, 
        endDateLocale,
        confirmationNumber,
        passengers,
        segments
    } = booking;

    const option = {
        day : 'numeric',
        month : 'long'
    }

    const useStyles = makeStyles({
        sliderContainer: {
            position: 'relative',
            padding: '0',
            zIndex: '99',
            marginBottom: '82px',
            '& .carousel-slider': {
                overflow: 'visible'
            },
            '& .control-dots': {
                bottom: '-68px !important'
            },
            '& .control-dots > div:only-child': {
                display: 'none'
            }
        },
        sliderImage: {
            width: '100%',
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
            background: '#fff',
            margin: '0px 3px',
            display: 'inline-block'
        },
    })

    const classes = useStyles();

    const themeStyle = previewStyles[itineraryPropertyDesignId - 1];    

    const FlightCardContainer = styled.div`
        display: flex;
        align-items: center;        
        @media (max-width:992px) and (min-width: 600px){
            flex-direction: column;
            text-align: center;
            padding-left: 50px;
            padding-right: 50px;
        }
        @media (max-width:600px) {
            flex-direction: column;
            text-align: center;
        }
    `

    const FlightMapContainer = styled.div`
        min-width: 40%;
        height: 600px;
        background: #FAFAFA;
        & svg > g > g > g:last-child {
            display: none;
        }
        @media (max-width:992px) {
            width: 100%;
        }
        @media (max-width:600px) {
            height: 283px;
        }
    `

    const FlightDataContainer = styled.div`
        width: 100%;
        padding-right: 160px;
        margin-left: 110px;
        display: flex;
        flex-direction: column;
        & h4 {
            font-family: 'Cormorant';
            font-size: 32px;
            line-height: 50px;            
            margin-bottom: 20px;
        }
        & p {
            font-size: 16px;
            line-height: 24px;            
            margin-bottom: 20px;
            padding-top: 20px;
        }
        @media (max-width:1350px) {
            padding-right: 0px;
        }
        @media (max-width:992px) {
            margin-left: 0px;
        }
        @media (max-width:600px) {
            flex-direction: column;
            text-align: center;
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 20px;
        }
    `

    const FlightTicketCard = styled.div`    
        position: relative;
        overflow: hidden;
        
        & > div {
            width: 100%;
            height: 100%;
            border-radius: 24px;
            border: 1px solid rgba(189, 189, 194, 0.3);
            background: white;

            display: flex;

            flex-direction: column;

            hr {
                width: 90%;
                opacity: 0.1;
                border: 1px solid #000000;
                margin: 0 auto;
            }

            > div {
                flex: 1;
                padding: 24px;
                &:first-child {
                    border-top: none;
                }
            }
        }
        &:before {
            content: "";
            position: absolute;
            top: 51%;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            left: -10px;
            background: rgb(250, 250, 250);
            z-index: 999;
            border: 1px solid rgba(189,189,194,0.3);
        }
        &:after {
            content: "";
            position: absolute;
            top: 51%;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            right: -10px;
            background: rgb(250,250,250);
            z-index: 999;
            border: 1px solid rgba(189,189,194,0.3);
        }
    `

    const FlightInformationTop = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        label {
            font-size: 13px;
            color: #BDBDC2;
            line-height: 19px;
            font-family: 'Poppins';
        }
        p {
            margin-bottom: 0;
            font-size: 12px;
            color: #262630;        
            line-height: 19px;
            font-family: 'Poppins';
        }
    `;

    const FlightInformationBottom = styled.div`
        justify-content: space-between;
        align-items: flex-end;

        label {
            font-size: 13px;
            color: #BDBDC2;
            line-height: 19px;
            font-family: 'Poppins';
        }   
        p {
            margin-bottom: 0;
            font-size: 12px;
            line-height: 19px;
            font-family: 'Poppins';
        }
    `;

    const FlightLocation = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        &:before {
            content: "";
            position: absolute;
            top: 50%;
            border-top: 1px dashed #BA886E;
            width: 100%;
        }
        h5 {
            font-family: 'Cormorant';
            font-size: 24px;
            line-height: 24px;
            color: #BA886E;
            background: white;
            z-index: 1;
            &:first-child {
                padding-right: 5px;
            }
            &:last-child {
                padding-left: 5px;
            }
        }
        svg {
            z-index: 12;
            transform: rotate(90deg);
            background: white;
            fill: #BA886E;
        }
    `;
    const FlightTime = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
            font-size: 13px;
            color: #BDBDC2;
            line-height: 19px;
            font-family: 'Poppins';
        }
        label {
            font-size: 12px;
            color: #262630;
            line-height: 19px;
            font-family: 'Poppins';
        }
    `
    
    
    const endLocale = moment(endDateLocale);
    const startLocale = moment(startDateLocale);
    const duration = endLocale.diff(startLocale, 'hours') + 'h ' + (endLocale.diff(startLocale, 'minutes') % 60) + 'm'

    useLayoutEffect(() => {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        const bookingFrom = from;
        const bookingTo = to;
       
        let geolocationIsValid = true;
       
        let fromLatitude = null;
        let fromLongitude = null;
        let toLatitude = null;
        let toLongitude = null;
        if (fromGeolocation) {
            fromLatitude = fromGeolocation.latitude;
            fromLongitude = fromGeolocation.longitude;
        }
        if (toGeolocation) {
            toLatitude = toGeolocation.latitude;
            toLongitude = toGeolocation.longitude;
        }

        if (fromLatitude == null || fromLongitude == null || toLatitude == null || toLongitude == null) {
            geolocationIsValid =  false;
        }

        // Create map instance
        var chart = am4core.create("chartdiv_" + booking.bookingId, am4maps.MapChart);
        chart.geodata = am4geodata_worldLow;
        chart.projection = new am4maps.projections.Miller();
        chart.homeZoomLevel = 1;

        if (geolocationIsValid) {
            chart.homeGeoPoint = {
                latitude: (fromLatitude * 1 + toLatitude * 1)/2,
                longitude: (fromLongitude * 1 + toLongitude * 1)/2
            };
            const latitudeDistance = Math.abs(toLatitude * 1 - fromLatitude * 1);
            const longitudeDistance = Math.abs(toLongitude * 1 - fromLongitude * 1);
            const distance = Math.pow((Math.pow(latitudeDistance, 2) + Math.pow(longitudeDistance, 2)), 0.5);

            if (distance <= 1) {
                chart.homeZoomLevel = 100;
            }
            if (distance > 1 && distance <= 9) {
                chart.homeZoomLevel = 60;
            }
            if (distance > 9 && distance <= 25) {
                chart.homeZoomLevel = 40;
            }
            if (distance > 25 &&  distance <= 100) {
                chart.homeZoomLevel = 20;
            }
            if (distance > 100 &&  distance <= 900) {
                chart.homeZoomLevel = 10;
            }
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

            // Add plane
            // var plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
            // plane.position = 0;
            // plane.width = 48;
            // plane.height = 48;

            // plane.adapter.add("scale", function(scale, target) {
            //     return 0.5 * (1 - (Math.abs(0.5 - target.position)));
            // })

            // var planeImage = plane.createChild(am4core.Sprite);
            // planeImage.scale = 0.08;
            // planeImage.horizontalCenter = "middle";
            // planeImage.verticalCenter = "middle";
            // planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
            // planeImage.fill = chart.colors.getIndex(2).brighten(-0.2);
            // planeImage.strokeOpacity = 0;

            // Plane animation
            // var currentLine = 0;
            // var direction = 1;
            // function flyPlane() {

            //     // Get current line to attach plane to
            //     plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
            //     plane.parent = lineSeries;

            //     // Set up animation
            //     var from, to;
            //     var numLines = lineSeries.mapLines.length;
            //     if (direction === 1) {
            //         from = 0
            //         to = 1;
            //         if (planeImage.rotation !== 0) {
            //             planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            //             return;
            //         }
            //     }
            //     else {
            //         from = 1;
            //         to = 0;
            //         if (planeImage.rotation !== 180) {
            //             planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            //             return;
            //         }
            //     }

            //     // Start the animation
            //     var animation = plane.animate({
            //         from: from,
            //         to: to,
            //         property: "position"
            //     }, 5000, am4core.ease.sinInOut);
            //     animation.events.on("animationended", flyPlane)

            //     // Increment line, or reverse the direction
            //     currentLine += direction;
            //     if (currentLine < 0) {
            //         currentLine = 0;
            //         direction = 1;
            //     }
            //     else if ((currentLine + 1) > numLines) {
            //         currentLine = numLines - 1;
            //         direction = -1;
            //     }
            // }

            // flyPlane();

        }
       
    }, [from, to, fromGeolocation, toGeolocation]);
 
    return (
        <FlightCardContainer container style={{backgroundColor: themeStyle.FlightDivBackgroundColor}}>
            <FlightMapContainer id={`chartdiv_${bookingId}`}>
            </FlightMapContainer>
            <FlightDataContainer>
                <Typography id={bookingId} component="h4" style={{color: themeStyle.FlightCardTitleColor}}>{customHeaderTitle}</Typography>  

                {segments.length > 0 &&
                (
                    <>
                        <Container className={classes.sliderContainer}>
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
                                {segments.map((segment, index) => (
                                    <div key={index} className={classes.sliderImage}>
                                        <FlightTicketCard>
                                            <div>
                                                <div>
                                                    <FlightLocation>
                                                        <Grid container>
                                                            <Grid item sm={4} xs={4} style={{display: 'flex', alignItems: 'center'}}>
                                                                {
                                                                    segment.flightFromIcao && (
                                                                        <Typography component="h5" align={'left'} >{segment.flightFromIcao}</Typography>
                                                                    )
                                                                }
                                                            </Grid>
                                                            <Grid item sm={4} xs={4} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                                <Airplane color="#BA886E" />  
                                                            </Grid>
                                                            <Grid item sm={4} xs={4} style={{display: 'flex', alignItems: 'center'}}>
                                                                {
                                                                    segment.flightToIcao && (
                                                                        <Typography component="h5"  align={'right'} style={{marginLeft: 'auto'}}>{segment.flightToIcao}</Typography>
                                                                    )
                                                                }
                                                            </Grid>
                                                        </Grid>     
                                                    </FlightLocation>                                                                                                                                                                                                       
                                                    <FlightTime>
                                                        <Grid container>
                                                            <Grid item sm={4} xs={4} style={{textAlign: 'left'}}>
                                                                {
                                                                    segment.startDateLocale && (
                                                                        <Typography component="p" >{dateToMyDate(segment.startDateLocale).toLocaleDateString('en-US', option)} - {dateToMyTimeAMPM(segment.startDateLocale)}</Typography>
                                                                    )
                                                                }
                                                            </Grid>
                                                            <Grid item sm={4} xs={4} style={{textAlign: 'center'}}>
                                                                <Typography component="label">{duration}</Typography>
                                                            </Grid>
                                                            <Grid item sm={4} xs={4} style={{textAlign: 'right'}}>
                                                                {
                                                                    segment.endDateLocale && (
                                                                        <Typography component="p">{dateToMyDate(segment.endDateLocale).toLocaleDateString('en-US', option)} - {dateToMyTimeAMPM(segment.endDateLocale)}</Typography> 
                                                                    )
                                                                }
                                                                
                                                            </Grid>
                                                        </Grid>                                                  
                                                    </FlightTime>
                                                    <FlightInformationTop>
                                                        <Grid container>
                                                            <Grid item sm={3} xs={3} style={{textAlign: 'left'}}>
                                                                <div>
                                                                    <Typography component="label">Flight</Typography>
                                                                    <Typography component="p">{segment.flightNumber}</Typography>
                                                                </div>
                                                            </Grid>
                                                            <Grid item sm={4} xs={4} style={{textAlign: 'left'}}>
                                                                <Typography component="label">Confirmation #</Typography>
                                                                <Typography component="p">{confirmationNumber}</Typography>
                                                            </Grid>
                                                            <Grid item sm={3} xs={4} style={{textAlign: 'left'}}>
                                                                <div>
                                                                    <Typography component="label">Departure time</Typography>
                                                                    <Typography component="p">{dateToMyTimeAMPM(segment.startDateLocale)}</Typography>
                                                                </div>
                                                            </Grid>
                                                            <Grid item sm={2} xs={1} style={{textAlign: 'left'}}>
                                                                <div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>       
                                                    </FlightInformationTop>
                                                </div>
                                                <hr />
                                                <FlightInformationBottom>
                                                    <Grid container>
                                                        <Grid item sm={3} xs={3} style={{textAlign: 'left'}}>
                                                            <Typography component="label">Passenger</Typography>
                                                        </Grid>
                                                        <Grid item sm={4} xs={4} style={{textAlign: 'left'}}>
                                                            <Typography component="label">Ticket #</Typography>
                                                        </Grid>
                                                        <Grid item sm={3} xs={3} style={{textAlign: 'left'}}>
                                                            <Typography component="label">Class</Typography>
                                                        </Grid>
                                                        <Grid item sm={2} xs={2} style={{textAlign: 'left'}}>
                                                            <Typography component="label">Seat</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    {passengers.map((passenger, index) =>
                                                        (
                                                            <Grid container>
                                                                <Grid item sm={3} xs={3} style={{textAlign: 'left'}}>
                                                                    <Typography component="p" style={{color: '#BA886E'}}>{passenger.name}</Typography>
                                                                </Grid>
                                                                <Grid item sm={4} xs={4} style={{textAlign: 'left'}}>
                                                                    <Typography component="p" style={{color: '#262630'}}>{passenger.ticketNumber}</Typography>
                                                                </Grid>
                                                                <Grid item sm={3} xs={3} style={{textAlign: 'left'}}>
                                                                    <Typography component="p" style={{color: '#262630'}}>{passenger.class}</Typography>
                                                                </Grid>
                                                                <Grid item sm={2} xs={2} style={{textAlign: 'left'}}>
                                                                    <Typography component="p" style={{color: '#262630'}}>{passenger.seat}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    )}      
                                                </FlightInformationBottom>
                                            </div>
                                        </FlightTicketCard>
                                    </div>
                                ))}
                            </Carousel>                    
                        </Container>                
                    </>
                )}              
                
                
                {notes && <Typography component="p" style={{color: themeStyle.FlightCardNoteColor}} dangerouslySetInnerHTML={{__html: notes}} />} 
            </FlightDataContainer>
        </FlightCardContainer>
       
    );
}

export default FlightCardBk;
