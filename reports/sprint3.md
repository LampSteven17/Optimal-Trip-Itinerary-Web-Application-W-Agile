# Sprint 3 - Team 10 - Two Hands Up

## Goal: Build a trip!
### Sprint Leader: Ryan Kughn


## Definition of Done

* The version in `server/pom.xml` is `<version>3.0</version>`.
* The Product Increment release for `v3.0` created on GitHub.
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
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Maintain coverage at 50%.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics

**Protocol Version 3**: This epic is meant to update the backend.  This will include
the updating the config object and creating the trip object.  This will
allow for the user to get their trip information from the server.

**More Destinations**: This epic allows the user to add destinations that will fill
in the itinerary.  We will need to show the path of the destinations on the map.
  We will also need to show the round trip distance and handle wrapping issues.
  
**Itinerary**: Create an itinerary for distances that has three columns.  One
for the location, one for the leg distance, and one for the cumulative distance.
  This is for round trips so it will need to account for that.
  
**Load**: This epic is meant to allow the user to upload a file that contains the
trip information.  Will need to be in JSON or CSV formats.

**Modify Itinerary**: This epic will allow the user to change a multitude of different
settings in the itinerary.  Allow the user to change the starting location, while
maintaining the order.  Also allow user the reverse the order of destinations, and delete
destinations.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 5 | *count* |
| Tasks |  21   | *count* | 
| Story Points |  38  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 3/6/2020 | 4 | 5 |  |
| 3/6/2020 | 5 | 4 |  | 
###Scrum 3/6 
####CLOSED TASKS (before today): 
* Austin: #165
* Ryan: #201
* Cade: 
* Steven: #241 #202

####IN PROGRESS: 
* Austin: #209
* Ryan: #207
* Cade: #204 #236
* Steven: #203

###Scrum 3/6 
####CLOSED TASKS (before today): 
* Austin: #209
* Ryan: 
* Cade: #204 #236
* Steven: #240 #238

####IN PROGRESS: 
* Austin: #208
* Ryan: #207
* Cade: #235
* Steven: #235


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