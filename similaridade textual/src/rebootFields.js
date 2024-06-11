export function rebootFields() {
    document.getElementById('text1').value = '';
    document.getElementById('text2').value = '';

    document.getElementById('highlightedText1').textContent = '';
    document.getElementById('highlightedText2').textContent = '';
    document.getElementById('similarityPercentage').textContent = '';

    document.getElementById('results').style.display = 'none';
    document.getElementById('rebootFields').style.display = 'none';
    document.getElementById('get-pdf').style.display = 'none';
}