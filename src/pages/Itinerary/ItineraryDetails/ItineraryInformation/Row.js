import styled from "styled-components";

const Row = styled.div`
  display: flex;
  width: 100%;

  & > div:not(:first-child) {
    margin-left: ${props => props.ml || '50px'};
  }
`;

export default Row;