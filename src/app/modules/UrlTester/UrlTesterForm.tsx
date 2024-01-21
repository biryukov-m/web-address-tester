'use client';

import React from 'react';
import { IResult } from './UrlTester';
import { Box, Button } from '@mui/material';
import * as Styled from './UrlTesterForm.styled';
import hostService from '@/app/services/Host.service';
import { STATUSES } from '@/app/consts/app.const';

interface IProps {
  hostsInput: string;
  setHostsInput: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<IResult[]>>;
}

export const UrlTesterForm: React.FC<IProps> = ({ hostsInput, setHostsInput, setResults }) => {
  const handleTextareaChange = (event: React.ChangeEvent<any>) => {
    setHostsInput(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hosts = hostsInput.length > 0 ? hostService.convertStrToHostsArr(hostsInput) : null;
    if (hosts) {
      setResults([]);
      for (const host of hosts) {
        const url = hostService.prependHttps(host);
        const status = await hostService.checkHost(url);
        const ip = status === STATUSES.available ? await hostService.getIpInfo(host) : 'N/A';
        setResults((prevState) => [...prevState, { url: host, status, ip }]);
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

        <Styled.CustomTextareaAutosize
          id="websiteTextarea"
          minRows={5}
          cols={50}
          value={hostsInput}
          onChange={(e) => handleTextareaChange(e)}
          required
          minLength={10}
          placeholder="google.com або http://google.com ..."
        />
        <Button type="submit">Перевірити доступність</Button>
      </Box>
    </form>
  );
};

export default UrlTesterForm;
