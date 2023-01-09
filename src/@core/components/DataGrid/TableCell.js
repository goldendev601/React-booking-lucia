import React from 'react';
import styled from 'styled-components';
import {colors} from "styles/colors";

const TableCell = styled.div`
  background: rgba(235, 216, 192, 0.3);
  border-radius: 5px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  color: ${colors.brand};
  font-weight: 600;
`;

const cell = ({params}) => <TableCell>{params.row.status || params.row.category}</TableCell>

export default React.memo(cell);