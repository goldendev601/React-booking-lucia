import React from "react";
import {Typography} from "@material-ui/core";
import {
    FlexContainer,
    ItineraryFormContainer,
    Loading,
    TextField,
} from "@core/components";
import {useSelector, useDispatch} from "react-redux";
import {addItineraryStyles} from "styles/muiStyles";
import {bookingsSelector} from "redux/features/itineraries/bookings/bookingsSlice";

const HeaderInformation = ({formik}) => {
    const {isFetching} = useSelector(bookingsSelector);
    const dispatch = useDispatch();

    const classes = addItineraryStyles();
   
    return (
        <Loading isFetching={isFetching}>
            <ItineraryFormContainer>
                <FlexContainer>
                    <FlexContainer $column $spacing>
                        <TextField
                            formik={formik}
                            label="Title (*)"
                            name="customHeaderTitle"
                            placeholder="Enter the Header"
                            width="380px"
                        />
                    </FlexContainer>
                    <FlexContainer $row $spaceevenly style={{width: '440px', marginTop: '40px'}}>
                    </FlexContainer>
                </FlexContainer>
            </ItineraryFormContainer>
        </Loading>
    );
}

export default HeaderInformation;
