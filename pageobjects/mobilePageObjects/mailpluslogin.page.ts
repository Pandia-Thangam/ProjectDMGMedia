import { $ } from '@wdio/globals'
import Page from './page.js';

class MailPlusLoginPage extends Page {

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

    public get failOverPopUp() {
        return $('//*[@text="Failover"]');
    }

    public get failOverPopUpClose() {
        return $('//android.widget.TextView[@text="This is a failover test."]/preceding-sibling::android.view.ViewGroup/android.view.ViewGroup');
    }

    public get allIssuesHeader() {
        return $('//*[@text="All issues"]');
    }

    public get articleFrontPage() {
        return $('//android.widget.TextView[@text="Front page"]');
    }

    public get articleBackButton() {
        return $('~Tap me to get out of the reader');
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
    }

}

export default new MailPlusLoginPage();
