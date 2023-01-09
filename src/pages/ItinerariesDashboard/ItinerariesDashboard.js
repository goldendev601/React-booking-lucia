import React, {useCallback, useEffect, useState} from 'react';
import {DashboardWrapper, DataGrid, DataGridHeader, Loading} from "@core/components";
import {AddItinerary} from "pages/Itinerary/CreateItinerary";
import {
    clearState,
    fetchItineraries,
    itinerariesSelector,
    setPage,
    setStart
} from "redux/features/itineraries/itinerariesSlice";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import { profileSelector} from "redux/features/profile/profileSlice";
import {
    dialogFormsStateSelector,
    setItineraryFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {columns} from "./columns";
import { constantsSelector, setFilterValue } from 'redux/features/constants/constantsSlice';
import HireAdvisor from "./HireAdvisor/HireAdvisor";

const ItinerariesDashboard = () => {
    const {profileUser} = useSelector(profileSelector);
    const dispatch = useDispatch();
    const history = useHistory();
    const {itineraryMultiFormOpen} = useSelector(dialogFormsStateSelector);

    const {page, start, itineraries, isFetching, isDeletedSuccess, addedSuccess, isItineraryCloned } = useSelector(itinerariesSelector);

    const {data, recordsTotal} = itineraries || {};

    const [showHireAdvisor, setShowHireAdvisor] = useState(false);

    const {filters} = useSelector(constantsSelector)

    const handlePageChange = (event, value) => {
        dispatch(setPage(value));
        dispatch(setStart());
    };

    const handleClickOpen = useCallback(() => {
        dispatch(setItineraryFormOpen(true));
    }, [dispatch]);

    const openItinerary = (params) => {
        const {id} = params;
        history.push(`/itinerary-details/${id}`);
    }

    useEffect(() => {
        let past, upcoming, active;
        if (((process.env.REACT_APP_FORCE_LICENSE_CHECK ===  'FALSE') || (profileUser && profileUser.hasValidLicense)) && filters) {
            dispatch(clearState());
            filters.findIndex((filter) => filter === 'Upcoming') >= 0 ? upcoming = true : upcoming = false;
            filters.findIndex((filter) => filter === 'Past') >= 0 ? past = true : past = false;
            filters.findIndex((filter) => filter === 'Active') >= 0 ? active = true : active = false;
            dispatch(fetchItineraries({start, past, active, upcoming}));
        }
    }, [profileUser, dispatch, start, page, addedSuccess, isDeletedSuccess, filters, isItineraryCloned]);

    const handleFilter = (filterOption) => {
        const currentFilter = filters ? [...filters] : [];
        const filterOptionIndex = currentFilter.findIndex((filter) => filter === filterOption)
        if (filterOptionIndex >= 0) {
            currentFilter.splice(filterOptionIndex, 1)
        } else {
            currentFilter.push(filterOption)
        }

        dispatch( setFilterValue(currentFilter) )
    }

    return (
        <DashboardWrapper>
            <DataGridHeader
                component={<AddItinerary/>}
                open={itineraryMultiFormOpen}
                handleClickOpen={handleClickOpen}
                headerName={'Itineraries'}
                addButtonName={'Itinerary'}
                hasFilter={true}
                filterOptions={['Upcoming', 'Active', 'Past']}
                filterVal={filters}
                handleFilter={handleFilter}
                handleHireAdvisor={setShowHireAdvisor}
            />
            <Loading data-aos="fade-down" isFetching={isFetching}>
                {itineraries &&
                <DataGrid
                    paginationItemsName="itineraries"
                    disableSelectionOnClick={false}
                    rows={data}
                    columns={columns}
                    currentPage={page}
                    total={recordsTotal}
                    perPage={10}
                    pageCount={Math.ceil(recordsTotal/10)}
                    handlePageChange={handlePageChange}
                    handleOpen={openItinerary}
                />}
                <HireAdvisor
                    showHireAdvisor={showHireAdvisor}
                    setShowHireAdvisor={setShowHireAdvisor}
                />
            </Loading>
        </DashboardWrapper>
        
    );
}

export default ItinerariesDashboard;
