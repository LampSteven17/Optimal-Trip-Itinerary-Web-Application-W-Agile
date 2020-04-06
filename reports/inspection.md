# Inspection - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Classes: LoadFileButton (LF) & Itinerary (I)* |
| Meeting | *04/06/2020* |
| Checklist | *[React and JS Checklist](https://medium.com/@muthuks/here-is-the-checklist-for-reviewing-your-own-react-code-17c03761ac38)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
| Ryan Kughn | 38 |
|  Steven Lamp|  37 minutes|
| Cade McCumber | 40 minutes |
| Austin Soriano | 45 minutes|


### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| Itinerary.js: 36 | unused input in function | low | Ryan | |
| Itinerary.js: 45 | comparison could cause unexpected type coercion | low | Ryan | |
| LoadFileButton.js: 121 | could break the schema if called somewhere else | med | Ryan | | 
| LoadFileButton.js: 90 | hard coded request type value | med | Ryan | |
| LoadFileButton.js: 114 | unused default in switch statement | med | Ryan | |
|LoadFileButton:96-98 | Flag Variables that are not constant are used as storage variables for actual data points|low |Steven | |
|  Itinerary:39| If a request is not correctly imported, their will not be any keys imported and the table will incorrectly render|med |Steven | |
|Itinerary:55 | If a requests key is valid, but the categories are considered empty -> "" The table will render a nothing as a header| low| Steven||
|LoadFileButton:88 | If a request is completely empty, the LFB will fail a request instead of loading nothing| high | Steven| |
|LoadFileButton:121| If This function is called somewhere else, it could potentially break and return an empty JSON object| low| Steven| |
| LoadFileButton:68 && 49 | No file check | med | Cade| |
| LoadFileButton:30 | Nothing happens with wrong extension | low | Cade | |
| LoadFileButton:90 | Hardcoded requestVersion | low | Cade | |
| LoadFileButton:131 | what if there's no data[1]| low | Cade | |
| LoadFileButton:100 | only uses flags for first row | med | Cade | |
| LoadFileButton.js:90 | the requestVersion could be changed and we might forget to update this. Ideally we update this dynamically with our version increments. | med | Austin Soriano | |
| LoadFileButton.js:86 | currently we parse through the csv to create a json. Ideally we use a npm package to auto generate a json from the csv that has all the correct keys. Then we can later parse through the json and search for the keys we need. This eliminates the pain of having to add code to implement the keys we need to the json instead of already having them in there. | low | Austin Soriano | |
| Itinerary.js:17 | commented out code clutters the developers code and can taint readability | low | Austin Soriano | |
| LoadFileButton.js:86 | This function is huge. This makes this code hard to read and hard to maintain. | low | Austin Soriano | |
| LoadFileButton.js:114 | A empty default might lead to unknown behavior within LoadFileButton.js | low | Austin Soriano| |
