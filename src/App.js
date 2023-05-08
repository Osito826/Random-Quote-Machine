import React, { useEffect, useState } from "react";
import "./App.scss";
import COLORS_ARRAY from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faVolumeHigh, faCopy } from '@fortawesome/free-solid-svg-icons'
import "./App.css";

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";


function App() {
  const [quote, setQuote] = useState("Work is 10% what happens to me and 90% of how I react to it.")
  const [author, setAuthor] = useState("Charles Swindoll")
  // eslint-disable-next-line
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  })

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }

  const getSpeaker = () => {
     //SpeechSynthesisisUtterance is a web speech api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`${quote} by ${author}`);
    speechSynthesis.speak(utterance);//speak method of speechSynthesis speaks the utterance
  }

  const getCopy = () => {
    //copying the quote text on copyBtn click
    //writeText() property writes the specified text string to the system clipboard.
    navigator.clipboard.writeText(quote);
  }

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          <p id="text">
            "{quote}"
          </p>
          <p id="author">- {author}</p>
          <div className="buttons">
            <div className="features">
              <ul>
                <li id="copy" style={{ backgroundColor: accentColor }} onClick={() => getCopy()}><FontAwesomeIcon icon={faCopy} /></li>
                <li id="sound" style={{ backgroundColor: accentColor }} onClick={() => getSpeaker()} ><FontAwesomeIcon icon={faVolumeHigh} /></li>
                <li style={{ backgroundColor: accentColor }}><a id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter} /></a></li>
              </ul>
              <button id="new-quote" style={{ backgroundColor: accentColor }} onClick={() => getRandomQuote()}>Generate A Random Quote</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

/* You can maybe also do this for tweeting quote:
Add:
const sendTweet = () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quote} -${author}`;
    window.open(tweetUrl, "_blank"); //opening a new twitter tab with passing quote in the url
}
Change:
<li style={{ backgroundColor: accentColor }} id="tweet-quote" onClick={() => sendTweet()}><FontAwesomeIcon icon={faTwitter} /></li>
*/