# Inspection - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Classes: LoadFileButton (LF) & Itinerary (I)* |
| Meeting | *04/06/2020* |
| Checklist | *[React and JS Checklist](https://medium.com/@muthuks/here-is-the-checklist-for-reviewing-your-own-react-code-17c03761ac38)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Austin Soriano | 45 |
|  |  |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| LoadFileButton.js:90 | the requestVersion could be changed and we might forget to update this. Ideally we update this dynamically with our version increments. | med | Austin Soriano | |
| LoadFileButton.js:86 | currently we parse through the csv to create a json. Ideally we use a npm package to auto generate a json from the csv that has all the correct keys. Then we can later parse through the json and search for the keys we need. This eliminates the pain of having to add code to implement the keys we need to the json instead of already having them in there. | low | Austin Soriano | |
| Itinerary.js:17 | commented out code clutters the developers code and can taint readability | low | Austin Soriano | |
| LoadFileButton.js:86 | This function is huge. This makes this code hard to read and hard to maintain. | low | Austin Soriano | |
| LoadFileButton.js:114 | A empty default might lead to unknown behavior within LoadFileButton.js | low | Austin Soriano| |


