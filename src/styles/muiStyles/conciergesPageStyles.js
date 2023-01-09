import {makeStyles} from "@material-ui/core";

const conciergesPageStyles = makeStyles(() => ({
    root: {
        width: '100%',
        padding: '30px'
    },
    container: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        maxWidth: '1024px'
    },
    homeNote: {
        marginTop: '14px',
        color: '#FFF',
        fontFamily: 'Raleway',
        fontSize: '18px',
        lineHeight: '20px',
        fontWeight: '400'
    },
    aboveWrapper: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    belowWrapper: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        minHeight: '45vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingBottom: '150px'
    },
    buttonDivFirst: {
        width: '100%',
        height: '321px',
        borderRadius: '30px',
        backgroundColor: '#FFF',
        textAlign: 'center',
        paddingLeft: '15px',
        paddingRight: '15px',
        boxShadow: '0px 14px 64px rgba(0, 0, 0, 0.08)'
    },
    buttonDivSecond: {
        display: 'flex',
        width: '100%',
        height: '321px',
        borderRadius: '30px',
        backgroundColor: '#FFF',
        textAlign: 'center',
        alignItems: 'center',
        padding: '120px',
        boxShadow: '0px 14px 64px rgba(0, 0, 0, 0.08)'
    },
    locationInfo: {
        fontFamily: 'Raleway',
        color: '#828282',
        fontWeight: '500',
        fontSize: '10px',
        lineHeight: '12px',
        marginTop: '8px',
        textAlign: 'center'
    },
    recentRequestsWrapper: {
        width: '100%',
        height: '321px',
        borderRadius: '30px',
        backgroundColor: '#FFF',
        textAlign: 'center',
        alignItems: 'center',
        padding: '25px',
        boxShadow: '0px 14px 64px rgba(0, 0, 0, 0.08)'
    },
    freelancerDiv: {
        textAlign: 'center',
        backgroundColor: '#FFF',
        borderRadius: '20px',
        overflow: 'hidden',
        '&:hover': {
            cursor: "pointer"
        }
    },
    freelancersTextDiv: {
        textAlign: 'center',
        backgroundColor: '#FFF',
        // boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
        '&:hover': {
            cursor: "pointer"
        }
    },
    buttonIcon: {
        width: '74px',
        height: '74px',
        objectFit: 'cover',
        marginTop: '66px'
    },
    buttonIcon2: {
        width: '74px',
        height: '74px',
        objectFit: 'cover',
    },
    freelancerImg: {
        width: '100%',
        objectFit: 'cover',
        height: '180px'
    },
    buttonTitle: {
        fontFamily: 'MADE Mirage Regular',
        color: '#000',
        fontWeight: '400',
        fontSize: '24px',
        lineHeight: '40px',
        marginTop: '25px',
    },
    buttonTitle2: {
        fontFamily: 'MADE Mirage Regular',
        color: '#000',
        fontWeight: '400',
        fontSize: '24px',
        lineHeight: '24px',
        width: '360px',
        textAlign: 'left'
    },
    buttonDescription: {
        fontFamily: 'Raleway',
        color: '#000',
        fontWeight: '400',
        fontSize: '11px',
        lineHeight: '20px',
        marginTop: '8px',
        textAlign: 'center'
    },
    buttonDescription2: {
        fontFamily: 'Raleway',
        color: '#000',
        fontWeight: '400',
        fontSize: '11px',
        lineHeight: '20px',
        marginTop: '8px',
        textAlign: 'left'
    },
    freelancerDescription: {
        fontFamily: 'Raleway',
        color: '#828282',
        fontWeight: '400',
        fontSize: '11px',
        lineHeight: '20px',
        marginTop: '5px',
        textAlign: 'center'
    },
    requestTitleInfo: {
        fontFamily: 'Raleway',
        color: '#000',
        fontWeight: '700',
        fontSize: '16px',
        lineHeight: '20px',
        marginTop: '5px',
        textAlign: 'left'        
    },
    requestNumberInfo: {
        fontFamily: 'Raleway',
        color: '#828282',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '20px',
        marginTop: '5px',
        textAlign: 'left',
        marginRight: '12px'
    },
    requestNoteInfo: {
        fontFamily: 'Raleway',
        color: '#000',
        fontWeight: '400',
        fontSize: '11px',
        lineHeight: '20px',
        marginTop: '5px',
        textAlign: 'left'
    },
    dateInfo: {
        fontFamily: 'Raleway',
        color: '#000',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '20px',
        textAlign: 'left'
    },
    freelancerName: {
        fontFamily: 'Montserrat',
        color: '#BA886E',
        fontWeight: '400',
        fontSize: '13px',
        lineHeight: '20px',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    buttonWrapper: {
        marginTop: '53px'
    },
    freelancersWrapper: {
        marginTop: '18px'
    },
    logoWhite: {
        width: '148px'
    },
    title: {
        fontFamily: 'MADE Mirage Regular',
        color: '#242424',
        fontWeight: '400',
        fontSize: '40px',
        lineHeight: '50px'
    }, 
    subTitle: {
        fontFamily: 'MADE Mirage Regular',
        color: '#000',
        fontWeight: '400',
        fontSize: '24px',
        lineHeight: '40px'        
    },  
    clickableTitle: {
        fontFamily: 'MADE Mirage Regular',
        color: '#BA886E',
        fontWeight: '700',
        fontSize: '13px',
        lineHeight: '22px',
        '&:hover': {
            cursor: "pointer"
        }        
    }, 
    recentRequestDetailWrapper: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
    },
    recentRequestDetailWrapperLast: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        paddingTop: '15px',
    },
    recentRequestInfoWrapper: {
        marginRight: '25px'
    }
}));

export default conciergesPageStyles;