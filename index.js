let recognizer;

function predictWord() {
 // Array of words that the recognizer is trained to recognize.
 const words = recognizer.wordLabels();
 recognizer.listen(({scores}) => {
   // Turn scores into a list of (score,word) pairs.
   scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
   // Find the most probable word.
   scores.sort((s1, s2) => s2.score - s1.score);
   document.querySelector('#console').textContent = scores[0].word + ": " + scores[0].score.toFixed(5);
 }, {probabilityThreshold: 0.98, invokeCallbackOnNoiseAndUnknown: true});
}

async function app() {
 recognizer = speechCommands.create('BROWSER_FFT', 'directional4w');
 await recognizer.ensureModelLoaded();
 predictWord();
}

app();
