import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import ChipInput from 'material-ui-chip-input';
import {
    Button, NotificationHandler,
    TextField, PhoneField
} from "@core/components";
import {Lock, Mail} from "iconoir-react";
import {colors} from "styles/colors";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    itinerariesSelector,
} from "redux/features/itineraries/itinerariesSlice";
import {useParams} from "react-router-dom";
import {success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'
import IconButton from "@material-ui/core/IconButton";
import {removeProperty} from "utils";
import {clearState, getShareCode, sendInvite, shareCodeSelector, sendInviteSMS} from "redux/features/shareCode/shareCodeSlice";

const validationSchema = yup.object({
    emails: yup.array().min(1).max(5).of(yup
        .string('Enter your email')
        .email('Enter a valid email')
    ),
});

const smsValidationSchema = yup.object({
    // phone: yup.array().min(1).max(5).of(yup
    //     .string('Enter your phone')
    // ),
});

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1em;
`;

const Separator = styled.div`
  width: 600px;
  border: 1px solid rgba(189, 189, 189, 0.42);
  margin: 59px 0;
`;

const InvitationButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ShareItinerary = ({onClose}) => {
    const [emails, setEmails] = useState([]);
    const [phone, setPhone] = useState([]);
    const {id} = useParams();
    const dispatch = useDispatch();
    const [openSnackbarSuccess] = useSnackbar(success);
    const [messageInput, setMessageInput] = useState(false);
    const [messageSMSInput, setMessageSMSInput] = useState(false);
    const addMessageInput = () => setMessageInput(prevState => !prevState);
    const addMessageSMSInput = () => setMessageSMSInput(prevState => !prevState);

    const {itineraryId} = useSelector(itinerariesSelector);

    const {shareCode, isSuccess, isError, isFetching, errorMessage} = useSelector(shareCodeSelector);

    const formik = useFormik({
        initialValues: {
            shareLink: ``,
            emails: ''
        },
        onSubmit: (values) => {
            const data = removeProperty('shareLink', values);
            const apiPayload = {
                id: id || itineraryId,
                data
            }
            dispatch(sendInvite(apiPayload));
            onClose();
        },
        validationSchema: validationSchema,
    });

    const formikSMS = useFormik({
        initialValues: {
            shareLink: ``,
            phone: ''
        },
        onSubmit: (values) => {
            const data = removeProperty('shareLink', values);
            const apiPayload = {
                id: id || itineraryId,
                data
            }
            dispatch(sendInviteSMS(apiPayload));
            onClose();
        },
        validationSchema: smsValidationSchema,
    });

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formik.values.shareLink);
        openSnackbarSuccess('Share code copied to clipboard');
    }

    useEffect(() => {
        formik.setFieldValue('emails', emails);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emails]);

    useEffect(() => {
        formikSMS.setFieldValue('phone', phone);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phone]);

    useEffect(() => {
        dispatch(getShareCode(id || itineraryId));
    }, [dispatch, id, itineraryId]);

    useEffect(() => {
        if (shareCode) {
            formik.setFieldValue('shareLink', `${process.env.REACT_APP_DOMAIN_URL}/public/itinerary/${shareCode}`);
            formikSMS.setFieldValue('shareLink', `${process.env.REACT_APP_DOMAIN_URL}/public/itinerary/${shareCode}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shareCode]);

    const handleDeleteChip = (chip, index) => {
        const temp = [...emails];
        temp.splice(index, 1)
        setEmails(temp);
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

    const handleAddChip = (chip) => {
        setEmails(prevState => [...prevState, chip]);
    }

    useEffect(() => {
        if (messageInput) {
            const formikValues = formik.values;
            formik.setValues({...formikValues, message: ''});
        } else {
            const formikValues = removeProperty('message', formik.values);
            formik.setValues({...formikValues});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageInput]);

    useEffect(() => {
        if (messageSMSInput) {
            const formikValues = formikSMS.values;
            formikSMS.setValues({...formikValues, message: ''});
        } else {
            const formikValues = removeProperty('message', formikSMS.values);
            formikSMS.setValues({...formikValues});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageSMSInput]);

    return (
        <NotificationHandler
            clearState={clearState}
            isSuccess={isSuccess}
            isError={isError}
            errorMessage={errorMessage}
            successMessage="Invitation message is sent"
            closeDialogs={true}
        >
            <div style={{padding: '30px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <InputContainer>
                        <TextField
                            formik={formik}
                            label="Link to share"
                            name="shareLink"
                            placeholder=" "
                            width="100%"
                            startIcon={<Lock color={colors.brand}/>}
                            disabled={true}
                        />
                        <Button
                            $outlined
                            onClick={copyToClipboard}
                        >
                            Copy Link
                        </Button>
                    </InputContainer>
                    <Separator/>
                    <InputContainer>
                        <ChipInput
                            label="Invite people"
                            value={emails}
                            newChipKeys={['Enter', ',', ' ']}
                            blurBehavior={'add'}
                            onPaste={handlePaste}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip, index) => handleDeleteChip(chip, index)}
                            InputLabelProps={{
                                shrink: true,
                                className: 'chip-label'
                            }}
                            error={formik.touched.emails && Boolean(formik.errors.emails)}
                            placeholder="Add multiples email separated by comas"
                            fullWidth
                        />
                        {messageInput &&
                        <TextField
                            formik={formik}
                            label="Message"
                            name="message"
                            placeholder="Enter an invitation message"
                            width="100%"
                            multiline
                        />}
                        <InvitationButtonsContainer>
                            <IconButton style={{
                                marginTop: '5px',
                                padding: '0'
                            }}
                                        disableRipple={true}
                                        aria-label="message"
                                        onClick={addMessageInput}
                            >
                                <Mail width={'20px'} color={colors.brand}/>
                                <span style={{marginLeft: '5px'}}
                                      className='span-small'>{messageInput ? 'Delete message' : 'Add message'}
                            </span>
                            </IconButton>
                            <Button
                                $outlined
                                type="submit"
                                disabled={isFetching}
                            >
                                Send invite
                            </Button>
                        </InvitationButtonsContainer>
                    </InputContainer>
                </form>
                    <Separator/>
                <form onSubmit={formikSMS.handleSubmit}>
                    <InputContainer>
                        <div style={{width: '100%'}}>
                            <label className="phonenumberlabel" style={{color: '#242424', fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block'}}>
                                Send by text
                            </label>
                            <PhoneField
                                label="Send by text"
                                formik={formikSMS}
                                error={formikSMS.touched.phone && Boolean(formikSMS.errors.phone)}
                                name="phone"
                                value={phone}
                                placeholder="Enter phone number"
                                width="100%"
                            />
                        </div>
                        {messageSMSInput &&
                        <TextField
                            formik={formikSMS}
                            label="Message"
                            name="message"
                            placeholder="Enter an invitation message"
                            width="100%"
                            multiline
                        />}
                        <InvitationButtonsContainer>
                            <IconButton style={{
                                marginTop: '5px',
                                padding: '0'
                            }}
                                        disableRipple={true}
                                        aria-label="message"
                                        onClick={addMessageSMSInput}
                            >
                                <Mail width={'20px'} color={colors.brand}/>
                                <span style={{marginLeft: '5px'}}
                                      className='span-small'>{messageSMSInput ? 'Delete message' : 'Add message'}
                            </span>
                            </IconButton>
                            <Button
                                $outlined
                                type="submit"
                                disabled={isFetching}
                            >
                                Send by text 
                            </Button>
                        </InvitationButtonsContainer>
                    </InputContainer>
                </form>
            </div>
        </NotificationHandler>
    )
}

export default ShareItinerary;
