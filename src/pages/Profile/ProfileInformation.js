import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {useFormik} from "formik";
import {Button, ItineraryFormContainer, UploadPicture, Picture, TextField} from "@core/components";
import {addItineraryStyles} from "styles";
import {clearState, getProfile, profileSelector, updateProfile} from "redux/features/profile/profileSlice";
import {useDispatch, useSelector} from "react-redux";
import {createErrorMessage} from "utils";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import userDefaultAvatar from 'assets/user-default-avatar.png'

const ProfileInformation = ({handleOpenProfile}) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();
    const {profileUser, isSuccess, isError, errorMessage, isFetching} = useSelector(profileSelector);

    const [profilePicture, setProfilePicture] = useState([{profileImage: profileUser?.profileImageUrl ? profileUser?.profileImageUrl : 'https://s3-lucia-staging.s3.us-east-2.amazonaws.com/fncfranzese3-at-gmailcom-1637321387/profile_picture-LwsKb6LjyOdtvWSI.png'}]);
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const formik = useFormik({
        initialValues: {
            lastName: profileUser.lastName,
            firstName: profileUser.firstName,
            email: profileUser.email,
            phone: profileUser.phone,
            profileImage: null
        },
        onSubmit: (values) => {
            const formData = new FormData()
            // formData.append('profile_image', values.profileImage)
            formData.append('first_name', values.firstName)
            formData.append('last_name', values.lastName)
            formData.append('email', values.email)
            dispatch(updateProfile(formData));
        }
    });

    const getDefaultAvatar = (image) => {
        if (image) {
            fetch(image)
                .then(res => res.blob())
                .then((result) => {
                    const imageFile = new File([result], 'user-default-avatar', {type: 'image/png'});
                    formik.setFieldValue('profileImage', imageFile);
                });
        }
    }

    const handlePictures = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            const url = URL.createObjectURL(imageFile)
            setProfilePicture([{
                profileImage: url,
            }]);
            formik.setFieldValue('profileImage', imageFile);
        }
    }

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }

        if (isSuccess) {
            openSnackbarSuccess('Profile information is successfully changed');
            dispatch(clearState());
            dispatch(getProfile());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);

    const deletePicture = () => {
        setProfilePicture([]);
        getDefaultAvatar(userDefaultAvatar)
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <ItineraryFormContainer className={classes.spacing}>
                <Grid container>
                    {/* <Grid item xs={3}>
                        {profilePicture.length
                            ? <Picture width={'150px'} height={'140px'} deleteImage={deletePicture}
                                       imageSrc={profilePicture[0]?.profileImage}/>
                            : <UploadPicture width={'150px'} height={'140px'} profile={true}
                                             handlePictures={handlePictures}/>
                        }
                    </Grid> */}
                    <Grid item xs={12} className={classes.spacing}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <TextField
                                formik={formik}
                                label="Last Name"
                                name="lastName"
                                placeholder="Select a Name"
                                width="300px"
                            />
                            <TextField
                                formik={formik}
                                label="First Name"
                                name="firstName"
                                placeholder="Select a Name"
                                width="300px"
                            />
                        </div>
                        <TextField
                            formik={formik}
                            label="Phone"
                            name="phone"
                            placeholder="Placeholder"
                            width="100%"
                        />
                        <TextField
                            formik={formik}
                            label="Email"
                            name="email"
                            placeholder="Placeholder"
                            width="100%"
                        />
                    </Grid>
                </Grid>
            </ItineraryFormContainer>
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

export default ProfileInformation;
