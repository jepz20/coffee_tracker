# coffee_tracker
App to keep track of the expenses and events related to a coffee plantation

# Coffee Tracker
author@Jose Eduardo Perdomo
Capstone Project for the Senior Web Developer Nanodegree at Udacity

## Live Version
Live version of the app: https://coffeet.herokuapp.com/

## Description
App to keep track of the expenses and events related to a coffee plantation

CoffetT has two main sections:

1. News
2. Properties
3. (Bonus: Login system)

### News
Shows a Feed of curated news related with coffee, this news are stored in firebase and has an inifinte loader so not all news are loaded at once.

When a news is added a web api notification is shown with the title

There are two type of news:

 1. External links: opens in a new tab.
 2. Internal Links: Has its own landing with details of the news.

### Properties

List of properties that are added. In the future, there should be a place to add properties and assign them to users.
Each Property represent the area were the coffee plantation is and the subproperties (area were the actual coffee is planted, each subproperty may be planted in different occassion and have different expenses and events)

#### Inside the Property there are 4 sections:

1. Map: visual representation of the property by clicking each property there is a summary for that property.
2. Expenses: Expenses added for the property. Each expenses is composed of a detail of the expenses, and each of them has a category and a subproperty assign to it. (all expenses are added to the general subproperty). Here you can see the list of expenses, add new expenses and view the detail of each expenses.
3. Events: Events related to the property. You can view and add new events
4. Graphs: Dashboard with graphs showing the total expenses, the expenses by category, by subproperty and the expenses in the last six months.

#### Bonus (Login System)
Login system you can access either by creating your account by email or sign in with google.


CoffeeT is serve using a simple express server, and uses React and redux as frameworks.

## Installation

Made with React and style with react-bootstrap

to run locally:

1. install node dependencies with

	```
	npm install
	```

## Development

Run this project locally  with webpack(faster reloads no service worker)

   ```
   npm run dev
   ```
Run this project locally with node (with service workers - production like build)

   ```
   npm run serve
   ```
Run this pr

## Production

Build the proyect for production
   ```
   npm run build
   ```

## License
MIT License

Copyright (c) 2017 Jose Perdomo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
