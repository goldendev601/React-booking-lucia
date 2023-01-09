import React, {useState, useRef} from "react";
import {ItineraryFormContainer, Label, Button} from "@core/components";
import { GoogleDocs } from "iconoir-react";
import styled from "styled-components";
import { FileDrop } from 'react-file-drop';
import { makeStyles } from "@material-ui/core/styles";
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';

const StyledP = styled.p`
  font-size: 12px; 
  text-align: center;
`;

const StyledP2 = styled.p`
  font-size: 12px; 
  text-align: left;
  color: #BA886E;
  font-weight: bold;
  margin-top: 10px;
`;

const Divider = styled.div`
    text-align: center;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
        content: "";
        width: 250px;
        border: 1px solid #000;
        opacity: 0.3;
        position: absolute;
    }
    span {
        padding: 0 20px;
        background: white;
        z-index: 99;
    }
`

const TravelerDocuments = ({formik}) => {

    const [uploadedPDF, setUploadedPDF] = useState(false);
    const [fileNames, setFileNames] = useState([]);

    const inputRef = useRef()

    const handleDroppedFile = (files, event) => {
        if (files.length > 0) {
            formik.setFieldValue('document', files)
            setUploadedPDF(true);
            var fileNames = [];
            for (let i = 0; i < files.length; i++) {
                fileNames.push(files[i].name);
            }
            setFileNames(fileNames)
        }
    }

    function handleChange(event) {
        if (event.target.files) {
            var files = event.target.files;
            if (files.length > 0) {
                formik.setFieldValue('document', files)
                setUploadedPDF(true);
                var fileNames = [];
                for (let i = 0; i < files.length; i++) {
                    fileNames.push(files[i].name);
                }
                setFileNames(fileNames)
            }
        }

    }

    function changeFile() {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const Instructions = () => <React.Fragment>
        <Label>DRAG AND DROP YOUR FILE HERE</Label>
        <StyledP>Upload a PDF. Max file size 2MB</StyledP>
    </React.Fragment>

    const useStyles = makeStyles({
        contentDiv: {
            minHeight: 600
        }
    });

    const classes = useStyles();

    return (
        <ItineraryFormContainer>
            <div class="border-spaced-large" style={{height: '242px'}}>
                <FileDrop
                    onDrop={handleDroppedFile}
                >
                    <Label>DRAG AND DROP YOUR FILE HERE</Label>
                    <Divider><span>OR</span></Divider>
                    <input type="file" multiple onChange={handleChange} ref={inputRef} style={{display: 'none'}} />
                    <Button
                        $primary
                        $width={'250px'}
                        style={{backgroundColor: '#BA886E', marginTop: '15px', marginBottom: '15px'}}
                        onClick={() => changeFile()}
                    >
                        Browse files
                    </Button>
                    <StyledP>Upload up to 20 PDF files. Max file size 2MB each</StyledP>
                </FileDrop>
            </div>
            {uploadedPDF && fileNames.map((fileName, index) => (
                <StyledP2><GoogleDocs width={'22px'} style={{paddingTop: '5px'}} /> {fileName}</StyledP2>
            ))}
            
        </ItineraryFormContainer>
    );
}

export default TravelerDocuments;

