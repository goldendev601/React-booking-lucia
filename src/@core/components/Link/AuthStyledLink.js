import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import styled from 'styled-components';

const AuthStyledLink = styled(Link)`
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
  font-size: ${props => props.$fontsize || '16px'};
  line-height: 30px;
  letter-spacing: 0.05em;
  font-weight: ${props => props.$fontweight || '600'};
  color: #FFF !important;
  border-bottom: ${props => props.$borderbottom ? '2px solid rgba(192, 167, 152, .2)' : null};
  height: 23px;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

export const AuthStyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  letter-spacing: 0.05em;
  font-weight: 400;
  color: #FFF;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

const link = (props) => <AuthStyledLink {...props} />;

export default React.memo(link);
