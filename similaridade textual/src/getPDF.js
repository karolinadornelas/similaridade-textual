export function getPdf() {
    const text1 = document.getElementById('highlightedText1').innerHTML;
    const text2 = document.getElementById('highlightedText2').innerHTML;
    const source1 = document.getElementById('source1').value.trim();
    const source2 = document.getElementById('source2').value.trim();
    const similarityPercentage = document.getElementById('similarityPercentage').innerText;

    //menu personalizado
    const content = `
        <style>
            header{
                margin-left: -15px;
                padding: 0;
                display: flex;
                justify-content: center;
                background-color: #0f4098;
                color: white;
                font-family: 'Poppins';
            }

            .logo{
                margin: 15px;
                display: flex;
            }

            .logo img{
                width: 110px;
            }

            .tile{
                margin: 5px 25px;
            }

            .tile h2{
                font-size: 25px;
                margin-top: -7px;
            }

            .acronim{
                margin-top: -15px;
            }

            .tile-fls{
                display: flex;
                justify-content: center;
            }
            
            .text-prop{
                display: flex;
                align-items: center;
            }
            
            .text-compare{
                text-align: justify;
                width:760px
            }
            
            #file-report{
                margin: 5px;
            }
            
            .text-compare-h4{
                font-weight: 300;
            }
        </style>

        <div>
            <header>
                <div class="logo">
                    <img src="/SECPROM.svg" alt="logo SECPROM">
                </div>
                <div class="tile">
                    <p>Força Aérea Brasileira</p>
                    <h2>Secretaria de Avaliação e <br>Promoções</h2>
                    <p class="acronim">SECPROM</p>
                </div>
            </header>
            <div id="file-report">
                <div class="tile-fls">
                    <h3>RELATÓRIO DE SIMILARIDADE DE TEXTOS</h3>
                </div>

                <div class="text-prop">
                    <p><strong>Texto 1: </strong></p>
                    <p><strong> CPG-1 DE ${source1} </strong></p>
                </div>
                
                <p class="text-compare">${text1}</p>
            
                <div class="text-prop">
                    <p><strong>Texto 2: </strong></p>
                    <p><strong> CPG-1 DE ${source2} </strong></p>
                </div>

                <p class="text-compare">${text2}</p>
            
                <h4 class="text-compare-h4">${similarityPercentage}</h4>
            </div>
            
        </div>
    `;

    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = content;
    document.body.appendChild(tempContainer);

    // Configurações do PDF
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

    //pdf config
    html2pdf().set(options).from(tempContainer).toPdf().get('pdf').then(function (pdf) {
        var totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.text(`Página ${i} de ${totalPages}`,
                pdf.internal.pageSize.getWidth() / 2,
                pdf.internal.pageSize.getHeight() - 10,
                { align: 'center' });
        }
    }).save().finally(() => {
        document.body.removeChild(tempContainer); 
    });
}
