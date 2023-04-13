## Things To Complete Today

 - Make Login Page Functional
 - Make Signup Page Functional
 - Home Page (Private - only for logged in user)
 - Add Private Navigation
 - Implement Hard Reload

## Make Login Page Functional

 - Using fetch POST request implement login
 - On login success redirect to home page
 - Handle error when the login fails

## Make Signup Page Functional

 - Using fetch POST request implement signup
 - On signup success redirect to home page
 - Handle error when the signup fails

## Home Page (Private)

 - Create a private home page
 - It will contain 2 tabs Your Feed and Global Feed
 - Both tab will display top 10 articles in the respective tab

## Make sure to retain the logged in user after hard reload

 - Make sure the logged in user persists after hard reload
 - Verify the user using the jwt token saved in localStorage
 - Show a loading indicator when user is being verified
 - Only after user verification redirect to home page