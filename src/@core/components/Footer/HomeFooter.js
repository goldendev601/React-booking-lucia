import React from "react";
import styled from "styled-components";

const HomeFooterContainer = styled.div`
   width: 100%;
   color: white;
   background-color: black;
   padding-left: 30px;
   padding-bottom: 30px;
`;

const HomeFooter = () => {
    return (
        <HomeFooterContainer>
            ©lucia 2021. All rights reserved - V 1
        </HomeFooterContainer>
    );
}

export default HomeFooter;