let recognizer;

function predictWord() {
 // Array of words that the recognizer is trained to recognize.
 const words = recognizer.wordLabels();
 recognizer.listen(({scores}) => {
   let last_word = '';
   // Turn scores into a list of (score,word) pairs.
   scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
   // Find the most probable word.
   scores.sort((s1, s2) => s2.score - s1.score);
   if (last_word == 'go') {
    document.querySelector('#console').textContent = scores[0].word + ": " + scores[0].score.toFixed(5);
   }
   last_word = scores[0].word;
 }, {probabilityThreshold: 0.98, invokeCallbackOnNoiseAndUnknown: true, overlapFactor: 0.25});
}

async function app() {
 recognizer = speechCommands.create('BROWSER_FFT');
 await recognizer.ensureModelLoaded();
 predictWord();
}

app();
