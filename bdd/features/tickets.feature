Feature: CRD Tickets
Description: User wants to be able to display, create and delete tickets.

  Scenario Outline: Tickets are shown
    Given User visits "<page>" page
    Then User sees the list of tickets

    Examples:
      | page |
      | home |

  Scenario Outline: Create Page is displayed correctly
    Given User visits "<page>" page
    Then Form is displayed as expected

    Examples:
      | page   |
      | create |

  Scenario Outline: Ticket is created
    Given User visits "<page>" page
    When User completes form
    When User submits form
    Then Page should show ticket submission

    Examples:
      | page   |
      | create |
  # TODO: Fix this and make DB run with test database
  # To run we need to spin up db and next and maybe run it twice
  # Scenario Outline: DB is updated when ticket is created
  #   Given User visits "<page>" page
  #   When User completes form
  #   When User submits form
  #   Then DB should be updated with created ticket
  #   Examples:
  #     | page   |
  #     | create |

  Scenario Outline: Ticket is deleted
    Given User visits "<page>" page
    When User completes form
    When User submits form
    Given User visits "<page2>" page
    When User deletes ticket
    # Tricky way to refresh list since it seems it doesn't work for cucumber
    Given User visits "<page2>" page
    Then Ticket is not present

    Examples:
      | page   | page2 |
      | create | home  |
