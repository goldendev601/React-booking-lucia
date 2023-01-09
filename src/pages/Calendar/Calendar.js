import React, {useEffect} from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarToolbar from "./CalendarToolbar";
import {useDispatch, useSelector} from "react-redux";
import {calendarSelector, getEvents} from "redux/features/calendar/calendarSlice";
import {Loading} from "@core/components";
import { useHistory } from "react-router-dom";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const today = new Date();
    const dispatch = useDispatch();
    const history = useHistory()
    const {isSuccess, isFetching, events} = useSelector(calendarSelector);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    const gotoItineraryDetail = (event) => {
        history.push(`/itinerary-details/${event.id}`)
    }

    return (
        <div>
            <Loading data-aos="fade-down" isFetching={isFetching}>
                {isSuccess &&
                <Calendar
                    localizer={localizer}
                    defaultView={'month'}
                    events={events}
                    components={{toolbar: CalendarToolbar}}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: '100vh'}}
                    onSelectEvent={gotoItineraryDetail}
                    min={
                        new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate(),
                            7
                        )
                    }
                    max={
                        new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate(),
                            17
                        )
                    }
                />
                }
            </Loading>
        </div>
    );
}

export default MyCalendar;