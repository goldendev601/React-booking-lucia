import {makeStyles} from "@material-ui/core";

const authStyles = makeStyles(() => ({
    container: {
        width: '630px',
        display: 'flex',
        flexDirection: 'column',
    },
    leftContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    rightContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    termsContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
    },
    signupCheckLabel: {
        display: 'flex',
        alignItems: 'center'
    },
    termsContent: {
        width: '100%',
        marginTop: '40px',
        height: '60vh',
        overflow: 'auto'
    },
    signupContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
    },
    signinLogo: {
        marginBottom: '250px',
        marginTop: '92px'
    },
    signupLogo: {
        marginBottom: '120px',
        marginTop: '58px'
    },
    signupLogo1: {
        marginBottom: '160px',
        top: '50px'
    },
    containerAcesssCodeWrapper: {
        width: '281px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    labelAcesssCode: {
        fontFamily: 'MADE Mirage',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '33px',
        lineHeight: '60px',
        height: '60px',
        textAlign: 'center',
        padding: '0px',
        width: '100%',
        marginBottom: '40px',
        zIndex: 99,
        color: '#FFF'
    },
    formActions: {
        display: 'flex',
        justifyContent: 'space-between',
        textDecoration: 'none',
        marginTop: '25px',
    },
    formActions1: {
        display: 'flex',
        justifyContent: 'space-between',
        textDecoration: 'none',
        marginTop: '95px',
    },
    additionalActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
        marginBottom: '150px',
        '& > a:nth-child(2)': {
            marginTop: '10px',
        }
    },
    description: {
        margin: '30px 0 30px 0',
        color: '#FFF'
    },
    signupdescription: {
        color: '#FFF',
        maxWidth: '480px',
        fontFamily: 'Raleway',
        fontSize: '17px',
        lineHeight: '20px',
        fontWeight: '400',
        marginTop: '30px'
    },
    signupNote: {
        marginTop: '34px',
        color: '#FFF',
        maxWidth: '480px',
        fontFamily: 'Raleway',
        fontSize: '17px',
        lineHeight: '20px',
        fontWeight: '700'
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '110px',
    },
    signupWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    leftWrapper: {
        width: '50%',
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundImage: `url("./images/subscription-bk-left.jpg")`,
        height: '100%',
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingTop: '58px',
        paddingLeft: '100px',
        paddingRight: '100px'
    },
    rightWrapper: {
        width: '50%',
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundImage: `url("./images/subscription-bk-right.jpg")`,
        height: '100%',
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingTop: '358px',
        paddingLeft: '100px',
        paddingRight: '100px'
    },
    termsWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: `url("./images/SignIn-bk.png")`,
        height: '100%',
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingTop: '58px',
        paddingLeft: '100px',
        paddingRight: '100px'
    },
    signinWrapper: {
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: `url("./images/SignIn-bk.png")`,
        height: '100%',
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '20px',
        textAlign: 'center'
    },
    signInForm: {
        width: '100%'
    },
    signupWrapper: {
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: `url("./images/SignIn-bk.png")`,
        height: '100%',
        backgroundSize: 'cover',
        // alignItems: 'center'
    },
    logoWhite: {
        width: '148px'
    },
    wrapperAccessCode: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '260px',
    },
    outer: {
        display: 'flex',
        // minHeight: '100%',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        // flex: '1',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    item: {
        flex: '1',
        height: '30px',
    },
    cardInfo: {            
        margin: '70px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpBtnInfo: {            
        marginTop: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    card: {
        border: '1px solid #BA886E',
        marginLeft: '15px',
        marginRight: '15px',            
        width: '288px',
        float: 'left',
        "&:hover": {
            background: "#BA886E",
            cursor: 'pointer'
        },
    },
    signinLabel: {
        fontFamily: 'Raleway',
        color: '#FFF',
        fontWeight: '600',
        letterSpacing: '0.1em',
        lineHeight: '20px',
        fontSize: 14,
        textAlign: 'left'
    },
    signinTitle: {
        fontFamily: 'Montserrat',
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: '0.22em',
        fontSize: 34
    },
    signupTitle: {
        fontFamily: 'Montserrat',
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: '0.22em',
        fontSize: '24px',
        lineHeight: '20px'
    },
    signupTitle1: {
        fontFamily: 'Montserrat',
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: '0.22em',
        fontSize: '24px',
        lineHeight: '20px',
        marginTop: '15px'
    },
    optionTitle: {
        fontFamily: 'Montserrat',
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: '0.22em',
        fontSize: '37px',
        lineHeight: '20px'        
    },
    cardDescription: {
        height: '150px',
        paddingLeft: 35,
        paddingRight: 35,
        textAlign: 'center',
        marginTop: '15px',
    },
    cardTitleBlock: {
        textAlign: 'center',
        marginTop: '60px',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    bgContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: 'hidden',
        "& img": {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        "& div": {
            position: "absolute",
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            top: 0
        }
    }
}));

export default authStyles;