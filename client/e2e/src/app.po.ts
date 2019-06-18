import { browser, by, element } from 'protractor';
import { TabsPage } from './tabspage';

export class AppPage {

  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return element(by.css('ion-title')).getText();
  }

  async gotoTab(tab: TabsPage) {
    const location = await element(by.css(`ion-tab-button[tab=${tab.pageUrl}]`)).getWebElement();
    await browser.actions().click(location);
  }

}
