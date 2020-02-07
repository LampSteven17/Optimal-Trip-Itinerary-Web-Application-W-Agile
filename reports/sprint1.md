# Sprint 1 - t10 - *Two Hands Up*

## Goal: Finish About Epic and Where Am I Epic

### Where Am I?
### Sprint Leader: Austin

## Definition of Done

* Web application deployed on the production server (black-bottle.cs.colostate.edu).
* Version in server/pom.xml should be `<version>1.0</version>`.
* Product Increment release `v1.0` created on GitHub.
* Sprint Review and Restrospectives completed (team/sprint1.md).
* Design updated (team/design.md).

## Policies

* GitHub etiquette


## Plan

Epics planned for this release.

* 24 - Where Am I
* 23 About


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 4 | *count* |
| Tasks |  17   | *count* |
| Story Points |  20 | *count* |


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *01/31/2020* | 23 | 3 | *none* |
| *02/03/2020* | 48 | 4 | *none* |
| *02/05/2020* | 72 | 2 | *none* |


### Scrum 01
#### What Task did you close since our last meeting?
* Austin: none
* Steve: none
* Cade: none
* Ryan: none

#### What Task are you working on now?
* Austin: #44
* Steve: #47
* Cade: #48
* Ryan: #49

#### Any Impediments?
* Austin: No
* Steve: No
* Cade: No
* Ryan: No

### Scrum 02
#### What Task did you close since our last meeting?
* Austin: #21, #39, #34, #46
* Steve: #37, #42, #25
* Cade: #31, #40, #26
* Ryan: #41, #35 

#### What Task are you working on now?
* Austin: #63
* Steve: #66
* Cade: #71
* Ryan: #28

#### Any Impediments#28?
* Austin: No
* Steve: No
* Cade: No 
* Ryan: No

### Scrum 03
#### What Task did you close since our last meeting?
* Austin: #63, #73, #27
* Steve: #66
* Cade: #71, #76
* Ryan: #28

#### What Task are you working on now?
* Austin: #84
* Steve: #29
* Cade: #36
* Ryan: #33

#### Any Impediments?
* Austin: No
* Steve: No
* Cade: No
* Ryan: No

## Review

#### Completed epics in Sprint Backlog
**About (#23):** About was executed just as we designed. We only encountered one problem revolving around images not being uploaded. Our design uses the built in Card component from reactstrap to organize each team members biographies and images neatly and concisely.

**Where Am I (#20):** Where am I was a little bit tougher to complete but we ended up with a simple implementation that is easy to use and understand. We ended up using a home button clearly visible to the user below the map whilst leaving room for future additions.

#### Incomplete epics in Sprint Backlog
**Where Is (#24):** As a team we will be able to knock out Where Is next sprint swiftly due to it being partially completed and well planned. We have already implemented the inputs and will be able to utilize ideas we already utilized for the Where Am I epic. We still have to create a validation function and update the marker when the user has entered valid latitude and longitude. We also might need to look into parsing entries to prevent code injections.

**Server Support (#32):** We struggled to work on this epic because we were a little confused about what the customer was asking. This epic was also at the bottom of our backlog so it was the last thing that we got to. Surely by next sprint we will be more prepared to finish this epic.

#### What went well
I think the main thing that went well was team communication. Being able to communicate with each other allowed us to discuss our problems and come up with solutions in a small amount of time.
Another thing that went well was how we divided up the work. Each of us were able to pick up tasks and find solutions that were agreed upon by the team.

#### Problems encountered and resolutions
One problem that we encountered while developing Where Am I was understanding how to use callbacks and how asynchronous functions work. We were repeatedly getting null values when trying to get the users position, but we found that if we just wait to set the state until we're in the callback, then everything will happen in order.
Understanding how Base works was a bit of a challenge for all of us. Through time and use of react docs we were able to get a better understanding of how most of it works.  
Leaflet was another challenge to understand. There were a lot of functions originally in base that utilized the leaflet library that took some time to figure out..

## Retrospective

#### What went well
* Team Cohesion and Group Dynamics: 
    Our team worked exceptionally well at delegating group tasks,
    understanding who needed the most help, and adapting our individual strengths around the
    group dynamic. 
#### Potential improvements
* React.js Understanding and development: 3 of 4 members are brand new to javascript, and much more
    learning is need to help develop our skills as programmers in Javascript. 
* Identifying problems earlier: We must begin to understand which bugs are going to take more time, and 
    if a bug is unable to be fixed, developing a strategy to remove the buggy situation. 
#### What we will change next time
* Start everything just a little earlier

#### Problems encountered and resolutions
* Understanding the given code base and how it interacted with itself.
* Understanding state

#### What went well
* Working through the given communication methods and both group and self regulating tasks
* Asking good and coherent questions to groupmates
* Working through things in good time 

