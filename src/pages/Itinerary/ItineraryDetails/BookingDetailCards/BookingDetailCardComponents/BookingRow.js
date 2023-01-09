import styled from "styled-components";
import Row from "../../ItineraryInformation/Row";

const BookingRow = styled(Row)`
  justify-content: ${props => props.toEnd ? 'flex-end' : 'normal'};
  & > div:not(:first-child) {
    margin: 0 0 10px ${props => props.ml || '0'};
  }
`;

export default BookingRow;