import React from "react";
import Typography from "@material-ui/core/Typography";
import {Text} from "../Text";
import Row from "./Row";

const Emails = ({clientEmails}) => {
    return (
        <Row>
            <Typography variant="body2" component="span">Email(s):</Typography>
            {clientEmails && clientEmails?.length !== 0 ?
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {clientEmails.map((clientEmail, index) =>
                    <Text key={index} variant="body2" component="span">{clientEmail}</Text>
                )}
            </div>
            : <div style={{opacity: '0.4'}}>Not provided</div>}
        </Row>
    );
}

export default Emails;