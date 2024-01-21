'use client';
import React from 'react';
import { IResult } from './UrlTester';
import UrlTesterResultsTable from './UrlTesterResultsTable';
import { Box } from '@mui/material';

interface IProps {
  results: IResult[];
}

const UrlTesterResults: React.FC<IProps> = ({ results }) => (
  <Box>
    <h2>Результати:</h2>
    <UrlTesterResultsTable {...{ results }} />
  </Box>
);

export default UrlTesterResults;
