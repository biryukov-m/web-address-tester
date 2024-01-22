import { STATUSES } from '../consts/app.const';
import { UrlManipulationService } from './UrlManipulationService';

class HostService {
  private urlManipulationService = new UrlManipulationService();

  async getIpInfo(query: string): Promise<string> {
    const trimmedUrl = this.urlManipulationService.extractHostname(query);
    const url = `http://ip-api.com/json/${trimmedUrl}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.status === 'success') {
        return data.query;
      }
      throw new Error(data.status);
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'N/A';
    }
  }

  async checkHost(hostname: string) {
    const url = this.urlManipulationService.prependHttps(hostname);
    const timeoutMillis = 1000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMillis);
    try {
      await fetch(url, { method: 'GET', mode: 'no-cors', signal: controller.signal });
      return STATUSES.available;
    } catch (error) {
      return STATUSES.unavailable;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async checkMultipleHosts(urls: string[]): Promise<{ url: string; status: string; ip: string }[]> {
    const results = await Promise.all(
      urls.map(async (url) => {
        const status = await this.checkHost(url);
        const ip = await this.getIpInfo(url);
        return { url, status, ip };
      })
    );
    return results;
  }
}

export const hostService = new HostService();
