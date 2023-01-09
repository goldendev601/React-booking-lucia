import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {addItineraryStyles} from "styles";
import ChipInput from 'material-ui-chip-input';
import {useDispatch} from "react-redux";
import {SelectField} from "@core/components";
import {validateEmail, createErrorMessage} from "utils";
import {useSnackbar} from 'react-simple-snackbar';
import {error} from "styles/snackbarStyles/snackbarStyles";
import {
    ItineraryFormContainer,
    DateRangePickerField,
    TextField,
    PhoneField, 
    SwitchLucia
} from "@core/components";
import {useSelector} from "react-redux";
import {
    itinerariesSelector,
} from "redux/features/itineraries/itinerariesSlice";
import {constantsSelector, getCurrencyTypes} from "redux/features/constants/constantsSlice";
import {isEqual} from "lodash";

const ItineraryInformation = ({formik, edit}) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();
    const [emails, setEmails] = useState(formik.values.clientEmails);
    const {itinerary} = useSelector(itinerariesSelector);
    const {currencyTypes} = useSelector(constantsSelector);

    const [openSnackbarError] = useSnackbar(error);

    const {
        clientEmails,
    } = itinerary || {};

    const handleDeleteChip = (chip, index) => {
        const temp = [...emails];
        temp.splice(index, 1)
        setEmails(temp);
        formik.setFieldValue('clientEmails', temp);
    }

    const handleAddChip = (chip) => {
        if (validateEmail(chip)) {
            setEmails(prevState => [...prevState, chip]);
            formik.setFieldValue('clientEmails', emails);
        } else {
            openSnackbarError(createErrorMessage('Please put validation email'));
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();

        const paste = e.clipboardData.getData("text");

        if (paste.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g)) {
            const found = emails.some((v) => {
                return v.indexOf(paste) !== -1;
            });
            if (!found) {
                handleAddChip(paste);
            }
        }
    };

    useEffect(() => {
        if (emails && emails.length !== 0) {
            formik.setFieldValue('clientEmails', emails);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emails]);

    useEffect(() => {
        if (edit) {
            if (clientEmails && clientEmails?.length !== 0 && !isEqual(emails, clientEmails)) {
                clientEmails.forEach((email) => {
                    handleAddChip(email);
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, clientEmails, itinerary]);

    useEffect(() => {
        if (!currencyTypes) {
            dispatch(getCurrencyTypes());
        }
    }, [currencyTypes, dispatch]);

    return (
        <ItineraryFormContainer>
            <Grid container justify="space-between">
                <div style={{width: 380}}>
                    <Grid item xs={12} className={classes.spacing}>
                        <Typography component={'div'} variant='body2'>ITINERARY INFORMATION</Typography>
                        <Grid item>
                            <TextField
                                formik={formik}
                                label="Title (*)"
                                name="title"
                                placeholder="Enter Itinerary Title"
                                width="380px"
                            />
                            {formik.touched.title && formik.errors.title && <div className={classes.validationErrorNotification}>{formik.errors.title}</div>}
                        </Grid>
                        <Grid item>
                            <DateRangePickerField
                                width="100%"
                                name="dates"
                                label="Dates (*)"
                                placeholder="Check-in > Check Out"
                                formik={formik}                                
                            />
                            {formik.touched.dates && formik.errors.dates && <div className={classes.validationErrorNotification}>{formik.errors.dates}</div>}
                        </Grid>
                        <Grid item>
                            <SwitchLucia
                                name="showPriceOnShare"
                                value={formik.values.showPriceOnShare}
                                onChangeHandler={formik.handleChange}
                                placeholder="Show price when shared"
                            />
                        </Grid>
                        <Grid item>
                            <SwitchLucia
                                name="markAsClientApproved"
                                value={formik.values.markAsClientApproved}
                                onChangeHandler={formik.handleChange}
                                placeholder='Publish to Travelers'
                            />
                        </Grid>
                    </Grid>
                </div>
                <div style={{width: 380}}>
                    <Grid item xs={12} className={classes.spacing}>
                        <Typography component={'div'} variant='body2'>CLIENT INFORMATION</Typography>
                        <TextField
                            formik={formik}
                            label="Created for (*)"
                            name="clientName"
                            placeholder="Enter Client Name(s)"
                            width="380px"
                        />
                        {formik.touched.clientName && formik.errors.clientName && <div className={classes.validationErrorNotification}>{formik.errors.clientName}</div>}
                        <div>
                            <label className="phonenumberlabel" style={{color: '#242424', fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block'}}>
                                Phone Number
                            </label>
                            <PhoneField
                                label="Phone"
                                formik={formik}
                                name="clientPhone"
                                placeholder="Enter Client Phone Number"
                                width="380px"
                            />
                        </div>
                        <ChipInput
                            label="Emails"
                            value={formik.values.clientEmails}
                            newChipKeys={['Enter', ',', ' ']}
                            blurBehavior={'add'}
                            onAdd={(chip) => handleAddChip(chip)}
                            onPaste={handlePaste}
                            onDelete={(chip, index) => handleDeleteChip(chip, index)}
                            InputLabelProps={{
                                shrink: true,
                                className: 'chip-label'
                            }}
                            style={{marginTop: '30px'}}
                            error={formik.touched.clientEmails && Boolean(formik.errors.clientEmails)}
                            placeholder="Enter Client Email(s)"
                            fullWidth
                        />
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <TextField
                                formik={formik}
                                label="Total Price"
                                name="totalPrice"
                                placeholder="Enter Total Price"
                                width="380px"
                            />
                            {/* <SelectField
                                formik={formik}
                                label="Currency"
                                name="currencyId"
                                options={currencyTypes}
                                width="140px"
                                constants
                            /> */}
                        </div>
                    </Grid>
                </div>
            </Grid>
        </ItineraryFormContainer>
    )
}

export default ItineraryInformation;
