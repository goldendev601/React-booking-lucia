import React from "react";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export const a11yProps = (index) => {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default TabPanel;