import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState, useRef} from "react";
import {addTravelerStyles} from "styles";
import ChipInput from 'material-ui-chip-input';
import {UploadPicture, Picture} from "@core/components";
import {
    TravelerFormContainer,
    TextField,
    MaskField,
    DatePickerField
} from "@core/components";
import {useSelector} from "react-redux";
import { FileDrop } from 'react-file-drop';
import styled from "styled-components";

import {
    travelersSelector,
} from "redux/features/travelers/travelersSlice";


const StyledP = styled.p`
  font-size: 12px; 
  text-align: center;
`;

const StyledP2 = styled.p`
  font-size: 12px; 
  text-align: left;
  color: #BA886E;
  font-weight: bold;
  margin-top: 10px;
`;

const Divider = styled.div`
    text-align: center;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
        content: "";
        width: 250px;
        border: 1px solid #000;
        opacity: 0.3;
        position: absolute;
    }
    span {
        padding: 0 20px;
        background: white;
        z-index: 99;
    }
`


const TravelerInformation = ({formik, edit}) => {
    const classes = addTravelerStyles();
    const [emails, setEmails] = useState([]);
    const {traveler} = useSelector(travelersSelector);

    const {
        imageUrl
    } = traveler || {};

    const [travelerPicture, setTravelerPicture] = useState('');
    
    useEffect(() => {
        if (imageUrl) {
            setTravelerPicture(imageUrl)
        }
    }, [imageUrl])

    const handleDeleteChip = (chip, index) => {
        const temp = [...emails];
        temp.splice(index, 1)
        setEmails(temp);
        formik.setFieldValue('emails', temp);
    }

    const handleAddChip = (chip) => {
        setEmails(prevState => [...prevState, chip]);
        formik.setFieldValue('emails', emails);
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
        if (emails.length !== 0) {
            formik.setFieldValue('emails', emails);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emails]);

    const deletePicture = () => {
        formik.setFieldValue('image', null);
        setTravelerPicture('')
    };

    const handlePictures = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            const url = URL.createObjectURL(imageFile)
            setTravelerPicture(url)
            formik.setFieldValue('image', imageFile);
        }
    }

    return (
        <TravelerFormContainer>
            <Grid container justify="space-between">
                <div style={{width: 150}}>
                    {travelerPicture.length > 0
                        ? <Picture width={'150px'} height={'140px'} deleteImage={deletePicture}
                                    imageSrc={travelerPicture}/>
                        : <UploadPicture width={'150px'} height={'140px'} profile={true}
                                            handlePictures={handlePictures}/>
                    }
                </div>
                <div style={{width: 620}}>
                    <Grid item xs={12} className={classes.spacing}>
                        <TextField
                            formik={formik}
                            label="Full Name (*)"
                            name="name"
                            placeholder="Enter traveler name"
                            width="100%"
                        />
                        <Grid container justify="space-between">
                            <Grid item>
                                <MaskField
                                    formik={formik}
                                    mask="+9999999999"
                                    label="Phone"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    width="295px"
                                />
                            </Grid>
                            <Grid item>
                                <DatePickerField
                                    name="birthday"
                                    label="Birthday (*)"
                                    placeholder="mm/dd/yyyy"
                                    formik={formik}
                                    width='295px'
                                    startDate={new Date(1900, 0, 1)}
                                    endDate={new Date()}
                                    beforeNow
                                />
                            </Grid>
                        </Grid>

                        <ChipInput
                            label="Emails (*)"
                            value={formik.values.emails}
                            newChipKeys={['Enter', ',', ' ']}
                            blurBehavior={'add'}
                            onAdd={(chip) => handleAddChip(chip)}
                            onPaste={handlePaste}
                            onDelete={(chip, index) => handleDeleteChip(chip, index)}
                            InputLabelProps={{
                                shrink: true,
                                className: 'chip-label'
                            }}
                            style={{marginTop: '25px'}}
                            error={formik.touched.emails && Boolean(formik.errors.emails)}
                            placeholder="Enter email address"
                            fullWidth
                        />
                        
                        <TextField
                            formik={formik}
                            label="Address (*)"
                            name="address"
                            placeholder="Enter full address"
                            width="100%"
                        />
                    </Grid>
                </div>
            </Grid>
        </TravelerFormContainer>
    )
}

export default TravelerInformation;
