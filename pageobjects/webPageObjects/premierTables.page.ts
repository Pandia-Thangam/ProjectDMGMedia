import { $ } from '@wdio/globals'
import Page from './page.ts';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PremierTablesPage extends Page {
    /**
     * define selectors using getter methods
     */

    get tableHeader() {
        return $('//div[text()="Premier League Table"]');
    }

    public teamTablePosition(teamName: string) {
        return $(`(//td[text()="${teamName}"])[2]/parent::tr/td[contains(@class,"pos")]`);
    }

    public teamTablePoints(teamName: string) {
        return $(`(//td[text()="${teamName}"])[2]/parent::tr/td[contains(@class,"pts")]`);
    }

    public async getPositionOfTeam(teamName: string) {
        await this.tableHeader.waitForDisplayed({ timeout: 5000 });
        console.log('Team@: - ' + teamName);
        console.log('Position@: - ' + await this.teamTablePosition(teamName).getText());
        return await this.teamTablePosition(teamName).getText();;
    }

    public async getPointsOfTeam(teamName: string) {
        console.log('Points@: - ' + await this.teamTablePoints(teamName).getText());
        return await this.teamTablePoints(teamName).getText();
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    public open() {
        return super.open('sport/football/premier-league/tables.html');
    }
}

export default new PremierTablesPage();
