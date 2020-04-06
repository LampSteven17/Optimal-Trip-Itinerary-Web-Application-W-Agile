# Inspection - Team *T10* 
 
| Inspection | Details |
| ----- | ----- |
| Subject | *Classes: LoadFileButton (LF) & Itinerary (I)* |
| Meeting | *04/06/2020* |
| Checklist | *[React and JS Checklist](https://medium.com/@muthuks/here-is-the-checklist-for-reviewing-your-own-react-code-17c03761ac38)* |

### Roles

| Name | Preparation Time |
| ---- | ---- |
|  Steven Lamp|  37mins|
|  |  |

### Problems found

| file:line | problem | hi/med/low | who found | github#  |
| --- | --- | :---: | :---: | --- |
| LF 96-98 | Flag Variables that are not constant are used as storage variables for actual data points|low |Steven | |
|  I 39| If a request is not correctly imported, their will not be any keys imported and the table will incorrectly render|med |Steven | |
|I 55 | If a requests key is valid, but the categories are considered empty -> "" The table will render a nothing as a header| low| Steven||
|LF 88 | If a request is completely empty, the LFB will fail a request instead of loading nothing| high | Steven| |
|LF 121| If This function is called somewhere else, it could potentially break and return an empty JSON object| low| Steven| |
