import React from "react";
import {pictureStyles} from "styles";
import IconButton from "@material-ui/core/IconButton";
import {Camera} from "iconoir-react";
import {Input} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {dialogFormsStateSelector} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {itinerariesSelector} from "redux/features/itineraries/itinerariesSlice";
import {updateItineraryLogoPicture} from "redux/features/pictures/picturesSlice";
import PlaceholderImage from '../../../../assets/itinerarylogo.png'


const UploadItineraryLogoPicture = ({handlePictures, imageSrc}) => {
    const dispatch = useDispatch();
    const classes = pictureStyles();

    const {edit} = useSelector(dialogFormsStateSelector);
    const {itineraryId} = useSelector(itinerariesSelector);

    const uploadPhoto = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            const url = URL.createObjectURL(imageFile)
            if (edit) {
                const formData = new FormData();
                formData.append("itinerary_logo", imageFile);

                const logoPayload = {
                    itineraryId: itineraryId,
                    logo: formData,
                }
                dispatch(updateItineraryLogoPicture(logoPayload));
                handlePictures(imageFile, url);
            } else {
                handlePictures(imageFile, url);
            }
        }
    }

    const pictureBoxStyles = {
        width: '200px',
        height: '200px',
    }

    return (
        <div>
            <label htmlFor="icon-button-file">
                <div className={`border-spaced ${classes.image}`}
                     style={pictureBoxStyles}>
                    {/* <img className={classes.imagePreview} alt="" src={PlaceholderImage} /> */}
                    <img className={classes.imagePreview} style={pictureBoxStyles} alt="" src={imageSrc.indexOf('blob') === 0 ? imageSrc : `${imageSrc}?time=${new Date()}`} />
                    <Input className={classes.inputUpload} onChange={uploadPhoto}
                           accept="image/png, image/jpeg"
                           id="icon-button-file"
                           type="file"/>
                    <IconButton style={{position: 'absolute', opacity: 0.8}} className={classes.imageButton}
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                    >
                        <Camera style={{position: 'absolute', width: '17px'}} color={'white'}/>
                    </IconButton>
                </div>
            </label>
        </div>
    );
}

export default UploadItineraryLogoPicture;
