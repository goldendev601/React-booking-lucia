import React from "react";
import Typography from "@material-ui/core/Typography";

const CardGeneralInformation = ({
                                    price,
                                    notes,
                                    cancelPolicy,
                                    rooms,
                                    transportFrom, transportTo,
                                    vehicle,
                                    effectiveDate,
                                    company,
                                    conciergeFrom, conciergeTo,
                                    startDatetime, endDatetime,
                                    departureDatetime, disembarkationDatetime,
                                    startDate, endDate,
                                    checkInDate, checkOutDate,
                                    arrivalDatetime, showPriceOnShare
                                }) => {
    return (
        <React.Fragment>
            <Typography variant="body2" color="textSecondary" component="p">
                {startDatetime && endDatetime &&
                <React.Fragment>
                    <span className='bold'>Start Date Time</span>: {startDatetime},
                    <br/>
                    <span className='bold'>End Date Time</span>: {endDatetime},
                    <br/>
                </React.Fragment>}
                {departureDatetime && disembarkationDatetime &&
                <React.Fragment>
                    <span className='bold'>Departure Date Time</span>: {departureDatetime},
                    <br/>
                    <span className='bold'>Disembarkation Date Time</span>: {disembarkationDatetime},
                    <br/>
                </React.Fragment>}
                {startDate && endDate &&
                <React.Fragment>
                    <span className='bold'>Start Date Time</span>: {startDate},
                    <br/>
                    <span className='bold'>End Date Time</span>: {endDate},
                    <br/>
                </React.Fragment>}
                {checkInDate && checkOutDate &&
                <React.Fragment>
                    <span className='bold'>Check in</span>: {checkInDate},
                    <br/>
                    <span className='bold'>Check Out</span>: {checkOutDate},
                    <br/>
                </React.Fragment>}
                {departureDatetime && arrivalDatetime &&
                <React.Fragment>
                    <span className='bold'>Departure Date time</span>: {departureDatetime},
                    <br/>
                    <span className='bold'>Arrival Date time</span>: {arrivalDatetime},
                    <br/>
                </React.Fragment>}
                {showPriceOnShare && price &&
                <React.Fragment>
                    <span className='bold'>Price</span>: {price} (including taxes and fees)
                </React.Fragment>}
                {notes &&
                <React.Fragment>
                    <br/>
                    <span className='bold'>
                        Notes
                    </span>: {notes}
                </React.Fragment>}
                {cancelPolicy &&
                <React.Fragment>
                    <br/>
                    <span className='bold'>
                        Cancellation Policy
                    </span>: {cancelPolicy}
                </React.Fragment>}
                {rooms &&
                <div>
                    <br/>
                    {rooms.map((room) => {
                        return (
                            <div style={{marginBottom: '30px'}} key={room?.id}>
                                <b>
                                    Guest name
                                </b>: {room?.guestName || 'Not provided'}
                                <br/>
                                <b>
                                    Room type
                                </b>: {room?.roomType || 'Not provided'}
                                <br/>
                                <b>
                                    Room rate
                                </b>: {room?.roomRate || 'Not provided'}
                                <br/>
                                <b>
                                    Number of guests
                                </b>: {room?.numberOfGuests || 'Not provided'}
                                <br/>
                                <b>
                                    Currency type
                                </b>: {room?.currencyType || 'Not provided'}
                                <br/>
                                <b>
                                    Bedding type
                                </b>: {room?.beddingType || 'Not provided'}
                                <br/>
                                <b>
                                    Room description
                                </b>: {room?.roomDescription || 'Not provided'}
                            </div>
                        );
                    })}
                </div>}
                {transportFrom &&
                <React.Fragment>
                    <br/>
                    <span className='bold'>
                        Transport From
                    </span>: {transportFrom}
                </React.Fragment>}
                {transportTo &&
                <React.Fragment>
                    <br/>
                    <span className='bold'>
                        Transport To
                    </span>: {transportTo}
                </React.Fragment>}
                {vehicle &&
                <React.Fragment>
                    <br/>
                    <span className='bold'>
                        Vehicle
                    </span>: {vehicle}
                </React.Fragment>}
                {company &&
                <React.Fragment>
                    <br/>
                    <span className='bold'>
                        Company
                    </span>: {company}
                </React.Fragment>}
                {effectiveDate &&
                <React.Fragment>
                    <br/>
                    <span className='bold'>
                        Effective Date
                    </span>: {effectiveDate}
                </React.Fragment>}
                {conciergeFrom &&
                <React.Fragment>
                    <br/>
                    <span className='bold'>
                        Concierge From
                    </span>: {conciergeFrom}
                </React.Fragment>}
                {conciergeTo &&
                <React.Fragment>
                    <br/>
                    <span className='bold'>
                        Concierge To
                    </span>: {conciergeTo}
                </React.Fragment>}
            </Typography>
        </React.Fragment>
    );
}

export default CardGeneralInformation;