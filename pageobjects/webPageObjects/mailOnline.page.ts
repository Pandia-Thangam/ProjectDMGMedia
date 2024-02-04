import { $ } from '@wdio/globals'
import Page from './page.ts';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MailOnlinePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get sportButton () {
        return $('(//a[text()="Sport"])[1]');
    }


    public async accessSports () {
        await this.sportButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('home/index.html');
    }
}

export default new MailOnlinePage();
