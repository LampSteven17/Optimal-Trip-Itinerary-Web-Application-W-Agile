# Inspection - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Atlas lines 630-830* |
| Meeting | *04/26/2020, 8pm, Discord* |
| Checklist | *reference, URL, etc.* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Austin Soriano | 40 mins |
|  |  |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Atlas.js:718-723 | if namesArray or markerPosition end up empty here this will crash our website | med | Austin | |
| Atlas.js:633-634 | if markerPosition is empty here this will crash our website | med | Austin | |
| Atlas.js:660 | we should probably check and make sure that itenData[0] isn't our starter entry | low | Austin | |
| Atlas.js:764 | if we try to parse data without a total key then our site will crash | low | Austin | |
| Atlas.js:815 | possibility to crash our website if we pass a non number to this function | low | Austin | |

