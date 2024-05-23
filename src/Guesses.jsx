import { useState, useEffect } from 'react';
import "./Guesses.css"

export default function Guesses({ guessArray }) {
    const [boxes, setBoxes] = useState(Array(8).fill(''));
    const [currentIndex, setCurrentIndex] = useState(0);
  }