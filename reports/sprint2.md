# Sprint #2 - *10* - *Two Hands up*

## Goal

### What is the distance?
### Sprint Leader: *Steven Lamp*

## Definition of Done

* The version in `server/pom.xml` is `<version>2.0</version>`.
* The Product Increment release for `v2.0` created on GitHub.
* The team's web application is deployed on the production server (`black-bottle.cs.colostate.edu`).
* The design document is updated (`design.md`).
* The completed metrics are captured below.
* The scrums completed during each lecture are captured below.
* The sprint review and restrospective are captured below.


## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.

### Processes
* Master is never broken. 
* All pull request builds and tests are successful on Travis-CI.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
**\#24 - Where Is:**
    This is an epic nessecary for future features, leftover from SPRINT1. We will be implementing this
    feature as described in previous sprints. The user will be able to enter verifiable information
    into a box, in which we will then display that selected location on the map. The location must be valid 
    latlng format, and all other information will return nothing. We will also make sure to increase 
    this feature adaptability for the coming features of SPRINT2.
    
**\#32 - Server Support:** This epic is designed to show the configuration and server cabailities of the current server as well as it's state. This should be accessable by clicking on the server name in the footer.

**\#90 - Support Protocol Standard v2:** This epic revolves around utilizing REST API to create configuration for config and distance. The config object contains information about server such as team name, version, and the current supported requests. This will be routed through api/config. The distance object contains information about the distance between two (currently might upgrade) geographic locations. This will be routed through api/distance.

**#91 - Distance:**
This epic will have us allow the user to set two points on the map
and calculate the distance between them.  We will need to implement
a way for the user to select the two points via clicking the map.
We will also need allow the user to enter two points via where is.
Finally we need to display a distance line on the map, and calculate
said distance.

**\#98 - Standard Units:** This epic allows the user to change the units for the distance between two locations. The supported distances for this epic are miles, kilometers, and nautical miles.  

**\#101 - Map:** 
    This is an epic to be implemented in our current sprint, SPRINT2. This epic will be the graphical portion
    of distance (\#91) and Where Is (\#24). The map must scale based on the two markers selected, and place
    a line between them. The overlay will be transparent enough to be seen but not obstructive. 

**\#103 - Custom Units:**  - The intent of this Epic is to allow for users to edit the list of units. This includes adding their own via specifying a radius of the earth in those units paired with a name, delete items off the list, and editing the pre-existing items. These items will sustain over sessions, and be stored so a user does not have to enter them every time visiting the site. 



## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *7* | *count* |
| Tasks |  *15*   | *count* | 
| Story Points |  *30*  | *sum* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *date* | *#task, ...* | *#task, ...* |  | 


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
