import React, {useState} from "react";
import {FormControlLabel, IconButton, makeStyles, Menu, MenuItem} from "@material-ui/core";
import {EditPencil, MoreVert, Trash} from "iconoir-react";
import {colors} from "styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    setEdit,
    setNotesFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {
    clearNoteFlags,
    deleteNote,
    setNote,
    notesSelector
} from "redux/features/notes/notesSlice";
import {NotificationHandler} from "../NotificationHandler";
import AlertDialog from "../AlertDialog/AlertDialog";

const useStyles = makeStyles(() => ({
    iconMargin: {
        marginRight: '15px',
        marginBottom: '5px'
    }
}));

const TableEditNotes = ({row}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const {flags, errorMessage} = useSelector(notesSelector);
    const {isNoteDeletedSuccess, isNoteDeletedError} = flags || {};

    const handleOpenEditSupplier = () => {
        dispatch(setEdit(true));
        dispatch(setNotesFormOpen(true));
    };

    const handleOpenAlert = () => setOpenAlert(prevState => !prevState);

    const handleOpenClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = (event) => {
        dispatch(setNote(row));
        handleOpenClick(event);
    }

    const deleteSelectedNote = () => {
        dispatch(deleteNote(row?.id));
        handleOpenAlert();
    }

    return (
        <NotificationHandler
            clearState={clearNoteFlags}
            isSuccess={isNoteDeletedSuccess}
            isError={isNoteDeletedError}
            errorMessage={errorMessage}
            successMessage="Note is successfully deleted"
            closeDialogs={true}
        >
            <AlertDialog
                open={openAlert}
                handleClose={handleOpenAlert}
                handleClick={deleteSelectedNote}
                type="remove"
                name="note"
            />
            <FormControlLabel
                control={
                    <IconButton
                        color="secondary"
                        aria-label="row-action"
                        onClick={handleEditClick}
                    >
                        <MoreVert width={'24px'} style={{color: colors.brand}}/>
                    </IconButton>

                }
            />
            <Menu
                id="edit-supplier"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{margin: '50px 0 0 -55px'}}
            >
                <MenuItem onClick={handleOpenEditSupplier}>
                    <EditPencil className={classes.iconMargin}/>
                    Edit note
                </MenuItem>
                <MenuItem onClick={handleOpenAlert}>
                    <Trash className={classes.iconMargin}/>
                    Delete note
                </MenuItem>
            </Menu>
        </NotificationHandler>
    );
};

export default TableEditNotes;
