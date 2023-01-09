import React, {useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { TextField } from "@core/components";
import {error, success} from "styles/snackbarStyles/snackbarStyles";
import { authPageStyles } from "styles";
import LogoAccess from "assets/LogoAccess";
import {useSnackbar} from 'react-simple-snackbar'
import { useDispatch, useSelector } from "react-redux";
import { accessCodeValidation, userSelector, clearState } from "redux/features/auth/authSlice";
import AccessBackground from '../../../assets/itineraryPicture.png';
import {createErrorMessage} from "../../../utils";
import {
    useLocation
} from "react-router-dom";

const AccessCodeStyles = makeStyles(({
    input: {
        borderColor: 'white',
    }
}))

const CssTextField = withStyles({
    root: {
        '& .MuiInput-input': {
            color: 'white'
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '&:hover .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
    },
})(TextField);

const validationSchema = yup.object({
    code: yup
        .string('Enter your access code')
        .min(6, 'Access code should be of minimum 8 characters length')
        .required('Access code is required'),
});

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}



const AccessCode = () => {
    const dispatch = useDispatch();
    const accessCodeStyles = AccessCodeStyles();

    const query = useQuery()

    const {isSuccess, isError, errorMessage, accessCode} = useSelector(userSelector);

    const classes = authPageStyles();

    const [openSnackbarError] = useSnackbar(error);
    const [openSnackbarSuccess] = useSnackbar(success);

    const formik = useFormik({
        initialValues: {
            code: ''
        },
        validationSchema: validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            dispatch(accessCodeValidation(values));
        }
    });

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            formik.handleSubmit()
        }
    }

    useEffect(() => {
        if (isError) {
            openSnackbarError(createErrorMessage(errorMessage));
            dispatch(clearState());
        }
    }, [isError, isSuccess]);


    useEffect(() => {
        const queryString = query.get('access_code')
        if (queryString && accessCode !== undefined && queryString !== accessCode) {
            dispatch(accessCodeValidation({ code: queryString }));
        }
    }, [query, accessCode])

    return (
        <div className={classes.wrapperAccessCode}>
            <div className={classes.containerAcesssCodeWrapper}>
                <div className={classes.bgContainer}>
                    <img src={AccessBackground} alt="bg" />
                    <div />
                </div>
                <div className='logo-center'>
                    <LogoAccess />
                </div>
                <Typography className={classes.labelAcesssCode}>
                    Enter access code
                </Typography>
                <div style={{ width: '100%' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <CssTextField
                            formik={formik}
                            width="100%"
                            name="code"
                            placeholder="Enter code here"
                            classes={accessCodeStyles}
                            onKeyDown={handleKeyDown}
                        />
                    </form>
                </div>

            </div>
        </div>
    );
}

export default AccessCode;
