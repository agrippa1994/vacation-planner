import { browser } from 'protractor';
import { TabsPage } from './tabspage';

export class OverviewPage implements TabsPage {

    pageUrl: string = "overview";

    async isShown(): Promise<boolean> {
        const url = await browser.getCurrentUrl();
        return url.indexOf(this.pageUrl) !== -1;
    }

}