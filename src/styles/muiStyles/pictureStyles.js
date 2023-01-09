import {makeStyles} from "@material-ui/core/styles";
import {colors} from "styles/colors";

const pictureStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '30px',
    },
    iconButton: {
        marginLeft: '42%',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    inputUpload: {
        visibility: 'hidden',
    },
    image: {
        width: '250px',
        height: '200px',
        backgroundColor: '#f4f4f4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    imageButton: {
        backgroundColor: `${colors.brand}`,
        borderRadius: '0',
        width: '30px',
        height: '30px',
        '&:hover': {
            backgroundColor: `${colors.brand}`,
        }
    },
    imagePreview: {
        width: '250px',
        height: '200px',
        objectFit: 'scale-down',
    },
}));

export default pictureStyles;
