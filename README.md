# All-the-News-
## Overview
This is an application that lets users scrape news articles from washingtonpost.com. Users can then view and leave and delete comments on articles. Cheerio is used to scrape news and stores them in MongoDB using Mongoose. 

## Tehcnologies Used
request: enables cheerio to get access to front-end code of https://www.nytimes.com/section/world

cheerio: scrapes front-end code from https://www.nytimes.com/section/world

mongoose: be in charge of database of scrap

express: builds server-side routes and functions

morgan: logs server-side requests, helping debugging

express-handlebars: a powerful front-end builder without requiring multiple html pages

## Use Instruction
when the user load on the page, once click on the ariticle, will show the note form with the notes if there are notes on this article, here user can add more note OR can delete the note
![Screenshot (104)](https://user-images.githubusercontent.com/47795010/56716809-1448a480-66f0-11e9-9ae7-abf4a02d1653.png)
