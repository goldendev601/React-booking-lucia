import React from "react";
import {TableEditTraveler, TimeCell} from "@core/components";


export const columns = [
    {field: 'id', headerName: '#', width: 160},
    {
        field: 'created_at',
        headerName: 'DATE CREATED',
        width: 160,
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
        headerName: 'CLIENT NAME',
        width: 250,
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
        field: 'phone',
        headerName: 'PHONE',
        type: 'string',
        width: 230,
        align: "left",  
        flex: 1,
    },
    {
        field: "actions",
        headerName: " ",
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        align: "left",
        renderCell: (params) => {
            return (
                <div
                    style={{cursor: "pointer"}}
                    onClick={(event) => event.ignore = true}
                >
                    <TableEditTraveler index={params.row.id}/>
                </div>
            );
        }
    }
];