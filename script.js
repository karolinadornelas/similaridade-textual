//textos para testes: https://lingua.com/pt/portugues/leitura/
function compareTexts() {
    const text1 = document.getElementById('text1').value.trim();
    const text2 = document.getElementById('text2').value.trim();
    if (!text1 || !text2) {
        alert("Preencha ambos campos de texto para comparar.");
        return;
    }
    const stopWords = [
        'a',
        'as', 
        'e',
        'o',
        'os',
        'à',
        'é',
        'em',
        'ela',
        'ele',
        'eles',
        'nós',
        'de',
        'da',
        'das',
        'do',
        'há',
        'ante',
        'até',
        'por',
        'sem',
        'com',
        'para',
        'sob',
        'se',
        'per',
        'trás',
        'como',
        'na',
        'no',
        'nos',
        'nas',
        'né',
        'um',
        'uma',
        'que',
        'quão',
        'seus',
        'suas',
        'são'
    ];

    function removeStopWords(words) {
        return words.filter(word => !stopWords.includes(word.toLowerCase()));
    }

    const words1 = removeStopWords(text1.split(/\s+/));
    const words2 = removeStopWords(text2.split(/\s+/));

    const commonWords = words1.filter(word => words2.includes(word));

    const totalWords = Math.max(words1.length, words2.length);
    const similarity = (commonWords.length / totalWords) * 100;

    let highlightedText1 = text1;
    commonWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        highlightedText1 = highlightedText1.replace(regex, `<span class="highlight">${word}</span>`);
    });

    let highlightedText2 = text2;
    commonWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        highlightedText2 = highlightedText2.replace(regex, `<span class="highlight">${word}</span>`);
    });

    document.getElementById('highlightedText1').innerHTML = highlightedText1;
    document.getElementById('highlightedText2').innerHTML = highlightedText2;
    document.getElementById('similarityPercentage').innerText = `Porcentagem de similaridade textual: ${similarity.toFixed(2)}%`;
}

function getPdf() {
    const content = document.getElementById('results');
    console.log('conteudo em pdf', content);
    const options = {
        margin: 1,
        filename: 'resultados.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { 
            unit: 'mm', 
            format: 'A4', 
            orientation: 'portrait' }
    };

    html2pdf().set(options).from(content).save();
}

document.getElementById('get-pdf').addEventListener('click', getPdf);
