
export interface TabsPage {
    pageUrl: string;

    isShown(): Promise<boolean>
}
