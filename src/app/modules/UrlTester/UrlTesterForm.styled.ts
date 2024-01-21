import { COLORS } from '@/app/consts/app.const';
import styled from '@emotion/styled';
import { TextareaAutosize } from '@mui/material';

export const Textarea = styled(TextareaAutosize)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 6px 12px;
  border-radius: 8px;
  resize: vertical;
  border: none;
  outline: solid 1px ${COLORS.black};
  border-radius: 1px;
  &:focus {
    outline: solid 2px ${COLORS.black};
  }
`;
