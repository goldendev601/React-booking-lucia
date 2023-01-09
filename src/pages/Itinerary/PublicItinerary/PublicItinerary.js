import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Grid} from "@material-ui/core";
import moment from 'moment';
import ItineraryHeader from "./ItineraryHeader";
import ItineraryPrice from "./ItineraryPrice";
import ItineraryCards from "./ItineraryCards";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {
    fetchSharedItinerary,
    itinerariesSelector
} from "redux/features/itineraries/itinerariesSlice";
import {Loading} from "@core/components";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "styles/colors";
import {previewStyles} from "styles/previewStyles";
import {Cancel} from "iconoir-react";
import {userSelector} from "redux/features/auth/authSlice";

const ItineraryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PreviewBar = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  background-color: ${colors.brand};
  font-family: Raleway,serif;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;
  vertical-align: middle;
  line-height: 60px;
  display: ${props => !props.open && 'none'};
`;

const CloseItineraryPreviewBar = styled(Cancel)`
  color: white;
  width: 25px;
  height: 25px;
  position: absolute;
  right: 25px;
  top: 17px;
  font-weight: bold;
  cursor: pointer;
  stroke-width: 3;
`;



const PublicItinerary = () => {
    
    const dispatch = useDispatch();
    const {id} = useParams();
    const {itinerary, isFetching} = useSelector(itinerariesSelector);
    const {user} = useSelector(userSelector);
    const history = useHistory();

    const [previewBarOpen, setPreviewBarOpen] = useState(!!user);


    const {
        client,
        title,
        abstractNote,
        startDate,
        endDate,
        pictures,
        travelers,
        totalPrice,
        showPriceOnShare,
        bookings,
        itineraryTheme: {
            itineraryLogoUrl,
            propertyDesignId,
            hideAbstract
        },
        identification
    } = itinerary || {
        itineraryTheme: {}
    };  
    
    var travelerNumber = 0;
    if (travelers) {
        travelerNumber = travelers.length;
    }

    var totalPrice_info = totalPrice;

    if (totalPrice > 1000000) {
        totalPrice_info = parseInt(totalPrice/1000000) + 'M+';
    } else if (totalPrice > 1000) {
        totalPrice_info = parseInt(totalPrice/1000) + 'K+';
    } else {
        totalPrice_info = totalPrice;
    }

    const startDateInfo = moment(startDate);
    const endDateInfo = moment(endDate);
    const duration = endDateInfo.diff(startDateInfo);
    const days = duration/ (1000 * 3600 * 24);

    // const {itineraryLogoUrl} = itineraryTheme || {};
    // const itineraryPropertyDesignId = itineraryTheme.propertyDesignId;
    const themeStyle = propertyDesignId ? previewStyles[propertyDesignId - 1]: {};

    const useStyles = makeStyles({
        gridContainer: {
            maxWidth: '1600px',
            justifyContent: 'space-between',
            '@media (max-width:1270px)': {
                justifyContent: 'space-around',
                maxWidth: '1067px',
            },
            background: themeStyle.gridBackgroundColor
        },
        sticky: {
            position: 'sticky',
            top: '0',
            alignSelf: 'flex-start',
        },
        stickyOverviewLinks: {
            '@media (max-width:1270px)': {
                display: 'none',
            },
        },
        stickyTravelersList: {
            '@media (max-width:1270px)': {
                display: 'none',
            },
        },
        itineraryCards: {
            marginRight: '20px',
            '@media (max-width:1270px)': {
                order: '3',
                margin: '0 0 0 15px',
            },
            '@media (max-width:500px)': {
                margin: '0',
            },
        }
    });

    const classes = useStyles();

    const closePreviewBar = () => {
        setPreviewBarOpen(false);
        const itineraryId = parseInt(identification);
        history.push(`/itinerary-details/${itineraryId}`);
    }

    useEffect(() => {
        dispatch(fetchSharedItinerary(id));
    }, [dispatch, id]);

    return (
        <Loading data-aos="fade-down" isFetching={isFetching}>
            {itinerary &&
            <ItineraryContainer>
                <PreviewBar open={previewBarOpen}>
                    Itinerary preview
                    <CloseItineraryPreviewBar onClick={closePreviewBar}/>
                </PreviewBar>
                <Grid container>
                    <Grid item xs={12}>
                        <ItineraryHeader
                            clientName={client.name}
                            itineraryName={title}
                            itineraryStartDate={startDate}
                            itineraryEndDate={endDate}
                            itineraryImg={pictures}
                            itineraryLogoUrl={itineraryLogoUrl}
                            itineraryInfo={abstractNote}
                            itineraryPropertyDesignId={propertyDesignId}
                            itineraryHideAbstract={hideAbstract}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.gridContainer}>
                    {/* <Grid item className={`${classes.sticky} ${classes.stickyOverviewLinks}`} style={{width: '190px'}}>
                        <ItineraryOverviewLinks bookings={bookings} showPriceOnShare={showPriceOnShare}/>
                    </Grid> */}
                    <Grid item style={{width: '100%'}}>
                        {/* <ItineraryAbstract
                            clientName={client}
                            itineraryInfo={abstractNote}
                            travelers={travelers}
                            bookings={bookings}
                            showPriceOnShare={showPriceOnShare}
                        /> */}
                        <ItineraryCards showPriceOnShare={showPriceOnShare} bookings={bookings} startDate={startDate} itineraryPropertyDesignId={propertyDesignId}/>
                        <ItineraryPrice                           
                            total={totalPrice_info}
                            persons={travelerNumber}
                            days={days}
                            showPriceOnShare={showPriceOnShare}
                        />
                    </Grid>
                    {/* <Grid item className={`${classes.sticky} ${classes.stickyTravelersList}`} style={{width: '150px'}}>
                        <ItineraryTravelers clientName={client} travelers={travelers}/>
                    </Grid> */}
                </Grid>
            </ItineraryContainer>}
        </Loading>
    );
}

export default PublicItinerary;
