# Inspection - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Find.java & TripOptimization.java* |
| Meeting | *05/04/2020, 5pm, Discord* |
| Checklist | *[Java Checklist](https://javarevisited.blogspot.com/2011/09/code-review-checklist-best-practice.html)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
|Steven Lamp|35 mins|

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
|Find.java: 17| Default constructor does not initialize anything, could run empty instance of class| med| Steven Lamp||
|Find.java: 70| Testing method is a setter that is public, needs to be changed to private for protection of vars| low| Steven Lamp||
|Find.java: 75| Getmatch returns an empty uninitialized string, could be not empty| high| Steven Lamp||
|TripOptimization.java: 110| Could accidentally send a -1 from the hasmap, may break logic|low|Steven Lamp||
|TripOptimization.java: 28-29| Time is not default instantiated to 1minute. Relying on it being passed|med|Steven Lamp||
|TripOptimization.java: 8| Importing Array-Lists but not actually using them, should remove|high|Steven Lamp|| 


