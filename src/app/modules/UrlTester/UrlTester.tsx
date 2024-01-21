'use client';

import { useState } from 'react';
import UrlTesterForm from './UrlTesterForm';
import UrlTesterResults from './UrlTesterResults';
import { Box } from '@mui/material';

export interface IResult {
  url: string;
  status: string;
  ip: string;
}

export const UrlTester = () => {
  const [hostsInput, setHostsInput] = useState('');
  const [results, setResults] = useState<IResult[]>([]);
  return (
    <>
      <Box>
        <UrlTesterForm {...{ hostsInput, setHostsInput, setResults }} />
      </Box>
      {results.length > 0 && <UrlTesterResults {...{ results }} />}
    </>
  );
};
