import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import {Plus, Minus} from 'iconoir-react';

import IconButton from "@material-ui/core/IconButton";
import {colors} from "../../../styles/colors";

const counterStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    button: {
        width: '140px',
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '0',
        borderBottom: `1px solid ${colors.gray3}`,
        transition: 'all 0.05s ease-in',
        '&:hover': {
            borderBottom: `2px solid ${colors.black1}`,
            transition: 'all 0.05s ease-in',
        }
    }
}));

const Counter = ({label, name, formik}) => {
    const classes = counterStyles();
    const [count, setCount] = useState(formik.values[name] || 1);

    const increment = () => {
        setCount(prevState => {
            setCount(prevState + 1);
        });
    }

    const decrement = () => {
        if (count > 1) {
            setCount(prevState => {
                setCount(prevState - 1);
            });
        }
    }

    useEffect(() => {
        formik.setFieldValue(name, count);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    return (
        <div className={classes.root}>
            <span style={{
                fontWeight: '600', color: `${colors.black1}`,
                fontSize: '14px'
            }}
            >
                {label}
            </span>
            <div className={classes.button}>
                <IconButton onClick={decrement} aria-label="delete" size="small">
                    <Minus width='20px' color={colors.brand}/>
                </IconButton>
                <span>{formik.values[name]}</span>
                <IconButton onClick={increment} aria-label="delete" size="small">
                    <Plus width='20px' color={colors.brand}/>
                </IconButton>
            </div>
        </div>
    )
}

export default Counter;
