import {Typography} from "@material-ui/core";
import React from "react";
import {addItineraryStyles} from "styles/muiStyles";
import {ItineraryFormContainer} from "@core/components";
import { RichEdit } from "@core/components";
import {camel2title, capitalizeFirstLetter} from "utils";
import styled from "styled-components";

const NotesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Notes1 = ({formik, notesName, fieldNames}) => {
    const classes = addItineraryStyles();

    return (
        <div>
            <ItineraryFormContainer className={classes.spacing}>
                {notesName && <Typography component={'div'} variant='body2'>{notesName}</Typography>}
                <NotesContainer>
                    <div className={classes.notesDiv1}>
                        <RichEdit
                            formik={formik}
                            label={camel2title(capitalizeFirstLetter(fieldNames[0]))}
                            name={fieldNames[0]}
                            placeholder = "Enter Notes"
                        />    
                    </div>
                   
                </NotesContainer>
            </ItineraryFormContainer>
        </div>
    )
}

export default Notes1;
