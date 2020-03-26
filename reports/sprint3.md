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
| 3/9/2020 | 5 | 4 |  | 
| 3/11/2020 | 4 | 4 |  |
| 3/13/2020 | 2 | 4 |  | 
| 3/23/2020 | 5 | 4 |  | 
| 3/25/2020 | 3 | 3 |  | 
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

###Scrum 3/9
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

###Scrum 3/11
####CLOSED TASKS (before today): 
* Austin: 
* Ryan: #207
* Cade: #250
* Steven: #248 #213

####IN PROGRESS: 
* Austin: #208
* Ryan: #215
* Cade: #235
* Steven: #214

###Scrum 3/13
####CLOSED TASKS (before today): 
* Austin: 
* Ryan: 
* Cade: 
* Steven: #256 #251

####IN PROGRESS: 
* Austin: #208
* Ryan: #215
* Cade: #235
* Steven: #214

###Scrum 3/23
####CLOSED TASKS (before today): 
* Austin: 
* Ryan: 
* Cade: #196 #235
* Steven: #216 #214 #217

####IN PROGRESS: 
* Austin: #208
* Ryan: #215
* Cade: #266
* Steven: #264

###Scrum 3/25
####CLOSED TASKS (before today): 
* Austin: #208
* Ryan: 
* Cade: #266
* Steven: #269

####IN PROGRESS: 
* Austin: #273
* Ryan: #215
* Cade: 
* Steven: #264

## Review

### Epics done
**Protocol Version 3(#196):**  This epic was completed first (3/23).  We had some complications
on related to writing test cases related to the build response. There were also issues related to why
our distance requests were not working on other servers previously and how to fix it.  THe trip
class we made was a good step forward in our understanding. Finally there was also a good 
amount of refactoring done throughout the implementation to assist further work.

**More Destinations(#197):** This epic was completed at the end along with Itinerary (3/26).  The 
largest issue ran into with this epic was related to the dateline problem.  This issue took around
2 weeks to solve. Apart from the dateline issues this epic went along relatively smoothly.

**Itinerary(#198):** As mentioned earlier this epic was completed at the end (3/26). Some issues
ran into were coordinating multiple levels of classes to correctly pass parent and children
functions.  There was also refactoring that needed to be done to certain aspects of previously
written code.

### Epics not done 
**Load(#199):** With regards to midterm crunch before spring break and the Covid-19 pandemic we
were unable to get to the Load epic completely.  We were able to allow for JSON file uploads which
worked fine, but we did not have time to get CSV files dealt with.  There was also some confusion
relating to the expected format of the CSV's.

**Modify Itinerary(#200):** As with the last epic there were similar issues relating to break and 
Covid-19 that will be discussed further in the retrospective.  For this epic there was no work
done on it.  This heavily related to the fact the itinerary was not finished until 3/26.

### What went well
**Server Understanding** We have majorly increased our understanding of the backend during this
sprint.  We came a long way from being unable to switch to other teams servers last sprint.  Once
we figured out the issues from last sprint everything went very smoothly with the backend.

**Refactoring and Testing** Our amount of testing was greatly improved this sprint.  We began to 
write more tests for the issues we were working on.  There was also a fair amount of refactoring
done to parts of code touched on by certain issues.  This has been a big step forward in our
understanding of test driven development.

### Problems encountered and resolutions
**Dateline**  This was one of the largest problems we encountered during the sprint. As mentioned
earlier this took us around 2 weeks to figure out.  Austin eventually solved the problem after 
looking through a good amount of documentation to get a better understanding of what needed to be
done.

**Covid-19 and Spring Break** These combined issues hit our productivity quite hard. Many of our team
members had to begin to switch their jobs to online which took many hours.  There was also a great
amount of fear and uncertainty which proved to be a great distraction from work.  We all also had
to figure out how other courses would be dealing with online classes.  There was also the extended
break until Tuesday where many people took the advantage to spend with family in this trying time. 

## Retrospective

### What we changed this sprint
**Test Coverage** This sprint we increased our focus on test coverage.  On the previous sprint
we did not implement many tests along with our issues, but this time around we put a larger
focus on creating useful tests for our code.

**Clean Code** Along with improving our testing over this sprint we also put a greater focus on
keeping our code clean.  As we would work on new issues we would be sure to refactor some sections
that were messy.  We were sure to use Code Climate to find areas that our code was lacking and fix
these problem areas.

### What went well
**Team Communication** As we have shown in the past, our team communication was dealt with very well.
We were able to adapt out communication over to online only very easily, since we already had 
experience using discord to discuss problems.  We ran into a variety issues throughout the sprint,
but always had good communication to the team about said issues.

### Potential improvements
**Becoming More Familiar With MS Teams**  This shift to online has been a bit of an adjustment to 
the entire team.  Even though we have good communication via slack and discord, this will be a major
shift for us to deal with.  We will need to spend time between sprints to get a better understanding
of how to use MS Teams effectively.

**Better Balancing of Workload**  This sprint had a large discrepancy in the amount of work done
by the members.  This came down to factors mentioned before in the problems section, but we would
like to see a more equal distribution of work over the next sprint. 

### What we will change next time
**Task Estimation and Creation**  We still have issues with creating good tasks and estimating
the story points for said tasks.  This next sprint we will be sure to take more time to look
at previous sprints and the mistakes we made with task creation and estimation so we can better
distribute out the work on a more equal level.  We will plan on having a meeting over discord to 
discuss our planning more in depth so these issues do not show up again.