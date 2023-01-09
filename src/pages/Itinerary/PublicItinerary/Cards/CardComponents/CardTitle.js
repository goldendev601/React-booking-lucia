import React from "react";
import Typography from "@material-ui/core/Typography";

const CardTitle = ({title}) => {
    return (
        <React.Fragment>
            <Typography variant="h3" component="h3">
                {title}
            </Typography>
        </React.Fragment>
    );
}

export default CardTitle