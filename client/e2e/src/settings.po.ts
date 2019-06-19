import { browser, element, by } from 'protractor';
import { TabsPage } from './tabspage';

export class SettingsPage implements TabsPage {

    pageUrl: string = "settings";

    async clickSave() {
        await element(by.id("save")).click();
    }

    async enterServerUrl(url: string) {
        await element(by.css("#url")).click();
        await browser.actions().sendKeys(url).perform();
    }

    async enterUsername(username: string){
        await element(by.css("#username")).click();
        await browser.actions().sendKeys(username).perform();
    }
}