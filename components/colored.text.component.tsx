import React from "react"

const ColoredText = ({ content }): JSX.Element => {
  const colors = [
    "#3490dc",
    "#6574cd",
    "#9561e2",
    "#f66d9b",
    "#f6993f",
    "#38c172",
    "#4dc0b5",
    "#6cb2eb",
  ]

  const text = content.split(" ")
  let randomColor = 0

  return text.map((word, index) => {
    // const randomColor = colors[Math.floor(Math.random() * colors.length)];
    if (randomColor === colors.length) randomColor = 0

    return (
      <span style={{ color: colors[randomColor++] }} key={index}>
        {word + " "}
      </span>
    )
  })
}

export default ColoredText
