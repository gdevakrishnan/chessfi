import React, { Fragment, useState } from 'react';
import {
  GiChessRook,
  GiChessKnight,
  GiChessBishop,
  GiChessQueen,
  GiChessKing,
  GiChessPawn
} from 'react-icons/gi';

const initialPositions = {
  "w_r1": "a1", "w_n1": "b1", "w_b1": "c1", "w_q": "d1", "w_k": "e1", "w_b2": "f1", "w_n2": "g1", "w_r2": "h1",
  "w_p1": "a2", "w_p2": "b2", "w_p3": "c2", "w_p4": "d2", "w_p5": "e2", "w_p6": "f2", "w_p7": "g2", "w_p8": "h2",
  "b_r1": "a8", "b_n1": "b8", "b_b1": "c8", "b_q": "d8", "b_k": "e8", "b_b2": "f8", "b_n2": "g8", "b_r2": "h8",
  "b_p1": "a7", "b_p2": "b7", "b_p3": "c7", "b_p4": "d7", "b_p5": "e7", "b_p6": "f7", "b_p7": "g7", "b_p8": "h7"
};

const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rows = [8, 7, 6, 5, 4, 3, 2, 1];

// Mapping piece code to icon component
const getPieceIcon = (pieceId) => {
  const color = pieceId.startsWith('w') ? 'white' : 'black';

  if (pieceId.includes('_p')) return <GiChessPawn className={`${color}_piece piece`} />;
  if (pieceId.includes('_r')) return <GiChessRook className={`${color}_piece piece`} />;
  if (pieceId.includes('_n')) return <GiChessKnight className={`${color}_piece piece`} />;
  if (pieceId.includes('_b')) return <GiChessBishop className={`${color}_piece piece`} />;
  if (pieceId.includes('_q')) return <GiChessQueen className={`${color}_piece piece`} />;
  if (pieceId.includes('_k')) return <GiChessKing className={`${color}_piece piece`} />;
  return null;
};

function App() {
  const [positions, setPositions] = useState(initialPositions);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const getPieceAt = (square) => {
    return Object.entries(positions).find(([_, pos]) => pos === square)?.[0];
  };

  const handleSquareClick = (square) => {
    if (selectedPiece) {
      const pieceAtTarget = getPieceAt(square);

      setPositions(prev => {
        const newPositions = { ...prev };
        newPositions[selectedPiece] = square;
        if (pieceAtTarget) delete newPositions[pieceAtTarget];
        console.log("Updated positions:", newPositions);
        return newPositions;
      });

      setSelectedPiece(null);
    } else {
      const piece = getPieceAt(square);
      if (piece) setSelectedPiece(piece);
    }
  };

  const renderSquare = (col, row) => {
    const square = `${col}${row}`;
    const piece = getPieceAt(square);
    const isSelected = piece === selectedPiece;

    return (
      <div
        key={square}
        className={`square ${((columns.indexOf(col) + row) % 2 === 0) ? 'white' : 'black'} ${isSelected ? 'selected' : ''}`}
        onClick={() => handleSquareClick(square)}
      >
        {piece && getPieceIcon(piece)}
      </div>
    );
  };

  return (
    <Fragment>
      <section>
        <div className="board">
          {rows.map(row => columns.map(col => renderSquare(col, row)))}
        </div>
      </section>
    </Fragment>
  );
}

export default App;
