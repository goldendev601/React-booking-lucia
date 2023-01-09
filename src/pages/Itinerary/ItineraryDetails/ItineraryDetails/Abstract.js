import React from "react";
import styled from "styled-components";
import {ItineraryDetailsContainer} from "../ItineraryDetailsContainer";
import {Typography, IconButton} from "@material-ui/core";
import {EditPencil, Trash} from "iconoir-react";
import {colors} from "styles/colors";
import BookingTitle from "../../ItineraryDetails/BookingDetailCards/BookingDetailCardComponents/BookingTitle";
import Row from "../ItineraryInformation/Row";
import {makeStyles} from "@material-ui/core/styles";
import {setEdit, setEditItineraryAbstractOpen, setEditItineraryPictureOpen} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {useDispatch} from "react-redux";
import {setEditTab} from "redux/features/dialogForms/itineraryFormSlice";
import {setBookingCategory} from "../../../../redux/features/dialogForms/bookingFormSlice";
import EmtpyBk  from '../../../../assets/itinerarydetail-emtpy-bk.png';


export const AbstractContainer = styled(ItineraryDetailsContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  background-color: white;
  width: 100%;
  padding-left: 51px;
  padding-top: 41px;
  padding-right: 18px;
  padding-bottom: 42px;
  min-height: 212px;
`;

export const ItineraryImgContainer = styled(ItineraryDetailsContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05);
  border-radius: 25px;
  width: 100%;
  height: 280px;
  padding: 0;
  overflow: hidden;
  position: relative;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & button {
    position: absolute;
    top: 20px;
    right: 18px;
    color: white;
  }
`;

export const ItineraryTitle = styled.div`
  @media (max-width: 1000px) {
    margin: 0 auto;
  }
`;

const useStyles = makeStyles({
    headerTypography: {
        fontSize: '60px',
        lineHeight: '50px',
        fontFamily: 'MADE Mirage',
        color: '#242424',
        margin: '0 0 30px 0',
        display: 'flex',
        fontWeight: '400'
    },
    abstractText: {
        lineHeight: '23px',
        letterSpacing: '0.05em',
        fontFamily: 'Montserrat',
        color: '#242424',
        fontWeight: '300'
    },
    abstractTextEmpty: {
        lineHeight: '23px',
        letterSpacing: '0.05em',
        fontFamily: 'Montserrat',
        color: '#242424',
        fontWeight: '300',
        opacity: '0.4'
    },
    shareButton: {
        margin: '0 20px 0 0'
    },
    hireTripKit: {
        margin: '0 20px 0 0'
    },
    hireAdvisor: {
        width: '200px !important',
        margin: '0 20px 0 0'
    },
    itineraryBkImg: {
    }
});

const Abstract = ({text, title, children, pictures, ...props}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleOpenEditItineraryPicture = () => {
        dispatch(setBookingCategory(null));
        dispatch(setEditTab('editItineraryInformation'));
        dispatch(setEdit(true));
        dispatch(setEditItineraryPictureOpen(true));
    };

    const handleOpenEditItineraryAbstract = () => {
        dispatch(setEdit(true));
        dispatch(setBookingCategory(null));
        dispatch(setEditItineraryAbstractOpen(true));
        dispatch(setEditTab('editItineraryAbstract'));
    };

    return (
        <div>
            <ItineraryTitle>
                <Typography
                    className={classes.headerTypography}
                    variant="h2"
                    component="h2"
                >
                    {title}
                </Typography>
            </ItineraryTitle>
            <ItineraryImgContainer {...props}>
                {
                    (pictures && (pictures.length > 0)) ? (
                        <img src={pictures[0]} />
                    ) : (
                        <img src={EmtpyBk} alt="emtpy-bk" className={classes.itineraryBkImg} />
                    )
                }
                <IconButton
                    color="secondary"
                    aria-label="edit-action"    
                    onClick={handleOpenEditItineraryPicture}                
                >
                    <EditPencil width="18" height="18" color="#FFF" />
                </IconButton>
            </ItineraryImgContainer>
            <AbstractContainer {...props}>
                <Row style={{justifyContent: 'space-between'}}>
                    <BookingTitle>Abstract</BookingTitle>
                    <IconButton
                        color="secondary"
                        aria-label="edit-action"
                        onClick={handleOpenEditItineraryAbstract}
                    >
                        <EditPencil width="18" height="18" color={colors.brand} />
                    </IconButton>
                </Row>
                {
                    text ? (
                        <Typography component="span" className={classes.abstractText} dangerouslySetInnerHTML={{__html: text}} />
                    ) : (
                        <Typography component="span" className={classes.abstractTextEmpty}>
                            No description added
                        </Typography>
                    )
                } 
            </AbstractContainer>
        </div>
    );
}

export default Abstract