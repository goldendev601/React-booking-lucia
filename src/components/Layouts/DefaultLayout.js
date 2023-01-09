import React from "react";
import {Footer, MenuAppBar} from "@core/components";

const DefaultLayout = ({children}) => {
    return (
        <div>
            <MenuAppBar/>
            {children}
            <Footer/>
        </div>
    )
}

export default DefaultLayout;
