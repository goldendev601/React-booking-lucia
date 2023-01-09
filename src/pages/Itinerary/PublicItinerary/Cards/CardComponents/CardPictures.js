import React from "react";
import {Modal} from "@core/components";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    picturesRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    row: {
        display: 'flex',
        marginBottom: '15px',
        flexWrap: 'wrap',
        width: '100%',
        '@media (max-width:762px)': {
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
                marginBottom: '10px'
            }
        },
        gap: '13px',
        justifyContent: 'center',
    },
    imagePreview: {
        width: '228px',
        height: '150px',
    },
});

const CardPictures = ({pictures}) => {
    const classes = useStyles();

    const borderStyle = (index) => {
        switch (index) {
            case 0:
                return {
                        borderTopLeftRadius: '15px',
                    }
            case 2:
                return {
                        borderTopRightRadius: '15px',
                    }
            case 3:
                return {
                        borderBottomLeftRadius: '15px',
                    }
            case 5:
                return {
                        borderBottomRightRadius: '15px',
                    }
            default:
                return null;
        }
    }

    return (
        <React.Fragment>
            <div className={classes.picturesRoot}>
                <div className={classes.row} style={{marginBottom: '15px'}}>
                    {pictures.length >= 1 && pictures.map((picture, index) =>
                        <Modal key={index} className={classes.imagePreview} component={
                            <img style={borderStyle(index)} src={picture} alt=""/>}
                        />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default CardPictures;