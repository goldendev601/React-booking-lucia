import React from "react";
import {addItineraryStyles} from "styles";
import { ItineraryFormContainer, SwitchLucia } from "@core/components";
import { RichEdit } from "@core/components";

const ItineraryAbstract = ({formik}) => {
    const classes = addItineraryStyles();

    return (
        <ItineraryFormContainer className={classes.spacing1} style={{marginBottom: '20px'}}>
            <div style={{height: '249px'}}>
                <RichEdit
                    formik={formik}
                    label="Trip Overview"
                    name="abstractNote"
                    placeholder="Enter the Abstract Here"
                />    
            </div>
            {/* <TextField
                name="abstractNote"
                label="Abstract Note"
                formik={formik}
                placeholder="Enter abstract note"
                width="100%"
                multiline={true}
            /> */}
            <SwitchLucia
                name="hideAbstract"
                value={formik.values.hideAbstract}
                onChangeHandler={formik.handleChange}
                placeholder="Hide the abstract in the itinerary"
            />
        </ItineraryFormContainer>
    );
}

export default ItineraryAbstract;
