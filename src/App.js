import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './App.css';

function JeopardyLogo() {
  return (
    <img
      id="jeopardy-logo"
      src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Jeopardy%21_logo.png?20141115075724"
      alt="Jeopardy Logo"
    />
  );
}

const handleRefresh = setFetchedData => {
  setFetchedData(null);

  fetch('https://jservice.io/api/random?count=100')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setFetchedData(data);
    });

};

function RefreshButton({ onRefresh }) {
  return (
    <button id="refresh-button" onClick={onRefresh}>
      Refresh
    </button>
  );
}

function NavBar({ onRefresh }) {
  return (
    <div id="nav-bar">
      {JeopardyLogo()}
      <RefreshButton onRefresh={onRefresh} />
    </div>
  );
}

function QuestionBox(props) {

  const [showModal, setShowModal] = useState(false);
  const [revealAnswer, setRevealAnswer] = useState(false);


  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setRevealAnswer(false);
  };

  const handleRevealAnswer = () => {
    setRevealAnswer(true);
  };

  return (
    <>
      <div className="col-sm-6 col-md-4 col-lg-2" onClick={handleClick}>
        <div className="category-title" style={{ backgroundColor: 'inherit' }}>{props.entry.category.title.toUpperCase()}</div>
        {props.entry.value !== null && <span style={{ backgroundColor: 'inherit' }}>${props.entry.value}</span>}
      </div>
      <Modal show={showModal} onHide={handleClose} id="modal">
        <Modal.Header closeButton>
          <Modal.Title>{props.entry.category.title.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body><strong>Question:</strong>
          <br />
          {props.entry.question}
          <br />
          <br />
          <strong>Answer:</strong>
          <br />
          {revealAnswer ? (
            <i>{props.entry.answer}</i>
          ) : (
            <i>answer hidden</i>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!revealAnswer && (
            <Button variant="primary" onClick={handleRevealAnswer}>
              Reveal Answer
            </Button>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

function GameBoard({ fetchedData }) {
  return (
    <div id="jeopardy-board" className="d-flex justify-content-center">
      <div className='row'>
        {fetchedData ? (

          fetchedData.map((data, index) => (
            <QuestionBox entry={data} key={index} />
          ))


        ) : (
          <p>Loading...</p>
        )}
      </div>

    </div>
  );
}

function App() {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    handleRefresh(setFetchedData);
  }, []);

  const handleRefreshClick = () => {
    handleRefresh(setFetchedData);
  };

  return (
    <div className="App">
      <NavBar onRefresh={handleRefreshClick} />
      <GameBoard fetchedData={fetchedData} />
    </div>
  );
}

export default App;
