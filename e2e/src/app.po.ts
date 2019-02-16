import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getDob() {
    return element(by.id('dob'));
  }

  getPnr() {
    return element(by.id('pnr'));
  }
}
