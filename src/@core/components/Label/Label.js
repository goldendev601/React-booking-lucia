import styled from "styled-components";
import {colors} from "styles/colors";

const Label = styled.span`
  font-weight: 600;
  color: ${colors.black1};
  display: flex;
  margin-bottom: ${props => props.mb || '5.6px'};
  font-size: 14px;
`;

export default Label;
