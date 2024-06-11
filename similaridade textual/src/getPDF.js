export function getPdf() {
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
