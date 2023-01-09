import React from "react";
import {addItineraryStyles} from "styles/muiStyles";
import {Typography} from "@material-ui/core";
import UseAutocomplete from "../../../../../@core/components/Autocomplete/Autocomplete";
import DialogActions from "../../../../../@core/components/Dialog/DialogActions";

const SearchHotel = ({handleStateChange, nextStep, setExistingHotel, handleCloseDialogs}) => {
    const classes = addItineraryStyles();
    return (
        <div>
            <div className={`${classes.spacing} ${classes.formPadding} ${classes.categoryForm}`}>
                <div className={classes.categoryForm}>
                    <div>
                        <Typography style={{marginBottom: '10px'}} component={'div'} variant='body2'>Search Hotel</Typography>
                        <UseAutocomplete setExistingHotel={setExistingHotel} nextStep={nextStep}/>
                    </div>
                </div>
            </div>
            <div style={{marginTop: '330px'}}>
                <DialogActions nextStep={nextStep} handleCloseDialogs={handleCloseDialogs}/>
            </div>
        </div>
    )
}

export default SearchHotel;
