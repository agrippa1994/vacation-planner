import { AppPage } from './app.po';
import { browser, ExpectedConditions } from 'protractor';
import { SettingsPage } from './settings.po';
import { settings } from 'cluster';
import { MapPage } from './map.po';
import { CashboxPage } from './cashbox.po';
import { NotesPage } from './notes.po';
import { OverviewPage } from './overview.po';
import { TabsPage } from './tabspage';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  it('should login', () => {
    page.navigateTo();
    const settingsPage = new SettingsPage();

    browser.wait(ExpectedConditions.urlContains(settingsPage.pageUrl));

    settingsPage.enterServerUrl("http://localhost:3000");
    settingsPage.enterUsername("automated e2e test user");
    settingsPage.clickSave();
  });

  describe("tab bar navigation", () => {

    [new OverviewPage(), new MapPage(), new CashboxPage(), new NotesPage(), new SettingsPage()].forEach((tab: TabsPage) => {

      it(`should navigate to ${tab.pageUrl} tab`, () => {
        page.navigateTo();
        page.gotoTab(tab);
        browser.wait(ExpectedConditions.urlContains(tab.pageUrl));
      });

      it(`should not change tab ${tab.pageUrl} if browser reloads page`, () => {
        browser.wait(ExpectedConditions.urlContains(tab.pageUrl));
        browser.refresh();
        browser.wait(ExpectedConditions.urlContains(tab.pageUrl));
      });

    });

  });

});
