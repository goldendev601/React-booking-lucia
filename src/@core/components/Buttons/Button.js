import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {colors} from "styles/colors";

export const DefaultButton = styled(Button)`
  width: ${props => props.$width || '150px'};
  color: ${props => props.$primary ? 'white' : ((props.$outlined) ? `${colors.brand}` : (props.transparent && `${colors.brand}`))};
  border: ${props => props.$primary ? 'none' : ((props.$outlined) ? `1px solid ${colors.brand}` : (props.transparent && 'none'))};
  background-color: ${props => props.$primary ? `${colors.brand}` : ((props.$outlined) ? `white` : (props.transparent && 'transparent'))};

  &:hover {
    background-color: ${props => props.$primary ? `${colors.brand}` : ((props.$outlined) ? `white` : (props.transparent && 'transparent'))};
  }
`

const button = (props) => <DefaultButton {...props}>
    <div style={{
        width: '100%',
        padding: '0 5px',
        display: 'flex',
        justifyContent: props.iconend ? 'space-between' : 'space-evenly'
    }}>
        {props?.iconstart}{props?.text}{props.children}{props?.iconend}
    </div>
</DefaultButton>

export default React.memo(button);
