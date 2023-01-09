import React, {useEffect, useState} from "react";
import {AppBar, Dialog, Tab, Tabs} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {tabsStyles} from "styles";
import {colors} from "styles/colors";
import {DialogTitle, Loading} from "@core/components";
import TabPanel, {a11yProps} from "../../@core/components/Dialog/TabPanel";
import ProfileInformation from "./ProfileInformation";
import ProfileAvatar from "./ProfileAvatar";
import {makeStyles} from "@material-ui/core/styles";
import ProfilePassword from "./ProfilePassword";
import ProfileRoles from "./ProfileRoles";
// import ProfileSubscription from "./ProfileSubscription";
import ItineraryDesign from "./ItineraryDesign";
import StripeProfile from "./StripeProfile";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, profileSelector} from "redux/features/profile/profileSlice";

const useStyles = makeStyles({
    paper: {
        minWidth: '730px',
    }
});

const TabsDock = ({handleOpenProfile}) => {
    const classes = tabsStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs"
                    TabIndicatorProps={{
                        style: {
                            display: "none",
                        },
                    }}
                >
                    <Tab label="PROFILE" {...a11yProps(0)} />
                    <Tab label="AVATAR" {...a11yProps(1)} />
                    <Tab label="PASSWORD" {...a11yProps(2)} />
                    <Tab label="ROLES" {...a11yProps(3)} />
                    {/* <Tab label="SUBSCRIPTION" {...a11yProps(3)} /> */}
                    <Tab label="ITINERARY DESIGN" {...a11yProps(4)} />
                    {/* <Tab label="STRIPE" {...a11yProps(5)} /> */}
                    {/* <Tab label="CALENDAR" {...a11yProps(4)} /> */}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ProfileInformation handleOpenProfile={handleOpenProfile}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProfileAvatar handleOpenProfile={handleOpenProfile}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProfilePassword handleOpenProfile={handleOpenProfile}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ProfileRoles handleOpenProfile={handleOpenProfile}/>
            </TabPanel>
            {/* <TabPanel value={value} index={3}>
                <ProfileSubscription handleOpenProfile={handleOpenProfile}/>
            </TabPanel> */}
            <TabPanel value={value} index={4}>
                <ItineraryDesign handleOpenProfile={handleOpenProfile}/>
            </TabPanel>
            {/* <TabPanel value={value} index={5}>
                <StripeProfile handleOpenProfile={handleOpenProfile}/>
            </TabPanel> */}
            {/* <TabPanel value={value} index={4}>
                <ProfileCalendar handleOpenProfile={handleOpenProfile}/>
            </TabPanel> */}
        </div>
    );
}

const Profile = ({open, handleOpenProfile}) => {
    const profileClasses = useStyles();
    const dispatch = useDispatch();
    const {isFetching} = useSelector(profileSelector);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    return (
        <div>
            <Dialog
                aria-labelledby="profile-settings"
                open={open}
                classes={{paper: profileClasses.paper}}
                onClose={handleOpenProfile}
            >
                <DialogTitle id="profile-settings" onClose={handleOpenProfile}>
                    <Typography
                        variant="h3"
                        component={'div'}
                        style={{color: `${colors.black1}`, letterSpacing: '0px', margin: '20px 0 5px 30px'}}
                    >
                        Lucia Profile
                    </Typography>
                    <Loading isFetching={isFetching}>
                        <TabsDock handleOpenProfile={handleOpenProfile}/>
                    </Loading>
                </DialogTitle>
            </Dialog>
        </div>
    );
}

export default Profile;
