import React from "react";
import moment from "moment";

const TimeCell = ({value}) => <div>{moment.utc(value).format('MM/DD/YYYY')}</div>

export default TimeCell;