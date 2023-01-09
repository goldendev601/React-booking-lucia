import React from "react";
import pictureStyles from "styles/muiStyles/pictureStyles";
import IconButton from "@material-ui/core/IconButton";
import { Trash, EditPencil } from "iconoir-react";

const LogoPicture = ({imageSrc, openPictureUpload, deleteImage, index, itineraryLogo, id, width, height}) => {
    const classes = pictureStyles();

    const pictureBoxStyles = {
        width: width,
        height: height,
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={pictureBoxStyles} className={`border-spaced ${classes.image}`}>
                <img style={{visibility: 'visible', ...pictureBoxStyles}} className={classes.imagePreview} src={imageSrc} alt=""/>

                <div style={{position: 'absolute'}}>
                    {
                        openPictureUpload && (
                            <IconButton className={classes.imageButton}
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                        style={{marginRight: '10px'}}
                                        onClick={openPictureUpload}
                            >
                                <EditPencil style={{position: 'absolute', width: '17px'}} color={'white'}/>
                            </IconButton>
                        )
                    }

                    <IconButton className={classes.imageButton}
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                onClick={() => deleteImage(index, id)}
                    >
                        <Trash style={{position: 'absolute'}} color={'white'} width={17}/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default LogoPicture;
