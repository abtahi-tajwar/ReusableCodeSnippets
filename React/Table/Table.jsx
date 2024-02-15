import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Skeleton } from "@mui/material";
import NoData from "../Placeholders/NoData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * columns: Array<{
 *  id: string,
 *  label: string,
 *  render: (rowData) => React.ReactNode
 * }>
 *
 * rows: Array<{
 *  [key in typeof columns.id]: (string | number | boolean | React.ReactNode)
 * }>,
 * emptyMessage: {
 *  image?: url,
 *  heading?: string,
 *  description: string
 * }
 */
export default function TablePrimary({ columns, rows, isLoading, emptyMessage }) {
  if (!isLoading && rows.length !== 0) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            {columns && (
              <TableRow>
                <StyledTableCell>{columns[0].label}</StyledTableCell>
                {columns.slice(1).map((col) => (
                  <StyledTableCell align="right">{col.label}</StyledTableCell>
                ))}
              </TableRow>
            )}
          </TableHead>
          {rows && (
            <TableBody>
              {rows.map((row, ri) => (
                <StyledTableRow key={ri}>
                  <StyledTableCell component="th" scope="row">
                    {row[columns[0].id]}
                  </StyledTableCell>
                  {columns.slice(1).map((col, ci) => (
                    <>{!col.render ? <StyledTableCell align="right">{row[col.id]}</StyledTableCell> : <StyledTableCell align="right">{col.render(row)}</StyledTableCell>}</>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    );
  } else if (isLoading) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            {columns && (
              <TableRow>
                <StyledTableCell>{columns[0].label}</StyledTableCell>
                {columns.slice(1).map((col) => (
                  <StyledTableCell align="right">{col.label}</StyledTableCell>
                ))}
              </TableRow>
            )}
          </TableHead>

          <TableLoader rowsNum={3} colsNum={columns?.length} />
        </Table>
      </TableContainer>
    );
  } else {
    return (
        <NoData 
            image={emptyMessage?.image}
            heading={emptyMessage?.heading}
            description={emptyMessage?.description}
        />
    )
  }
}

const TableLoader = ({ rowsNum, colsNum }) => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      {[...Array(colsNum - 1)].map((col, index) => (
        <TableCell key={index}>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
};
