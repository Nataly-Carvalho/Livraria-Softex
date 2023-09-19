//habilitando a biblioteca readline-sync
import readline from "readline-sync";

/** Automatiza a formatacao de perguntas ao usuario.
 * @param {string} tipo - Define o tipo de msg. Valores possiveis: titulo, positivo, aviso, erro, pergunta
 * @param {lista} opcoes - recebe uma array com os valores corretos para o usuario digitar: PADRAO: [0,1,2]
 * @param {string} msg - recebe a mensagem a ser apresentada ao usuario. PADRAO: "Escolha uma opção: "
 * @param {string} erro - Mensagem que sera apresentada caso o usuario nao insira uma das opcoes definidas no parametro opcoes. PADRAO: "Opção inválida!"
**/

function padrao(tipo, opcoes=[0,1,2], msg="Escolha uma opção: ", erro="Opção inválida!"){
    if (tipo == "titulo") {
        console.log(`\x1b[107m\x1b[30m\x1b[1m          ${msg}          \x1b[0m\n`);
    } else if (tipo == "positivo") {
        console.log(`\n\x1b[92m\x1b[1m${msg}\x1b[0m\n`);
    } else if (tipo == "aviso") {
        console.log(`\n\x1b[33m\x1b[1m${msg}\x1b[0m\n`);
    } else if (tipo == "erro") {
        console.log(`\n\x1b[31m\x1b[1m${msg}\x1b[0m\n`);
    }else if (tipo == "pergunta") {
        return readline.question(`\n${msg}`, {limit: opcoes, limitMessage: `\x1b[31m\x1b[1m${erro}\x1b[0m\n`});
    }
}


function imprimeLivro (livro){
    console.log(`\n${livro.getTituloLivro}`.toUpperCase());
    console.log("------------------------------------------------------------------");
    console.log(`Autor principal: ${livro.getAutorLivro}`);
    console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
    console.log(`Edicao:          ${livro.getEdicaoLivro}`);
    console.log(`Paginas:         ${livro.getPaginasLivro}`);
    console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
    console.log(`ISBN:            ${livro.getIsbnLivro}`);
    console.log(`assuntos:        ${livro.getAssuntosLivro}\n`);
}

export {padrao, imprimeLivro};