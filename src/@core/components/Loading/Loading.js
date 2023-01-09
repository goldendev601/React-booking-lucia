import React from "react";
import {CircularProgress, Grid} from "@material-ui/core";

const Loading = ({children, isFetching, ...rest}) => {
    return (
        <div>
            {isFetching
                ? <Grid
                    {...rest}
                    container
                    justify="center"
                    alignItems="center"
                >
                    <CircularProgress/>
                </Grid>
                : <div {...rest}>
                    {children}
                </div>
            }
        </div>
    );
}

export default Loading;