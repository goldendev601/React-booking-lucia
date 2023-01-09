import React from "react";
import {HomeFooter, MenuAppBarHome} from "@core/components";

const HomeLayout = ({children}) => {
    return (
        <div>
            <MenuAppBarHome/>
            {children}
            <HomeFooter/>
        </div>
    )
}

export default HomeLayout;
