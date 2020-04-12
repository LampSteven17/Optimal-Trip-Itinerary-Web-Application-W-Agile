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
|Ryan | 35 |


### Problems found
| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| MicroServer.java:64-82 | Similar code can be made into one function with different arguments | low | Austin | |
| MicroServer.java: 97 | catch that catches every kind of exception is somewhat of a bad practice | low | Austin | |
| MicroServer.java: 119 | Multiline string might lead to errors when trying to add or alter it. Might be worth breaking it up | low | Austin | |
| RequestTrip.java: 55 | Inconsistent tabs might lead to confusion when editing function in the future | low | Austin | |
| RequestTrip.java: 53 | Somewhat of a useless function right now. Might be worth talking about if we need it right now | low | Austin | |
|RequestTrip.java: 19 | distances array can be converted to a local variable |low  |Ryan| |
|MicroServer.java: 19 | CONFIG_REQUEST_BODY can be a local variable|low |Ryan | |
|RequestTrip.java: 54 | Unused variable, might be needed in future though| low|Ryan | |
|MicroServer.java: 98| Fewer arguments provided than placeholders specified| low|Ryan | |
|MicroServer.java: 19 | Server config value is hard coded| med| Ryan| |
