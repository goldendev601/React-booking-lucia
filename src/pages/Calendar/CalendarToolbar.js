import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../styles/colors";
import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import {NavArrowLeft, NavArrowRight} from "iconoir-react";

const useStyles = makeStyles({
    rootToolbar: {
        display: 'flex',
        marginBottom: '20px',
        alignItems: 'center',
    },
    toolbar: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    },
    calendarBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: colors.brand,
    },
    calendarNavArrow: {
        width: '40px',
        height: '40px',
    },
    calendarTodayBtn: {
        // width: '63px',
        height: '40px',
        paddingLeft: '5px',
        paddingLeft: '10px',
    },
    calendarDayBtn: {
        width: '47px',
        height: '40px',
        fontWeight: '600',
    },
    calendarWeekBtn: {
        width: '61px',
        height: '40px',
        fontWeight: '600',
    },
    calendarMonthBtn: {
        width: '66px',
        height: '40px',
        fontWeight: '600',
    },
    dayWeekMonth: {
        display: 'flex',
        width: '176px',
        justifyContent: 'space-between',
        marginRight: '900px',
        fontFamily: 'Raleway, sans-serif',
    },
    dayNavigation: {
        display: 'flex',
        width: '145px',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '20px',
        fontFamily: 'Raleway, sans-serif',
    },
    activeBtn: {
        backgroundColor: colors.brand,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        color: colors.brand,
        marginLeft: '20px',
        marginRight: '20px'
    }
});

const CalendarToolbar = (props) => {
    const classes = useStyles();
    const [activeBtn, setActiveBtn] = useState({
        datBtn: false,
        weekBtn: false,
        monthBtn: true,
    });

    return (
        <div className={classes.rootToolbar}>
            <Typography
                style={{fontSize: '40px', color: '#242424'}}
                variant="h2"
                component="div"
            >
                Calendar
            </Typography>
            <div className={classes.toolbar}>
                <div className={`rbc-btn-group ${classes.dayNavigation}`}>
                    <button
                        className={`${classes.calendarNavArrow} ${classes.activeBtn}`}
                        type="button"
                        onClick={() => props.onNavigate('PREV')}
                    >
                        <NavArrowLeft/>
                    </button>
                    {/* <button
                        className={`${classes.calendarTodayBtn} ${classes.activeBtn}`}
                        onClick={() => props.onNavigate('TODAY')}
                    >
                        <span style={{fontSize: '14px', fontWeight: '600'}}>Today</span>
                    </button> */}
                    <button
                        className={`${classes.calendarTodayBtn} ${classes.activeBtn}`}
                    >
                        <span style={{fontSize: '14px', fontWeight: '600'}}>{props.label}</span>
                    </button>
                    <button
                        className={`${classes.calendarNavArrow} ${classes.activeBtn}`}
                        type="button"
                        onClick={() => props.onNavigate('NEXT')}
                    >
                        <NavArrowRight/>
                    </button>
                </div>
                {/* <div className={classes.label}>{props.label}</div> */}
                <div className={`rbc-btn-group ${classes.dayWeekMonth}`}>
                    <button type="button"
                            className={`${classes.calendarDayBtn} ${classes.calendarBtn} ${activeBtn.datBtn ? classes.activeBtn : null}`}
                            onClick={() => {
                                setActiveBtn({monthBtn: false, weekBtn: false, datBtn: true});
                                props.onView('day');
                            }}>Day
                    </button>
                    <button type="button"
                            className={`${classes.calendarWeekBtn} ${classes.calendarBtn} ${activeBtn.weekBtn ? classes.activeBtn : null}`}
                            onClick={() => {
                                setActiveBtn({monthBtn: false, weekBtn: true, datBtn: false});
                                props.onView('week');
                            }}>Week
                    </button>
                    <button type="button"
                            className={`${classes.calendarMonthBtn} ${classes.calendarBtn} ${activeBtn.monthBtn ? classes.activeBtn : null}`}
                            onClick={() => {
                                setActiveBtn({monthBtn: true, weekBtn: false, datBtn: false});
                                props.onView('month');
                            }}>Month
                    </button>
                </div>
                {/*<TextField*/}
                {/*    id="search-input"*/}
                {/*    style={{backgroundColor: '#F4F4F5', padding: '5px 0'}}*/}
                {/*    placeholder={'Search'}*/}
                {/*    InputProps={{*/}
                {/*        disableUnderline: true,*/}
                {/*        startAdornment: (*/}
                {/*            <InputAdornment style={{marginLeft: '5px'}} position="start">*/}
                {/*                <Search color={colors.brand}/>*/}
                {/*            </InputAdornment>*/}
                {/*        ),*/}
                {/*    }}*/}
                {/*/>*/}
            </div>
        </div>
    );
}

const MemoizedCalendarToolbar = React.memo(CalendarToolbar);

export default MemoizedCalendarToolbar;