import React from "react";
import Typography from "@material-ui/core/Typography";

const CardText = ({text}) => {
    return (
        <React.Fragment>
            <Typography variant="body2" color="textSecondary" component="p">
                {text}
            </Typography>
        </React.Fragment>
    );
}

export default CardText;