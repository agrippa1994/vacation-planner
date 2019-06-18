import { browser, element, by } from 'protractor';
import { TabsPage } from './tabspage';

export class SettingsPage implements TabsPage {

    pageUrl: string = "settings";

    async isShown(): Promise<boolean> {
        const url = await browser.getCurrentUrl();
        return url.indexOf(this.pageUrl) !== -1;
    }

    async clickSave(): Promise<void> {
        return await element(by.id("save")).click();
    }

    async enterServerUrl(url: string): Promise<void> {
        await element(by.css("#url")).click();
        await browser.actions().sendKeys(url).perform();
    }

    async enterUsername(username: string): Promise<void> {
        await element(by.css("#username")).click();
        await browser.actions().sendKeys(username).perform();
    }
}