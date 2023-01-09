import React from "react";
import {Typography} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;

const CustomPagination = ({total, perPage, pageCount, currentPage, handlePageChange, paginationItemsName}) => {
    const getPaginationText = (rowCount, pageSize, page) => {
        const start = (page - 1) * pageSize + 1;
        const end = Math.min(start + pageSize - 1, rowCount);

        return `${start} - ${end} ${paginationItemsName} of ${rowCount}`;
    }

    return (
        <PaginationContainer>
            <Typography>
                {total && getPaginationText(total, perPage, currentPage)}
            </Typography>
            <Pagination
                shape="rounded"
                color='primary'
                count={pageCount}
                page={currentPage}
                defaultPage={currentPage}
                onChange={(event, value) => {
                    handlePageChange(event, value);
                }}
            />
        </PaginationContainer>
    );
}

export default CustomPagination;