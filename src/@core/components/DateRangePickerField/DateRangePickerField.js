import React, {useState} from "react";
import {Label} from "../Label";
import {DateRangePicker} from "rsuite";

const DateRangePickerField = ({label, placeholder, name, width, formik}) => {
    const [startDate, setStartDate] = useState(null);
    const [prevStartDate, setPrevStartDate] = useState(null);
    const {beforeToday, before, combine} = DateRangePicker;

    const clearStartDate = () => setStartDate(null);

    return (
        <div>
            <Label>{label}</Label>
            <DateRangePicker
                style={{zIndex: '1300', width: width ? width : '180px'}}
                format={"YYYY-MM-DD"}
                placeholder={placeholder}
                value={formik.values[name]}
                onChange={(e) => formik.setFieldValue(name, e)}
                tabIndex={-1}
                disabledDate={combine(beforeToday(), before(startDate))}
                onSelect={(date) => {
                    if (!startDate || startDate === prevStartDate) {
                        setStartDate(new Date(date));
                    }
                    setPrevStartDate(startDate)
                }}
                onExit={clearStartDate}
                onOk={clearStartDate}
            />
        </div>
    );
}

export default DateRangePickerField;