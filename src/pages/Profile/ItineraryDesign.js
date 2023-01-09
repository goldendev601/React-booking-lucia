import React, {useEffect, useState} from "react";
import { SelectField, UploadPicture, Button, Picture } from "@core/components";
import { Box, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { addItineraryStyles } from "styles";
import { useDispatch, useSelector } from "react-redux";
import { clearState, profileSelector, updateItineraryDesign } from "redux/features/profile/profileSlice";
import { getPropertyDesigns, itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import { error, success } from "styles/snackbarStyles/snackbarStyles";
import { useSnackbar } from 'react-simple-snackbar'
import { createErrorMessage } from "utils";


const ItineraryDesign = ({ handleOpenProfile }) => {
    const classes = addItineraryStyles();

    const { profileUser, isSuccess, isError, errorMessage, isFetching } = useSelector(profileSelector);

    const dispatch = useDispatch();

    const [itineraryLogoPicture, setItineraryLogoPicture] = useState([{itineraryLogo: profileUser.itineraryTheme?.itineraryLogoUrl}]);
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    useEffect(() => {
        dispatch(getPropertyDesigns())
    }, [dispatch])

    const { propertyDesigns } = useSelector(itinerariesSelector);

    const handlePictures = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            const url = URL.createObjectURL(imageFile)
            setItineraryLogoPicture([{
                itineraryLogo: url,
            }]);
            formik.setFieldValue('itineraryLogo', imageFile);
        }
    }

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Your process is successfully done');
            dispatch(clearState());
        }       
    }, [isError, isSuccess]);

    const formik = useFormik({
        initialValues: {
            propertyDesignId: profileUser.itineraryTheme ? profileUser.itineraryTheme.propertyDesignId : 1,
            itineraryLogo: null,
        },
        onSubmit: (values) => {
            const formData = new FormData()
            formData.append('property_design_id', values.propertyDesignId)
            formData.append('itinerary_logo', values.itineraryLogo)
            dispatch(updateItineraryDesign(formData));
        }
    });

    const deletePicture = () => {
        setItineraryLogoPicture([]);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={classes.themeInfo}> 
                <Box className={classes.designInfo}>
                    <div style={{display: 'flex'}}>
                        {itineraryLogoPicture.length
                            ? <Picture width={'150px'} height={'150px'} deleteImage={deletePicture}
                                       imageSrc={itineraryLogoPicture[0]?.itineraryLogo}/>
                            : <UploadPicture width={'150px'} height={'150px'} profile={true}
                                             handlePictures={handlePictures}/>
                        }
                        <div style={{marginLeft: '39px'}}>
                            <Typography variant="h2" style={{width: '226px', fontSize: 14, fontWeight: 600, fontFamily: 'Raleway', color: '#242424', lineHeight: '20px'}}>
                                Itinerary Logo
                            </Typography>
                            <Typography variant="h4" style={{width: '226px', fontSize: 12, fontWeight: 400, fontFamily: 'Raleway', color: '#242424', lineHeight: '18px', height: '72px', marginTop: '14px'}}>
                                This will be the logo that will be applied to every itinerary created in you account. You can override this by changing the logo in each individual itinerary.
                            </Typography>
                            <Typography variant="h3" style={{width: '226px', fontSize: 12, fontWeight: 400, fontFamily: 'Raleway', color: '#4F4F4F', marginTop: '14px', opacity: '0.4'}}>
                                Suggested min. size 300x300px
                            </Typography>
                        </div>
                    </div>                            
                    <div style={{marginTop: '20px'}}>                            
                        <SelectField
                            formik={formik}
                            label="Itinerary Theme"
                            name="propertyDesignId"
                            options={propertyDesigns}                
                            fieldName="propertyDesignId"
                            propertyName="propertyDesignId"
                            constants
                        />
                    </div>
                </Box>
            </div>
            <div className={classes.formActions}>
                <Button
                    $outlined
                    $width={'50%'}
                    onClick={handleOpenProfile}
                >
                    Cancel
                </Button>
                <Button
                    $primary
                    $width={'50%'}
                    type="submit"
                    disabled={isFetching}
                >
                    Save Changes
                </Button>
            </div>
        </form>
    );
}

export default ItineraryDesign;
