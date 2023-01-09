import React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {Pagination} from "@core/components";

const CustomDataGrid = ({
                            rows,
                            columns,
                            perPage,
                            total,
                            currentPage,
                            pageCount,
                            handlePageChange,
                            paginationItemsName,
                            handleOpen,
                            ...props
                        }) => {
    return (
        <DataGrid
            data-aos="fade-down"
            {...props}
            rows={rows}
            columns={columns}
            rowHeight={60}
            pageSize={perPage}
            autoHeight={true}
            disableSelectionOnClick={true}
            componentsProps={{
                pagination: {
                    perPage,
                    total,
                    currentPage,
                    pageCount,
                    handlePageChange,
                    paginationItemsName
                }
            }}
            components={{
                Pagination: Pagination,
            }}
            onRowClick={(params, event) => {
                if (!event.ignore && handleOpen && props.disableSelectionOnClick === false) {
                    handleOpen(params);
                }
            }}
        />
    );
}

export default CustomDataGrid;
