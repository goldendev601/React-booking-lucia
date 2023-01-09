import React from "react";
import {addItineraryStyles} from "styles/muiStyles";
import {ItineraryFormContainer} from "@core/components";
import { RichEdit } from "@core/components";
import styled from "styled-components";


const NotesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HotelNotes = ({formik, fieldNames}) => {

    const classes = addItineraryStyles();

    return (
        <div>
            <ItineraryFormContainer className={classes.spacing}>
                {/* <Typography component={'div'} variant='body2'>DESCRIPTION ABOUT HOTEL</Typography> */}

                <NotesContainer>
                    <div className={classes.notesDiv1}>
                        <RichEdit
                            formik={formik}
                            label='Property Description'
                            name="notes"
                            placeholder = "Enter Description"
                        />    
                    </div>

                    {/* <TextField
                        formik={formik}
                        label={camel2title(capitalizeFirstLetter(fieldNames[1]))}
                        name={fieldNames[1]}
                        placeholder={fieldNames[1] === 'description' ? "Enter description" : "Enter cancellation policy"}
                        width="385px"
                        multiline={true}
                    /> */}
                    
                </NotesContainer>
            </ItineraryFormContainer>
        </div>
    )
}

export default HotelNotes;
