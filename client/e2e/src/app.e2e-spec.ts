import { AppPage } from './app.po';
import { browser } from 'protractor';
import { SettingsPage } from './settings.po';
import { settings } from 'cluster';
import { MapPage } from './map.po';
import { CashboxPage } from './cashbox.po';
import { NotesPage } from './notes.po';
import { OverviewPage } from './overview.po';

describe('new App', () => {
  let page: AppPage;
  let overviewPage: OverviewPage;
  let settingsPage: SettingsPage;
  let mapPage: MapPage;
  let cashboxPage: CashboxPage;
  let notesPage: NotesPage;

  beforeEach(() => {
    page = new AppPage();
    settingsPage = new SettingsPage();
    mapPage = new MapPage();
    cashboxPage = new CashboxPage();
    notesPage = new NotesPage();
    overviewPage = new OverviewPage();

    browser.manage().timeouts().implicitlyWait(10000);
    browser.manage().timeouts().pageLoadTimeout(2000);
    browser.sleep(1000);
  });


  it('should login', async () => {
    page.navigateTo();
    expect(await settingsPage.isShown()).toBeTruthy();

    await settingsPage.enterServerUrl("http://localhost:3000");
    await settingsPage.enterUsername("automated e2e test user");
    await settingsPage.clickSave();
  });

  it("should navigate to overview page", async () => {
    await page.gotoTab(overviewPage);
    await expect(await overviewPage.isShown()).toBeTruthy();
  });

  it("should navigate to map page", async () => {
    await page.gotoTab(mapPage);
    await expect(await mapPage.isShown()).toBeTruthy();
  });

  it("should navigate to cashbox page", async () => {
    await page.gotoTab(cashboxPage);
    await expect(await cashboxPage.isShown()).toBeTruthy();
  });

  it("should navigate to notes page", async () => {
    await page.gotoTab(notesPage);
    await expect(await notesPage.isShown()).toBeTruthy();
  });

  it("should navigate to settings page", async () => {
    await page.gotoTab(settingsPage);
    await expect(await settingsPage.isShown()).toBeTruthy();
  });

  it("should do something else", async () => {
    console.log("hi");
  });
});
