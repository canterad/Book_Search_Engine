# Book Search Engine
Book Search Engine Project for UNH Boot Camp # 21 - MERN.<br>
This repository was created for the Homework Assignment dealing with MERN.<br><br>

Developer: Duane Cantera<br>
Date: Feb. 22, 2022<br>
Assignment: #21 - MERN: Book Search Engine<br><br>

This project consisted of taking starter code with a fully functioning Google Books API
search engine built with a RESTful API, and I refactored it to be a GraphQL API built
with Apollo Server.
<br><br>

### The application was built using the MERN stack which consists of the following technologies:
<br>

**M** = MongoDB - Document database.<br>
**E** = Express - Node.js web framework<br>
**R** = React.js - Client-Side JavaScript Framework<br>
**N** - Node.js - The premier JavaScript Web Server.
<br><br>

### The following process were performed to complete this assignment.

<br>

* An Apollo Server was set up to use GraphQL queries and mutations to fetch and modify data,
  replacing the existing RESTFUL API.

* The existing authentication middleware was modified so it works in the context of a GraphQL API.

* An Apollo Provider was created so that requests can communicate with the Apollo Server.

* This web application was deployed to Heroku with a MongoDB database using MongoDB using MongoDB Atlas.
<br><br>

### The Application performed the following operations:

<br>

#### Perform The Login  & Sign Up Operations:
<br>The user can selet the Login or Sign Up Operations:
<br>
<img src="Images/LoginSignUp.jpg" height="200">
<br><br>

#### Search For A Book:
<br>The user can type in the search text for a book to search for:
<br>
<img src="Images/BookSearch.jpg" height="200">
<br><br>

#### Save A Book:
<br>The user can select the button "Save This Book".  Once saved button changes to "Book Already Saved":
<br>
<img src="Images/SaveBook.jpg" height="300">
<br><br>

#### See Your Books:
<br>The user can see the books that have been saved:
<br>
<img src="Images/YourBooks.jpg" height="200">
<br><br>

#### Delete A Book:
<br>The user can select the option to delete a book:
<br>
<img src="Images/DeleteBook.jpg" height="300">
<br><br>

#### Perform The Logout Operation
<br>The user can select the Logout Link to log off the application:
<br>
<img src="Images/Logout.jpg" height="50">
<br><br>

## LINKS:

Git Hub Link To Code For Project:<br> 
https://github.com/canterad/Book_Search_Engine.git

<br>Link to URL of application deployed on Heroku:<br>
https://guarded-savannah-28899.herokuapp.com/
