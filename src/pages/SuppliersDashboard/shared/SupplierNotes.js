import React from "react";
import {addItineraryStyles} from "styles/muiStyles";
import {ItineraryFormContainer} from "@core/components";
import { RichEdit } from "@core/components";
import styled from "styled-components";


const NotesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SupplierNotes = ({formik, edit}) => {

    const classes = addItineraryStyles();

    return (
        <div>
            <ItineraryFormContainer className={classes.spacing}>
                <NotesContainer>
                    <div className={classes.notesDiv1}>
                        <RichEdit
                            formik={formik}
                            label='Description'
                            name="description"
                            placeholder = "Enter description"
                        />    
                    </div>
                </NotesContainer>
            </ItineraryFormContainer>
        </div>
    )
}

export default SupplierNotes;
