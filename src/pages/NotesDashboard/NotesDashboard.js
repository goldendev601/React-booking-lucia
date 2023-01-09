import React, {useCallback, useEffect} from 'react';
import {DataGrid, DataGridHeader, Loading} from "@core/components";
import {DashboardWrapper} from "@core/components";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "redux/features/auth/authSlice";
import {
    clearState,
    fetchNotes,    
    notesSelector,
    setNote,
    clearNoteFlags, 
    setPage, 
    setStart
} from "redux/features/notes/notesSlice";
import {useHistory} from "react-router-dom";
import AddNote from "./AddNote/AddNote";
import {
    dialogFormsStateSelector, setEdit,
    setNotesFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {columns} from "./columns";

const NotesDashboard = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {noteInfo, isFetching, page, start, flags} = useSelector(notesSelector);
    const {isNoteUpdatedSuccess, isNoteAddedSuccess, isNoteDeletedSuccess} = flags;
    const {notesFormOpen} = useSelector(dialogFormsStateSelector);


    const {user} = useSelector(userSelector);
    const {data, recordsTotal} = noteInfo || {};

    const handleClickOpen = useCallback(() => {
        dispatch(setNotesFormOpen(true));
    }, [dispatch]);

    const handlePageChange = (event, value) => {
        dispatch(setPage(value));
        dispatch(setStart());
    };

    const handleOpenEditNote = (params) => {
        const {row} = params;
        dispatch(setNote(row));
        dispatch(setEdit(true));
        dispatch(setNotesFormOpen(true));
    };

    useEffect(() => {
        if (user) {
            dispatch(clearState());
            dispatch(fetchNotes(start));
            dispatch(clearNoteFlags());
        }
    }, [dispatch, start, user, isNoteUpdatedSuccess, isNoteAddedSuccess, isNoteDeletedSuccess]);

    useEffect(() => {
        if (user) {
            dispatch(clearState());
            dispatch(fetchNotes());
        }
    }, [dispatch]);

    useEffect(() => {
        history.push(`/notes?page=${page}`);
    }, [history, page]);

    return (
        <DashboardWrapper>
            <DataGridHeader component={<AddNote/>} open={notesFormOpen} handleClickOpen={handleClickOpen} addButtonName={'Note'} headerName="Notes"/>
            <Loading data-aos="fade-down" isFetching={isFetching}>
                {noteInfo &&
                <DataGrid
                    paginationItemsName="Notes"
                    disableSelectionOnClick={false}
                    rows={data}
                    columns={columns}
                    currentPage={page}
                    total={recordsTotal}
                    perPage={10}
                    pageCount={Math.ceil(recordsTotal / 10)}
                    handlePageChange={handlePageChange}
                    handleOpen={handleOpenEditNote}
                />}
            </Loading>
        </DashboardWrapper>
    );
}

export default NotesDashboard;
