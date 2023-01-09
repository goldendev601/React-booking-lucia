import React from "react";
import {TimeCell} from "@core/components";
import TableEditNotes from "@core/components/DataGrid/TableEditNotes";

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
        field: 'title',
        headerName: 'TITLE',
        width: 160,
        align: "left",
        flex: 1,
    },
    // {
    //     field: 'priority',
    //     headerName: 'PRIORITY',
    //     type: 'string',
    //     width: 160,
    //     align: "left",
    //     flex: 1,
    //     renderCell: ({value}) => {
    //         return (
    //             value.description
    //         )
    //     }
    // },
    // {
    //     field: 'notes',
    //     headerName: 'DESCRIPTION',
    //     type: 'string',
    //     width: 160,
    //     align: "left",
    //     flex: 1,
    //     renderCell: ({value}) => {
    //         return (
    //             <div dangerouslySetInnerHTML={{__html: value}} />
    //         )
    //     }
    // },
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
                    <TableEditNotes row={row}/>
                </div>
            );
        }
    }
];