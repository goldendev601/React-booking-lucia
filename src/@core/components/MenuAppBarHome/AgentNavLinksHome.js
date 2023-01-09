import React from "react";
import {StyledNavLinkHome} from "../Link/StyledLink";
import {makeStyles} from "@material-ui/core/styles";

const agentNavLinksStyles = makeStyles(() => ({
    menuLinks: {
        // width: '1000px',
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
}));

export const AgentNavLinksHome = () => {
    const classes = agentNavLinksStyles();
    return (
        <div className={classes.menuLinks}>
            <StyledNavLinkHome $fontweight='400' activeClassName='selected'
                           to='/'>Home</StyledNavLinkHome>
            <StyledNavLinkHome $fontweight='400' 
                           to='/itineraries'>Itineraries</StyledNavLinkHome>
            <StyledNavLinkHome $fontweight='400' 
                           to='/calendar'>Calendar</StyledNavLinkHome>
            <StyledNavLinkHome $fontweight='400' 
                           to='/suppliers'>Suppliers</StyledNavLinkHome>
            {/* <StyledNavLinkHome $fontweight='400' 
                           to='/notes'>Notes</StyledNavLinkHome> */}
            <StyledNavLinkHome $fontweight='400' 
                           to='/travelers'>Travelers</StyledNavLinkHome>
            <StyledNavLinkHome $fontweight='400' 
                           to='/concierges'>COPILOT</StyledNavLinkHome>
            <StyledNavLinkHome $fontweight='400' 
                           to='/advisor-requests'>My Requests</StyledNavLinkHome>
        </div>
    );
}

