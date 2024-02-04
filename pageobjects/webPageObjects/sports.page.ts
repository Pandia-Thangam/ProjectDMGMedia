import { $ } from '@wdio/globals'
import Page from './page.ts';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SportPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get tablesButton () {
        return $('//a[text()="Tables"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async accessTables () {
        await this.tablesButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('login');
    }
}

export default new SportPage();
