# Inspection - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Atlas lines 630-830* |
| Meeting | *04/26/2020, 8pm, Discord* |
| Checklist | *[JS ReactChecklist](https://devinduct.com/blogpost/22/javascript-clean-code-best-practices)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Austin Soriano | 40 mins |
|  Steven Lamp|35 mins  |
| Ryan Kughn | 40 mins |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Atlas.js:718-723 | if namesArray or markerPosition end up empty here this will crash our website | med | Austin | |
| Atlas.js:633-634 | if markerPosition is empty here this will crash our website | med | Austin | |
| Atlas.js:660 | we should probably check and make sure that itenData[0] isn't our starter entry | low | Austin | |
| Atlas.js:764 | if we try to parse data without a total key then our site will crash | low | Austin | |
| Atlas.js:815 | possibility to crash our website if we pass a non number to this function | low | Austin | |
| Atlas.js:634| Empty Marker list could crash website and/or break itinerary| low| Steven| |
| Atlas.js:631| Function appendToItinerary has lots of repetition, could be functionalized to prevent random glitches|high|Steven|
| Atlas.js:815-817| Comparing Decimal and Integer types, not checking and may misfire to units| med| Steven||
| Atlas.js:790| If state is never correctly set, could break our website with no information|low|Steven||
| Atlas.js:660| Another initiliazation error, could be detremential if never initialized correctly|low|Steven||
| Atlas.js:677| Unused parameter prevState in lambda function| low | Ryan| |
| Atlas.js:633 | Empty markerPosition array could result in a crash | med | Ryan | |
| Atlas.js:815-817 | line 815 divides by decimal, line 817 divides by int, could result in bad comp | low | Ryan | |
| Atlas.js:756 | Indexing an array that could be empty, should check | low | Ryan | | 
| Atlas.js:750 | Treating local variable idForInput as global variable | low | Ryan | |

