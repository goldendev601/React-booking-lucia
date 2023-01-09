import styled from "styled-components";
import {ItineraryDetailsContainer} from "../ItineraryDetailsContainer";
import {ItineraryDetailTitle} from "../ItineraryDetailTitle";
import {colors} from "styles/colors";
import {Button} from "@core/components";
import {IconButton} from "@material-ui/core";
import {EditPencil, Plus, ArrowRight} from "iconoir-react";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Text} from "../Text";
import Row from "./Row";
import Emails from "./Emails";
import Travelers from "./Travelers";
import Tasks from "./Tasks";
import Information from "./Information";
import Documents from "./Documents";
import {useDispatch} from "react-redux";
import {
    setEdit,
    setEditItineraryInformationOpen, 
    setEditItineraryTravelersOpen,
    setEditItineraryTasksOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {getItineraryPassengers, setItineraryStatus, setTravelerProfileExpanded} from "redux/features/itineraries/itinerariesSlice";
import {setEditTab} from "redux/features/dialogForms/itineraryFormSlice";
import {setBookingCategory} from "../../../../redux/features/dialogForms/bookingFormSlice";
import { formatPhoneNumberIntl } from 'react-phone-number-input'


const ItineraryInformationContainer = styled(ItineraryDetailsContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 20px;
  background-color: white;

  & > div:not(:first-child) {
    margin-top: 30px;
  }
`;

export const Title = styled(ItineraryDetailTitle)`
  font-size: 24px;
  color: ${colors.brand};
  font-family: 'Montserrat';
`;

const MainInformation = styled.div`
  & > div:not(:first-child) {
    margin-top: 20px;
  }
`;

const ClientProfileViewBtn = styled.div`
  display: flex;
  width: 100%;
  :hover {
      cursor: pointer;
  }
`;

const TravelersInformation = styled(MainInformation)`
`;

const TasksInformation = styled(MainInformation)`
`;

const ItineraryInformation = ({client, travelers, markAsClientApproved, clientEmails, clientPhone, id, tasks, documents}) => {

    // var travelerNumber = 0;
    // if (travelers) {
    //     travelerNumber = travelers.length;
    // }

    // var totalPrice_info = totalPrice;

    // if (totalPrice > 1000000) {
    //     totalPrice_info = parseInt(totalPrice/1000000) + 'M+';
    // } else if (totalPrice > 1000) {
    //     totalPrice_info = parseInt(totalPrice/1000) + 'K+';
    // } else {
    //     totalPrice_info = totalPrice;
    // }

    // const days = 0; 

    const dispatch = useDispatch();

    const handleOpenEditItineraryInformation = () => {
        dispatch(setBookingCategory(null));
        dispatch(setEditTab('editItineraryInformation'));
        dispatch(setEdit(true));
        dispatch(setEditItineraryInformationOpen(true));
    };

    const handleOpenEditItineraryTravelers = () => {
        dispatch(setBookingCategory(null));
        dispatch(setEditTab('editItineraryTravelers'));
        dispatch(setEdit(true));
        dispatch(getItineraryPassengers(id));
        dispatch(setEditItineraryTravelersOpen(true));
    };

    const handleOpenEditItineraryTasks = () => {
        dispatch(setBookingCategory(null));
        dispatch(setEditTab('editItineraryTasks'));
        dispatch(setEdit(true));
        dispatch(setEditItineraryTasksOpen(true));
    };

    const togglePublishItinerary = () => {
        const payload = {
            'status_id': markAsClientApproved? 4: 3  //Accepted else Draft
        }
        dispatch(setItineraryStatus({
            itineraryId: id,
            data: payload,
        }));
    };

    const openTravelerProfile = () => {
        dispatch(setTravelerProfileExpanded(true));
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <ItineraryInformationContainer>
                <MainInformation>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Title>Main Information</Title>
                        <IconButton
                            color="secondary"
                            aria-label="edit-action"
                            onClick={handleOpenEditItineraryInformation}
                        >
                            <EditPencil width="18px" height="18px" color={colors.brand} />
                        </IconButton>
                    </Row>
                    <Information>
                        <Row ml="41px">
                            <Typography variant="body2" component="span" style={{fontFamily: 'Montserrat'}}>Name(s):</Typography>
                            <ClientProfileViewBtn>
                                <Text variant="body2" component="span" style={{fontFamily: 'Montserrat'}}>{client.name}</Text>
                                <div style={{display: 'flex', }} onClick={openTravelerProfile}>
                                    <Text style={{fontFamily: 'Montserrat', fontSize: '#242424', opacity: '0.4', fontWeight: '400', marginLeft: '10px'}}>View Profile</Text>
                                    <ArrowRight width="22px" height="22px" color={colors.brand} />
                                </div>
                            </ClientProfileViewBtn>
                        </Row>
                        <Row ml="56px">
                            <Typography variant="body2" component="span" style={{fontFamily: 'Montserrat'}}>Phone:</Typography>
                            {
                                client.phone ? (
                                    <Text variant="body2" component="span" style={{fontFamily: 'Montserrat'}}>{formatPhoneNumberIntl(client.phone)}</Text>
                                ) : (
                                    <Text variant="body2" component="span" style={{fontFamily: 'Montserrat', opacity: '0.4'}}>Not provided</Text>
                                )
                            }
                            
                        </Row>
                        <Emails clientEmails={client.emails}/>
                    </Information>
                    {
                        markAsClientApproved ? (
                            <Button
                                onClick={togglePublishItinerary}
                                $primary
                                $width="100%"
                                style={{marginTop: '25px', borderRadius: '5px'}}
                            >
                                Unpublish
                            </Button>
                        ) : (
                            <Button
                                onClick={togglePublishItinerary}
                                $primary
                                $width="100%"
                                style={{marginTop: '25px', borderRadius: '5px'}}
                            >
                                Publish to Client
                            </Button>
                        )
                    }
                </MainInformation>
            </ItineraryInformationContainer>
            {/* <ItineraryInformationContainer style={{marginTop: '25px'}}>
                <TravelersInformation>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Title>Travelers</Title>
                        <IconButton
                            color="secondary"
                            aria-label="edit-action"
                            onClick={handleOpenEditItineraryTravelers}
                        >
                            <EditPencil width="18px" height="18px" color={colors.brand} />
                        </IconButton>
                    </Row>
                    <Travelers itineraryPassengers={travelers}/>
                </TravelersInformation>
            </ItineraryInformationContainer> */}
            <ItineraryInformationContainer style={{marginTop: '25px'}}>
                <TasksInformation>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Title>Tasks</Title>
                        <IconButton
                            color="secondary"
                            aria-label="edit-action"
                            onClick={handleOpenEditItineraryTasks}
                        >
                            <Plus width={'22px'} height="22px" color={colors.brand}/>
                        </IconButton>
                    </Row>
                    <Tasks itineraryTasks={tasks} itineraryId={id}/>
                </TasksInformation>
            </ItineraryInformationContainer>
            <ItineraryInformationContainer style={{marginTop: '25px'}}>
                <TasksInformation>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Title>Attachments</Title>
                    </Row>
                    <Documents itineraryDocuments={documents} id={id}/>
                </TasksInformation>
            </ItineraryInformationContainer>

        </div>
        
    );
}

export default ItineraryInformation;