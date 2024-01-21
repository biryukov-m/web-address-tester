'use client';

import React from 'react';
import { IResult } from './UrlTester';
import { Box, Button, Typography } from '@mui/material';
import * as Styled from './UrlTesterForm.styled';
import hostService from '@/app/services/Hostname.service';
import { STATUSES } from '@/app/consts/app.const';

interface IProps {
  websitesInput: string;
  setWebsitesInput: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<IResult[]>>;
}
export const convertStrToUrlsArr = (str: string) => str.split('\n').map((url) => url.trim());

export const UrlTesterForm: React.FC<IProps> = ({
  websitesInput,
  setWebsitesInput,
  setResults
}) => {
  const urls = websitesInput.length > 0 ? convertStrToUrlsArr(websitesInput) : null;

  const handleTextareaChange = (event: React.ChangeEvent<any>) => {
    setWebsitesInput(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (urls) {
      setResults([]);

      for (const url of urls) {
        const status = await hostService.checkHost(url);
        const ip = status === STATUSES.available ? await hostService.getIpInfo(url) : 'N/A';
        setResults((prevState) => [...prevState, { url, status, ip }]);
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
          maxWidth: 600,
          flexDirection: 'column',
          rowGap: 2,
          justifyContent: 'center'
        }}
      >
        <label htmlFor="websiteTextarea">Введіть адреси сайтів (кожна з нового рядку):</label>

        <Styled.Textarea
          id="websiteTextarea"
          minRows={5}
          cols={50}
          value={websitesInput}
          onChange={(e) => handleTextareaChange(e)}
          required
          minLength={10}
          placeholder="google.com або http://google.com ..."
        />
        {urls && <Typography>Всього: {urls.length} шт.</Typography>}
        <Button type="submit">Перевірити доступність</Button>
      </Box>
    </form>
  );
};

export default UrlTesterForm;
