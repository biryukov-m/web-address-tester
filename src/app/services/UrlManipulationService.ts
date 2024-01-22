import isUrl from 'is-url';

export class UrlManipulationService {
  prependHttps(url: string): string {
    if (!url.match(/^https?:\/\//)) {
      return `https://${url}`;
    }
    return url;
  }

  extractHostname(url: string): string {
    const urlObject = new URL(this.prependHttps(url));
    return urlObject.hostname;
  }

  isValidUrl(url: string): boolean {
    return isUrl(url);
  }

  convertStrToHostsArr = (str: string) =>
    str
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => this.isValidUrl(this.prependHttps(url)));
}

export const urlManipulationService = new UrlManipulationService();
