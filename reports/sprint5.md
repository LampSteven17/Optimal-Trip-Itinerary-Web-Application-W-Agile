# Sprint 5 - *T10* - *Two Hands Up*

## Goal: Finding more places to go!
### Sprint Leader: *Ryan Kughn*


## Definition of Done

* The version in `server/pom.xml` is `<version>5.0</version>`.
* The Product Increment release for `v5.0` created on GitHub.
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

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Maintain coverage at 70%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
* Protocol Version 5: 
    - Protocol Version 5 is focused on the interoprability between other client-side and server-side implementations. PV5
    will include new structures for interacting with SQL databases, and be capable of handling data returned. The architecture
    will be able to handle new client requests including querys of the database, with multiple ways to search and return data.
    
* Find: 
    - Find is focused on allowing the client side to search the databases in use on the server side. Find will query the server
    side based on information given, and will then return all matching results. Search options will include filtering and 
    key in text based search questions. This will then display the results in a mobile user friendly way, and may be 
    narrowed further with a sequential search. 
    
* User Experience: 
    - User Experience will be focused on making the website as mobile friendly as possible to use. This includes adding
    options to change the marker size, and potentially removing markers to only show the route. The itinerary must also
    be easy to view and modify. A variety of changes will be implemented to the formatting to make all buttons icon based,
    and will line up correctly in the mobile format. 
    
* Modify Itinerary: 
    - This will be a continuation of last sprints goal to accomplish this epic. Currently, changing destinations order
    and changing the starting destination are the last few tasks that still need to be accomplished. We will be completing
    this epic in tandem with user experience to make sure that all UI elements are effective in the mobile space. 
    
* Itinerary Search: 
    - This will be similar to Find, and will integrate with find in most cases for displaying found items in the itinerary. 
    This epic will be focused searching through the itinerary, and filtering it with specific keywords. Data may be pulled
    from various sources such as the database or files, and is then sorted and shown the correct results. 

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *count* |
| Tasks |  *22*   | *count* | 
| Story Points |  *42*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 4/24/20 | 2 | 4 |  | 
| 4/27/20 | 7 | 4 |  |
| 4/29/20 | 2 | 4 |  |
| 5/1/20 | 4 | 4 |  |

### SCRUM 4/24 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | 0 | #406 |
| Steve | #396 | #398 |
| Austin | #224 | #420 |
| Cade | 0 | #413 |

### SCRUM 4/27 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | #406 | #409 |
| Steve | #425 | #417 |
| Austin | #226 #434 #420 | #298 |
| Cade | #435 #413 | #407 |

### SCRUM 4/29 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | 0 | #409 |
| Steve | #417 | #411 |
| Austin | 0 | #298 |
| Cade | #407 | #408 |

### SCRUM 5/1 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | #435 | #403 |
| Steve | #441| #443 |
| Austin | 0 | #298 |
| Cade | #409 #448 | #4449 |

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