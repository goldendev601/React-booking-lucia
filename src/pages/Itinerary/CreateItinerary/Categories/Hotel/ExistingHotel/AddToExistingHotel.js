import React, {useState} from "react";
import {Dialog} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {tabsStyles} from "styles";
import {colors} from "styles/colors";
import {createExistingHotelTabsDock} from "./existingHotelTabsDock";
import {TabsDock, DialogTitle} from "@core/components";

const AddToExistingHotel = ({setExistingHotel, existingHotel, handleCloseDialogs}) => {
    const [state, setState] = useState({
        step: 1,
    });

    const classes = tabsStyles();

    const handleStateChange = (values) => {
        setState(prevState => ({...prevState, ...values}));
    }

    const nextStep = () => {
        setState(prevState => ({...prevState, step: state.step + 1}));
    }

    const existingHotelTabsDock = createExistingHotelTabsDock(handleStateChange, nextStep, handleCloseDialogs);

    return (
        <div>
            <Dialog
                onClose={() => setExistingHotel(false)}
                aria-labelledby="add-to-existing-hotel"
                open={existingHotel}
                classes={{paper: classes.paper}}
            >
                <DialogTitle id="add-to-existing-hotel" onClose={handleCloseDialogs}>
                    <Typography
                        variant="h3"
                        component={'div'}
                        style={{color: `${colors.black1}`, letterSpacing: '0px', margin: '20px 0 5px 30px'}}
                    >
                        Add Hotel Information
                    </Typography>
                    <TabsDock step={state.step} tabsDock={existingHotelTabsDock}/>
                </DialogTitle>
            </Dialog>
        </div>
    )
}

export default AddToExistingHotel;
