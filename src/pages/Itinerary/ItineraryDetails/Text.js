import styled from "styled-components";
import {colors} from "styles/colors";

export const Text = styled.div`
  color: ${colors.black1};
  font-family: Raleway, sans-serif;
  font-style: normal;
  font-weight: ${props => props.bold ? '700' : 'normal'};
  font-size: 14px;
  margin-bottom: ${props => props.mb || '0'};
  margin-left: ${props => props.ml || '0'};
`;