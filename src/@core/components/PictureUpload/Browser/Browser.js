import React, {useEffect, useState} from "react";
import {ItineraryFormContainer, Label} from "@core/components";
import styled from "styled-components";
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import {setPicture} from "redux/features/pictures/picturesSlice";
import {useDispatch} from "react-redux";

const StyledP = styled.p`
  font-size: 12px; 
  text-align: center;
`;

const Browser = ({formik}) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null,
    });

    useEffect(() => {
        if (state.result) {
            fetch(state.result)
                .then(res => res.blob())
                .then((result) => {
                    const fileName = state.filename;
                    const extension = state.filename.split('.').pop();
                    const imageFile = new File([result], fileName, {type: `image/${extension}`});
                    const url = URL.createObjectURL(imageFile);
                    dispatch(setPicture({imageName: fileName, imageUrl: url, imageFile: imageFile}));
                });
        }
    }, [dispatch, state.filename, state.result]);

    useEffect(() => {
        if (formik.values.url !== '') {
            formik.setFieldValue('url', '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.url]);

    const Instructions = () => <React.Fragment>
        <Label>DRAG AND DROP YOUR PICTURE HERE</Label>
        <StyledP>Max 20 mb file size</StyledP>
    </React.Fragment>

    const onChange = (value) => setState(value);

    return (
        <ItineraryFormContainer>
            <div>
                <Label>Picture</Label>
                <DropNCrop instructions={<Instructions/>} canvasHeight="300px" maxFileSize={20000000} onChange={onChange} value={state} />
            </div>
        </ItineraryFormContainer>
    );
}

export default Browser;

