// DEPENDENCIAS

const readline = require("readline-sync");
const clear = require("clear");

//VARIÁVEIS GLOBAIS

let acervo;                //array contendo os objetos cadastrados
let livro_alterado;        //auxiliará na alteração de cadastros, contendo os valores objeto a ser alterado
let tituloLivro;           //variável que armazenará o título do livro a ser cadastrado/alterado
let autorLivro;            //variável que armazenará o autor principal do livro a ser cadastrado/alterado
let outrosAutoresLivro;         //variável que armazenará outros autores do livro a ser cadastrado/alterado
let edicaoLivro;           //variável que armazenará o n° da edição do livro a ser cadastrado/alterado
let publicacaoLivro;       //variável que armazenará a publicação do livro a ser cadastrado/alterado
let paginasLivro;          //variável que armazenará o n° de páginas do livro a ser cadastrado/alterado
let isbnLivro;             //variável que armazenará o ISBN do livro a ser cadastrado/alterado
let assuntosLivro;         //array que armazenará os assuntos do livro a ser cadastrado/alterado
let isbnBusca;             //armazenará o ISBN a ser buscado no acervo
let posicao;               //índice do objeto encontrado dentro da lista acervo
let op;                    //operador das opções de alteração do cadastro do livro (título, autor principal, ISBN, etc)
let alterar;               //booleano que indicará ao laço de repetição das opções de alteração (do/while) uma nova repetição (ou não)
let continuar;             //se 'sim', o usuário continuará alterando o mesmo livro, se 'nao', irá voltar ao menu principal
let nao_encontrou = true;  //se for 'true', não aparecerá a mensagem de 'livro não encontrado'; se for 'false', aparecerá.
let remover;               //se for 'sim', confirma a remoção do cadastro do livro; se for 'nao', voltará ao menu principal
let loop = true;

// FUNCOES AUXILIARES

/* Automatiza a formatacao de perguntas ao usuario.
opcao    - recebe uma array com os valores corretos para o usuario digitar (As opcoes do menu)
msg      - recebe a mensagem a ser apresentada ao usuario. Valor padrao: "Escolha uma opção: "
msg_erro - recebe a mensagem que sera apresentada caso o usuario nao insira uma das opcoes definidas no parametro opcoes. Valor padrao:"Opção inválida!"
*/
function pergunta(opcao, msg="Escolha uma opção: ", msg_erro="Opção inválida!"){
    return readline.question(msg, {limit: opcao, limitMessage: `\x1b[31m\x1b[1m${msg_erro}\x1b[0m\n`});
}

// Formatacao dos titulos
function titulo(msg){
    return `\x1b[107m\x1b[1m          ${msg}          \x1b[0m\n`
}

//==================================================================================================================

// Livros de exemplo
const livro1 = {
    titulo: "A Economia da Natureza",
    autor: "Robert E. Ricklefs",
    outrosAutores: "ex:Jane Austen",
    edicao: "7",
    publicacao: "Rio de Janeiro: Guanabara Koogan, 2016",
    paginas: "606",
    isbn: "9788527728768",
    assuntos: ["Ecologia", "Diversidade biologica", "Ecossistemas", "Comunidades vegetais"],
};

const livro2 = {
    titulo: "A Historia da Gastronomia",
    autor: "Maria Leonor de Macedo Soares Leal",
    outrosAutores: "ex:Jane Austen",
    edicao: "1",
    publicacao: "Rio de Janeiro: Senac, 2005",
    paginas: "137",
    isbn: "8585746777",
    assuntos: ["Gastronomia", "Culinaria", "Tecnologia de alimentos", "Historia"],
};

//array contendo os objetos cadastrados
acervo = [livro1, livro2];

while (loop) {
    console.clear(); // Limpa a tela do terminal toda vez que o loop inicia
    console.log(titulo("CATALOGO DE LIVROS"));
    console.log("1 - Listar livros registrados");
    console.log("2 - Cadastrar novo livro");
    console.log("3 - Buscar livro");
    console.log("4 - Alterar livro");
    console.log("5 - Remover livro");
    console.log("0 - Sair do sistema\n");
    
    op = pergunta([0,1,2,3,4,5]);

    nao_encontrou = true; //este valor deve ser true a cada início do loop, para indicar quando um livro cadastrado não for encontrado durante a busca, alteração e remoção.

    switch (op) {
        case "1":
            console.clear();
            console.log("\n__________LISTAGEM DOS LIVROS CADASTRADOS__________\n");

            for (const livro of acervo){
                console.log(`${livro.titulo}`.toUpperCase());
                console.log("------------------------------------------------------------------");
                console.log(`Autor principal: ${livro.autor}`);
                console.log(`Outros autores:  ${livro.outrosAutores}`);
                console.log(`Edicao:          ${livro.edicao}`);
                console.log(`Paginas:         ${livro.paginas}`);
                console.log(`Publicacao:      ${livro.publicacao}`);
                console.log(`ISBN:            ${livro.isbn}`);
                console.log(`assuntos:        ${livro.assuntos}\n\n`);
            }
            readline.keyInPause();
            break;

        case "2":
            console.clear();
            console.log("__________CADASTRO DE LIVRO__________\n");
            while(loop){
                tituloLivro = readline.question("Digite o titulo do livro: ");
                if(tituloLivro.length !==0 ){
                    break;
                }else{
                    console.log("------------------------------------------------------")
                    console.log("Campo Obrigatorio! Por favor forneça o Titulo do livro")
                    console.log("------------------------------------------------------")
                }
            }
            autorLivro = readline.question("Digite o nome do autor do livro: ");
            outrosAutoresLivro = readline.question("Digite o nome dos outros autores (ex: autor1,autor2):").split(',');
            edicaoLivro = readline.question("Digite o numero da edicao do livro: ");
            paginasLivro = readline.question("Digite o numero de paginas do livro: ");
            publicacaoLivro = readline.question("Digite a publicacao do livro (ex: Sao Paulo: Companhia das Letras, 2000): ");
            while(loop){
                nao_encontrou = true;
                isbnLivro = readline.question("Digite o ISBN do livro: ");
                for (const livro of acervo) {
                    if (livro.isbn === isbnLivro) {
                        nao_encontrou = false;
                        break;
                    }
                }

                if(isbnLivro.length !==0 && nao_encontrou === true){
                    break;
                } else if(nao_encontrou === false) {
                    console.log("----------------------------------------------------");
                    console.log("                ISBN ja cadastrado!");
                    console.log("----------------------------------------------------");
                }else{
                    console.log("----------------------------------------------------");
                    console.log("Campo Obrigatorio! Por favor forneça o ISBN do livro.");
                    console.log("----------------------------------------------------");
                }
            }

            while (loop) {
                assuntosLivro = readline.question("Digite os assuntos do livro separados por virgula (ex: assunto1,assunto2): ");
                if (assuntosLivro.length !== 0) {
                    assuntosLivro = assuntosLivro.split(',');
                    break;
                } else {
                    console.log("-----------------------------------------")
                    console.log("Pelo menos um assunto deve ser fornecido.");
                    console.log("-----------------------------------------")
                }
            }
            const livro = {
                titulo: tituloLivro,
                autor: autorLivro,
                outrosAutores: outrosAutoresLivro,
                edicao: edicaoLivro,
                publicacao: publicacaoLivro,
                paginas: paginasLivro,
                isbn: isbnLivro,
                assuntos: assuntosLivro
            }

            acervo.push(livro);
            console.log("\n\tLivro cadastrado com sucesso!\n");
            console.log(`${livro.titulo}`.toUpperCase());
            console.log("------------------------------------------------------------------");
            console.log(`Autor principal: ${livro.autor}`);
            console.log(`Outros autores:  ${livro.outrosAutores}`);
            console.log(`Edicao:          ${livro.edicao}`);
            console.log(`Paginas:         ${livro.paginas}`);
            console.log(`Publicacao:      ${livro.publicacao}`);
            console.log(`ISBN:            ${livro.isbn}`);
            console.log(`Assuntos:        ${livro.assuntos}\n\n`);

            readline.keyInPause();
            break;

        case "3":
            do {
                console.clear();
                continuar = true;
                nao_encontrou = true;
                console.log(titulo("__________BUSCAR LIVRO__________"));
                isbnBusca = readline.question('Digite o ISBN do livro: ');
                for (const livro of acervo) {
                    if (livro.isbn === isbnBusca) {
                        console.log(`\n\x1b[92mLivro encontrado:\x1b[0m\n`);
                        console.log(`${livro.titulo}`.toUpperCase());
                        console.log("------------------------------------------------------------------");
                        console.log(`Autor principal: ${livro.autor}`);
                        console.log(`Outros autores:  ${livro.outrosAutores}`);
                        console.log(`Edição:          ${livro.edicao}`);
                        console.log(`Paginas:         ${livro.paginas}`);
                        console.log(`Publicação:      ${livro.publicacao}`);
                        console.log(`ISBN:            ${livro.isbn}`);
                        console.log(`assuntos:        ${livro.assuntos}`);
                        nao_encontrou = false;
                    }
                }
                if (nao_encontrou) { 
                    console.log(`\n\x1b[31m\x1b[1mNenhum registro com o ISBN ${isbnBusca} foi encontrado.\x1b[0m`);
                }
                console.log("\nRealizar uma nova busca?\n1 - Sim\n2 - Não\n")
                op = pergunta([1,2]);
                switch (op) {
                    case "1":
                        break;
                    case "2":
                        continuar = false;
                        break;
                }
            } while (continuar == true);
            break;
        case "4":
            console.clear();
            console.log("\n__________ALTERANDO CADASTRO DE LIVRO__________\n");
            isbnBusca = readline.question('Digite o ISBN do livro: ');
            for (const livro of acervo) {
                if (livro.isbn === isbnBusca) {
                    posicao = acervo.indexOf(livro);
                    livro_alterado = acervo[posicao];
                    console.log('\n\tLivro encontrado:\n');
                    console.log(`${livro.titulo}`.toUpperCase());
                    console.log("------------------------------------------------------------------");
                    console.log(`Autor principal: ${livro.autor}`);
                    console.log(`Outros autores:  ${livro.outrosAutores}`);
                    console.log(`Edicao:          ${livro.edicao}`);
                    console.log(`Paginas:         ${livro.paginas}`);
                    console.log(`Publicacao:      ${livro.publicacao}`);
                    console.log(`ISBN:            ${livro.isbn}`);
                    console.log(`assuntos:        ${livro.assuntos}\n\n`);

                    do {
                        op = readline.questionInt(`
O que deseja alterar?
---------------------
1. Titulo
2. Autor Principal
3. Outros autores
4. Edicao
5. Publicacao
6. Paginas 
7. ISBN
8. Assuntos
0. Sair
____________________
=> `);

                        switch (op) {
                            case 1:
                                while(loop){
                                    tituloLivro = readline.question("Digite o titulo do livro: ");
                                    if(tituloLivro.length !==0 ){
                                        livro_alterado.titulo = tituloLivro;
                                        acervo[posicao] = livro_alterado;
                                        break;
                                    }else{
                                        console.log("------------------------------------------------------")
                                        console.log("Campo Obrigatorio! Por favor forneça o Titulo do livro")
                                        console.log("------------------------------------------------------")
                                    }
                                }
                                console.log('\n\tAlteracao realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edicao:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicacao:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);
                                
                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nERRO: Resposta invalida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 2:
                                autorLivro = readline.question('Digite o nome do autor do livro: ');
                                livro_alterado.autor = autorLivro;
                                acervo[posicao] = livro_alterado;

                                console.log('\n\tAlteracao realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edicao:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicacao:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);

                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta invalida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;
                            
                            case 3:
                                outrosAutoresLivro = readline.question("Digite o nome dos outros autores (ex: autor1,autor2):").split(',');
                                livro_alterado.outrosAutores = outrosAutoresLivro;
                                acervo[posicao] = livro_alterado;

                                console.log('\n\tAlteracao realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edicao:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicacao:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);

                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta invalida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 4:
                                edicaoLivro = readline.question('Digite o número da edicao do livro: ');
                                livro_alterado.edicao = edicaoLivro;
                                acervo[posicao] = livro_alterado;
    
                                console.log('\n\tAlteracao realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edicao:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicacao:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);

                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta invalida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 5:
                                publicacaoLivro = readline.question('Digite a publicacao do livro (ex: São Paulo: Companhia das Letras, 2000): ');
                                livro_alterado.publicacao = publicacaoLivro;
                                acervo[posicao] = livro_alterado;

                                console.log('\n\tAlteracao realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edicao:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicacao:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);
                                
                    
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta invalida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 6:
                                paginasLivro = readline.question('Digite o numero de paginas do livro: ');
                                livro_alterado.paginas = paginasLivro;
                                acervo[posicao] = livro_alterado;

                                console.log('\n\tAlteracao realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edicao:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicacao:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);
                                
                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta invalida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 7:
                                while(loop){
                                    nao_encontrou = true;
                                    isbnLivro = readline.question("Digite o ISBN do livro: ");
                                    for (const livro of acervo) {
                                        if (livro.isbn === isbnLivro && livro_alterado === livro) {
                                            nao_encontrou = true;
                                        } else if (livro.isbn === isbnLivro && livro_alterado !== livro) {
                                            nao_encontrou = false;
                                            break;
                                        }
                                    }
                    
                                    if(isbnLivro.length !==0 && nao_encontrou === true){
                                        livro_alterado.isbn = isbnLivro;
                                        acervo[posicao] = livro_alterado;
                                        break;
                                    } else if(nao_encontrou == false) {
                                        console.log("----------------------------------------------------");
                                        console.log("                ISBN ja cadastrado!");
                                        console.log("----------------------------------------------------");
                                    }else {
                                        console.log("----------------------------------------------------");
                                        console.log("Campo Obrigatorio! Por favor forneça o ISBN do livro.");
                                        console.log("----------------------------------------------------");
                                    }
                                }
                                
                                console.log('\n\tAlteracao realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edicao:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicacao:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);
                                
                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta invalida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;
                            case 8:
                                while (loop) {
                                    assuntosLivro = readline.question("Digite os assuntos do livro separados por virgula (ex: assunto1,assunto2): ");
                                    if (assuntosLivro.length !== 0) {
                                        assuntosLivro = assuntosLivro.split(',');
                                        livro_alterado.assuntos = assuntosLivro;
                                        acervo[posicao] = livro_alterado;
                                        break;
                                    } else {
                                        console.log("-----------------------------------------")
                                        console.log("Pelo menos um assunto deve ser fornecido.");
                                        console.log("-----------------------------------------")
                                    }
                                }

                                console.log('\n\tAlteracao realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edicao:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicacao:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);
                                

                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta invalida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 0:
                                alterar = false;
                                break;
                            default:
                                alterar = true;
                                console.log('\nOpcao incorreta. Tente novamente.');
                                break;
                        }
                    } while (alterar);
                    nao_encontrou = false;
                    break;
                }
            }
            if (nao_encontrou) {
                console.log('\nLivro nao encontrado!\n');
                readline.keyInPause();
            }
            break;

        case "5":
            console.log("__________REMOVENDO CADASTRO DE LIVRO__________\n");
            isbnBusca = readline.question('Digite o ISBN do livro: ');
            for (const livro of acervo) {
                if (livro.isbn === isbnBusca) {
                    posicao = acervo.indexOf(livro);
                    nao_encontrou = false;
                    console.log('\n\tLivro encontrado:\n');
                    console.log(`${livro.titulo}`.toUpperCase());
                    console.log("------------------------------------------------------------------");
                    console.log(`Autor principal: ${livro.autor}`);
                    console.log(`Outros autores:  ${livro.outrosAutores}`);
                    console.log(`Edicao:          ${livro.edicao}`);
                    console.log(`Paginas:         ${livro.paginas}`);
                    console.log(`Publicacao:      ${livro.publicacao}`);
                    console.log(`ISBN:            ${livro.isbn}`);
                    console.log(`assuntos:        ${livro.assuntos}\n\n`);

                    do {
                        remover = readline.question('\nDeseja remover o livro? <sim / nao> : ');
                        remover = remover.toLowerCase();
                        if (remover == 'sim') {
                            acervo.splice(posicao, 1);
                            console.log('\nRemocao concluida!\n');
                        } else if (remover == 'nao') {
                            console.log('\nRemocao cancelada!');
                        } else {
                            console.log('\nResposta invalida! Tente novamente.');
                        }
                    } while (remover !== 'sim' && remover !== 'nao');
                }
            }
            if (nao_encontrou) {
                console.log('\nLivro nao encontrado!\n');
            }
            readline.keyInPause();
            break;
        case "0":
            console.log("\nFechando sistema de catálogo...");
            loop = false;
            break;
    }
}
