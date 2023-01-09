import React from "react";
import {StyledNavLink} from "../Link/StyledLink";
import {makeStyles} from "@material-ui/core/styles";

const agentNavLinksStyles = makeStyles(() => ({
    menuLinks: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: '25px'
    },
}));

export const AgentNavLinks = () => {
    const classes = agentNavLinksStyles();
    return (
        <div className={classes.menuLinks}>
            <StyledNavLink $fontweight='400' 
                           to='/'>Home</StyledNavLink>
            <StyledNavLink $fontweight='400' activeClassName='selected'
                           to='/itineraries'>Itineraries</StyledNavLink>
            <StyledNavLink $fontweight='400' activeClassName='selected'
                           to='/calendar'>Calendar</StyledNavLink>
            <StyledNavLink $fontweight='400' activeClassName='selected'
                           to='/suppliers'>Suppliers</StyledNavLink>
            {/* <StyledNavLink $fontweight='400' activeClassName='selected'
                           to='/notes'>Notes</StyledNavLink> */}
            <StyledNavLink $fontweight='400' activeClassName='selected'
                           to='/travelers'>Travelers</StyledNavLink>
            <StyledNavLink $fontweight='400' activeClassName='selected'
                           to='/concierges'>COPILOT</StyledNavLink>
            <StyledNavLink $fontweight='400' activeClassName='selected'
                           to='/advisor-requests'>My Requests</StyledNavLink>
        </div>
    );
}

