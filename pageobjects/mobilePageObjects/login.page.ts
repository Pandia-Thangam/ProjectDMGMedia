import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {

    public get allowNotification() {
        return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]');
    }

    public get cancelUpdate() {
        return $('//android.widget.Button[@resource-id="android:id/button2"]');
    }

    public get continueButton() {
        return $('//android.widget.TextView[@text="Continue"]');
    }

    public get failOverPopUp() {
        return $('//*[@text="Failover"]');
    }

    public get failOverPopUpClose() {
        return $('//android.widget.TextView[@text="This is a failover test."]/preceding-sibling::android.view.ViewGroup/android.view.ViewGroup');
    }

    public get welcomeSplashPage1() {
        return $('//android.widget.TextView[@text="Step 1 of 5"]');
    }

    public get welcomeSplashPage2() {
        return $('//android.widget.TextView[@text="Step 2 of 5"]');
    }

    public get welcomeSplashPage3() {
        return $('//android.widget.TextView[@text="Step 3 of 5"]');
    }

    public get welcomeSplashPage4() {
        return $('//android.widget.TextView[@text="Step 4 of 5"]');
    }

    public get welcomeSplashPage5() {
        return $('//android.widget.TextView[@text="Step 5 of 5"]');
    }

    public get newspaperButton() {
        return $('~Newspaper');
    }

    public get recentSpecialsSeeMore() {
        return $('//android.widget.TextView[@text="SEE MORE"]');
    }

    public get allIssuesHeader() {
        return $('//*[@text="All issues"]');
    }

    public get imagesCountTxt() {
        return $('//android.widget.Image[@text="image"]/following-sibling::android.widget.TextView');
    }

    public get articleFirstImage() {
        return $('//android.widget.Image[@text="image"]');
    }

    public get settingsButton() {
        return $('//android.widget.TextView[@text="Settings"]');
    }

    public get scrollToRecentIssues() {
        return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Recent issues")');
    }

    public get scrollToRecentIssuesSeeMore() {
        return $('android=new UiScrollable(new UiSelector().className("android.widget.HorizontalScrollView").instance(2).scrollable(true)).setAsHorizontalList().scrollIntoView(new UiSelector().text("SEE MORE"))');
    }

    public get recentIssues() {
        return $('//android.widget.TextView[@text="Recent issues"]');
    }

    public get januarySixEdition() {
        return $('//android.widget.TextView[@text="6 January 2024"]');
    }

    public articleEdition(edition: string) {
        return $(`//android.widget.TextView[@text="${edition}"]`);
    }

    public articleEditionTitle(edition: string) {
        return $(`//android.widget.TextView[@text="${edition}"]`);
    }

    public get mailPlusEditionLogin() {
        return $('//android.widget.TextView[@text="Sign in"]');
    }

    public get signInMailAccHeader() {
        return $('//android.widget.TextView[@text="Sign in to your Mail account"]');
    }

    public get loginInEmailTextBox() {
        return $('//android.widget.EditText[@resource-id="login.email"]');
    }

    public get loginInPasswordTextBox() {
        return $('//android.widget.EditText[@resource-id="login.password"]');
    }

    public get loginInSignInButton() {
        return $('//android.widget.Button[@text="Sign in"]');
    }

    public get articleFrontPage() {
        return $('//android.widget.TextView[@text="Front page"]');
    }

    public get articleBackButton() {
        return $('~Tap me to get out of the reader');
    }

    public downloadIconforJanuarySix(edition: string) {
        return $(`//android.widget.TextView[@text="${edition}"]/following-sibling::android.view.ViewGroup/android.view.ViewGroup`);
    }

    public get mousePage() {
        return $('//androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout');
    }

    public get imagesCloseButton() {
        return $('//android.widget.TextView[@text="Close"]');
    }

    public get squeakyCleanMouseTxt() {
        return $('//android.widget.TextView[@text="The squeaky-clean mouse"]');
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async acceptNotification() {
        await browser.pause(5000);
        await this.allowNotification.waitForDisplayed();
        await this.allowNotification.click();

        var cancelUpdateFlag = await this.cancelUpdate.isDisplayed();
        if (cancelUpdateFlag === true) {
            await this.cancelUpdate.click();
        }

        await this.failOverPopUp.waitForDisplayed({ timeout: 5000 });
        await this.failOverPopUpClose.click();
        await browser.pause(2000);
    }

    public async continueNextStepsOnSplash() {
        await this.welcomeSplashPage1.waitForDisplayed({ timeout: 5000 });
        await this.continueButton.click();
        await this.welcomeSplashPage2.waitForDisplayed({ timeout: 4000 });
        await this.continueButton.click();
        await this.welcomeSplashPage3.waitForDisplayed({ timeout: 2000 });
        await this.continueButton.click();
        await this.welcomeSplashPage4.waitForDisplayed({ timeout: 2000 });
        await this.continueButton.click();
        await this.welcomeSplashPage5.waitForDisplayed({ timeout: 2000 });
        await this.continueButton.click();
        await this.newspaperButton.waitForDisplayed({ timeout: 2000 });
    }

    public async scrollToRecentSpecials() {
        await this.scrollToRecentIssues;
        if (await this.recentIssues.isDisplayed()) {
            console.log("Test@ True");
        }
        await browser.pause(2000);
    }

    public get archivesTab() {
        return $('~Tap me to open the archive');
    }

    public async accessArchives() {
        await this.archivesTab.click();
        await this.allIssuesHeader.waitForDisplayed({ timeout: 5000 });
        await browser.pause(4000);
    }

    public async scrollHorizantallyToSeeMore() {
        const anchorPercentage = 50
        const startPointPercentage = 80
        const endPointPercentage = 20

        const { height, width } = await browser.getWindowSize();
        const anchor = height * anchorPercentage / 100
        const startPoint = width * startPointPercentage / 100
        const endPoint = width * endPointPercentage / 100

        for (let swipes = 0; swipes < 3; swipes++) {
            await browser.action('pointer', {
                parameters: { pointerType: 'touch' }
            }).move({ x: startPoint, y: anchor })
                .down({ button: 0 })
                .pause(10)
                .move({ x: endPoint, y: anchor })
                .up({ button: 0 })
                .perform()
        }

        await this.recentSpecialsSeeMore.click();
        await this.allIssuesHeader.waitForDisplayed({ timeout: 5000 });
        await browser.pause(4000);
        await $('//android.widget.TextView[@text="Archive"]').click()
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


    public async loginToMailPlusAccount(username: string, password: string) {
        await this.mailPlusEditionLogin.waitForDisplayed();
        await this.mailPlusEditionLogin.click();
        await this.signInMailAccHeader.waitForDisplayed();
        await this.loginInEmailTextBox.clearValue();
        await this.loginInEmailTextBox.setValue(username);
        await this.loginInPasswordTextBox.clearValue();
        await this.loginInPasswordTextBox.setValue(password);
        await this.loginInSignInButton.click();

        await this.failOverPopUp.waitForDisplayed();
        if (await this.failOverPopUp.isDisplayed()) {
            await this.failOverPopUpClose.click();
        }

        await this.allIssuesHeader.waitForDisplayed({ timeout: 2000 });
        await browser.pause(4000);
        await this.articleFrontPage.waitForDisplayed({ timeout: 10000 });
        await this.articleBackButton.click();
    }

    public async waitForDownloadToComplete(edition: string) {
        await this.downloadIconforJanuarySix(edition).waitForDisplayed({ timeout: 100000, reverse: true, interval: 5000 });
        await browser.pause(2000);
    }



    public async squeakyCleanPageInArticle() {
        await this.articleFrontPage.waitForDisplayed({ timeout: 10000 });

        const anchorPercentage = 50
        const startPointPercentage = 80
        const endPointPercentage = 20

        const { height, width } = await browser.getWindowSize();
        const anchorHeight = height * anchorPercentage / 100
        //const anchorWidth = width * anchorPercentage / 100
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

    public get imagesCountInGallery() {
        return $('(//android.widget.TextView)[1]');
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

    public async swipeToHomePage() {
        await browser.pause(4000);

        for (let i = 0; i < 10; i++) {
            await browser.back();
            if (await this.settingsButton.isDisplayed()) { break; }
        }
    }

    public open() {
        return super.open('login');
    }
}

export default new LoginPage();
