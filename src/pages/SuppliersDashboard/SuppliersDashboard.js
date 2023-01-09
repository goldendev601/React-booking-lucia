import React, {useCallback, useEffect} from 'react';
import {DataGrid, DataGridHeader, Loading} from "@core/components";
import {DashboardWrapper} from "@core/components";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "redux/features/auth/authSlice";
import {
    clearSupplier, clearSuppliersFlags,
    fetchSuppliers,
    setPage,
    setStart, setSupplier,
    suppliersSelector
} from "redux/features/suppliers/suppliersSlice";
import {useHistory} from "react-router-dom";
import AddSupplier from "./AddSupplier/AddSupplier";
import {
    dialogFormsStateSelector, setEdit,
    setSuppliersFormOpen
} from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import {columns} from "./columns";

const SuppliersDashboard = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {page, start, suppliers, isFetching, flags} = useSelector(suppliersSelector);
    const {suppliersFormOpen} = useSelector(dialogFormsStateSelector);

    const {isSupplierUpdatedSuccess, isSupplierAddedSuccess, isSupplierDeletedSuccess} = flags;

    const {user} = useSelector(userSelector);

    const {data, recordsTotal} = suppliers || {};

    const handlePageChange = (event, value) => {
        dispatch(setPage(value));
        dispatch(setStart());
    };

    const handleClickOpen = useCallback(() => {
        dispatch(setSuppliersFormOpen(true));
    }, [dispatch]);

    const handleOpenEditSupplier = (params) => {
        const {row} = params;
        dispatch(setSupplier(row));
        dispatch(setEdit(true));
        dispatch(setSuppliersFormOpen(true));
    };

    useEffect(() => {
        if (user) {
            dispatch(clearSupplier());
            dispatch(fetchSuppliers(start));
            dispatch(clearSuppliersFlags());
        }
    }, [dispatch, start, user, isSupplierUpdatedSuccess, isSupplierAddedSuccess, isSupplierDeletedSuccess]);

    useEffect(() => {
        history.push(`/suppliers?page=${page}`);
    }, [history, page]);

    return (
        <DashboardWrapper>
            <DataGridHeader component={<AddSupplier/>} open={suppliersFormOpen} handleClickOpen={handleClickOpen} addButtonName={'Supplier'} headerName="Suppliers"/>
            <Loading data-aos="fade-down" isFetching={isFetching}>
                {suppliers &&
                <DataGrid
                    paginationItemsName="suppliers"
                    disableSelectionOnClick={false}
                    rows={data}
                    columns={columns}
                    currentPage={page}
                    total={recordsTotal}
                    perPage={10}
                    pageCount={Math.ceil(recordsTotal / 10)}
                    handlePageChange={handlePageChange}
                    handleOpen={handleOpenEditSupplier}
                />}
            </Loading>
        </DashboardWrapper>
    );
}

export default SuppliersDashboard;
