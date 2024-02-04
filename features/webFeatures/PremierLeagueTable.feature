Feature: Validate the Premier league table.

  Scenario Outline: Get the Position and Points for the given team from the Premier League table.
    Given I am on the MailOnline page
    When Access Sports Page and go to Tables
    Then I get the position and points for my team - '<teamName>'

    Examples: 
      | teamName    |
      | Aston Villa |
      | Everton     |
