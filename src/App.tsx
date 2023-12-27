import React from 'react';
import './App.css';
import { GameBoard, Header, Keyboard } from './component';

function App() {
	return (
		<div className='flex flex-col h-screen justify-between items-center'>
			<Header />
			<GameBoard />
			<Keyboard />
		</div>
	);
}

export default App;
