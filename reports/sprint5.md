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
| Epics | *5* | *5* |
| Tasks |  *22*   | *65* | 
| Story Points |  *42*  | *68* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 4/24/20 | 2 | 4 |  | 
| 4/27/20 | 7 | 4 |  |
| 4/29/20 | 2 | 4 |  |
| 5/1/20 | 4 | 4 |  |
| 5/5/20 | 5 | 4 |  |

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
| Cade | #409 #448 | #449 |

### SCRUM 5/4 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | #403 | #446 |
| Steve | #448| #443 |
| Austin | #298 | #453 |
| Cade | #449 #448 | #400 |

### SCRUM 5/6 DAILY
| Name | Tasks closed  | Tasks in progress |
| :--- | :--- | :--- |
| Ryan | #473|#466 |
| Steve | #443| #436 |
| Austin | #402| #477|
| Cade | #469|#400 |

## Review

### Epics done  
**Modify Itinerary(#200):** 
Our first finished epic, Modify Itinerary is one of our most unique features. Using a mobile friendly approach, the user
is capable of reordering the Itinerary by dragging and dropping individual markers to their respective graphically 
oriented position. Our system will automatically reorder the markers and their respective distances to accurately
and efficiently change all associated statistics in the itinerary. The user can also edit the individual marker's 
position. Clicking edit on a specific marker allows you to change the name and the destination associated with it. 
Overall, we were extremely proud of how user friendly the itinerary has become. 

**Protocol Version 5.0(#392):** 
Our next finished epic was focused on the interoperability between our client side and server side implementations. 
We continued to make our server optimization better, with nearest neighbor, and added a default in addition to nearest neighbor.
We also fixed a couple of 404 bugs being incorrectly thrown, and implemented our communication to the SQL Database. The
setup was initially very complicated, but we saw the largest amount of learning here, and greatly improved our java and
database understanding. 

**Itinerary Search(#394):** 
Our next finished epic focused on further improving the usability of our itinerary. We render a react-based search bar
above the itinerary for quick and simple search results. The search bar updates the results live in the visible listings
on the itinerary with every character typed. The user can either edit these narrowed markers, or drag the specified marker
to a new position. Overall, our itinerary is extremely friendly in the mobile landscape, and will give the user a simple
and streamlined experience. 

**User Experience(#393):**
Our next finished epic was the last little tweaks to making our mobile friendly UI as functional as possible. This included
changing all of the text based buttons to icons, changing markers to a more appropriate visual color, and allowing the
user to remove markers altogether to view their entire trip. We also cleaned up padding, alignments, and other small
tweaks to make everything aligned and functional. This epic was allot of small tasks that summed up to the "icing on the cake"
of our user experience. This website overall has become extremely mobile user friendly, with intuitive touch controls, and
dynamic resizing. 

**Find(#395):**
Our last epic completed was by far the hardest. Using a pre-constructed SQL Database, the user is able to query the database
and add the results to their current trip. The queries can be filtered with a variety of options, including county and 
region name, and municipality. The overall front end is very simple and user friendly. Utilizing a second search bar, 
our users can quickly search through the database. They may select from airport, heliport, or other various features.
The main area of work for this epic was the backend. Adding another entire class to the server, we had to figure out
how to efficiently query the database and respond with an appropriate request. After doing so, we then had to take that
response and convert it to an appropriate display object, and allow the user to manipulate it into place. While the 
initial reading was very complicated, we eventually persevered and finished it off. We believe that this element 
compliments our usability and mobile friendly interface, as it is simple and does not use lots of unclear shortcuts.  

 
### Epics not done 

### What went well
**Communication:** 
Throughout the entire semester, our groups absolute strongest aspect was our communication. We always talked to each other,
clearly communicated our projects and problems, and efficiently worked together to make the best possible product. If
someone had a problem, their was rarely an instance where they were left without someone to jump on our communication 
channels. Even with the stress of finals week, and the stress of the whole world situation, we still communicated well,
and the value of this groups communication skills cannot be measured. 

**Organization:**
 Another of our groups strongest aspects was organization. We actively discussed who was doing what, and made sure to
 only compliment what our other groupmates were doing. Our groups communication was one part of this, and the other 
 being our now growing familiarity with github. We capably managed our Zenhub to effectively distribute tasks among our 
 members. 
### Problems encountered and resolutions
**SQL Understanding:**
Even though a lot of code was provided, it took a substantial amount of time for us to wrap our heads around the exact
specifications of SQL coding. We actively had to google lots of structures and basic syntax to help us kitty script
our way to success. We resolved this by a combined team effort to help each other understand SQL. 

**Setting Up Environment Variables:**
Correctly modifying the schemas to work with the database queries was extremely complicated, and took extra time. A lot 
of this was combined with the SQL  understanding, and once a consensus was gained about how to implement the database,
we worked on querying the black.bottle database to make sure our implementation was correct. Once everything worked through
a bit of trial and error, we successfully moved onto filtering and finalizing the FIND epic.
## Retrospective

### What we changed this sprint
**Workload:** 
We drastically reduced our workload since we lost a 5th member last sprint, and only bit off as much as we could chew. 
We appropriately assessed our workload, and were able to complete all epics we set out to complete. In doing so, 
our builds were much more solid and broke less often, we were more aware of our test coverage and maintainability, 
and have an overall stronger more reliable build for version 5. 

**Code Communication:**
Instead of talking to members about the code we were looking at, we streamed and showed each other the exact lines 
we were working on. In addition, we pushed branches without intent to commit so we could jump on and easily analyze 
each others code. This greatly improved our problem solving capabilities, and we saved a lot of time. 
### What went well
**Communication:**
As stated above, we never plateaued on trying to improve our communication. This sprint we improved our problem solving
skills by understanding how to more effectively communicate our issues. This sprint really allowed us to reach our "performing"
stage and work on bigger and better tasks. 
### Potential improvements
**Inital Build Stability:**
Making sure to avoid merge conflicts every once in awhile, and be slightly more careful about our code coverage. We can
always improve, and we hope to continue to in the future.
### What we will change next time
* Planning more carefully and making slightly more tasks 
* Paying more attention to preset code to make our code mingle together better.