import React, {useEffect} from "react";
import ItinerariesDetailHeader from "./ItineraryDetails/ItineraryDetailsHeader";
import styled from "styled-components";
import {Grid} from "@material-ui/core";
import ItineraryInformation from "./ItineraryInformation/ItineraryInformation";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    clearItineraryUpdated,
    fetchPackedItinerary,
    itinerariesSelector,
    setItineraryId,
    setTravelerProfileExpanded
} from "redux/features/itineraries/itinerariesSlice";
import {Loading} from "@core/components";
import Details from "./ItineraryDetails/Details";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";
import {getShareCode} from "../../../redux/features/shareCode/shareCodeSlice";
import HireAdvisor from "./HireAdvisor/HireAdvisor";
import TravelerProfile from './TravelerProfile';

export const DetailsWrapper = styled.div`
  padding: 30px;
`;

export const DetailsContainer = styled.div`
  justify-content: space-between;
  margin-top: 50px;
`;

const ItineraryDetails = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const {isFetching, packedItinerary, isSuccess, isItineraryUpdated, expanded} = useSelector(itinerariesSelector);
    const {isDeletedSuccess, isUpdated} = useSelector(bookingsSelector);

    const bookingAddedSuccessfully = useSelector(state => state.bookings.isSuccess);
    const {
        client,
        title,
        abstractNote,
        startDate,
        endDate,
        travelers,
        totalPrice,
        clientEmails,
        clientPhone,
        itineraryTheme,
        pictures,
        documents,
        tasks,
        markAsClientApproved
    } = packedItinerary || {};

    const {hideAbstract} = itineraryTheme || {};

    useEffect(() => {
        dispatch(clearItineraryUpdated());
        dispatch(fetchPackedItinerary(id));
        dispatch(setItineraryId(parseInt(id)));
        dispatch(getShareCode(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isDeletedSuccess, bookingAddedSuccessfully, isSuccess, isUpdated, isItineraryUpdated]);

    

    return (
        <div style={{display: "flex"}}>
            <div style={{flex: 1}}>
                <DetailsWrapper>
                    <Loading data-aos="fade-down" isFetching={isFetching}>
                        {packedItinerary &&
                        <React.Fragment>
                            <ItinerariesDetailHeader title={title}/>
                            <DetailsContainer>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={8}>
                                        <Details
                                            hideAbstract={hideAbstract}
                                            endDate={endDate}
                                            startDate={startDate}
                                            client={client}
                                            abstractNote={abstractNote}
                                            title={title}
                                            pictures={pictures}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <ItineraryInformation
                                            clientPhone={clientPhone}
                                            clientEmails={clientEmails}
                                            totalPrice={totalPrice}
                                            client={client}
                                            travelers={travelers}
                                            tasks={tasks}
                                            documents={documents}
                                            id={id}
                                            markAsClientApproved={markAsClientApproved}
                                        />
                                    </Grid>
                                </Grid>
                            </DetailsContainer>
                            <HireAdvisor id={id} />
                        </React.Fragment>
                        }
                    </Loading>
                </DetailsWrapper>
            </div>
            {
                expanded && (
                    <TravelerProfile traveler={client} />
                )
            }
        </div>
    );
}

export default ItineraryDetails;
