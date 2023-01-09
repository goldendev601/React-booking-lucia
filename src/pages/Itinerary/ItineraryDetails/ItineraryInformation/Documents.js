import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "./Row";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import fileDownload from 'js-file-download';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import {Trash} from "iconoir-react";
import IconButton from "@material-ui/core/IconButton";
import {
  itinerariesSelector,
  deleteItineraryDocument,
  fetchPackedItinerary,
  clearDocumentDeleted
} from "redux/features/itineraries/itinerariesSlice";


const DocumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #E8E8E8;
  padding: 10px;
  border-radius: 5px;
  & > div:not(:first-child) {
    margin-top: 10px;
  }
`;

const Container = styled.div`
  & > div:not(:first-child) {
    margin-top: 20px;
  }
`;

const downloadFile = (url, filename) => {
  axios.get(url, {
    responseType: 'blob',
  })
  .then((res) => {
    fileDownload(res.data, filename)
  })
}



const Documents = ({itineraryDocuments, id}) => {

    const useStyles = makeStyles({
      documentDetailInfo: {
            color: '#000 !important',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: 12,
            alignItems: 'center',
            paddingLeft: '10px',
            paddingTop: '5px'
        }, 
        pdfIconDiv: {
          backgroundColor: '#E3555F',
          borderRadius: '5px',
          width: '49px',
          height: '29px',
          fontSize: '12px',
          color: '#FFF',
          paddingTop: '5px',
          textAlign: 'center'
        }      
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    const {
        isDocumentDeletedSuccess,
        isDocumentDeletedError,
        errorMessage
    } = useSelector(itinerariesSelector);

    const deleteDocument = (itineraryId, documentId) => {

      const apiPayload = {
          itineraryId: itineraryId,
          documentId: documentId,
      }
      dispatch(deleteItineraryDocument(apiPayload));
    }

    useEffect(() => {
      console.log(isDocumentDeletedSuccess);
      if (isDocumentDeletedSuccess) {
        dispatch(fetchPackedItinerary(id));
        dispatch(clearDocumentDeleted());
      }
    }, [isDocumentDeletedSuccess]);

    // console.log(itineraryDocuments);
    
    return (
        <Container>
          {
            itineraryDocuments.length > 0 ? (
              <>
                {itineraryDocuments.map((document, index) =>
                    <DocumentContainer key={index}>
                        <Row>
                            <div className={classes.pdfIconDiv}>PDF</div>
                            {
                              document.name.length < 40 ? (
                                <a className={classes.documentDetailInfo} 
                                  onClick={() => downloadFile(document.documentUrl, document.name)}
                                > 
                                  {document.name}
                                </a>
                              ) : (
                                <a className={classes.documentDetailInfo} 
                                  onClick={() => downloadFile(document.documentUrl, document.name)}
                                > 
                                  {document.name.substring(0, 40)}...
                                </a>
                              )
                            }
                            
                            <IconButton style={{
                                padding: '0 5px 0 5px',
                                marginLeft: 'auto'
                            }} onClick={() => deleteDocument(id, document.id)}>
                                <Trash color={'#BA886E'} width={'18px'} height={'18px'}/>
                            </IconButton>
                        </Row>
                    </DocumentContainer>
                )}
              </>
            ) : (
              <Typography component="span" style={{fontFamily: 'Montserrat', fontWeight: '400', fontSize: '14px', lineHeight: '20px', color: '#242424', opacity: '0.4'}}>
                No attachment added
            </Typography>
            )
          }
            
        </Container>
    );
}

export default Documents;