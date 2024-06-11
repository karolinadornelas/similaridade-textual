//textos para testes: https://lingua.com/pt/portugues/leitura/
function compareTexts() {
    const text1 = document.getElementById('text1').value.trim();
    const text2 = document.getElementById('text2').value.trim();
    if (!text1 || !text2) {
        alert("Preencha ambos campos de texto para comparar.");
        return;
    }

    const words1 = text1.match(/(?<!\w)[\wà-úÀ-Ú]+(?!\w)/g) || [];
    const words2 = text2.match(/(?<!\w)[\wá-ùÀ-Ù]+(?!\w)/g) || [];

    const commonWords = words1.filter(word => words2.includes(word));

    const totalWords = Math.max(words1.length, words2.length);
    const similarity = (commonWords.length / totalWords) * 100;

    function highlightWords(text, words) {
        console.log(words)
        const singularWords = [...new Set(words)];
        console.log(singularWords)
        singularWords.forEach(word => {
            const specialCharacters = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const regex = new RegExp (`(?<![A-ZÀ-Ú])(${specialCharacters})(?![A-ZÀ-Ú])`, 'gi');
            text = text.replace(regex, `<span class="highlight">${word}</span>`);
        });
        return text;
    }

    let highlightedText1 = highlightWords(text1, commonWords);
    let highlightedText2 = highlightWords(text2, commonWords);

    document.getElementById('highlightedText1').innerHTML = highlightedText1;
    document.getElementById('highlightedText2').innerHTML = highlightedText2;
    document.getElementById('similarityPercentage').innerText = `Porcentagem de similaridade textual: ${similarity.toFixed(2)}%`;

    document.getElementById('results').style.display = 'block';
    document.getElementById('rebootFields').style.display = 'block';
    document.getElementById('get-pdf').style.display = 'block';

}

//resetar os campos de texto
function rebootFields() {
    document.getElementById('text1').value = '';
    document.getElementById('text2').value = '';

    document.getElementById('highlightedText1').textContent = '';
    document.getElementById('highlightedText2').textContent = '';
    document.getElementById('similarityPercentage').textContent = '';

    document.getElementById('results').style.display = 'none';
    document.getElementById('rebootFields').style.display = 'none';
    document.getElementById('get-pdf').style.display = 'none';
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
            pdf.text(`Page ${i} of ${totalPages}`, 
            pdf.internal.pageSize.getWidth() / 2,
            pdf.internal.pageSize.getHeight() - 10,
            { align: 'center' });
        }
    }).save();
}
