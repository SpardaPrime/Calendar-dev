# Events caledar
![](https://i.ibb.co/HzFNkbJ/prev-1.gif)

## You can use this aplication [here!](https://spardaprime.github.io/Calendar-prod/)

In this project I used:
* JavaScript ( es6 , localStorage )
* Sass
* Eslint
* Webpack

All components are in the SRC folder.
You can run this project locally just do:
* Clone branch review with git clone 
* Go to created folder
* `npm install`
* `npx webpack` or `npm webpack`
* `cd dist`
* `index.html`
# Usage guide
## Creating a calendar

![](https://i.ibb.co/c1QT81Z/create-Table.gif)
1. Fill in the fields for 'names'
2. Specify the time period
3. Specify the daily interval
4. click the create button (the create button is unlocked after filling in at least one field with the name)
## Create event
![](https://i.ibb.co/w6TB3GB/newev.gif)
1. Fill in the field 'name of the event'
2. Select participants (min. 1 participant)
3. Select day
4. Select Time
#### If the time is busy, you will be shown a message
![](https://i.ibb.co/rH7rTPf/err.gif)
## Selection of participants
![](https://i.ibb.co/P4GFgZy/users.gif)
## Delete event
![](https://i.ibb.co/cyHgqWH/del.gif)
1. Сlick on the cross at the event
2. Сonfirm action
## Drag and drop
![](https://i.ibb.co/0qStNDZ/drag.gif)
1. Hold down the left mouse button on the event 
2. Without releasing the button drag to an empty space (free space is allocated)
## Creating a new table
![](https://i.ibb.co/W316ZLv/new-table.gif)
1. Сlick the button 'New table'
2. Сonfirm action (all data will be deleted and a new event table created)
#### Any action is saved to local storage

