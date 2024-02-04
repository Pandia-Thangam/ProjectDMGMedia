import { $ } from '@wdio/globals'
import Page from './page.js';

class ArchivesTab extends Page {

    public get articleFrontPage() {
        return $('//android.widget.TextView[@text="Front page"]');
    }

    public get articleBackButton() {
        return $('~Tap me to get out of the reader');
    }

    public get mousePage() {
        return $('//androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout');
    }

    public get articleFirstImage() {
        return $('//android.widget.Image[@text="image"]');
    }

    public get imagesCountTxt() {
        return $('//android.widget.Image[@text="image"]/following-sibling::android.widget.TextView');
    }

    public get imagesCountInGallery() {
        return $('(//android.widget.TextView)[1]');
    }

    public get imagesCloseButton() {
        return $('//android.widget.TextView[@text="Close"]');
    }

    public get squeakyCleanMouseTxt() {
        return $('//android.widget.TextView[@text="The squeaky-clean mouse"]');
    }


    public articleEditionTitle(edition: string) {
        return $(`//android.widget.TextView[@text="${edition}"]`);
    }

    public async backToArchiveFromEdition() {
        await this.articleFrontPage.waitForDisplayed({ timeout: 10000 });
        await this.articleBackButton.click();
    }

    
    public async squeakyCleanPageInArticle() {
        await this.articleFrontPage.waitForDisplayed({ timeout: 10000 });

        const anchorPercentage = 50
        const startPointPercentage = 80
        const endPointPercentage = 20

        const { height, width } = await browser.getWindowSize();
        const anchorHeight = height * anchorPercentage / 100
        const startPoint = width * startPointPercentage / 100
        const endPoint = width * endPointPercentage / 100

        for (let swipes = 0; swipes < 2; swipes++) {
            await browser.action('pointer', {
                parameters: { pointerType: 'touch' }
            }).move({ x: startPoint, y: anchorHeight })
                .down({ button: 0 })
                .pause(10)
                .move({ x: endPoint, y: anchorHeight })
                .up({ button: 0 })
                .perform()
        }
        await this.mousePage.click();
    }

    public async getImagesCountAndAccessImageToSwipe() {
        let imagesCount = await this.imagesCountTxt.getText();
        await this.articleFirstImage.click();
        await browser.pause(4000);

        const anchorPercentage = 50
        const startPointPercentage = 80
        const endPointPercentage = 20
        const { height, width } = await browser.getWindowSize();
        const anchor = height * anchorPercentage / 100
        const startPoint = width * startPointPercentage / 100
        const endPoint = width * endPointPercentage / 100

        for (let swipes = 1; swipes < Number(imagesCount); swipes++) {
            await browser.action('pointer', {
                parameters: { pointerType: 'touch' }
            }).move({ x: startPoint, y: anchor })
                .down({ button: 0 })
                .pause(10)
                .move({ x: endPoint, y: anchor })
                .up({ button: 0 })
                .perform()
        }
    }

    public async getImagesCountInGallery() {
        let imagesCountText = await this.imagesCountInGallery.getText();
        let imagesCount = imagesCountText.split('of')[1].trim();
        return Number(imagesCount);
    }

    public async closeTheImagesGallery() {
        await this.imagesCloseButton.click();
        await browser.pause(4000);
    }
}

export default new ArchivesTab();
