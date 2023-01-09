import styled from "styled-components";

export const Space = () => '\u00A0';

export const StyledP = styled.p`
  font-size: 14px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  color: '#242424';
  line-height: 24px;
  letter-spacing: 0.05em;
  margin-bottom: ${props => props.mb};
  text-align: ${props => props.ta};
`

export const StyledB = styled.b`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  color: '#242424';
  letter-spacing: 0.05em;
  margin-bottom: ${props => props.mb};
`;

export const StyledT = styled.b`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: '#000';
  letter-spacing: 0.05em;
  margin-bottom: ${props => props.mb};
`;

export const BookingInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;