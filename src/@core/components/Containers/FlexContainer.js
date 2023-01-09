import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.$row ? 'row' : (props.$column && 'column')};
  justify-content: ${props => props.$spacebetween ? 'space-between' : (props.$spacearound ? 'space-around' : (props.$spaceevenly && 'space-evenly'))};
  
  ${props => props.$spacing && '& > div:not(:first-child) {\n    margin-top: 20px;'}
`;

export default FlexContainer;