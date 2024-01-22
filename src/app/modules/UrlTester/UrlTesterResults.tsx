'use client';

import React from 'react';
import { GridColDef, GridToolbar, ukUA } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { STATUSES } from '@/app/consts/app.const';
import { format } from 'date-fns';
import { LinearProgress } from '@mui/material';
import { IResult } from '@/app/types/types';
import * as Styled from './UrlTesterResults.styled';

interface IProps {
  results: IResult[];
  progress: number;
  isLoading: boolean;
}

const theme = createTheme({}, ukUA);

const currentDate = new Date();
const formattedDate = format(currentDate, 'dd-MM-yyyy');
const formattedTime = format(currentDate, 'HH-mm-ss');
const csvOptions = {
  fileName: `${formattedDate}_${formattedTime}_test_host_name`,
  utf8WithBom: true
};

export const UrlTesterResults: React.FC<IProps> = ({ results, isLoading }) => {
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
    { field: 'ip', headerName: 'IP address', width: 140, flex: 0.5 },
    { field: 'status', headerName: 'Status', minWidth: 200, flex: 1 }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Styled.CustomDataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 50, 100, 1000]}
        getRowClassName={(params) => `${params.row.classname}`}
        slots={{ toolbar: GridToolbar, loadingOverlay: LinearProgress }}
        slotProps={{
          toolbar: {
            csvOptions
          }
        }}
        checkboxSelection
        autoHeight
        loading={isLoading}
        density="compact"
      />
    </ThemeProvider>
  );
};
