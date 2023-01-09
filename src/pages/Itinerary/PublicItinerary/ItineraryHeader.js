import React from "react";
import {Typography, Container} from "@material-ui/core";
import {colors} from "styles/colors";
import {previewStyles} from "styles/previewStyles";
import {makeStyles} from "@material-ui/core/styles";
import Logo from "assets/Logo";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from "moment";

const ItineraryHeader = ({
                             clientName,
                             itineraryName,
                             itineraryImg,
                             itineraryEndDate,
                             itineraryStartDate,
                             itineraryLogoUrl,
                             itineraryInfo,
                             itineraryPropertyDesignId,
                             itineraryHideAbstract,
                             ...rest
                         }) => {
    

    var itineraryInfoContent = '';
    if (itineraryInfo != null) {
        itineraryInfoContent = itineraryInfo.toString().replace( /(<([^>]+)>)/ig, '');
    }
   
    const themeStyle = previewStyles[itineraryPropertyDesignId - 1];

    const useStyles = makeStyles({
        root: {
            maxWidth: '1600px',
            justifyContent: 'space-between',
            '@media (max-width:1270px)': {
                justifyContent: 'space-around',
                maxWidth: '1067px',
            },
            margin: 'auto',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            background: themeStyle.rootBackgroundColor,
            paddingLeft: '10px',
            paddingRight: '10px',
            '@media (max-width:600px)': {
                paddingLeft: '0px',
                paddingRight: '0px',
            },
        },
        logoTitle: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
        },
        itinerary: {
            margin: '69px 0 75px 0',
        },
        body1: {
            textAlign: 'center', color: colors.brand, marginBottom: '5px',
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
            position: 'relative',
            padding: '0',
            zIndex: '99',
            '& .control-dots': {
                bottom: '68px !important'
            },
            '& .control-dots > div:only-child': {
                display: 'none'
            }
        },
        sliderImage: {
            width: '100%',
            height: '500px',
            overflow: 'hidden',
            borderTopLeftRadius: '250px',
            borderTopRightRadius: '250px',
            '@media (max-width:600px)': {
                height: '280px !important'
            },
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
            // top: '-51px',
            background: themeStyle.abstractRootBackgroundColor,
            margin: '0 auto',
            width: '100%'
        },
        abstractText: {
            lineHeight: '30px',
            textAlign: 'center',
            color: '#242424',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: '16px'      
        },
        abstractTitle: {
            lineHeight: '30px',
            textAlign: 'center',
            color: themeStyle.abstractTitleColor,
            fontFamily: 'Cormorant',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: '49px',
        },
        abstractTitleDiv: {
            height: '230px',
            textAlign: 'center',
            paddingTop: '132px',
            position: 'relative',
            // '&:before': {
            //     content: '" "',
            //     position: 'absolute',
            //     width: '23px',
            //     height: '0px',
            //     border: '1px solid #BA886E',
            //     bottom: '0px'
            // },
        },
        abstractTitleDivBlank: {
            textAlign: 'center',
            paddingTop: '132px',
            position: 'relative',
            '@media (max-width:600px)': {
                paddingTop: '10px',
            },
        },
        abstractTextDiv: {        
            textAlign: 'center',
            paddingTop: '38px',
            paddingLeft: '25%',
            paddingRight: '25%',
            paddingBottom: '25px',
            '& p': {
                color: themeStyle.abstractTextColor
            },
            '@media (max-width:600px)': {
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '20px',
                paddingBottom: '20px'
            },
        },
        abstractQuote: {
            fontSize: '120px',
            lineHeight: '70px',
            color: '#BA886E',
            fontFamily: 'Cormorant',
            position: 'absolute'
        },
        quoteLeft: {
            left: '10px'
        },
        quoteRight: {
            right: '10px'
        }
    });
    
    const classes = useStyles();

   
    

    const itineraryDate = (itineraryStartDate, itineraryEndDate) => {
        const startDay = moment(itineraryStartDate).format('D');
        const endDay = moment(itineraryEndDate).format('D');

        const startDateMonth = moment(itineraryStartDate).format('MMMM');
        const endDateMonth = moment(itineraryEndDate).format('MMMM');

        const startDateYear = moment(itineraryStartDate).format('YYYY');
        const endDateYear = moment(itineraryEndDate).format('YYYY');

        const isMonthsEqual = startDateMonth === endDateMonth;
        const isYearsEqual = startDateYear === endDateYear;

        if (isMonthsEqual && isYearsEqual) return `${startDateMonth} ${startDay}-${endDay} ${endDateYear}`;
        if (!isMonthsEqual && isYearsEqual) return `${startDateMonth} ${startDay}-${endDateMonth} ${endDay} ${endDateYear}`;

        if (!isYearsEqual && isMonthsEqual) return `${startDateMonth} ${startDay} ${startDateYear}-${endDay} ${endDateYear}`;
        if (!isYearsEqual && !isMonthsEqual) return `${startDateMonth} ${startDay} ${startDateYear}-${endDateMonth} ${endDay} ${endDateYear}`;
    }

    return (
        <div {...rest} id="#overview" className={classes.root}>
            <div className={classes.itinerary}>
                <div className={classes.logoTitle}>
                    <div style={{marginBottom: '30px'}}>
                        {itineraryLogoUrl ? <img className={classes.itineraryLogo} src={itineraryLogoUrl.indexOf('blob') === 0 ? itineraryLogoUrl : `${itineraryLogoUrl}?time=${new Date()}`} alt="logo"/> : <Logo/>}
                    </div>
                    <Typography
                        className={classes.body1}
                        variant="body1"
                        component="p"
                        style={{marginBottom: '20px', color: themeStyle.itinerarySubTitleColor, fontFamily: themeStyle.itinerarySubTitleFontFamily}}
                    >
                        Itinerary for {clientName}
                    </Typography>
                </div>
                <Typography className={classes.itineraryName} style={{color: themeStyle.itineraryTitleColor, fontFamily: themeStyle.itineraryTitleFontFamily}} variant="h1" component="h1">
                    {itineraryName}
                </Typography>
                <Typography
                    className={classes.body1}
                    style={{marginTop: '10px', color: themeStyle.itinerarySubTitleColor, fontFamily: themeStyle.itinerarySubTitleFontFamily}}
                    variant="body1"
                    component="p"
                >
                    {itineraryDate(itineraryStartDate, itineraryEndDate)}
                </Typography>
            </div>
            {typeof itineraryImg !== 'undefined' && itineraryImg.length > 0 &&
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
                            {itineraryImg.map((img, index) => (
                                <div key={index} className={classes.sliderImage}>
                                    <img alt="" src={img} />
                                </div>
                            ))}
                        </Carousel>                    
                    </Container>                
                </>
            )}
            <div className={classes.abstractRoot}>
                {
                    !itineraryHideAbstract && (
                        <div className={classes.abstractTextDiv}>
                            {itineraryInfo && <Typography component="p" dangerouslySetInnerHTML={{__html: itineraryInfo}} />} 
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ItineraryHeader;
