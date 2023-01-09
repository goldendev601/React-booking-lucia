import {makeStyles} from "@material-ui/core";

const homePageStyles = makeStyles(() => ({
    container: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        maxWidth: '840px'
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
        backgroundImage: `url("./images/home-bk.png")`,
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
        backgroundColor: '#000',
        paddingBottom: '150px'
    },
    buttonDiv: {
        width: '266px',
        height: '296px',
        borderTopRightRadius: '140px',
        borderTopLeftRadius: '140px',
        backgroundColor: '#000',
        textAlign: 'center',
        paddingLeft: '15px',
        paddingRight: '15px',
        '&:hover': {
            cursor: "pointer"
        }
    },
    freelancerName: {
        fontFamily: 'Montserrat',
        color: '#FFF',
        fontWeight: '600',
        fontSize: '13px',
        lineHeight: '20px',
        marginTop: '5px',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    freelancerDiv: {
        textAlign: 'center',
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
    freelancerImg: {
        width: '100%',
        height: '185px',
        objectFit: 'cover',
    },
    buttonTitle: {
        fontFamily: 'MADE Mirage Regular',
        color: '#FFF',
        fontWeight: '400',
        fontSize: '20px',
        lineHeight: '40px',
        marginTop: '25px',
    },
    buttonDescription: {
        fontFamily: 'Raleway',
        color: '#FFF',
        fontWeight: '400',
        fontSize: '11px',
        lineHeight: '20px',
        marginTop: '8px',
        textAlign: 'center'
    },
    freelancerDescription: {
        fontFamily: 'Raleway',
        color: '#FFF',
        fontWeight: '400',
        fontSize: '11px',
        lineHeight: '20px',
        marginTop: '8px',
        textAlign: 'center'
    },
    locationInfo: {
        fontFamily: 'Raleway',
        color: '#979797',
        fontWeight: '500',
        fontSize: '10px',
        lineHeight: '12px',
        marginTop: '8px',
        textAlign: 'center'
    },
    buttonWrapper: {
        marginTop: '55px !important'
    },
    freelancersWrapper: {
        marginTop: '25px'
    },
    logoWhite: {
        width: '148px'
    },
    homeTitle: {
        fontFamily: 'MADE Mirage Regular',
        color: '#FFF',
        fontWeight: '400',
        fontSize: '54px',
        lineHeight: '70px',
        marginTop: '150px',
        letterSpacing: '0.01em'
    }, 
    homeSubTitle: {
        fontFamily: 'MADE Mirage Regular',
        color: '#FFF',
        fontWeight: '400',
        fontSize: '26px',
        lineHeight: '70px',
        marginTop: '50px'
    },  
}));

export default homePageStyles;