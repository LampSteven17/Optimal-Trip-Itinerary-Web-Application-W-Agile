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
| Epics | *7* | *5* |
| Tasks |  *15*   | *37* | 
| Story Points |  *30*  | *81* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *2/12/20* | *6* | *8* |  |
| *2/14/20* | *6* | *4* |  |
| *2/17/20* | *5* | *4* |  |
| *2/19/20* | *6* | *4* |  |
| *2/21/20* | *5* | *5* | *Sickness in group* |
| *2/24/20* | *2* | *7* | *Major Illness, Cade NOT IN CLASS* |
| *2/26/20* | *5* | *4* |  |
###Scrum 2/12 
####CLOSED TASKS (before today): 
* Austin: #84, #111
* Ryan: #112 
* Cade: #125
* Steven: #119, #114

####IN PROGRESS: 
* Austin: #93, #105 
* Ryan: #33
* Cade: #36
* Steven: #29

###Scrum 2/14 
####CLOSED TASKS (before today): 
* Austin: #105
* Ryan: #33
* Cade: #36
* Steven: #130, #133, #29

####IN PROGRESS: 
* Austin: #93
* Ryan: #97
* Cade: #38
* Steven: #100


####Scrum 2/17 
####CLOSED TASKS (before today): 
* Austin: #93
* Cade: #36
* Ryan: 
* Steven: #100 #132 #137
####EPICS CLOSED: 
* Where Is 
####IN PROGRESS: 
* Austin: #97
* Cade: #38
* Ryan: #142
* Steven: #95

####Scrum 2/19
####CLOSED TASKS (before today): 
* Austin: #147 #148
* Cade:
* Ryan: #156 
* Steven: #95 #149
####EPICS CLOSED: 
* Server Support
* Support Protocol V2
####IN PROGRESS: 
* Austin: #152
* Cade: #38
* Ryan: #151
* Steven: #153


####Scrum 2/21
####CLOSED TASKS (before today): 
* Austin: #157 #97 #152
* Cade: #38
* Ryan: 
* Steven: #160

####IN PROGRESS: 
* Austin: #102
* Cade: #122
* Ryan: #156
* Steven: #153 #103


####Scrum 2/24
####CLOSED TASKS (before today): 
* Austin: 
* Cade: 
* Ryan: #151 #167
* Steven: 

####IN PROGRESS: 
* Austin: #178 #102
* Cade: #122 #174
* Ryan: #173
* Steven: #103 #153


####Scrum 2/26
####CLOSED TASKS (before today): 
* Austin: #102
* Cade: 
* Ryan: #173 #175
* Steven: #184 #182

####IN PROGRESS: 
* Austin: #178
* Cade: #189
* Ryan: #172
* Steven: #190




## Review

### Epics done  
**Where Is (#24):** Where is was completed first (2/17). We had a few complications, originally intending to have two
seperate input boxes for lat and lng, we realized that most interpreters use the combined coordinates, and thought
splitting up was unnecessary. We reviewed our initial idea, and successfully implemented a single box version. This
version also live validates using a highlighted outer box. Colors were contrasting to keep in mind those with color issues.  

**Server Support (#32):** Server support was the next completed epic (2/19). Server support completed in a rather efficient
time frame, as it was crucial for us to begin work on Support V2. We ended up closing both Server Support and v2 
by the same date, however we used #32 as a prerequisite for support protocol v2. 

**Support Protocol V2(#90):** Support protocol was closed the same day as Server Support (2/19). A big part of v2
was understanding the backend about how the server was running. Here was definitely where we had the most difficulty, 
as getting the server to correctly ping was rather difficult. Through the help of the wonderful TA's and other students,
we were able to figure out the nessecary steps to get it completed. 

**Distance (#91):** Distance and Map were the last two to be completed (2/26). Distance looked much easier than it 
actually was. Once implemented, we had problems getting information back from the server with the correct GCD. The Great
Circle Distance then had to be parsed from the object, and we had various problems making surr the formatting was correct. 
Alot of our bugs (3 in total) were from this epic. We had various problems and other issues that took us right up until
the due date, and would like to avoid this in the future. 

**Map (#101):** Our Final epic to be completed, Map gave us a ton of behavioral bugs and other finicky problems. The 
majority (5 total) of our bugs came from weird behaviors and other unspecified problems. A big part of this was not 
understanding React-leaflet and some of its components, as well as promises and asynchronous behavior. Slowly but surely
the group is developing more and more understanding of these behaviors.
### Epics not done 
**Standard Units (#98):**  We actually have a decent bit of framework done for this and Custom Units, but decided to 
scrap these epics for next sprint, as we wanted get all possible bugs squashed. Our first priority was making what we
already had work very well, as per Dave's request. Standard units should be very easy to implement, and should not put
us too far behind on the upcoming sprints. 

**Custom Units (#103):** As mentioned above, most of the framework for these epics is already completed, as we just did
not feel comfortable implementing these in the remaining time we had. As our focus was on bugs and making sure everything
else was solid, we made sure to take care of all important behavioral properties first.

### What went well
**Team Cohesion** Again, one of the best things about this group seems to be how well we all work together. We actively 
attempt to answer eachother's questions within the hour, and pull requests are never put off more than a day (excluding 
ice boxed epics). We are understanding of what we all bring to the table, and are really trying to work together and
complete tasks. 

**Graphical Items** Epics that pertained to graphics or making visible pictures seemed to go really well for us. The 
behavior was another thing, but the actual drawing and elements should be one of our strong points. We are all 
exceptionally new at these ideas, so for us, we are really proud of the mobile UI we have designed. 

**Mobile UI** Last sprint we basically forgot we were working on a mobile application. This sprint everything was designed
in the mobile context, to make sure we were focusing on client needs. We really did a good job at addressing last sprint's
design flaws. We never made anything along the right or left edge of the map, only top and bottom for mobile friendly. 

### Problems encountered and resolutions
**Server and Java Implementations** One of our biggest disadvantages is 3/4 group members have never coded in JS, and 4/4
group members have never coded backend before. For us, this was exceptionally hard, taking almost 5 days to collectively
close a task relating to the backend. The Distance Epic ate up alot more time than we were expecting because of the backend
problems and learning we had to do. This is the reason we decided to shelve SU and CU. Hopefully, when we see backend again
next sprint, we will break up tasks into smaller pieces and really hit that hard, to avoid future time complications. 

**Behavior Bugs** Bugs. Bugs as far as the eye can see. Alot of bugs popped up in this epic, because one thing would be 
implemented, have another edit, have a behavior change, and then their would be a new bug. Another big reason we did not
get to SU and CU is because of the sudden evolution of bugs. We really need to focus more on testing next sprint, to 
prevent these crazy last minute bugs. Hopefully, if we bring our test coverage up and cover any other problems we have, 
we can be more efficient with our time instead of having to go back and fix things. 

## Retrospective

### What we changed this sprint
**Designing for Mobile UI** As stated above in the what went well section, we payed way more attention to designing for 
a mobile platform. A big part of this change allowed us to come up with a more cohesive and efficient UI design.

**Starting Things Earlier** We started designing and pondering the week before the SPRINT2 technically started. We really
made sure to try and implement as many features as we possibly could, and make everything cohesive in the UI deign. Did
everything go as planned, not necessarily, but we still forged on.
### What went well
**Understanding Problems** Cryptic title, but what this meant for us was understanding what to do when we had a problem. 
Go to the TA's. If you have sat for more than 30 minutes start talking to the group. If something was wrong, we brought 
it up immediately and tried to figure out a solution. For more, see above Team Cohesion.
### Potential improvements
**Evaluating Technical Constraints** We now know backend is our weakest strength, and anything pertaining to that needs
to be first priority. The biggest problem was getting backlogged on things because we tried to do everything in order, not
addressing time concerns. We definitely need to break tasks up based on their associated time, and can now evaluate better.

**Evaluating Time Constrains** Much like above, we need to figure out which items are going to take us the longest amount
of time, and address those first. Low hanging fruit should be pushed towards the end, as the framework is most important.
This is definitely something we will have to continue to improve on, as their is not one set thing we can really focus on.

### What we will change next time
**Design Communication** This was a really hard one to address, because until we actually implemented something, we thought
our original design would work. Unfortunately, alot of nessecary design changes happen to break previously implemented features
because we did not know. We could use a little more forward thinking, and definitely work on improving our overall designs. 
I am hoping that our biggest improvement for next sprint is our ability to effectively evaluate, and design around those evaluations.
As expressed above, alot of us are really new to these concepts, and we do not have the experience needed to effectively analyze
our accomplishments (hence why we are in this class.). Hopefully, as class continues, we will get better.