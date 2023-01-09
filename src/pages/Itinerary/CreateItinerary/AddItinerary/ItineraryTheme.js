import React, { useEffect , useState } from "react";
import ItineraryLogoPicture from "@core/components/Pictures/ItineraryLogoPicture/ItineraryLogoPicture";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyDesigns, itinerariesSelector } from "redux/features/itineraries/itinerariesSlice";
import {makeStyles, Box, Grid, Typography} from "@material-ui/core";
const useStyles = makeStyles(() => ({
    themeInfo: {
        display: 'block'        
    },
    designInfo: {
        width: '250px',
        marginTop: '45px',
        marginLeft: '30px'
    },
    themeStyle: {
       width: '100%',
       display: 'flex',
       margin: '25px auto'
    },
    designContainerWrapper: {
        textAlign: 'center',
        alignItems: 'center',
        margin: '0 auto'
    },
    designContainer: {
        width: '100px',
        height: '170px',
        border: "1px solid #BA886E",
        margin: '0 auto',
        borderRadius: '10px'
    }, 
    selectedDesignContainer: {
        border: "1px solid #BA886E",
        borderRadius: '8px',
        height: '100%'
    },
    themeTitle: {
        textAlign: 'center',
        fontSize: '16px',
        lineHeight: '24px',
        marginTop: '25px',
    },
    themeLabel: {
        textAlign: 'center',
        fontSize: '26px',
        lineHeight: '24px',
        marginTop: '30px',
        fontWeight: '400'
    },
    colorContainer: {
        width: '68px',
        height: '34px',
        margin: '20px auto'
    },
    itineraryLogoContainer:{
        width:200,
        height:180,
        borderWidth:1,
        borderStyle:'dashed',
        marginLeft:25,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    itineraryLogo:{
        width:150
    },
    templateContainer:{
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        width:'100%',
        
    },
    templateInnercontainer:{
        width:100,
        height:150,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        borderRadius:5
    },
    templateText:{
        fontSize:22,
    },
    templateBody:{
        width:70,
        height:30,
        borderRadius:5,
    },
    centerTemplateContents:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        height:80,
    },
    outerTemplate:{
        padding:10,
        textAlign:'center',
        borderRadius:5,
        cursor: 'pointer'
    },
    templateText2:{
        marginTop:15,
        fontSize:14
    },
}));

const ItineraryTheme = ({formik, ...props}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPropertyDesigns())
    }, [dispatch])

    const { propertyDesigns } = useSelector(itinerariesSelector);
    const classes = useStyles();

    const [selectedDesign, setSelectedDesign] = useState(1);
    const [selectedTheme, setSelectedTheme] = useState(-1);
    useEffect(() => {
        if (formik.values.propertyDesignId !== selectedDesign) {
            setSelectedDesign(formik.values.propertyDesignId);
        }
    }, [formik.values]);

    const selectDesign = (design) => {
        setSelectedDesign(design.id)
        formik.setFieldValue('propertyDesignId', design.id);
    }
    const templates = [
        {
            title: 'Title',
            color: '#BA886E',
            textColor: '#BA886E',
            style: 'Lucia Style',
            upperBorder: 'black',
            innerBorder: '#BA886E',
            backColor:'linear-gradient(180deg, #FFFFFF, #FFFFFF)',
        },
        {
            title: 'Title',
            color: '#84897C',
            textColor: '#84897C',
            style: 'Modern Style',
            upperBorder: 'black',
            innerBorder: '#84897C',
            backColor:'linear-gradient(180deg, #FFFFFF, #E1DDD8)',
        },
        {
            title: 'Title',
            color: '#FAFAFA',
            textColor: '#BA886E',
            style: 'Modern Style',
            upperBorder: '#3A4452',
            innerBorder: 'black',
            backColor:'linear-gradient(180deg, #E1DDD8, #E1DDD8)',
        },
        {
            title: 'Title',
            color: '#3A4452',
            textColor: '#FAFAFA',
            style: 'Modern Style',
            upperBorder: '#BA886E',
            innerBorder: '#3A4452',
            backColor:'linear-gradient(180deg, #25303F, #25303F)',
        },
    ]
    return (
        <div className={classes.themeInfo}> 
            <ItineraryLogoPicture {...props}/>
            {/* <Box className={classes.designInfo}>
                <SelectField
                    formik={formik}
                    label="Design"
                    name="propertyDesignId"
                    options={propertyDesigns}                
                    fieldName="propertyDesignId"
                    propertyName="propertyDesignId"
                    constants
                />
            </Box> */}
            <Typography style={{margin: '30px', fontWeight: '600', fontFamily: 'Raleway', color: '#242424', fontSize: '14px', lineHeight: '30px', letterSpacing: '0.05em'}}>
                Select Your Itinerary Theme
            </Typography>
            {/* <div className={classes.templateContainer}>
                {
                    templates?.map((v,i) => (
                        <div key={i} style={{ border: selectedTheme == i ? '1px solid #BA886E' : ''}} className={classes.outerTemplate}>
                            <div onClick={() => setSelectedTheme(i)} style={{ border: `1px solid ${v?.upperBorder}`, borderColor: v?.upperBorder, borderWidth: 1, backgroundImage: v?.backColor, borderColor: v?.upperBorder, borderWidth: 1 }} className={classes.templateInnercontainer}>
                                <div className={classes.centerTemplateContents}>
                                    <div style={{ color: v?.textColor }} className={classes.templateText}>
                                        {v?.title}
                                    </div>
                                    <div style={{ color: v?.textColor, backgroundColor: v?.color, border: `1px solid ${v?.innerBorder}` }} className={classes.templateBody}></div>
                                </div>
                            </div>
                            <div className={classes.templateText2}>
                                {v?.style}
                            </div>
                        </div>
                    ))
                }
            </div> */}
            <div className={classes.themeStyle}> 
                <Grid container>
                    {propertyDesigns && propertyDesigns.map((design, index) => (
                        <Grid
                            item xs={3}
                            className={ classes.designContainerWrapper }
                            key={index}
                        >
                            {
                                design.id === 1 && (
                                    <>
                                        {
                                            design.id === selectedDesign ? (
                                                <div className={classes.designContainer} style={{backgroundColor: '#FFF', padding: '5px'}}>
                                                    <div className={classes.selectedDesignContainer} style={{backgroundColor: '#FFF'}}>
                                                        <Typography className={classes.themeLabel} style={{fontFamily: 'MADE Mirage', color: '#BA886E'}}>
                                                            Title
                                                        </Typography>
                                                        <div className={classes.colorContainer} style={{backgroundColor: '#BA886E'}}>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={classes.designContainer} style={{backgroundColor: '#FFF'}} onClick={() => selectDesign(design)}>
                                                    <Typography className={classes.themeLabel} style={{fontFamily: 'MADE Mirage', color: '#BA886E'}}>
                                                        Title
                                                    </Typography>
                                                    <div className={classes.colorContainer} style={{backgroundColor: '#BA886E'}}>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <Typography className={classes.themeTitle} style={{fontFamily: 'Raleway', color: '#4F4F4F'}} >
                                            {design.description}
                                        </Typography>
                                    </>
                                )
                            }
                            {
                                design.id === 2 && (
                                    <>
                                        {
                                            design.id === selectedDesign ? (
                                                <div className={classes.designContainer} style={{backgroundColor: '#E1DDD8', padding: '5px'}}>
                                                    <div className={classes.selectedDesignContainer} style={{backgroundColor: '#E1DDD8'}}>
                                                        <Typography className={classes.themeLabel} style={{fontFamily: 'MADE Mirage', color: '#84897C'}}>
                                                            Title
                                                        </Typography>
                                                        <div className={classes.colorContainer} style={{backgroundColor: '#84897C'}}>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={classes.designContainer} style={{backgroundColor: '#E1DDD8'}} onClick={() => selectDesign(design)}>
                                                    <Typography className={classes.themeLabel} style={{fontFamily: 'MADE Mirage', color: '#BA886E'}}>
                                                        Title
                                                    </Typography>
                                                    <div className={classes.colorContainer} style={{backgroundColor: '#828282'}}>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        
                                        <Typography className={classes.themeTitle} style={{fontFamily: 'Raleway', color: '#4F4F4F'}} >
                                            {design.description}
                                        </Typography>
                                    </>
                                )
                            }
                            {
                                design.id === 3 && (
                                    <>
                                        {
                                            design.id === selectedDesign ? (
                                                <div className={classes.designContainer} style={{backgroundColor: '#E1DDD8', padding: '5px'}}>
                                                    <div className={classes.selectedDesignContainer} style={{backgroundColor: '#25303F'}}>
                                                        <Typography className={classes.themeLabel} style={{fontFamily: 'MADE Mirage', color: '#FFFFFF'}}>
                                                            Title
                                                        </Typography>
                                                        <div className={classes.colorContainer} style={{backgroundColor: '#3A4452'}}>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={classes.designContainer} style={{backgroundColor: '#E1DDD8'}} onClick={() => selectDesign(design)}>
                                                    <Typography className={classes.themeLabel} style={{fontFamily: 'MADE Mirage', color: '#BA886E'}}>
                                                        Title
                                                    </Typography>
                                                    <div className={classes.colorContainer} style={{backgroundColor: '#FAFAFA'}}>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        
                                        <Typography className={classes.themeTitle} style={{fontFamily: 'Raleway', color: '#4F4F4F'}} >
                                            {design.description}
                                        </Typography>
                                    </>
                                )
                            }
                            {
                                design.id === 4 && (
                                    <>
                                        {
                                            design.id === selectedDesign ? (
                                                <div className={classes.designContainer} style={{backgroundColor: '#25303F', padding: '5px'}}>
                                                    <div className={classes.selectedDesignContainer} style={{backgroundColor: '#25303F'}}>
                                                        <Typography className={classes.themeLabel} style={{fontFamily: 'Cormorant Garamond', color: '#FFFFFF'}}>
                                                            Title
                                                        </Typography>
                                                        <div className={classes.colorContainer} style={{backgroundColor: '#3A4452'}}>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={classes.designContainer} style={{backgroundColor: '#25303F'}} onClick={() => selectDesign(design)}>
                                                    <Typography className={classes.themeLabel} style={{fontFamily: 'Cormorant Garamond', color: '#FFFFFF'}}>
                                                        Title
                                                    </Typography>
                                                    <div className={classes.colorContainer} style={{backgroundColor: '#3A4452'}}>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <Typography className={classes.themeTitle} style={{fontFamily: 'Raleway', color: '#4F4F4F'}} >
                                            {design.description}
                                        </Typography>
                                    </>
                                )
                            }
                            
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )
}

export default ItineraryTheme;