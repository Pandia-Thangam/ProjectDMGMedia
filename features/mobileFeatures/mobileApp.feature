Feature: Mobile App test scenarios for Mail+ Editions Mobile app

  Scenario Outline: Verify the Newspaper edition is downloadable.
    Given I access the Recent Issues on The Mail plus mobile app
    When I click on the <edition> to see Sign in to your Mail account page
    And I successfully login to Mail Plus Account with <username> and <password>
    Then I can see that <edition> edition is started download
    And the <edition> download is completed within some time and <editionTitle> title ready to access

    Examples: 
      | edition        | username               | password  | editionTitle        |
      | 6 January 2024 | mailqatest94@gmail.com | World123! | Saturday, 6 January |

  Scenario Outline: Verify the Images on Gallery section for <edition>.
    Given I access the <edition> which is downloaded already
    When I swipe to squeaky clean mouse article and open Gallery of the article
    Then I should be able to swipe through all Gallery images
    And on closing the gallery I should be able to go back to acticle page

    Examples: 
      | edition        | 
      | 6 January 2024 |
