import React from "react";
import {addItineraryStyles} from "styles";
import {TravelerFormContainer, TextField} from "@core/components";

const TravelerNotes = ({formik}) => {
    const classes = addItineraryStyles();

    return (
        <TravelerFormContainer className={classes.spacing} style={{marginBottom: '280px'}}>
            <TextField
                name="abstract_note"
                label="Note"
                formik={formik}
                placeholder="Enter note"
                width="100%"
                multiline={true}
            />
        </TravelerFormContainer>
    );
}

export default TravelerNotes;
