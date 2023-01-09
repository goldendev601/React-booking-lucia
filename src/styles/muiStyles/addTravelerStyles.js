import {makeStyles} from "@material-ui/core";
import {colors} from "../colors";

const addTravelerStyles = makeStyles((theme) => ({
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
    }
}));

export default addTravelerStyles;