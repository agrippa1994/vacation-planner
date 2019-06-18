import { TabsPage } from './tabspage';
import { browser } from 'protractor';

export class NotesPage implements TabsPage {

    pageUrl: string = "notes";

    async isShown(): Promise<boolean> {
        const url = await browser.getCurrentUrl();
        return url.indexOf(this.pageUrl) !== -1;
    }
}
