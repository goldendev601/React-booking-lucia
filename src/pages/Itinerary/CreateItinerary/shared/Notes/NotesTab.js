import {Typography} from "@material-ui/core";
import React from "react";
import {addItineraryStyles} from "styles/muiStyles";
import { RichEdit } from "@core/components";
import styled from "styled-components";

const NotesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NotesTab = ({formik, categoryName}) => {
    const classes = addItineraryStyles();

    return (
        <div className={`${classes.spacing} ${classes.formPadding}`}>
            <Typography component={'div'} variant='body2'>{categoryName}</Typography>
            <NotesContainer>
                <div className={classes.notesDiv1}>
                    <RichEdit
                        formik={formik}
                        label="Notes"
                        name="notes"
                        placeholder = "Enter Notes"
                    />    
                </div>
                {/* <TextField
                    width="100%"
                    multiline={true}
                    name="notes"
                    label="Notes"
                    placeholder='Enter notes'
                    formik={formik}
                /> */}
            </NotesContainer>
        </div>
    )
}

export default NotesTab;
