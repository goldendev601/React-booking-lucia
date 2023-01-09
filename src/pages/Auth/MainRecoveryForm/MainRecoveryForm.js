import React, {useEffect, useState} from "react";
import RecoveryPassword from "./RecoveryPassword/RecoveryPassword";
import ValidCode from "./ValidCode/ValidCode";
import SetNewPassword from "./SetNewPassword/SetNewPassword";
import {useDispatch} from "react-redux";
import {sendResetTokenAgain, updatePassword, validateResetToken} from "redux/features/auth/recoverySlice";
import {objFieldsToSnakeCase, removeProperty} from "utils";

const MainRecoveryForm = () => {
    const [state, setState] = useState({email: ''});
    const [verificationStatus, setVerificationStatus] = useState(false)
    const [step, setStep] = useState(1);

    const dispatch = useDispatch();

    const handleChange = (type, value) => {
        if (type === undefined) {
            setState(prevState => ({...prevState, ...value}));
        } else {
            setState(prevState => ({...prevState, [type]: value}));
        }
    }

    useEffect(() => {
        if (verificationStatus) {
            dispatch(updatePassword(objFieldsToSnakeCase(state)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verificationStatus]);

    const nextStep = () => setStep(prevState => prevState + 1);

    const validateToken = () => dispatch(validateResetToken(objFieldsToSnakeCase(state)));

    const sendResetAgain = () => dispatch(sendResetTokenAgain(removeProperty('passwordResetToken', state)));

    const render = (step) => {
        switch (step) {
            case 1:
                return (
                    <RecoveryPassword
                        dispatch={dispatch}
                        nextStep={nextStep}
                        handleChange={handleChange}
                    />
                );
            case 2:
                return (
                    <ValidCode
                        nextStep={nextStep}
                        dispatch={dispatch}
                        handleChange={handleChange}
                        validateToken={validateToken}
                        passwordResetToken={state.passwordResetToken}
                        sendResetAgain={sendResetAgain}
                        email={state.email}
                    />
                );
            case 3:
                return (
                    <SetNewPassword
                        dispatch={dispatch}
                        setVerificationStatus={setVerificationStatus}
                        handleChange={handleChange}
                    />
                );
            default:
                return (
                    <div>
                        <h1>Something went wrong :(</h1>
                    </div>
                );
        }
    }
    return (
        <React.Fragment>
            {render(step)}
        </React.Fragment>
    );
}

export default MainRecoveryForm;
