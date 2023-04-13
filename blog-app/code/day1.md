## Assignment: Day 1

blog-app-intruction:https://www.youtube.com/watch?v=n6KeMhvsSn0

# Blog App

To complete this block read the instruction carefully:

 - Create a new repo on Github

 - Switch to the specific branch (eg: day-1)

 - Complete the task of the day in the branch

 - Once complete push all the changes to the specific branch (day-1)

 - Submit the link of the Github/branch as submission link

 - Once completed create a pull request to master and merge it

## DAY 1

Use the blog API you have created while learning backend. If your API is not working properly you can use the endpoint given below.

Don't pollute the API by posting some test data (like testingggg etc). When you are adding article make sure to add article with proper title, description etc

## Basic Informations:

 - BASE URL: https://conduitapi.onrender.com/api

 - BASE URL2: https://conduit.productionready.io/api

 - BASE URL2: https://mighty-oasis-08080.herokuapp.com/api/

 - Demo for reference:https://ac-blog-app.vercel.app/ or https://conduit-re-frame-demo.netlify.app/

#### You can change the look of the website the way you want. Make sure to have all the functionality as mentioned

## API Info:

For information regarding the API endpoints go through the link below. You will find everything you need. Look carefully

![API Endpoints Specs]('https://gist.github.com/nnnkit/88db374b4ce62587a86bb32dd0b36ccb')

## Things To Complete Today

 - Setup React + React Router DOM

 - Home Page

 - Login Page

 - Signup Page

 - Home Page Navigation

 - Individual Article Page

 - Individual Tags Page

## Boilerplate Setup (React + React Router DOM)

Setup create react app with the following requirements:

 - Install react-router-dom
 - Setup BrowserRouter in App component
 - Use loading indicator whenever you need to display data by fetching information

## Home Page (Public)

 - Create Header and Hero section

 - List of 10 articles with title, description and read more button

 - Handle the error while fetching data

 - Posts will be visible under a tag named Global Feed

 - Each post will also display the author and the date of the article

 - Each post will also show a Heart for user to like the post. The heart will only be visible for logged in user. You can condition the heart in future baed on user is logged in or not.

 - Add tag cloud (collection of all tags) on the right sidebar of the page

 - On the bottom display pagination (this is based on the total number of articles and number of article you are displaying on the page) You need to display 10 articles on each page.

 - Clicking on pagination buttons will fetch 10 new articles and display

## Login Page

- Email Field
- Password Field
- Login Button
- Each field (email, and password) should contain client side form validation
    - Email should contain @
    - Password should be at-least 6 characters
    - Password must contain a letter and a number
    - No fields can be empty
- Display respective error message while doing the client side form validation
- It should also contain a link to Signup Page if the user doesn't have an account

## Signup Page

- Email Field
- Password Field
- Username Field
- Signup Button
- Each field (email, and password) should contain client side form validation
   - Email should contain @
   - Password should be at-least 6 characters
   - Password must contain a letter and a number
   - No fields can be empty
   - Username should be at-least 6 characters long
- Display respective error message while doing the client side form validation
- It should also contain a link to Login Page if the user already have an account


## Complete Home Page Navigation

- The Header will contain logo and links to login and signup
- Clicking on links will take you to the respective page

## Individual Article Page

- Clicking on the article's read more button will take you to an individual article page
- Individual article page will display all the information about the article
- It will also have an hero section that will contain Author info and Title

## Individual Tags Page

- When user click on any tag it will be added next to the Global Feed
- It will only display the article containing the specific tag
- Display the list of 10 articles