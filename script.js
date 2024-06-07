//textos para testes: https://lingua.com/pt/portugues/leitura/
function compareTexts() {
    const text1 = document.getElementById('text1').value.trim();
    const text2 = document.getElementById('text2').value.trim();
    if (!text1 || !text2) {
        alert("Preencha ambos campos de texto para comparar.");
        return;
    }
    const stopWords = [
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
        margin: 0,
        filename: 'resultados.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { 
            unit: 'pt',
            format: 'a4', 
            orientation: 'portrait'
        }
    };

    html2pdf().set(options).from(content).toPdf().get('pdf').then(function (pdf) {
        var totalPages = pdf.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
        }
    }).save();
}