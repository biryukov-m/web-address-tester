import { Container } from '@mui/material';
import { UrlTester } from './modules/UrlTester/UrlTester';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Home() {
  return (
    <div className="App">
      <Container>
        <h1>Check Websites</h1>
        <UrlTester />
      </Container>
    </div>
  );
}
