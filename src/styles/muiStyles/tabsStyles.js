import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../colors";

const tabsStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        backgroundColor: 'transparent',
        color: `${colors.brand}`,
        borderBottom: `0.01em solid ${colors.gray3}`,
    },
    paper: {
        minWidth: '850px',
    },
    categoryPaper: {
        minWidth: '750px',
    },
    shareItineraryPaper: {
        minWidth: '650px',
        minHeight: '520px',
    }
}));

export default tabsStyles;