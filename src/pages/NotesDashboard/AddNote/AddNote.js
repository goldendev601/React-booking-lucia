import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createNoteTabsDock} from "./noteTabsDock";
import * as yup from "yup";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    dialogFormsStateSelector,
    setNotesFormOpen,
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {createErrorMessage, snakeNestedKeys} from "utils";
import { autocompleteNotes, notesSelector, addNote, clearNoteFlags, setNoteId, updateNote } from "redux/features/notes/notesSlice";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import {useSnackbar} from 'react-simple-snackbar'

const validationSchema = yup.object({
    title: yup
        .string('Enter a title')
        .required('title is required'),
    // priorityId: yup
    //     .string('Select priority')
    //     .required('priority is required'),
});

const AddNote = ({...props}) => {
    const dispatch = useDispatch();
    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const {edit} = useSelector(dialogFormsStateSelector);
    const {flags, errorMessage, note} = useSelector(notesSelector);

    const {apiPayload} = props;
    const {
        id       
    } = note || {};

    const {isNoteUpdatedSuccess, isNoteUpdatedError, isNoteAddedSuccess, isNoteAddedError} = flags;

    const formik = useFormik({
        initialValues: {
            // priorityId: '',
            title: '',
            notes: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const payload = {...apiPayload};
            payload.data = snakeNestedKeys(values);

            if (edit) {
                const formData = new FormData();
                // formData.append("priority_id", values?.priorityId);
                formData.append("title", values?.title);
                formData.append("notes", values?.notes);
                const payload = {
                    note: formData,
                    noteId: id,
                }
                dispatch(updateNote(payload));
            } else {
                const formData = new FormData();
                // formData.append("priority_id", values?.priorityId);
                formData.append("title", values?.title);
                formData.append("notes", values?.notes);
                dispatch(addNote(formData));
            }
        }
    });

    useEffect(() => {
        if (id) {
            dispatch(setNoteId(id))
        }
    }, [id])


    useEffect(() => {
        if (edit && note) {
            const noteDescription = note.notes;
            const replacedNoteDescription = noteDescription.replaceAll('&lt;p&gt;', '').replaceAll('&lt;/p&gt;', '');
            formik.setValues({
                // priorityId: note.priorityId,
                title: note.title,
                notes: replacedNoteDescription,
            });
        }
    }, [edit, note]);

    useEffect(() => {
        if (isNoteAddedSuccess) {
            openSnackbarSuccess('Note is successfully added');
            dispatch(setNotesFormOpen(false));
        }
        if (isNoteAddedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearNoteFlags());
        }
        if (isNoteUpdatedSuccess) {
            openSnackbarSuccess('Note is successfully updated');
            dispatch(setNotesFormOpen(false));
        }
        if (isNoteUpdatedError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearNoteFlags());
        }
    }, [isNoteUpdatedSuccess, isNoteUpdatedError, isNoteAddedSuccess, isNoteAddedError, openSnackbarSuccess, openSnackbarError, errorMessage]);

    return (
        <form id="others" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description={edit ? "Edit Note" : "Add Note"}
                id="add-other"
                createTabsDock={createNoteTabsDock}
                {...props}
                formik={formik}
                unlockTabs={true}
                alertType="discard"
            />
        </form>
    )
}

export default AddNote;
