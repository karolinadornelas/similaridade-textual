import { compareTexts } from './compareTexts.js';
import { rebootFields } from './rebootFields.js';
import { getPdf } from './getPDF.js';

document.getElementById('app').innerHTML = `
    <div class="content-wrap">
        <nav>
            <div class="navbar-link-2">
                <div class="scnd-x">
                    <img src="./assets/SECPROM.png" alt="logo SECPROM">
                    <h3>SECPROM</h3>
                </div>
            </div>
        </nav>
    </div>
    
    <div id="main-content">
        <div class="content-x">
            <h3>Relação de Reprodução Textual</h3>
        </div>

        <div id="comparing-mech">
            <div class="comparing-box">
                <textarea id="text1" placeholder="Insira o primeiro texto" rows="6" cols="50"></textarea><br>
                <textarea id="text2" placeholder="Insira o segundo texto" rows="6" cols="50"></textarea><br>
            </div>
            <div class="op-btn">
                <button id="compare-button">Comparar</button>
                <button id="rebootFields">Novo Texto</button>
            </div>
        </div>
        
        <div id="results">
            <div id="result1">
                <h3>Texto 1:</h3>
                <div id="highlightedText1"></div>
            </div>

            <div id="result2">
                <h3>Texto 2:</h3>
                <div id="highlightedText2"></div>
            </div>
            
            <p id="similarityPercentage"></p>
        </div>

        <div class="op-btn-pdf">
            <button id="get-pdf">Gerar Arquivo PDF</button>
        </div>
    </div>

    <div id="custom-alert" class="custom-alert">
        <div class="custom-alert-content">
            <p id="custom-alert-message"></p>
            <button id="custom-alert-okay">OK</button>
        </div>
    </div>
`;

document.getElementById('compare-button').addEventListener('click', compareTexts);
document.getElementById('rebootFields').addEventListener('click', rebootFields);
document.getElementById('get-pdf').addEventListener('click', getPdf);
