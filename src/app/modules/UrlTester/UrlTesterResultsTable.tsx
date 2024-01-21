'use client';
import React from 'react';
import { IResult } from './UrlTester';
import { GridColDef, ukUA } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Styled from './UrlTesterResultsTable.styled';
import { STATUSES } from '@/app/consts/app.const';

interface IProps {
  results: IResult[];
}
const theme = createTheme({}, ukUA);

const UrlTesterResultsTable: React.FC<IProps> = ({ results }) => {
  const rows = results.map((row, idx) => {
    return {
      url: row.url,
      ip: row.ip,
      status: row.status,
      id: idx,
      classname: row.status === STATUSES.available ? 'available' : 'unavailable'
    };
  });

  const columns: GridColDef[] = [
    { field: 'url', headerName: 'URL', width: 230, flex: 0.5 },
    { field: 'ip', headerName: 'IP-address', width: 140, flex: 0.5 },
    { field: 'status', headerName: 'Status', minWidth: 200, flex: 1 }
  ];
  return (
    <ThemeProvider theme={theme}>
      <Styled.CustomDataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 50, 100, 1000]}
        getRowClassName={(params) => `${params.row.classname}`}
        checkboxSelection
        autoHeight
      />
    </ThemeProvider>
  );
};

export default UrlTesterResultsTable;
