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

| Statistic | # Planned | # Completed | notes |
| --- | ---: | ---: | ---: |
| Epics | 7 | 3 | |
| Tasks |  20   | 35 | we added several tasks and bugs
| Story Points |  39  | 73 | Added several tasks and bugs


## Scrums DAY SUMMARY

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 4/1 | 3 | 5 | - | 
| 4/3 | 3 | 6 | - | 
| 4/6 | 3 | 5 | Richard left the group |
| 4/8 | 4 | 4 | |
| 4/10 | 4 | 4 | |
| 4/14 | 5 | 5 | |

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

### SCRUM 4/8 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | #265 | #336 |
| Steve | #329 #330 | #299 |
| Austin | #287 | #337 |
| Cade | 0 | #294 |

### SCRUM 4/10 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | #336 | #343 |
| Steve | #352 | #299 |
| Austin | #341 | #337 |
| Cade | #294 | #296 |

### SCRUM 4/13 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | #343, #358 | #226 |
| Steve | #346 | #299 |
| Austin | #350 | #337 |
| Cade | #356 | #296, #299 |





## Review


### Epics done  

**Protocol Version 4(#291):** 
This epic led to an increased understanding in the framework and functionality of our backend,
specifically how the server and front end communicate. The biggest issue was with understanding 
how json was read through and translated into gson. We consider this epic done, because while
we have yet to fully implement optimize, w have fully constructed the framework to do so, 
and can read all trip requests.

**Modify Destinations(#290):**
This Epic provided the least problems, as most of the tasks assigned to this were already
close to implemented in our implementation of itinerary and our marker functionality.

***Load(#199):***
This epic taught us a lot about parsing with javascript, and learning to set appropriate 
variables. But main reason this was a very difficult epic had to do with representing and loading 
the data into our frontend after a file read. Both with getting appropriate markers with their
functionality, and piping files and file changes into the itinerary, this epic provided us with 
many bugs and a good source for code review.

### Epics not done 
**Modify Itinerary():**
This epic was almost completed on time, we only had a few low level tasks/bugs to put the finishing touch
on this epic. This epic helped us understand how we need to handle our state, and out current lists
of markers and places with efficiency and speed. Behaviour around delete and reverse came together
and functions well.

**Optimize()**
This Epic was just at the start of our attention as we came into the final week. We succesfully
implemented nearest neighbor as well as a way to keep track of server time and properly return on
time. We have confidence that our future implementations of the remaining algorithms will be 
quick and effectively done, as the framework is already down for their implementation.
**Save()**
This Epic helped us understand the process of writing and parsing our own data into usable and re
usable form. However, we ended up not finishing the implementations involving saving the map
as an svg or kml file, due to the difficulty and time constraints. 
**Standard Units()**
This Epic was only brought on due to our 5th group member being added saying he was comfartable
and able implementing it, and it would be done quickly as he had helped set it up in his former
group. We Got nothing done on this epic, and Iceboxed it as soon as he left the group, having not
submitted a single PR towards this.

### What went well
**Our understanding:** Our understanding of our codebase, especially the code given to us initially
by Dave and the TA's, has improved greatly. Code not previously touched, with implementations 
not understood were picked apart over discord.

**Other's code:** Through code inspections, and thorough reviews of PR's, we gained a much better 
understanding of our teammate's code, and their implementation in the sections and classes 
that we might not interact with as much. This led to a much more streamlined bug hunting precess
as everyone understood the entirety of the codebase at least functionally.

### Problems encountered and resolutions
**5th member left:* We, like all other still formed groups, got a 5th member for this sprint.
It was his second time taking the class, and he claimed he could implement some of the things
in our icebox easily and quickly, as well as help significantly with both the from and back end 
based on his prior group experience. However, he stayed with our group for over a week without
contributing anything except adding his picture on the about page, and then left. Leaving us with
epics he said he would do the majority of work with, and lacking a 5th member to help us tackle 
the extra epics we took out assuming we would have more help and an outside look/implementation.

## Retrospective

### What we changed this sprint
**Test Coverage:** We managed to follow a process of writing code, and writing tests for intended
behaviour in every necessary pull request. With this, we managed to keep out test coverage at
or above 50% for the entire sprint, and as things needed to be refactored, we honed our testing to 
reach the required goals. This also went for improving our maintainability, with a significant
reduction on code smells per pull request from our previous sprint.

**Bug Hunting:** We increasingly tested every PR, and emphasized usable test cases that led to
us finding and addressing issues before ever being merged into master.

### What went well
**Constant communication:** Despite remote learning constraints, we managed to communicate far more
than any prior sprint. Helping on any and all issues, planning and executing accordingly.

### Potential improvements
* Not rely on a unstable group member
* Start immediately, and put the same passionate work ethic into every leg of the sprint

### What we will change next time
* Plan epics according to what we believe our output can and should be, and our understanding of 
ourselves.

