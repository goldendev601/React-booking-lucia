import React from "react";
import {Label} from "../Label";
import {ClockOutline} from "iconoir-react";
import {colors} from "styles/colors";
import {TimePicker} from "antd";

const TimePickerField = ({label, placeholder, name, width, formik, placement, ...rest}) => {
    return (
        <div>
            <Label>{label}</Label>
            <TimePicker
                placeholder={placeholder}
                style={{width: width ? width : '180px'}}
                suffixIcon={<ClockOutline color={colors.brand}/>}
                use12Hours={true}
                format="hh:mm A"
                value={formik.values[name]}
                onChange={(timeString) => formik.setFieldValue(name, timeString)}
                minuteStep={5}
                placement={placement ? placement : 'auto'}
                {...rest}
            />
        </div>
    );
}

export default TimePickerField;
