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
  const [websitesInput, setWebsitesInput] = useState('');
  const [results, setResults] = useState<IResult[]>([]);
  return (
    <>
      <Box>
        <UrlTesterForm {...{ websitesInput, setWebsitesInput, setResults }} />
      </Box>
      {results.length > 0 && <UrlTesterResults {...{ results, websitesInput }} />}
    </>
  );
};
