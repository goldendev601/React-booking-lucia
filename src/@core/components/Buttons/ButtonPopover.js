import React, {useCallback, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {Button} from '@core/components';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(1),
    },
    button: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

const ButtonPopover = ({text, iconStart, iconEnd}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const open = Boolean(anchorEl);
    const id = open ? 'button-popover' : undefined;

    return (
        <div>
            <Button
                aria-describedby={id}
                $outlined
                onClick={handleClick}
                className={classes.button}
            >
                {iconStart}
                {text}
                {iconEnd}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>The content of the Popover.</Typography>
            </Popover>
        </div>
    );
}

export default React.memo(ButtonPopover);