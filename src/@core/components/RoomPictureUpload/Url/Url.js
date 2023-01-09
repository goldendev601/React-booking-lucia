import React, {useRef, useState} from "react";
import {ItineraryFormContainer, Label, TextField} from "@core/components";
import styled from "styled-components";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {setPicture} from "redux/features/pictures/picturesSlice";
import {useDispatch} from "react-redux";

const CropperContainer = styled.div`
  margin-top: 20px;
`;

const Url = ({formik}) => {
    const dispatch = useDispatch()
    const [imageFile, setImageFile] = useState(null);
    const cropperRef = useRef(null);

    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;

        cropper.getCroppedCanvas().toBlob((blob) => {
            if (blob) {
                const url = formik.values.url;
                const name = url.split('/').pop().split('#')[0].split('?')[0];
                const extension = name.split('.').pop();
                const imageFile = new File([blob], name, {type: `image/${extension}`});
                const pictureUrl = URL.createObjectURL(imageFile);
                dispatch(setPicture({imageUrl: pictureUrl, imageFile: imageFile, imageName: name}));
                setImageFile(imageFile);
            }
        });
    };

    return (
        <ItineraryFormContainer>
            <TextField
                formik={formik}
                width="100%"
                name="url"
                label="Add url of the picture"
                placeholder="Enter the url picture"
            />
            <CropperContainer>
                {formik.values.url && <React.Fragment>
                    <Label>Picture</Label>
                    <Cropper
                        src={formik.values.url}
                        style={{height: '300px', width: '100%'}}
                        initialAspectRatio={16 / 9}
                        guides={false}
                        crop={onCrop}
                        ref={cropperRef}
                    />
                </React.Fragment>}
            </CropperContainer>
        </ItineraryFormContainer>
    );
}

export default Url;