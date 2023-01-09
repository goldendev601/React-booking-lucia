import React, {useState} from "react";
import {FormControlLabel, IconButton, makeStyles, Menu, MenuItem} from "@material-ui/core";
import {EditPencil, MoreVert, Trash} from "iconoir-react";
import {colors} from "styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {
    setEdit,
    setSuppliersFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {
    clearSuppliersFlags,
    deleteSupplier,
    setSupplier,
    suppliersSelector
} from "redux/features/suppliers/suppliersSlice";
import {NotificationHandler} from "../NotificationHandler";
import AlertDialog from "../AlertDialog/AlertDialog";

const useStyles = makeStyles(() => ({
    iconMargin: {
        marginRight: '15px',
        marginBottom: '5px'
    }
}));

const TableEditSuppliers = ({row}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const {flags, errorMessage} = useSelector(suppliersSelector);

    const {isSupplierDeletedSuccess, isSupplierDeletedError} = flags;

    const handleOpenEditSupplier = () => {
        dispatch(setEdit(true));
        dispatch(setSuppliersFormOpen(true));
    };

    const handleOpenAlert = () => setOpenAlert(prevState => !prevState);

    const handleOpenClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = (event) => {
        dispatch(setSupplier(row));
        handleOpenClick(event);
    }

    const deleteSelectedSupplier = () => {
        dispatch(deleteSupplier(row?.id));
        handleOpenAlert();
    }

    return (
        <NotificationHandler
            clearState={clearSuppliersFlags}
            isSuccess={isSupplierDeletedSuccess}
            isError={isSupplierDeletedError}
            errorMessage={errorMessage}
            successMessage="Supplier is successfully deleted"
            closeDialogs={true}
        >
            <AlertDialog
                open={openAlert}
                handleClose={handleOpenAlert}
                handleClick={deleteSelectedSupplier}
                type="remove"
                name="supplier"
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
                    Edit supplier
                </MenuItem>
                <MenuItem onClick={handleOpenAlert}>
                    <Trash className={classes.iconMargin}/>
                    Delete supplier
                </MenuItem>
            </Menu>
        </NotificationHandler>
    );
};

export default TableEditSuppliers;
