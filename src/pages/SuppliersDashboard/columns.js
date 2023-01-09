import React from "react";
import {TableCell, TimeCell} from "@core/components";
import TableEditSuppliers from "@core/components/DataGrid/TableEditSuppliers";

export const columns = [
    {field: 'id', headerName: '#', width: 160},
    {
        field: 'createdAt',
        headerName: 'DATE CREATED',
        width: 250,
        align: "left",
        flex: 1,
        renderCell: ({value}) => {
            return (
                <TimeCell value={value}/>
            )
        }
    },
    {
        field: 'name',
        headerName: 'SUPPLIER NAME',
        width: 160,
        align: "left",
        flex: 1,
    },
    {
        field: 'address',
        headerName: 'ADDRESS',
        type: 'string',
        width: 160,
        align: "left",
        flex: 1,
    },
    {
        field: 'phone',
        headerName: 'PHONE',
        type: 'string',
        width: 220,
        align: "left",
        flex: 1,
    },
    {
        field: 'email',
        headerName: 'EMAIL',
        type: 'string',
        width: 230,
        align: "left",
        flex: 1,
    },
    {
        field: 'category',
        headerName: 'CATEGORY',
        width: 190,
        align: "left",
        renderCell: (params) => {
            return (
                <TableCell params={params}/>
            )
        }
    },
    {
        field: "actions",
        headerName: " ",
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        align: "left",
        renderCell: ({row}) => {
            return (
                <div
                    style={{cursor: "pointer"}}
                    onClick={(event) => event.ignore = true}
                >
                    <TableEditSuppliers row={row}/>
                </div>
            );
        }
    }
];