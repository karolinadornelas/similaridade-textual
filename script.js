function compareTexts() {
            const text1 = document.getElementById('text1').value.trim();
            const text2 = document.getElementById('text2').value.trim();

            const words1 = text1.split(/\s+/);
            const words2 = text2.split(/\s+/);

            const commonWords = words1.filter(word => words2.includes(word));

            const totalWords = Math.max(words1.length, words2.length);
            const similarity = (commonWords.length / totalWords) * 100;
            
            let highlightedText1 = text1;
            commonWords.forEach(word => {
                highlightedText1 = highlightedText1.replace(new RegExp(word, 'g'), `<span class="highlight">${word}</span>`);
            });
            
            let highlightedText2 = text2;
            commonWords.forEach(word => {
                highlightedText2 = highlightedText2.replace(new RegExp(word, 'g'), `<span class="highlight">${word}</span>`);
            });
            document.getElementById('highlightedText1').innerHTML = highlightedText1;
            document.getElementById('highlightedText2').innerHTML = highlightedText2;
            document.getElementById('similarityPercentage').innerText = `Porcentagem de similaridade: ${similarity.toFixed(2)}%`;
        }
