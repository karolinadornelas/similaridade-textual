new Vue({
    el: '#main-content',
    data: {
        texto1: '',
        texto2: '',
        resultado: ''
    },
    methods: {
        compararTextos() {
        //capturar os textos
        var palavrasTexto1 = this.texto1.trim().toLowerCase().split(/\s+/);
        var palavrasTexto2 = this.texto2.trim().toLowerCase().split(/\s+/);
        //calculo do tamanho da convergência entre as palavras dos textos
        var convergencia = palavrasTexto1.filter(palavra => palavrasTexto2.includes(palavra));
        //calculo da porcentagem de semelhança
        var semelhanca = (convergencia.length / (palavrasTexto1.length + palavrasTexto2.length - convergencia.length))*100;
        // resultado
        this.resultado = "Os textos são semelhantes em: " + semelhanca.toFixed(2) + "%";
    }
    }
});