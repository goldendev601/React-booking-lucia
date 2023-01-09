import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "api/axios";
import {ADD_SUPPLIER, DELETE_SUPPLIER, FETCH_SUPPLIERS, SUPPLIER_LOOKUP, UPDATE_SUPPLIER, ADD_SUPPLIER_PICTURES, NOTES_LOOKUP, GOOGLE_PLACE_HOTEL_SEARCH} from "api/api";
import {camelizeNestedKeys} from "utils";

const suppliersFlags = {
    isSupplierUpdatedSuccess: false,
    isSupplierUpdatedError: false,

    isSupplierAddedSuccess: false,
    isSupplierAddedError: false,

    isSupplierDeletedSuccess: false,
    isSupplierDeletedError: false,

    // isSupplierPictureAddedSuccess: false,
    // isSupplierPictureAddedError: false,
}

const initialState = {
    supplier: [],
    supplierId: null,
    previousProviderName: '',
    suppliers: null,
    noteInfo: null,
    googleSearchInfo: null,
    page: 1,
    start: 0,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    flags: {
        ...suppliersFlags
    }
}

export const supplierLookup = createAsyncThunk(
    'suppliers/supplierLookup',
    async (arg, thunkAPI) => {
        const {search, bookingCategoryId} = arg;
        try {
            return await axios.get(SUPPLIER_LOOKUP(search, bookingCategoryId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const notesLookup = createAsyncThunk(
    'suppliers/notesLookup',
    async (arg, thunkAPI) => {
        const {search} = arg;
        try {
            return await axios.get(NOTES_LOOKUP(search));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const fetchSuppliers = createAsyncThunk(
    'suppliers/fetchSuppliers',
    async (page, thunkAPI) => {
        try {
            return await axios.get(FETCH_SUPPLIERS(page));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const googlePlaceHotelSearch = createAsyncThunk(
    'suppliers/googlePlaceHotelSearch',
    async (placeId, thunkAPI) => {
        try {
            return await axios.get(GOOGLE_PLACE_HOTEL_SEARCH(placeId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const addSupplier = createAsyncThunk(
    'suppliers/addSupplier',
    async (supplier, thunkAPI) => {
        try {
            return await axios.post(ADD_SUPPLIER, supplier);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const updateSupplier = createAsyncThunk(
    'suppliers/updateSupplier',
    async (arg, thunkAPI) => {
        const {supplierId, supplier} = arg;
        try {
            return await axios.post(UPDATE_SUPPLIER(supplierId), supplier);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);


// export const addSupplierPicture = createAsyncThunk(
//     'pictures/addSupplierPicture',
//     async (arg, thunkAPI) => {
//         const {supplierId, images} = arg;
//         try {
//             return await axios.post(ADD_SUPPLIER_PICTURES(supplierId), images, {headers: {"Content-Type": "multipart/form-data"}});
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.response);
//         }
//     }
// );

export const deleteSupplier = createAsyncThunk(
    'suppliers/deleteSupplier',
    async (supplierId, thunkAPI) => {
        try {
            return await axios.delete(DELETE_SUPPLIER(supplierId));
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState,
    reducers: {
        setSupplierId: (state, {payload}) => {
            state.supplierId = payload;
        },
        clearSupplier(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.supplierId = null;
            state.noteInfo = null;
            return state;
        },
        clearSuppliersFlags(state) {
            state.flags = suppliersFlags;
        },
        setPage: (state, {payload}) => {
            state.page = payload;
        },
        setStart: (state, {payload}) => {
            if (!payload) {
                if (state.page === 1) {
                    state.start = 0
                } else {
                    state.start = (state.page - 1) * 10 + 1;
                }
            }
        },
        setSupplier: (state, {payload}) => {
            state.supplier = payload;
        },
        setPreviousProviderName: (state, {payload}) => {
            state.previousProviderName = payload;
        },
    },
    extraReducers: {
        //Supplier lookup
        [supplierLookup.fulfilled]: (state, {payload}) => {
            state.supplier = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [supplierLookup.pending]: (state) => {
            state.isFetching = true;
        },
        [supplierLookup.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        //Notes lookup
        [notesLookup.fulfilled]: (state, {payload}) => {
            state.noteInfo = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [notesLookup.pending]: (state) => {
            state.isFetching = true;
        },
        [notesLookup.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        //Google place hotel search
        [googlePlaceHotelSearch.fulfilled]: (state, {payload}) => {
            state.googleSearchInfo = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [googlePlaceHotelSearch.pending]: (state) => {
            state.isFetching = true;
        },
        [googlePlaceHotelSearch.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        //Get suppliers
        [fetchSuppliers.fulfilled]: (state, {payload}) => {
            state.suppliers = camelizeNestedKeys(payload.data);
            state.isFetching = false;
            state.isSuccess = true;
        },
        [fetchSuppliers.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchSuppliers.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
        //Add supplier
        [addSupplier.fulfilled]: (state) => {
            state.flags.isSupplierAddedSuccess = true;
            state.errorMessage = null;
        },
        [addSupplier.rejected]: (state, {payload}) => {
            state.flags.isSupplierAddedError = true;
            state.errorMessage = payload?.data;
        },
        //Update supplier
        [updateSupplier.fulfilled]: (state) => {
            state.flags.isSupplierUpdatedSuccess = true;
            state.errorMessage = null;
        },
        [updateSupplier.rejected]: (state, {payload}) => {
            state.flags.isSupplierUpdatedError = true;
            state.errorMessage = payload?.data;
        },
        //Delete supplier
        [deleteSupplier.fulfilled]: (state) => {
            state.flags.isSupplierDeletedSuccess = true;
            state.errorMessage = null;
        },
        [deleteSupplier.rejected]: (state, {payload}) => {
            state.flags.isSupplierDeletedError = true;
            state.errorMessage = payload?.data;
        },
        // //Add supplier picture
        // [addSupplierPicture.fulfilled]: (state, {payload}) => {
        //     const updatedSupplier = camelizeNestedKeys(payload.data)
        //     const suppliersTmp = state.suppliers ? [...state.suppliers.data] : []
        //     const editingIndex = suppliersTmp.findIndex((supplier) => supplier.id === state.supplierId)
        //     suppliersTmp[editingIndex] = updatedSupplier
        //     state.flags.isSupplierPictureAddedSuccess = true;
        //     state.suppliers.data = suppliersTmp
        //     state.errorMessage = null;
        //     state.isFetching = false;
        // },
        // [addSupplierPicture.pending]: (state) => {
        //     state.isFetching = true;
        // },
        // [addSupplierPicture.rejected]: (state, {payload}) => {
        //     state.flags.isSupplierPictureAddedError = true
        //     state.errorMessage = payload?.data;
        //     state.isFetching = false;
        // },
    }
});

export const {clearSupplier, clearSuppliersFlags, setSupplier, setPage, setStart, setPreviousProviderName, setSupplierId} = suppliersSlice.actions;

export const suppliersSelector = (state) => state.suppliers;

export default suppliersSlice.reducer;
