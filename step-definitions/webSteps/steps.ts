import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'
import cucumberJson from 'wdio-cucumberjs-json-reporter';

import MailOnlinePage from '../../pageobjects/webPageObjects/mailOnline.page.ts';
import VideoPage from '../../pageobjects/webPageObjects/video.page.ts';
import SportsPage from '../../pageobjects/webPageObjects/sports.page.ts';
import PremierTablesPage from '../../pageobjects/webPageObjects/premierTables.page.ts';

const pages = {
    Video: VideoPage,
    MailOnline: MailOnlinePage
}



Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page as keyof typeof pages].open()
    await browser.maximizeWindow();
    await VideoPage.acceptCookiesIfDisplayed()
});

When(/^I click on video in page to begin playback$/, async () => {
    await VideoPage.waitForVideoPanelLoad()
    await VideoPage.playVideo()
    let advertFlagOne = await VideoPage.isAdvertOrVideoPlaying()
    if (advertFlagOne == true) {
        await VideoPage.waitForAdvertComplete()
    }
    await VideoPage.waitForVideoPanelLoad()
});

Then(/^the video is played$/, async () => {
    console.log("@text" + await VideoPage.videoPlaying.isDisplayed())
    await expect(await VideoPage.videoPlaying).toBeDisplayed()
});

When(/^I click the video again to pause playback$/, async () => {
    await VideoPage.pauseVideo()
});

Then(/^the video is paused$/, async () => {
    console.log("@text" + await VideoPage.videoPaused.isDisplayed())
    await expect(await VideoPage.videoPaused).toBeDisplayed()
});

When(/^I click on the forward arrow to change to the next video$/, async () => {
    await VideoPage.setFirstVideoTitle();
    await VideoPage.forwardNextVideo()
});

Then(/^the next video is played$/, async () => {
    await VideoPage.waitForVideoPanelLoad()
    let advertFlagTwo = await VideoPage.isAdvertOrVideoPlaying()
    if (advertFlagTwo == true) {
        await VideoPage.waitForAdvertComplete()
    }
    await VideoPage.waitForVideoPanelLoad()
    await VideoPage.setSecondVideoTitle();
    await expect(await VideoPage.getFirstVideoTitle()).not.toEqual(await VideoPage.currentVideoTitle.getText())
});

When(/^I click on the back arrow to navigate to the previous video$/, async () => {
    await VideoPage.backPreviousVideo()
    var currentVideoTilte = await VideoPage.currentVideoTitle.getText()
    var secondVideoTilte = await VideoPage.getSecondVideoTitle()
    if (secondVideoTilte == currentVideoTilte) {
        await VideoPage.pauseVideo()
        await VideoPage.backPreviousVideo()
        await VideoPage.backPreviousVideo()
    }
});

Then(/^the previous video is played$/, async () => {
    await VideoPage.waitForVideoPanelLoad()
    await expect(await VideoPage.getFirstVideoTitle()).toEqual(await VideoPage.currentVideoTitle.getText())
});

When(/^I click on the speaker icon to mute$/, async () => {
    await VideoPage.waitForVideoPanelLoad()
    await VideoPage.playVideo()
    await VideoPage.muteTheVideo()
    await VideoPage.pauseVideo()
});

Then(/^I validate the video is muted$/, async () => {
    await expect(await VideoPage.unmuteVideoText).toBeDisplayed()
});

When(/^I click on the speaker icon to unmute$/, async () => {
    await VideoPage.playVideo()
    await VideoPage.unmuteTheVideo()
    await VideoPage.pauseVideo()
    await VideoPage.playVideo()
});

Then(/^I validate the video is unmuted$/, async () => {
    await expect(await VideoPage.muteVideoText).toBeDisplayed()
});

When(/^the video is finished completely$/, async () => {
    await VideoPage.waitForVideoPanelLoad()
    await VideoPage.playVideo()
    let advertFlag = await VideoPage.isAdvertOrVideoPlaying()
    if (advertFlag == true) {
        await VideoPage.waitForAdvertComplete()
    }
    await VideoPage.setFirstVideoTitle();
    await VideoPage.waitForVideoComplete()
});

When(/^next video should autoplay$/, async () => {
    await VideoPage.waitForVideoPanelLoad()
    await expect(await VideoPage.getFirstVideoTitle()).not.toEqual(await VideoPage.currentVideoTitle.getText())
    console.log("@text" + await VideoPage.videoPlaying.isDisplayed())
    await expect(await VideoPage.videoPlaying).toBeDisplayed()
});

Then(/^I get the position and points for my team - '(.*)'$/, async (teamName) => {
    var teamPosition = await PremierTablesPage.getPositionOfTeam(teamName)
    var teamPoints = await PremierTablesPage.getPointsOfTeam(teamName)
    cucumberJson.attach("Team name - " + teamName)
    cucumberJson.attach("Team postion - " + teamPosition)
    cucumberJson.attach("Team points - " + teamPoints)
    expect(teamPosition).not.toEqual(0)
    expect(teamPoints).not.toEqual(0)
});

When(/^Access Sports Page and go to Tables$/, async () => {
    await MailOnlinePage.accessSports();
    await SportsPage.accessTables();
});
