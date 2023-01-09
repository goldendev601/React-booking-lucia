import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
  font-size: ${props => props.$fontsize || '16px'};
  line-height: 30px;
  letter-spacing: 0.05em;
  font-weight: ${props => props.$fontWeight || '600'};
  color: ${props => props.$color || '#C0A796'};
  padding: 0;
  border: none;
  background: none;
  border-bottom: ${props => props.$borderbottom && `2px solid ${props.$color ? 'rgba(36, 36, 36, .2)' : 'rgba(192, 167, 152, .2)'}`};
  border-bottom: ${props => props.$borderbottom};
  height: 23px;
  cursor: pointer;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

const button = (props) => <StyledButton {...props} />;

export default React.memo(button);