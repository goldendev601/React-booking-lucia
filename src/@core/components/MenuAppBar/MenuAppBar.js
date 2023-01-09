import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link, useHistory } from "react-router-dom";
import { colors } from "styles/colors";
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Logo from "assets/Logo";
import Profile from "pages/Profile/Profile";
import { logout } from "redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AgentNavLinks } from "./AgentNavLinks";
import { UserCircleAlt, MoreVert, LogOut, Search, Bell } from 'iconoir-react';
import { menuAppBarStyles } from "./menuAppBarStyles";
import { resetAction } from "../../../index";
import { dialogFormsStateSelector, setGlobalSearchOpen } from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import GlobalSearch from "components/GlobalSearch/GlobalSearch";
import { clearGlobalSearch } from "redux/features/globalSearch/globalSearchSlice";
import { getProfile, profileSelector } from "redux/features/profile/profileSlice";
import {itinerariesSelector, advisorRequestsGetNotifications} from "redux/features/itineraries/itinerariesSlice";


const MenuAppBar = () => {
    const classes = menuAppBarStyles();
    const dispatch = useDispatch();
    const history = useHistory()
    const { globalSearchOpen } = useSelector(dialogFormsStateSelector);
    const { profileUser } = useSelector(profileSelector);

    const {notifications} = useSelector(itinerariesSelector);
    const [invisible, setInvisible] = React.useState(false);

    const { name, profileImageUrl } = profileUser || {};

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const [openProfile, setOpenProfile] = useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {
        dispatch(advisorRequestsGetNotifications())
    }, [dispatch]);

    useEffect(() => {
        if (notifications === 0) {
            setInvisible(true);
        }
    }, [notifications]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const closeMenus = () => {
        handleMenuClose();
        handleMobileMenuClose();
    }

    const handleOpenProfile = () => {
        closeMenus()
        setOpenProfile(prevState => !prevState);
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetAction());
        history.push('/signin');
    }

    const gotoHome = () => {
        history.push('/');
    }

    const gotoItineraries = () => {
        history.push('/itineraries');
    }

    const gotoCalendar = () => {
        history.push('/calendar');
    }

    const gotoSuppliers = () => {
        history.push('/suppliers');
    }

    const gotoTravelers = () => {
        history.push('/travelers');
    }

    const gotoCopilot = () => {
        history.push('/concierges');
    }

    const gotoMyRequests = () => {
        history.push('/advisor-requests');
    }


    const openGlobalSearch = () => {
        dispatch(setGlobalSearchOpen(true));
    }

    const closeGlobalSearch = () => {
        dispatch(clearGlobalSearch());
        dispatch(setGlobalSearchOpen(false));
    }

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            
        >
            {
                ((process.env.REACT_APP_FORCE_LICENSE_CHECK ===  'FALSE') || (profileUser && profileUser.hasValidLicense)) && (
                    <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
                )
            }
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="primary-search-account-menu-mobile"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            PaperProps={{
                style: {
                  height: '625px',
                  width: '343px',
                },
            }}
        >
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                disableRipple={true}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                className={classes.profileIconMobile}
            >
                <span
                    style={{ marginRight: '20px', color: '#333', fontFamily: 'Montserrat', fontWeight: '700' }}
                    className='normal-text-bold'
                >
                    {name}
                </span>
                {profileUser
                    ? <Avatar className={classes.avatar} src={profileImageUrl || 'https://s3-lucia-staging.s3.us-east-2.amazonaws.com/henryedwardvalledejo-at-gmailcom-1644933824/profile_picture-jsjMNdlZGPVjeuN8.png'} />
                    : <UserCircleAlt
                        color={colors.brand}
                        className={classes.avatar}
                    />
                }
            </IconButton>
            <MenuItem onClick={gotoHome}>
                <p className={classes.menuText}>Home</p>
            </MenuItem>
            <MenuItem onClick={gotoItineraries}>
                <p className={classes.menuText}>Itineraries</p>
            </MenuItem>
            <MenuItem onClick={gotoCalendar}>
                <p className={classes.menuText}>Calendar</p>
            </MenuItem>
            <MenuItem onClick={gotoSuppliers}>
                <p className={classes.menuText}>Suppliers</p>
            </MenuItem>
            <MenuItem onClick={gotoTravelers}>
                <p className={classes.menuText}>Travelers</p>
            </MenuItem>
            <MenuItem onClick={gotoCopilot}>
                <p className={classes.menuText}>Copilot</p>
            </MenuItem>
            <MenuItem onClick={gotoMyRequests}>
                <p className={classes.menuText}>My Requests</p>
            </MenuItem>
            {
                ((process.env.REACT_APP_FORCE_LICENSE_CHECK ===  'FALSE') || (profileUser && profileUser.hasValidLicense)) && (
                    <MenuItem onClick={handleOpenProfile}>
                        {/* <IconButton
                            aria-label="account of current user"
                            aria-controls="account-menu-item"
                            aria-haspopup="true"
                        >
                            <UserCircleAlt
                                color={colors.brand}
                                width={'28px'}
                                height={'28px'} />
                        </IconButton> */}
                        <p className={classes.menuText}>Profile</p>
                    </MenuItem>
                )
            }
            {/*<MenuItem>*/}
            {/*    <IconButton aria-label="show 10 new notifications">*/}
            {/*        <Badge badgeContent={10} color="secondary">*/}
            {/*            <Bell*/}
            {/*                width={'18px'}*/}
            {/*                height={'20px'}*/}
            {/*                color={colors.brand}*/}
            {/*            />*/}
            {/*        </Badge>*/}
            {/*    </IconButton>*/}
            {/*    <p>Notifications</p>*/}
            {/*</MenuItem>*/}
            <MenuItem onClick={handleLogout}>
                {/* <IconButton
                    aria-label="logout"
                    aria-controls="logout-menu-item"
                    aria-haspopup="true"
                >
                    <LogOut
                        color={colors.brand}
                        width={'28px'}
                        height={'28px'} />
                </IconButton> */}
                <p className={classes.menuText}>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar className={classes.appBar} color='inherit' position="static">
                <Toolbar>
                    {
                        ((process.env.REACT_APP_FORCE_LICENSE_CHECK ===  'FALSE') || (profileUser && profileUser.hasValidLicense)) && (
                            <Link to='/'>
                                <Logo />
                            </Link>
                        )
                    }
                    {openProfile && ((process.env.REACT_APP_FORCE_LICENSE_CHECK ===  'FALSE') || ((process.env.REACT_APP_FORCE_LICENSE_CHECK ===  'FALSE') || (profileUser && profileUser.hasValidLicense))) && <Profile open={openProfile} handleOpenProfile={handleOpenProfile} />}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop} style={ ((process.env.REACT_APP_FORCE_LICENSE_CHECK ===  'FALSE') || (profileUser && profileUser.hasValidLicense)) ? { flexGrow: '1'} : undefined}>
                        {
                            ((process.env.REACT_APP_FORCE_LICENSE_CHECK ===  'FALSE') || (profileUser && profileUser.hasValidLicense)) && (
                                <AgentNavLinks />

                            )
                        }
                        <div style={{alignItems: 'center', display: 'flex'}}>
                            <IconButton aria-label="notification" color="inherit" onClick={gotoMyRequests}>
                                <Badge badgeContent={notifications} color="error" invisible={invisible}>
                                    <Bell
                                        width={'20px'}
                                        height={'20px'}
                                        style={{ color: colors.brand }}
                                    />
                                </Badge>
                            </IconButton>
                            {
                                ((process.env.REACT_APP_FORCE_LICENSE_CHECK ===  'FALSE') || (profileUser && profileUser.hasValidLicense)) && (
                                    <IconButton onClick={openGlobalSearch} aria-label="search" color="inherit">
                                        <Search
                                            width={'25px'}
                                            height={'25px'}
                                            style={{ color: colors.brand }}
                                        />
                                    </IconButton>
                                )
                            }
                            {/*<IconButton aria-label="about" className={classes.brandColor}>*/}
                            {/*    <QuestionMarkCircle width={'26px'} height={'26px'}/>*/}
                            {/*</IconButton>*/}
                            {/*<IconButton aria-label="show new notifications" className={classes.brandColor}>*/}
                            {/*    <Bell width={'27px'} height={'27px'}/>*/}
                            {/*</IconButton>*/}
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                disableRipple={true}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                className={classes.profileIcon}
                            >
                                <span
                                    style={{ marginRight: '20px', color: '#333', fontFamily: 'Montserrat', fontWeight: '700' }}
                                    className='normal-text-bold profile-name'
                                >
                                    {name}
                                </span>
                                {profileUser
                                    ? <Avatar className={classes.avatar} src={profileImageUrl || 'https://s3-lucia-staging.s3.us-east-2.amazonaws.com/henryedwardvalledejo-at-gmailcom-1644933824/profile_picture-jsjMNdlZGPVjeuN8.png'} />
                                    : <UserCircleAlt
                                        color={colors.brand}
                                        className={classes.avatar}
                                    />
                                }
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton aria-label="notification" color="inherit">
                            <Badge badgeContent={notifications} color="error" invisible={invisible}>
                                <Bell
                                    width={'20px'}
                                    height={'20px'}
                                    style={{ color: colors.brand }}
                                />
                            </Badge>
                        </IconButton>
                        <IconButton onClick={openGlobalSearch} aria-label="search" color="inherit">
                            <Search
                                width={'25px'}
                                height={'25px'}
                                color={colors.brand}
                            />
                        </IconButton>
                        <IconButton
                            aria-label="show more"
                            aria-controls="primary-search-account-menu-mobile"
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                            style={{ padding: '0' }}
                        >
                            <MoreVert color={colors.brand} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {globalSearchOpen && <GlobalSearch open={globalSearchOpen} handleClose={closeGlobalSearch} />}
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}

export default React.memo(MenuAppBar);
