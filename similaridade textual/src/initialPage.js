import '/src/styles/initialPage.css';

export function initialPage() {
    document.getElementById('app').innerHTML = `
        <div id="initial-page">
            <div id="setup-initial-page">
                <div id="page-id">
                    <div class="icon-container">
                        <img src="../assets/SECPROM.png" alt="logo SECPROM">
                    </div>
                    <div class="title-container">
                        <p>Força Aérea Brasileira</p>
                        <h1>Secretaria de Avaliação e Promoções</h1>
                        <p>SECPROM</p>
                    </div>
                </div>
                <div id="page-assets">
                    <div class="doc-info-set">
                        <div class="assets-display-doc">
                            <img src="../assets/doc-files.png" alt="">            
                        </div>
                        <div class="assets-display-info">
                            <img src="../assets/doc-info.png" alt="">            
                        </div>
                    </div>
                    <h3>Bem-vindo ao Comparador de Texto</h3>
                    <p>Esta aplicação permite comparar textos, verificar a taxa de reprodução textual e gerar um arquivo PDF com as evidências encontradas.</p>
                    <button id="start">COMEÇAR <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </div>`;
    
    document.getElementById('start').addEventListener('click', () => {
        import('./mainPage.js').then(module => {
            module.setupMainPage();
        });
    });
}
