# Inspection - Team *T10* 
| Inspection | Details |
| ----- | ----- |
| Subject | *MicroServer.java & RequestTrip.java* |
| Meeting | *04/12/2020* |
| Checklist | *[Java Checklist](http://www.cs.toronto.edu/~sme/CSC444F/handouts/java_checklist.pdf)* |


### Roles
| Name | Preparation Time |
| ---- | ---- |
| Steven Lamp | 45 minutes| 
|Ryan | 35 minutes|



### Problems found
| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
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

