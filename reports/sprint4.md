# Sprint 4 - *T10* - *Two Hands Up*

## Goal: Optimize the trip!
### Sprint Leader: *Cade McCumber*


## Definition of Done

* The version in `server/pom.xml` is `<version>3.0</version>`.
* The Product Increment release for `v4.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and restrospective are captured below.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap and ReactLeaflet for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio <= 5).
* Minimize code smells and duplication.
* Fix easy errors before merging a PR

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Maintain coverage at 60%.
* Submit PR's with tests

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.
* Have daily scrum meetings on class days over Discord/Slack
* Integrate new group members and have everyone contribute.


## Planned Epics
* Protocol Version 4 
    - This epic is meant to update the server side with the ability to provide optimization
    options and update the trip/config schema to reflect the protocol changes.
* Save
    - This epic focuses on allowing perspective users to save their data in different formats. 
    For maps that is KML (Keyhole Markup) and SVG (Scalable Vector Graphics), and save their 
    itinerary in JSON or CSV (Comma separated) formats.
* Load 
    - This epic focuses on having the ability to load pre formatted JSON or CSV files to automate
     the loading and creating of a trip. This prevents tedious data entry, and can make sharing 
     and testing trips easy, as well as viewing and reusing previous trips after a save.
* Optimize
    - User based. Allow the user to optimize a trip. Provide the user interface the 
    abstracts the optimization and results in quick and non use-hindering times and interface.
* Modify Itinerary 
    - User based epic. This epic is to provide the interface for the user to rearrange or otherwise
    modify their current itinerary. So users don't have to delete and re-enter destinations, instead 
    allowing a modifyable and plastic itinerary.
* Modify Destination
    - Modify the final destination of a trip.
* Standard Units
    - User based. This epic is designed to give an option for units distance is to be measured in. 
    Picking from Miles, Kilometers, and Nautical Miles.



## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 7 | 0 |
| Tasks |  20   | 1 | 
| Story Points |  39  | 1 | 


## Scrums DAY SUMMARY

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 4/1 | 3 | 5 | - | 
| 4/3 | 3 | 6 | - | 
| 4/6 | 3 | 5 | Richard left the group |

### SCRUM 4/1 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | 0 | #265 |
| Steve | #292 | #264 |
| Austin | #285 | #287 |
| Richard | 0 | #298 |
| Cade | #297 | #295 |

### SCRUM 4/3 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | 0 | #265, #312 |
| Steve | #308, #307 | #264 |
| Austin | 0| #287 |
| Richard | 0 | #298 |
| Cade | #295 | #294 |

### SCRUM 4/6 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | #312 | #265 |
| Steve | #264 | #318, #299 |
| Austin | 0 | #287 |
| Cade | #314 | #294 |

### SCRUM (TEMPLATE) DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | 0 | 0 |
| Steve | 0 | 0 |
| Austin | 0 | 0 |
| Cade | 0 | 0 |

## Review

### Epics done  

### Epics not done 

### What went well

### Problems encountered and resolutions


## Retrospective

### What we changed this sprint

### What went well

### Potential improvements

### What we will change next time
