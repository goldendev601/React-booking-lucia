import { Grid, Typography } from "@material-ui/core";
import { useCallback } from 'react';
import React, { useEffect } from "react";
import { addItineraryStyles } from "styles";
import {
    ItineraryFormContainer,
    Loading,
} from "@core/components";

import { useDispatch, useSelector } from "react-redux";
import {
    clearPicturesFlags,
    getItineraryLogoPicture,
    picturesSelector, 
    setItineraryLogo,
    removeItineraryLogoPicture,
    updateItineraryLogoPicture
} from "redux/features/pictures/picturesSlice";
import UploadItineraryLogoPicture from "./UploadItineraryLogoPicture";
import { itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import { createErrorMessage } from "utils";
import { error, success } from "styles/snackbarStyles/snackbarStyles";
import { useSnackbar } from 'react-simple-snackbar';
import LogoPicture from "../LogoPicture";
import PlaceholderImage from '../../../../assets/itinerarylogo.png'



const ItineraryLogoPicture = ({ itineraryLogo, edit }) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();
    const { itineraryId } = useSelector(itinerariesSelector);

    const { itineraryLogoPicture, flags, isFetching, errorMessage } = useSelector(picturesSelector);

    const {
        isItineraryLogoPictureUpdatedSuccess,
        isItineraryLogoPictureUpdatedError,
    } = flags;

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const uploadLogo = (imageFile, src) => {
        // const formData = new FormData();
        // formData.append("itinerary_logo", imageFile);
        // const logoPayload = {
        //     itineraryId: itineraryId,
        //     logo: formData,
        // }
        // dispatch(updateItineraryLogoPicture(logoPayload))
        // console.log("UPLOAD IS WORKING...", logoPayload);
        dispatch(setItineraryLogo([{ imageUrl: src, imageFile: imageFile }]))
    }

    const deleteImage = useCallback((index, id) => {
        const picturesArray = [...itineraryLogoPicture];
        picturesArray.splice(index, 1);
        dispatch(removeItineraryLogoPicture(picturesArray));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, itineraryLogoPicture]);

    useEffect(() => {
        if (edit) {
            if (isItineraryLogoPictureUpdatedError) {
                openSnackbarError(createErrorMessage(errorMessage));
            }

            if (isItineraryLogoPictureUpdatedSuccess) {
                openSnackbarSuccess('Itinerary logo is successfully updated');
            }
            dispatch(clearPicturesFlags());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, isItineraryLogoPictureUpdatedError, isItineraryLogoPictureUpdatedSuccess]
    );

    useEffect(() => {
        if (edit) {
            dispatch(getItineraryLogoPicture(itineraryId));
        }
    }, [dispatch, edit, itineraryId]);

    return (
        <Loading isFetching={isFetching}>
            <ItineraryFormContainer>
                <Typography style={{ marginBottom: '10px' }} component={'div'}
                    variant='body2'>Your Logo</Typography>
                <div className={classes.pictures} style={{ flexGrow: '1' }}>
                    <Grid container spacing={1}>
                        {/* {itineraryLogoPicture && itineraryLogoPicture.map((image, index) => {
                            return (
                                <Grid item xs={4} key={image.id}>
                                    <LogoPicture id={image.id} imageSrc={image.imageUrl}
                                             open={deleteImage}
                                             index={index} itineraryLogo={itineraryLogo}
                                             key={index} width="200px" height="161px"/>
                                </Grid>);
                        })} */}
                        {itineraryLogoPicture && itineraryLogoPicture.map((image, index) => {
                            return (
                                <Grid item xs={4}>
                                    <UploadItineraryLogoPicture handlePictures={uploadLogo} itineraryLogo={itineraryLogo} imageSrc={image.imageUrl} />
                                </Grid>
                            )
                        })}
                        {itineraryLogoPicture.length == 0 && (
                            <Grid item xs={4}>
                                <UploadItineraryLogoPicture handlePictures={uploadLogo} itineraryLogo={itineraryLogo} imageSrc={PlaceholderImage} />
                            </Grid>
                        )}
                        
                    </Grid>
                </div>
            </ItineraryFormContainer>
        </Loading>
    )
}

export default ItineraryLogoPicture;
