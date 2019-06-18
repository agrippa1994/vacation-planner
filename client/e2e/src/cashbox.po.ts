import { TabsPage } from './tabspage';
import { browser } from 'protractor';

export class CashboxPage implements TabsPage {

    pageUrl: string = "cashbox";

    async isShown(): Promise<boolean> {
        const url = await browser.getCurrentUrl();
        return url.indexOf(this.pageUrl) !== -1;
    }

}
