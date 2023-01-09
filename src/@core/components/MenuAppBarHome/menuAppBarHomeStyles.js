import {makeStyles} from "@material-ui/core/styles";
import {colors} from "styles/colors";

export const menuAppBarHomeStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        justifyContent: 'center',
        display: 'flex',
    },
    sectionDesktop: {
        display: 'none',
        justifyContent: 'space-between',
        '@media (min-width:1520px)': {
            display: 'flex',
        }
        // [theme.breakpoints.up('md')]: {
        //     display: 'flex',
        // },        
        
    },
    sectionMobile: {
        display: 'flex',
        alignItems: 'center',
        '@media (min-width:1520px)': {
            display: 'none',
        }
        // [theme.breakpoints.up('md')]: {
        //     display: 'none',
        // },
    },
    logo: {
        margin: '20px 0 15px 16px',
    },
    profileIcon: {
        marginRight: '10px',
    },
    profileIconMobile: {
        display: 'flex',
        justifyContent: 'end',
        paddingRight: '25px',
        width: '100%'
    },
    avatar: {
        width: '50px',
        height: '50px',
        '& img': {
            width: '50px',
            height: 'unset',
        }
    },
    appToolBar: {
        padding: '0 40px 0 40px',
    },
    appBar: {
        paddingLeft: '16px',
    },
    brandColor: {
        color: colors.brand,
    },
    menuText: {
        fontFamily: 'Montserrat',
        color: '#333333',
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        fontSize: '14px',
        lineHeight: '40px',
        fontWeight: '700',
        marginLeft: 'auto'
    }
}));