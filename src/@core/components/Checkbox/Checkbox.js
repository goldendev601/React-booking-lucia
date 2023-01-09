import {Checkbox} from "@material-ui/core";

const CheckboxWithMessage = (props) => {
    return (
        <div>
            <Checkbox
                {...props}
            />
            <div className='error-text'>{!props.checked ? props.errormessage : null}</div>
        </div>
    );
}

export default CheckboxWithMessage;
