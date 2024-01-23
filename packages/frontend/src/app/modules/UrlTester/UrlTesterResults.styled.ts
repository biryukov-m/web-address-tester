import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { darken } from '@mui/material/styles';
import { COLORS } from '@/app/consts/app.const';

export const CustomDataGrid = styled(DataGrid)`
  .available {
    background-color: ${COLORS.accent};
    &:hover {
      background-color: ${darken(COLORS.accent, 0.1)};
    }
    &.Mui-selected {
      background-color: ${darken(COLORS.accent, 0.15)};
    }
  }
`;
