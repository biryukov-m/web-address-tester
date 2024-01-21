import { STATUSES } from '../consts/app.const';
import isUrl from 'is-url';

class HostService {
  private formatToHttps(url: string): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }

  private isValidUrl(url: string): boolean {
    console.log(isUrl(url), url);
    return isUrl(url);
  }

  async getIpInfo(hostname: string): Promise<string> {
    const url = `http://ip-api.com/json/${hostname}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.query;
    } catch (error) {
      return 'N/A';
    }
  }

  async checkHost(hostname: string) {
    const url = this.formatToHttps(hostname);
    if (!this.isValidUrl(url)) {
      return 'Неправильний URL';
    }
    try {
      await fetch(url, { method: 'GET', mode: 'no-cors' });
      return STATUSES.available;
    } catch (error) {
      return STATUSES.unavailable;
    }
  }
}

const hostService = new HostService();

export default hostService;
