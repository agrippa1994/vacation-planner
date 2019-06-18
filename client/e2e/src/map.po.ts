import { TabsPage } from './tabspage';
import { browser } from 'protractor';

export class MapPage implements TabsPage {

    pageUrl: string = "map";

    async isShown(): Promise<boolean> {
        const url = await browser.getCurrentUrl();
        return url.indexOf(this.pageUrl) !== -1;
    }
}