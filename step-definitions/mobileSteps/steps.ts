import { Given, When, Then, After, BeforeAll } from '@wdio/cucumber-framework';
//import { expect, $ } from '@wdio/globals'

import NewsPaperTab from '../../pageobjects/mobilePageObjects/newspaper.tab.ts';
import ArchivesTab from '../../pageobjects/mobilePageObjects/archives.tab.ts';
import MailPlusLoginPage from '../../pageobjects/mobilePageObjects/mailpluslogin.page.ts';
import EditionPage from '../../pageobjects/mobilePageObjects/edition.page.ts';


Given(/^I access the Recent Issues on The Mail plus mobile app$/, async () => {
    await NewsPaperTab.scrollToRecentSpecials()
    await NewsPaperTab.scrollHorizantallyToSeeMore()
    await NewsPaperTab.clickSeeMoreAndAccessArchive()
});

When(/^I click on the (.*) to see Sign in to your Mail account page$/, async (edition) => {
    await ArchivesTab.scrollVertToExpectedEdition(edition)
    await ArchivesTab.clickTheArticle(edition)
});

When(/^I successfully login to Mail Plus Account with (.*) and (.*)$/, async (username, password) => {
    await MailPlusLoginPage.loginToMailPlusAccount(username, password)
    await EditionPage.backToArchiveFromEdition()
});

Then(/^I can see that (.*) edition is started download$/, async (edition) => {
    await ArchivesTab.waitForDownloadToComplete(edition)
});

Then(/^the (.*) download is completed within some time and (.*) title ready to access$/, async (edition, editionTitle) => {
    await expect(ArchivesTab.downloadIconforJanuarySix).not.toBeDisplayed()
    await ArchivesTab.clickTheArticle(edition)
    await EditionPage.articleFrontPage.waitForDisplayed()
    await expect(EditionPage.articleFrontPage).toBeDisplayed()
    await expect(EditionPage.articleEditionTitle(editionTitle)).toBeDisplayed()
});


Given(/^I access the (.*) which is downloaded already$/, async (edition) => {
    await NewsPaperTab.accessArchives()
    await ArchivesTab.scrollVertToExpectedEdition(edition)
    await ArchivesTab.clickTheArticle(edition)
});

When(/^I swipe to squeaky clean mouse article and open Gallery of the article$/, async () => {
    await EditionPage.squeakyCleanPageInArticle()
});

Then(/^I should be able to swipe through all Gallery images$/, async () => {
    await EditionPage.getImagesCountAndAccessImageToSwipe()
});

Then(/^on closing the gallery I should be able to go back to acticle page$/, async () => {
    var imagesCount = await EditionPage.getImagesCountInGallery()
    await expect(imagesCount).toEqual(9)
    await EditionPage.closeTheImagesGallery()
    await expect(EditionPage.squeakyCleanMouseTxt).toBeDisplayed()
});



After(async () => {
    console.log('Test@terminate')
    await NewsPaperTab.swipeToHomePage()
});

BeforeAll(async () => {
    await NewsPaperTab.acceptNotification()
    await NewsPaperTab.continueNextStepsOnSplash()
});