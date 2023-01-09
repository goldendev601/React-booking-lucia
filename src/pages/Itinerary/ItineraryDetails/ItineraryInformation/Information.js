import styled from "styled-components";

const Information = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:first-child) {
    margin-top: ${props => props.$marginTop || '10px'};
  }
`;

export default Information;