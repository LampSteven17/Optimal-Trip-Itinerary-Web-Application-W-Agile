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
|Ryan Kughn|30 mins|
|Cade McCumber|30 mins|
|Austin Soriano| 35 mins |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
|Find.java: 17| Default constructor does not initialize anything, could run empty instance of class| med| Steven Lamp||
|Find.java: 70| Testing method is a setter that is public, needs to be changed to private for protection of vars| low| Steven Lamp||
|Find.java: 75| Getmatch returns an empty uninitialized string, could be not empty| high| Steven Lamp||
|TripOptimization.java: 110| Could accidentally send a -1 from the hasmap, may break logic|low|Steven Lamp||
|TripOptimization.java: 28-29| Time is not default instantiated to 1minute. Relying on it being passed|med|Steven Lamp||
|TripOptimization.java: 8| Importing Array-Lists but not actually using them, should remove|high|Steven Lamp||
|Find.java: 17 | Default constructor does not account for certain vars that need set | med| Ryan | |
|Find.java: 47 | Narrow class could be made static, could help with use | low | Ryan | |
|TripOptimization: 32 | Unused log variable, is this needed? | low | Ryan | |
|TripOptimization: 68 | Return on a void method, maybe remove? | low | Ryan | |
|TripOptimization: 146 | The method setEarthRadius is never used | low | Ryan | |
|Find.java: 75| no null check on getter| med | Cade||
|Find.java: 75| need to set up logic on null inputs| low | Cade||
|TripOptimization.java: 40| on long time and big list this wouldnt be enough time to send back|med|Cade||
|TripOptimization.java: 117| needs a time check here too|low|Cade||
|TripOptimization.java: 90| this is a dirty hack to check for numbers|low|Cade||
|TripOptimization.java: 52| should check if earth radius is negative to not break anything |low|Austin| |
|TripOptimization.java: 56 | if places is less than 2, we don't need a 2d array |low|Austin| |
|TripOptimization.java: 59 | if we change this to a switch statement implementation might be cleaner |low|Austin||
|Find.java: 11 | There is a lot of class variables which is kind of bad practice | low| Austin||
|Find.java: 47| Class within class is bad practice. Might make it it's own file | low | Austin | |
 


