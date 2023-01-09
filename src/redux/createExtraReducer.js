export const createExtraReducer = (action) => {
    return {
        [action.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMessage = null;
        },
        [action.pending]: (state) => {
            state.isFetching = true;
        },
        [action.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
    };
}