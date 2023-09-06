/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Container, Image, Modal } from "react-bootstrap";
import { BOOKS_PER_PAGE, authors, books } from "../assets/data/data";
import "../index.css";

const PreviewModal = (props) => {

  const { onHide, image, title, author, description } = props;

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onHide}>
          <Modal.Body>
            <div className="overlay__preview">
              <Image src={image} className="overlay__blur" />
              <Image src={image} className="overlay__image" />
            </div>
            <div className="overlay__content">
              <h3 className="overlay__title">{title}</h3>
              <div className="overlay__data">{author}</div>
              <p className="overlay__data overlay__data_secondary">{description}</p>
            </div>
          </Modal.Body>
          <Modal.Footer className="overlay__row">
            <Button onClick={onHide} className="overlay__button overlay__button_primary">Close</Button>
          </Modal.Footer>
      </Modal>
    </>
  )
};

const HomePage = () => {
  //state for adding more books to the page
  const [numOfBooks, setNumOfBooks] = useState(BOOKS_PER_PAGE);
  //state for the book summary modal
  const [modalShow, setModalShow] = useState(false);
  //state for updating the modal to the clicked show
  const [selectedBook, setSelectedBook] = useState(null);

  const handleShowMore = () => {
    setNumOfBooks(prevNumOfBooks => prevNumOfBooks + BOOKS_PER_PAGE);
  };

  const handleOpenPreview = (book) => {
    setSelectedBook(book);
    console.log(selectedBook);
    setModalShow(true);
  }

  return (
    <>
      <main className="list">
        <Container className="list__items">
          {books.slice(0, numOfBooks).map((book, index) => {
            return (
              <Button key={index} className="preview" onClick={handleOpenPreview}>
                <Image src={book.image} className="preview__image" />
                <div className="preview__info">
                  <h3 className="preview__title">{book.title}</h3>
                  <div className="preview__author">{authors[book.author]}</div>
                </div>
              </Button>
            )
          })
          }
        </Container>
        
        {/* No book previews to show message */}
        <Container className="list__message">No results found. Your filters might be too narrow.</Container>
        {/* show more button */}
        {numOfBooks < books.length && (
          <Button className="list__button" onClick={handleShowMore}>Show more <span className="list__remaining">({books.length - numOfBooks})</span></Button>
        )}
      </main>

      {/* Render the preview modal */}
      {ReactDOM.createPortal(
        selectedBook && 
        <PreviewModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        image={selectedBook.image}
        title={selectedBook.title}
        author={authors[selectedBook.author]}
        description={selectedBook.description}
        />, document.body
      )}
    </>
  )
};

export default HomePage;