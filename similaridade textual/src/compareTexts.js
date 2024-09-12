export function compareTexts() {
  const text1 = document.getElementById('text1').value.trim();
  const text2 = document.getElementById('text2').value.trim();
  const source1 = document.getElementById('source1').value;
  const source2 = document.getElementById('source2').value

  if (!text1 || !text2) {
    showAlert("Preencha ambos campos de texto para comparar.");
    return;
  }

  const words1 = text1.match(/(?<!\w)[\wà-úÀ-Ú-ú]+(?!\w)/g) || [];
  const words2 = text2.match(/(?<!\w)[\wá-ùÀ-Ù-ú]+(?!\w)/g) || [];

  const commonWords = words1.filter(word => words2.includes(word));

  const totalWords = Math.max(words1.length, words2.length);

  const similarity = (commonWords.length / totalWords) * 100;

  function highlightWords(text, words) {
    const singularWords = [...new Set(words)];
    singularWords.forEach(word => {
      const specialCharacters = word.replace(/[.*+?^${}()|[\]\\[-]]/g, '\\$&');
      const regex = new RegExp(`(?<![A-ZÀ-Ú])(${specialCharacters})(?![A-ZÀ-Ú])`, 'gi');
      text = text.replace(regex, `<span class="highlight">${word}</span>`);
    });
    return text;
  }

  let highlightedText1 = highlightWords(text1, commonWords);
  let highlightedText2 = highlightWords(text2, commonWords);

  document.getElementById('highlightedText1').innerHTML = highlightedText1;
  document.getElementById('highlightedText2').innerHTML = highlightedText2;
  document.getElementById('similarityPercentage').innerText = `Porcentagem de reprodução textual: ${similarity.toFixed(2)}%`;

  document.getElementById('results').style.display = 'block';
  document.getElementById('rebootFields').style.display = 'block';
  document.getElementById('get-pdf').style.display = 'block';
  //rolar para os resultados quando acionar o botão de comparar
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });

}

function showAlert(message) {
  document.getElementById('custom-alert-message').innerText = message;
  document.getElementById('custom-alert').style.display = 'block';

  document.getElementById('custom-alert-okay').onclick = function () {
    document.getElementById('custom-alert').style.display = 'none';
  };
}