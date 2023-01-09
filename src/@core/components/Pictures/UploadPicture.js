import React from "react";
import {pictureStyles} from "styles";
import IconButton from "@material-ui/core/IconButton";
import {Camera} from "iconoir-react";
import {Input} from "@material-ui/core";

const UploadPicture = ({width, height, openPictureUpload, handlePictures, profile}) => {
    const classes = pictureStyles();

    const pictureBoxStyles = {
        width: width,
        height: height,
    }

    return (
        <div>
            <div >
                <label htmlFor="icon-button-file">
                    <div className={`border-spaced ${classes.image}`}
                         style={pictureBoxStyles}>
                        <img style={{visibility: 'hidden'}} className={classes.imagePreview} alt=""/>
                        {handlePictures && profile && <Input className={classes.inputUpload} onChange={handlePictures}
                               accept="image/png, image/jpeg"
                               id="icon-button-file"
                               type="file"/>}
                        <IconButton style={{position: 'absolute'}} className={classes.imageButton}
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    onClick={openPictureUpload}
                        >
                            <Camera style={{position: 'absolute', width: '17px'}} color={'white'}/>
                        </IconButton>
                    </div>
                </label>
            </div>
        </div>
    );
}

export default UploadPicture;
