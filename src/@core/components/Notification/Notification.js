import React from 'react';
import styled from 'styled-components';
import {WarningCircledOutline} from "iconoir-react";

const Notification = styled.div`
  background-color: #F8F8FB;
  min-width: ${({$width}) => $width || '100%'};
  display: flex;
  padding: 20px;
`;

const NotificationText = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #4F4F4F;
  margin-left: 12px;
  width: 100%;
`;

const notification = (props) =>
    <Notification {...props}>
        <WarningCircledOutline width={'40px'}/>
        <NotificationText>
            {props.text}
        </NotificationText>

    </Notification>;

export default React.memo(notification);