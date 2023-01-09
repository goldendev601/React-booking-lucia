import React from "react";
import {TableCell, TableEdit, TimeCell} from "@core/components";

export const columns = [
    {
        field: 'itineraryName',
        headerName: 'ITINERARY NAME',
        width: 250,
        align: "left",
        flex: 1,
    },
    {
        field: 'createdAt',
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
        field: 'endDate',
        headerName: 'START DATE',
        type: 'string',
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
        field: 'clientName',
        headerName: 'CLIENT NAME',
        type: 'string',
        width: 220,
        align: "left",
        flex: 1,
    },
    {
        field: 'clientEmail',
        headerName: 'EMAIL',
        type: 'string',
        width: 230,
        align: "left",
        flex: 1,
    },
    {
        field: 'status',
        headerName: 'STATUS',
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
        renderCell: (params) => {
            return (
                <div
                    style={{cursor: "pointer"}}
                    onClick={(event) => event.ignore = true}
                >
                    <TableEdit index={params.row.id}/>
                </div>
            );
        }
    }
];