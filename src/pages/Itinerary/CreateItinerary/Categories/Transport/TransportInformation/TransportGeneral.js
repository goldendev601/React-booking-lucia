import React, {useEffect}  from "react";
import { addItineraryStyles } from "styles/muiStyles";
import {Grid} from "@material-ui/core";
import {PriceField, SelectField, TextField} from "@core/components";

const TransportGeneral = ({edit, formik}) => {
    const classes = addItineraryStyles();

    const selectOptions = [
        {name: 'Rail', value: 1},
        {name: 'Ferry', value: 2},
        {name: 'Car', value: 3},
        {name: 'Transfer', value: 4},
    ];

    useEffect(() => {
        if (formik.values.transitTypeId) {
            if (formik.values.transitTypeId === 1) {
                formik.setFieldValue('customHeaderTitle', 'Train to (Arrival Station)');
            }
            if (formik.values.transitTypeId === 2) {
                formik.setFieldValue('customHeaderTitle', 'Ferry to (Arrival Port)');
            }
            if (formik.values.transitTypeId === 3) {
                formik.setFieldValue('customHeaderTitle', 'Pick-Up Rental Car');
            }
            if (formik.values.transitTypeId === 4) {
                formik.setFieldValue('customHeaderTitle', 'Transfer to (Arrival Destination)');
            }
        }
    }, [formik.values.transitTypeId]);

    return (
        <>
        <Grid container>
             <Grid item>
                <TextField
                    formik={formik}
                    label="Title"
                    name="customHeaderTitle"
                    placeholder="Enter Title"
                />
            </Grid>
        </Grid>
       
        <Grid container justify="space-between">
            {
                edit ? (
                    <Grid item>
                        <SelectField
                            formik={formik}
                            width="180px"
                            label="Transit Type (*)"
                            name="transitTypeId"
                            options={selectOptions}
                            disabled={true}
                        />
                        {formik.touched.transitTypeId && formik.errors.transitTypeId && <div className={classes.validationErrorNotification}>{formik.errors.transitTypeId}</div>}
                    </Grid>
                ) : (
                    <Grid item>
                        <SelectField
                            formik={formik}
                            width="180px"
                            label="Transit Type (*)"
                            name="transitTypeId"
                            options={selectOptions}
                        />
                        {formik.touched.transitTypeId && formik.errors.transitTypeId && <div className={classes.validationErrorNotification}>{formik.errors.transitTypeId}</div>}
                    </Grid>
                )
            }
            <Grid item>
                <PriceField
                    formik={formik}
                    label="Price"
                    name="price"
                    placeholder="Enter Price"
                    width="180px"
                />
            </Grid>           
            <Grid item>
                {
                    edit ? (
                        <TextField
                            formik={formik}
                            label="Service Provider"
                            name="providerName"
                            placeholder="Enter the Provider Name"
                            disabled
                        />
                    ) : (
                        <TextField
                            formik={formik}
                            label="Service Provider"
                            name="providerName"
                            placeholder="Enter the Provider Name"
                        />
                    )
                }
                
                {formik.touched.providerName && formik.errors.providerName && <div className={classes.validationErrorNotification}>{formik.errors.providerName}</div>}
            </Grid>
        </Grid>
        </>
    );
}

export default React.memo(TransportGeneral);
