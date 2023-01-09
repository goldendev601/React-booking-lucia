import {makeStyles} from "@material-ui/core";

const richEditStyles = makeStyles((theme) => ({
    editor: {
        padding: '0px 10px 0px 10px',
        order: '2',
        height: '90%'
    },
    editorWrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid #000000',
        marginTop: '10px'
    },
    editorToolbar: {
        order: '1'
    },
    descriptionLabel: {
        fontFamily: 'Raleway',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '20px'
    }
}))

export default richEditStyles;