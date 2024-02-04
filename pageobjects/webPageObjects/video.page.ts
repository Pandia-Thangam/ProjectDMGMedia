import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class VideoPage extends Page {
    /**
     * define selectors using getter methods
     */

    firstVideoTxtTitle = {
        videoTitle: "",
        get currentVideo() {
            return this.videoTitle;
        },
    
        set currentVideo(titleTxt) {
            this.videoTitle = titleTxt;
        }
    }

    async setFirstVideoTitle() {
        this.firstVideoTxtTitle.videoTitle = await this.currentVideoTitle.getText();
    }

    async getFirstVideoTitle() {
        return this.firstVideoTxtTitle.videoTitle;
    }

    secondVideoTxtTitle = {
        videoTitle: "",
        get currentVideo() {
            return this.videoTitle;
        },
    
        set currentVideo(titleTxt) {
            this.videoTitle = titleTxt;
        }
    }

    async setSecondVideoTitle() {
        this.secondVideoTxtTitle.videoTitle = await this.currentVideoTitle.getText();
    }

    async getSecondVideoTitle() {
        return this.secondVideoTxtTitle.videoTitle;
    }

    get videoPlayControl() {
        return $('//div[@itemprop="video"]//div[contains(@class,"vjs-play-control")]');
    }

    get currentVideoTitle() {
        return $('//div[@itemprop="video"]//div[@class="vjs-title-text"]/div')
    }

    get videoPaused() {
        return $('//div[@itemprop="video"]//div[contains(@class,"vjs-play-control vjs-control  vjs-paused")]');
    }

    get videoPlaying() {
        return $('//div[@itemprop="video"]//div[contains(@class,"vjs-play-control vjs-control  vjs-playing")]');
    }

    get cookiesGotIt() {
        return $('//button[text()="Got it"]');
    }

    get advertLabel() {
        return $('//div[@itemprop="video"]//*[text()="Advertisement"]')
    }

    get videoSource() {
        return $('//div[@itemprop="video"]//video[@class="vjs-tech"]')
    }

    get videoPreviousBtn() {
        return $('//div[@itemprop="video"]//div[contains(@class,"mol-previous-control vjs-control")]');
    }

    get videoNextBtn() {
        return $('//div[@itemprop="video"]//div[contains(@class,"mol-skip-control vjs-control")]');
    }

    get videoVolumeFull() {
        return $('//div[@itemprop="video"]//div[contains(@class, "vjs-volume-menu-button vjs-menu-button vjs-control vjs-vol-3")]')
    }

    get videoVolumeMute() {
        return $('//div[@itemprop="video"]//div[contains(@class, "vjs-volume-menu-button vjs-menu-button vjs-control vjs-vol-0")]')
    }

    get videoStartedPlay() {
        return $('//div[@itemprop="video"]//div[contains(@class, "video-js") and contains(@class, "vjs-playing")]')
    }

    get videoPausedPlay() {
        return $('//div[@itemprop="video"]//div[contains(@class, "video-js") and contains(@class, "vjs-paused")]')
    }

    get advertStartedPlay() {
        return $('//div[@itemprop="video"]//div[contains(@class, "video-js") and contains(@class, "vjs-playing") and contains(@class, "video-ad-playing")]')
    }

    get advertPausedPlay() {
        return $('//div[@itemprop="video"]//div[contains(@class, "video-js") and contains(@class, "vjs-paused") and contains(@class, "video-ad-playing")]')
    }

    get videoDuration() {
        return $('//div[@id="vjs_video_3"]//div[@class="vjs-duration-display"]')
    }

    get advertVideo() {
        return $('//div[@itemprop="video"]//div[contains(@class, "video-js") and contains(@class, "video-ad-playing")]')
    }

    get muteVideoText() {
        return $('(//span[text()="Mute"])[1]')
    }

    get unmuteVideoText() {
        return $('(//span[text()="Unmute"])[1]')
    }


    async isCookiesDisplayed() {
        return await this.cookiesGotIt.isDisplayed();
    }

    async isVideoPlaying() {
        return await this.videoPlaying.isDisplayed();
    }

    async isVideoPaused() {
        return await this.videoPaused.isDisplayed();
    }

    async isAdvertDisplayed() {
        return await this.advertLabel.isDisplayed();
    }

    async isVideoDisplayed() {
        return await this.videoSource.isDisplayed();
    }

    async isAudioMuted() {
        return await this.videoVolumeMute.isDisplayed();
    }

    async isAudioFull() {
        return await this.videoVolumeFull.isDisplayed();
    }

    async acceptCookiesIfDisplayed() {
        if (await this.isCookiesDisplayed()) {
            await this.cookiesGotIt.click();
        }
        await browser.pause(2000);
    }

    async waitForVideoPanelLoad() {
        await browser.pause(2000);
    }

    async waitForVideoToPlay() {
        const elem = await this.videoStartedPlay;
        await browser.waitUntil(async function () {
            return (await elem.isDisplayed()) === true
        }, {
            timeout: 3000,
            timeoutMsg: 'Video not started playing'
        })
    }

    get skipAdFrame() {
        return $('(//iframe[@title="Advertisement"])[1]');
    }

    get skipAdButton() {
        return $('/html/body/div[1]/div[3]/div[1]/div[2]/button/div[1]');
    }

    async waitForAdvertComplete() {
        await browser.pause(6000);
        if (await this.videoPausedPlay.isDisplayed()) {
            await this.videoPlayControl.click();
        }
        if (await this.skipAdButton.isDisplayed()) {
            await this.skipAdButton.click();
        }
        await this.advertVideo.waitForExist({ timeout: 150000, reverse: true, interval: 3000 });
    }

    async videoTitleWithCurrentTitle(title: string) {
        return $(`//*[text()="${title}"]`);
    }

    async waitForVideoComplete() {
        await browser.pause(2000);

        let videoFullDuration = await this.videoDuration.getText();
        const timeArray = await (videoFullDuration.split("\n")[1].split(":"));
        const totalTime = (Number(timeArray[0]) * 60) + (Number(timeArray[1]));
        const totalTimeInMs = (totalTime * 1000) + 3000;

        let currentVideoTitle = await this.currentVideoTitle.getText();

        if (await this.videoPausedPlay.isDisplayed()) {
            await this.videoPlayControl.click();
        }

        await (await this.videoTitleWithCurrentTitle(currentVideoTitle)).waitForExist({ timeout: totalTimeInMs, reverse: true, interval: (totalTime / 5) });
    }

    async isAdvertOrVideoPlaying() {
        let advertFlag = false;
        if (await this.advertVideo.isDisplayed()) {
            advertFlag = true;
        }
        return advertFlag
    }


    async playVideo() {
        await this.videoPlayControl.click();
        await browser.pause(5000);
    }

    async pauseVideo() {
        if (await this.isVideoPlaying()) {
            await this.videoPlayControl.click();
        }
        await browser.pause(2000);
    }

    async forwardNextVideo() {
        await this.videoNextBtn.click();
        await browser.pause(3000);
    }

    async backPreviousVideo() {
        await this.videoPreviousBtn.click();
    }

    async muteTheVideo() {
        if (await this.isAudioFull()) {
            await this.videoVolumeFull.click();
        }
    }

    async unmuteTheVideo() {
        if (await this.isAudioMuted()) {
            await this.videoVolumeMute.click();
        }
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open() {
        return super.open('video/index.html');
    }

}

export default new VideoPage();
