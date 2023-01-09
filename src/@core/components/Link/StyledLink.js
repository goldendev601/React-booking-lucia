import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
  font-size: ${props => props.$fontsize || '16px'};
  line-height: 30px;
  letter-spacing: 0.05em;
  font-weight: ${props => props.$fontweight || '600'};
  color: #C0A796;
  border-bottom: ${props => props.$borderbottom ? '2px solid rgba(192, 167, 152, .2)' : null};
  height: 23px;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-family: 'Montserrat';
  font-size: 12px;
  letter-spacing: 0.16em;
  font-weight: 700;
  color: #333333 !important;
  text-transform: uppercase;
  padding: 0 20px;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: #BA886E;
  }
  &.selected {
    text-decoration: none;
    color: #BA886E !important;
  }
`

export const StyledNavLinkHome = styled(NavLink)`
  text-decoration: none;
  font-family: 'Montserrat';
  font-size: 12px;
  letter-spacing: 0.16em;
  font-weight: 700;
  color: #F2F2F2 !important;
  text-transform: uppercase;
  padding: 0 20px;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: #BA886E;
  }
  &.selected {
    text-decoration: none;
    color: #BA886E !important;
  }
`

const link = (props) => <StyledLink {...props} />;

export default React.memo(link);
