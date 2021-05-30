import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { sendQuery, getBooksQuery } from './graphqlHelper';
// import { useSelector, useDispatch } from 'react-redux'
import { booksSelector, decrement, fetchBooks, incrementByAmount } from './redux/slices/counterSlice'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { useSelector } from 'react-redux';

function App() {

  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const books = useSelector(booksSelector)
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div onClick={()=>dispatch(decrement())}>DEC</div>
        <div onClick={()=>dispatch(incrementByAmount(10))}>+10</div>
        <div onClick={()=>dispatch(fetchBooks(7))}>BOOKS</div>
        <div>{books?.map((book)=>{

          return (<div key ={book.id}>author: {book.author} , name: {book.name}</div>)
        })}</div>
      </header>
    </div>
  );
}



export default App;


