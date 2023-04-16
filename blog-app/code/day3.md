# day-3

## Things To Complete Today

- Complete Add New Post
- Make New Post Page Functional
- Complete Setting Page
- Make Setting Page Functional
- Implement Logout
- User Profile Page
- Other Users Profile

## Complete Add New Post

 - Add the following input fields Title, Description and Markdown article body
 - Have a Add Article button
 - Add tag input
 - You can have multiple inputs. When you press comma the tag will be added
 - Validate the error (none of the field should be empty)
 - Display appropriate error message

## Make New Post Page Functional

- Make adding new article functional
- Use post request to add the data
- If add article is successful redirect the user to the article page

## Complete Setting Page

- Add input fields like URL of profile picture, username, bio, email, new password
- Add update setting button
- Validate email field

## Make Setting Page Functional

- Pre-fill the use data component loads
- When update setting is clicked update the setting (use POST request with the updated data)
- If the updating is successful stay on the same page and update the information
- Test the updated value by hard refreshing the page

## Implement Logout

- Implement logout button (you can add it in navigation or on the setting page)
- Make sure to clear the localStorage when you logout

## User Profile Page

- Create a user info page
- It will have a hero section with user information and a way to update the setting
- List "My Articles" and "Favorited Articles" in two different tabs
- On both tabs list the first 10 articles
- Display the Edit Setting button in hero section

## Other Users Profile

- When you click on the user avatar on the post it will take user to individual user profile
- It should go to /profile/username
- Display the follow button in hero section
- URL Submitted