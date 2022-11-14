import React, { useState } from 'react'
import './App.css'

function App (): JSX.Element {
  interface Position {
    x: number
    y: number
  }

  const [circle, setCircle] = useState<{
    positions: Position[]
    history: Position[]
  }>({ positions: [], history: [] })

  const handlePlaceCircle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    setCircle({
      positions: [...circle.positions, { x: e.clientX, y: e.clientY }],
      history: []
    })
  }

  const handleUndo = (): void => {
    if (circle.positions.length > 0) {
      setCircle({
        positions: circle.positions.slice(0, -1),
        history: [
          ...circle.history,
          circle.positions[circle.positions.length - 1]
        ]
      })
    }
  }

  const handleRedo = (): void => {
    if (circle.history.length > 0) {
      setCircle({
        positions: [
          ...circle.positions,
          circle.history[circle.history.length - 1]
        ],
        history: circle.history.slice(0, -1)
      })
    }
  }

  return (
        <>
            <div id='header'>
                <h1>Click anywhere in the white area to place a circle.</h1>
                <button
                    className="button"
                    disabled={circle.positions.length === 0}
                    onClick={handleUndo}
                >
                    Undo
                </button>
                <button
                    className="button"
                    disabled={circle.history.length === 0}
                    onClick={handleRedo}
                >
                    Redo
                </button>
            </div>
            <div className="App" onClick={handlePlaceCircle}>
                {circle.positions.map((p, i) => (
                    <span
                        key={i}
                        className="dot"
                        style={{ top: p.y - 20, left: p.x - 20 }}
                    ></span>
                ))}
            </div>
        </>
  )
}

export default App
