import React, { useState, useEffect} from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../utils/queries';

import { useMutation } from '@apollo/client';
import { DELETE_BOOK } from '../utils/mutations';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

  let [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  let userDataLength = Object.keys(userData).length;

  // Invoke `useMutation()` hook to return a Promise-based function and data about the DELETE_BOOK mutation
  const [deleteBook, { error }] = useMutation(DELETE_BOOK);  

  ///////////////////////////////////////////////////////////////////////////////////
  // Comment out the useEffect hook.
  ///////////////////////////////////////////////////////////////////////////////////
  /***************************************************************************************
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }
 
        const user = await response.json();
        //setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    //getUserData();
  }, [userDataLength]);
  *********************************************************************************************/
 
  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged 
  // in user's information
  const userId = 1;
    const {loading, data} = useQuery(QUERY_SINGLE_USER, {
    variables: {userId}
  });

  //alert("singleUser data = " + data?.singleUser.saveBooks);

  userData = data?.singleUser.saveBooks || {};
  userDataLength = Object.keys(userData).length;

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try 
    {
      ///////////////////////////////////////////////////////////////////////////////////////////////
      // Execute the deleteBook mutation instead of the deleteBook function imported from the API file.
      ///////////////////////////////////////////////////////////////////////////////////////////////
      const { updatedUser } = await deleteBook({
        variables: { bookId },
      });

      ////////////////////////////////////////////////////////////
      // Commented out the deleteBook API call.
      // Replace with deleteBook useMutation hook.
      //const response = await deleteBook(bookId, token);

      //if (!response.ok) {
      //  throw new Error('something went wrong!');
      // }
      ///////////////////////////////////////////////////////////////

      //const updatedUser = await response.json();
      
      setUserData(updatedUser);

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } 
    catch (err) 
    {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
