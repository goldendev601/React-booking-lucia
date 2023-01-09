import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { DashboardWrapper, DataGrid, DataGridHeader, Loading } from "@core/components";
import { columns } from "./columns";
import { AddTraveler } from "pages/Traveler/CreateTraveler";
import {
    clearState,
    fetchTravelers,
    fetchTraveler,
    travelersSelector,
    setPage,
    setStart,
    setEdit
} from "redux/features/travelers/travelersSlice";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "redux/features/auth/authSlice";
import { useHistory } from "react-router-dom";
import {
    dialogFormsStateSelector,
    setTravelerFormOpen,
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import TravelerProfile from './TravelerProfile';


const TravelersDashboard = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { travelerMultiFormOpen } = useSelector(dialogFormsStateSelector);

    const { page, start, travelers, traveler, isFetching, isDeletedSuccess, addedSuccess, isEdit } = useSelector(travelersSelector);
    const { data, recordsTotal } = travelers || {};
    const { user } = useSelector(userSelector);

    const [selectedTraveler, selectTraveler] = useState(null)

    const handlePageChange = (event, value) => {
        dispatch(setPage(value));
        dispatch(setStart());
    };

    useEffect(() => {
        dispatch(setEdit(false));
        dispatch(setTravelerFormOpen(false));
    }, []);


    const handleClickOpen = useCallback(() => {
        dispatch(setEdit(false));
        dispatch(setTravelerFormOpen(true));
    }, [dispatch]);

    const openTraveler = (params) => {
        const { id } = params;
        console.log(params)
        selectTraveler(params.row)
        // history.push(`/traveler-details/${id}`);
    }

    useEffect(() => {
        if (user && start >= 0) {
            dispatch(clearState());
            dispatch(fetchTravelers(start));
        }
    }, [user, dispatch, start, page, addedSuccess, isDeletedSuccess]);

    useEffect(() => {
        if (selectedTraveler) {
            dispatch(fetchTraveler(selectedTraveler.id));
        }
    }, [dispatch, selectedTraveler]);

    return (
        <div style={{display: "flex"}}>
            <div style={{flex: 1}}>
                <DashboardWrapper>
                    <DataGridHeader component={<AddTraveler />} open={travelerMultiFormOpen && !isEdit} handleClickOpen={handleClickOpen} headerName={'Travelers'} addButtonName={'Traveler'} />
                    <Loading data-aos="fade-down" isFetching={isFetching}>
                        {travelers &&
                            <DataGrid
                                paginationItemsName="travelers"
                                disableSelectionOnClick={false}
                                rows={data}
                                columns={columns}
                                currentPage={page}
                                total={recordsTotal}
                                perPage={10}
                                pageCount={Math.ceil(recordsTotal / 10)}
                                handlePageChange={handlePageChange}
                                handleOpen={openTraveler}
                            />}
                    </Loading>
                </DashboardWrapper>
            </div>
            {
                selectedTraveler && traveler && (
                    <TravelerProfile traveler={traveler} onHide={() => selectTraveler(null)} />
                )
            }
        </div>
    );
}

export default TravelersDashboard;
