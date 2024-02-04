import { $ } from '@wdio/globals'
import Page from './page.js';

class NewsPaperTab extends Page {

    public get scrollToRecentIssues() {
        return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Recent issues")');
    }

    public get recentIssues() {
        return $('//android.widget.TextView[@text="Recent issues"]');
    }

    public get recentSpecialsSeeMore() {
        return $('//android.widget.TextView[@text="SEE MORE"]');
    }

    public get allIssuesHeader() {
        return $('//*[@text="All issues"]');
    }

    public get settingsButton() {
        return $('//android.widget.TextView[@text="Settings"]');
    }

    public get archivesTab() {
        return $('~Tap me to open the archive');
    }

    public get allowNotification() {
        return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]');
    }

    public get cancelUpdate() {
        return $('//android.widget.Button[@resource-id="android:id/button2"]');
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

    public get continueButton() {
        return $('//android.widget.TextView[@text="Continue"]');
    }

    public get newspaperButton() {
        return $('~Newspaper');
    }


    public async scrollToRecentSpecials() {
        await this.scrollToRecentIssues;
        if (await this.recentIssues.isDisplayed()) {
            console.log("Test@ True");
        }
        await browser.pause(2000);
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
    }

    public async clickSeeMoreAndAccessArchive() {
        await this.recentSpecialsSeeMore.click();
        await this.allIssuesHeader.waitForDisplayed({ timeout: 5000 });
        await browser.pause(4000);
        await $('//android.widget.TextView[@text="Archive"]').click()
    }

    public async accessArchives() {
        await this.archivesTab.click();
        await this.allIssuesHeader.waitForDisplayed({ timeout: 5000 });
        await browser.pause(4000);
    }

    public async swipeToHomePage() {
        await browser.pause(4000);

        for (let i = 0; i < 10; i++) {
            await browser.back();
            if (await this.settingsButton.isDisplayed()) { break; }
        }
    }

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

}

export default new NewsPaperTab();
