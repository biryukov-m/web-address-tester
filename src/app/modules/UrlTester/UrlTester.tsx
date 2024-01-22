'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { IResult } from '@/app/types/types';
import { UrlTesterForm } from './UrlTesterForm';
import { UrlTesterResults } from './UrlTesterResults';
import { CustomizedSnackbars } from '../common/CustomizedSnackbars';
import { CircularProgressWithLabel } from '../common/CircularProgressWithLabel';

export const UrlTester = () => {
  const [hostsInput, setHostsInput] = useState('');
  const [results, setResults] = useState<IResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [snackbar, setSnackbar] = useState(false);

  return (
    <>
      {!isLoading && (
        <UrlTesterForm
          {...{
            hostsInput,
            setHostsInput,
            setResults,
            isLoading,
            setIsLoading,
            progress,
            setProgress,
            setSnackbar
          }}
        />
      )}
      <Box>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',

              alignItems: 'center',
              gap: '18px'
            }}
          >
            <div>
              <CircularProgressWithLabel value={progress} />
            </div>
            <h4>Триває тестування...</h4>
          </Box>
        ) : (
          <h2>Результати</h2>
        )}
        <UrlTesterResults {...{ results, progress, isLoading }} />
      </Box>
      <CustomizedSnackbars {...{ open: snackbar, setOpen: setSnackbar }} />
    </>
  );
};
