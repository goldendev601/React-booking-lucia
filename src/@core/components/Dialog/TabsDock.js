import React, {useState} from "react";
import {tabsStyles} from "styles/muiStyles";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import TabPanel, {a11yProps} from "./TabPanel";

const TabsDock = ({tabsDock, step, unlockTabs}) => {
    const classes = tabsStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                Object.keys(tabsDock).length === 1 ? (
                    Object.values(tabsDock).map((tab, index) => {
                        return <TabPanel key={index} value={unlockTabs ? value : step - 1} index={index}>
                            {tab}
                        </TabPanel>
                    })
                ) : (
                    <>
                        <AppBar className={classes.appBar} position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="tabs"
                                TabIndicatorProps={{
                                    style: {
                                        display: "none",
                                    },
                                }}
                            >
                                {Object.keys(tabsDock).map((tabName, index) => {
                                    return <Tab key={index} label={tabName} disabled={unlockTabs ? false : step !== index + 1} {...a11yProps(index)}/>
                                })}
                            </Tabs>
                        </AppBar>
                        {Object.values(tabsDock).map((tab, index) => {
                            return <TabPanel key={index} value={unlockTabs ? value : step - 1} index={index}>
                                {tab}
                            </TabPanel>
                        })}
                    </>
                )
            }
        </div>
    );
}

export default TabsDock;
