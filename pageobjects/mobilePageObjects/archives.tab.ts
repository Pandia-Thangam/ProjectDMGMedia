import { $ } from '@wdio/globals'
import Page from './page.js';

class ArchivesTab extends Page {

    public articleEdition(edition: string) {
        return $(`//android.widget.TextView[@text="${edition}"]`);
    }

    public downloadIconforJanuarySix(edition: string) {
        return $(`//android.widget.TextView[@text="${edition}"]/following-sibling::android.view.ViewGroup/android.view.ViewGroup`);
    }

    public get allIssuesHeader() {
        return $('//*[@text="All issues"]');
    }


    public async scrollVertToExpectedEdition(edition: string) {
        await browser.pause(2000);
        const anchorPercentage = 50
        const startPointPercentage = 80
        const endPointPercentage = 20

        const { height, width } = await browser.getWindowSize();
        const anchor = width * anchorPercentage / 100
        const startPoint = height * startPointPercentage / 100
        const endPoint = height * endPointPercentage / 100

        for (let swipes = 0; swipes < 5; swipes++) {
            await browser.action('pointer', {
                parameters: { pointerType: 'touch' }
            }).move({ x: anchor, y: startPoint })
                .down({ button: 0 })
                .pause(10)
                .move({ x: anchor, y: endPoint })
                .up({ button: 0 })
                .perform()
            if (await this.articleEdition(edition).isDisplayed()) { break; }
        }
    }
    
    public async clickTheArticle(edition: string) {
        await this.articleEdition(edition).click()
    }

    public async waitForDownloadToComplete(edition: string) {
        await this.downloadIconforJanuarySix(edition).waitForDisplayed({ timeout: 100000, reverse: true, interval: 5000 });
        await browser.pause(2000);
    }
}

export default new ArchivesTab();
