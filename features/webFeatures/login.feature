Feature: Verify the Video player functionality.

  Scenario: As a user, I can pause/play video and forward/previous between videos
    Given I am on the Video page
    When I click on video in page to begin playback
    Then the video is played
    When I click the video again to pause playback
    Then the video is paused
    When I click on the forward arrow to change to the next video
    Then the next video is played
    When I click on the back arrow to navigate to the previous video
    Then the previous video is played

  Scenario: As a user, I can mute and unmute video
    Given I am on the Video page
    When I click on the speaker icon to mute
    Then I validate the video is muted
    When I click on the speaker icon to unmute
    Then I validate the video is unmuted

  Scenario: As a user, I can see the video autoplay to next video
    Given I am on the Video page
    When the video is finished completely
    Then next video should autoplay

