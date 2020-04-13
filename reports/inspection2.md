# Inspection - Team *T10* 
| Inspection | Details |
| ----- | ----- |
| Subject | *MicroServer.java & RequestTrip.java* |
| Meeting | *04/12/2020* |
| Checklist | *[Java Checklist](http://www.cs.toronto.edu/~sme/CSC444F/handouts/java_checklist.pdf)* |


### Roles
| Name | Preparation Time |
| ---- | ---- |
| Austin Soriano | 35 min |
| Steven Lamp | 45 minutes| 
|Ryan | 35 minutes|



### Problems found
| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| MicroServer.java:64-82 | Similar code can be made into one function with different arguments | low | Austin | |
| MicroServer.java: 97 | catch that catches every kind of exception is somewhat of a bad practice | low | Austin | |
| MicroServer.java: 119 | Multiline string might lead to errors when trying to add or alter it. Might be worth breaking it up | low | Austin | |
| RequestTrip.java: 55 | Inconsistent tabs might lead to confusion when editing function in the future | low | Austin | |
| RequestTrip.java: 53 | Somewhat of a useless function right now. Might be worth talking about if we need it right now | low | Austin | |
|MicroServer.java: 19 | Hard-coded config version to 3| hi | Steven Lamp | |
|MicroServer.java: 64-82| Functionalize the repetitive calls | low | Steven Lamp ||
|MicroServer.java: 126 | Change this from an error to a message| low|Steven Lamp|| 
|RequestTrip.java: 46| If the number does not change enough, will be infinite loop locked| med|Steven Lamp| 
|RequestTrip.java: 40| Returning null will break itinerary down the line|low|Steven Lamp| 
|RequestTrip.java: 55-58| Returning individual values, may need to pass as whole object in case of change| low| Steven Lamp||
|RequestTrip.java: 19 | distances array can be converted to a local variable |low  |Ryan| |
|MicroServer.java: 19 | CONFIG_REQUEST_BODY can be a local variable|low |Ryan | |
|RequestTrip.java: 54 | Unused variable, might be needed in future though| low|Ryan | |
|MicroServer.java: 98| Fewer arguments provided than placeholders specified| low|Ryan | |
|MicroServer.java: 19 | Server config value is hard coded| med| Ryan| |
| MicroServer.java: 64, 69, 74, 79| Could be one or two functions| low | Cade | |
| MicroServer.java: 118 | Error logs fill up whole terminal, Not even error| low | Cade | |
| RequestTrip.java: 18...| Have default values set that tell us when we need to decide to optimize| low | Cade | |
| RequestTrip.java: | | | Cade | |
| RequestTrip.java: 36| No check for massive data sets. Could check for >1000 | low | Cade | |
| RequestTrip.java: 40 | Error handling, could return -1 or something tangible | low | Cade | |
| RequestTrip: 53 | Need to return the optimized trip list to run | med | Cade | |

