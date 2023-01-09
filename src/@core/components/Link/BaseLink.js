import styled from "styled-components";
import {Link} from "react-router-dom";
import React from "react";

const BaseLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

const baseLink = (props) => <BaseLink {...props} />;

export default React.memo(baseLink);