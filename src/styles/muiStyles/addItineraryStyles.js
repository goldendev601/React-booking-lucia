import {makeStyles} from "@material-ui/core";
import {colors} from "../colors";

const addItineraryStyles = makeStyles((theme) => ({
    formActions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '40px',
        width: '100%'
    },
    additionalActions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
        '& > a:nth-child(2)': {
            marginTop: '10px',
        }
    },
    description: {
        margin: '30px 0 30px 0',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '110px',
    },
    outer: {
        display: 'flex',
        minHeight: '100%',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flex: '1',
        flexWrap: 'wrap',
    },
    item: {
        flex: '1',
        height: '30px',
    },
    spacing: {
        "& > div:not(:first-child)": {
            marginTop: '20px',
        }
    },
    spacing1: {
        "& > div:not(:first-child)": {
            marginTop: '60px',
        }
    },
    calendarInfo: {
        width: '100%',
        height: '296px',
        background: '#F8F8FB'
    },
    calendarInfoTitle: {
        marginTop: '58px',
        width: '622px',
        height: '20px',
        fontWeight: '600',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontSize: '18px',
        lineHeight: '20px',
        textAlign: 'center',
        color: '#4F4F4F'
    },
    calendarInfoText: {
        margin: '13px auto',    
        width: '416px',
        height: '54px',
        fontWeight: '400',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontSize: '12px',
        lineHeight: '18px',
        textAlign: 'center',
        color: '#4F4F4F'
    },
    calendarbtn: {
        width: '150px',
        height: '30px',
        color: '#FFFFFF',
        backgroundColor: '#BA886E',
        border: '1px solid #BA886E',
        alignItems: 'center',
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '20px'
    },
    calendarbtnDiv: {
        textAlign: 'center'
    },
    formPadding: {
        padding: '30px 30px 0 30px'
    },
    information: {
        display: 'flex',
        justifyContent: 'space-between'
    },    
    pictures: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > div:not(:last-child)': {
            marginRight: '20px'
        }
    },
    categoryButton: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'white !important',
        color: `${colors.brand} !important`
    },
    categoryForm: {
        display: 'flex',
    },
    categoryButtonsContainer: {
        "& > *": {
            marginBottom: '30px',
        }
    },
    iconButton: {
        padding: '0',
        justifyContent: 'flex-start',
        marginTop: '20px',
    },
    flex: {
        display: 'flex',
    },
    fontWeightLight: {
        fontWeight: '300',
    },
    dates: {
        fontWeight: '600',
        color: colors.black1,
        display: 'flex',
        marginTop: '31px',
        fontSize: '14px'
    },
    passengers: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    label: {
        fontWeight: '600',
        color: colors.black1,
        display: 'flex',
        marginBottom: '3px',
        fontSize: '14px'
    },
    switch: {
        fontWeight: '300',
        marginLeft: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    rooms: {
        overflow: 'auto',
        maxHeight: '570px'
    },
    notesDiv: {
        width: '385px',
        height: '249px',
    },
    notesDiv1: {
        width: '770px',
        height: '249px',
    },
    popoverDiv: {
        backgroundColor: '#FFFFFF',
        width: 385,
        height: 385,
        padding: 20
    },
    popoverInstruction: {
        color: '#BA886E',
        fontFamily: 'Raleway',
        fontSize: 12,
        fontWeight: 600,
        padding: 10        
    },
    popeoverDescription: {
        color: '#242424',
        fontFamily: 'Raleway',
        fontSize: 12,
        fontWeight: 600,  
        padding: 10    
    },
    popoverInputDiv: {
        width: 264,
        height: 55,
        paddingLeft: 10
    },
    warningCircleIcon: {
        color: '#BA886E',
    },
    validationErrorNotification: {
        fontStyle: 'italic',
        color: 'red',
        marginTop: '5px !important',
        marginBottom: '5px !important',
        fontSize: '12px'
    },
    themeInfo: {
        display: 'block'
    },
    designInfo: {
        width: '250px',
        marginTop: '45px',
        marginLeft: '30px'
    },
    stripeContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50px',
        paddingBottom: '50px',
        paddingLeft: '180px',
        paddingRight: '180px'
    },
    stripeIconText: {
        fontWeight: 'bold',
        fontSize: '25px',
        color: '#000',
        marginTop: '25px'
    },
    stripeText: {
        textAlign: 'center',
        fontWeight: '300',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#000',
        fontFamily: 'Raleway',
        marginTop: '15px'
    },
    stripeText2: {
        textAlign: 'center',
        fontWeight: '300',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#000',
        fontFamily: 'Raleway',
        marginTop: '5px'
    },
    avatarListContainer: {
        maxHeight: "500px",
        overflow: 'auto'
    },
    avatarContainer: {
        padding: '8px'
    },
    selectedAvatarContainer: {
        padding: '8px',
        border: "1px solid #BA886E",
        position: "relative",
        "&:before": {
            content: '"🗸"',
            width: "15px",
            height: "15px",
            position: "absolute",
            background: "#BA886E",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    }
}));

export default addItineraryStyles;