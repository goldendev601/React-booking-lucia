import React from "react";
import authStyles from "../../../styles/muiStyles/authPageStyles";
import {Container, Typography} from "@material-ui/core";
import BaseLink from "../../../@core/components/Link/BaseLink";
import {Button} from "@core/components";
import {colors} from "../../../styles/colors";
import Logo from "../../../assets/Logo";
import {useDispatch} from "react-redux";
import {clearState} from "redux/features/auth/authSlice";

const AccountApproval = () => {
    const classes = authStyles();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(clearState());
    }

    return (
        <Container fixed>
            <div style={{marginTop: '300px'}} className={classes.wrapper}>
                <div style={{alignItems: 'center'}} className={classes.container}>
                    <div style={{alignSelf: 'initial'}} className='logo'>
                        <Logo/>
                    </div>
                    <Typography variant="h2" component="h2">
                        Your account has been approved. 
                    </Typography>
                    <Typography style={{textAlign: 'center'}} className={classes.description} variant="body1">
                        Please check your email for your temporary password.
                    </Typography>
                    <BaseLink onClick={handleClick} style={{textDecoration: 'none'}} to='/'>
                        <Button
                            $primary
                            $width={'200px'}
                            style={{backgroundColor: `${colors.black1}`}}
                            type="submit"
                        >
                            Go to Login
                        </Button>
                    </BaseLink>
                </div>
            </div>
        </Container>
    );
}

export default AccountApproval;
