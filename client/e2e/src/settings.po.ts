import { browser, element, by } from 'protractor';
import { TabsPage } from './tabspage';
/**
 * @ignore
 */
export class SettingsPage implements TabsPage {

    pageUrl: string = "settings";
    /**
     * @ignore
     */
    async clickSave() {
        await element(by.id("save")).click();
    }
    /**
     * @ignore
     */
    async enterUsername(username: string){
        await element(by.css("#username")).click();
        await browser.actions().sendKeys(username).perform();
    }
}