const readline = require("readline-sync");
const clear = require("clear");

/*
VARIÁVEIS GLOBAIS
*/
let acervo;         //array contendo os objetos cadastrados
let livro_alterado; //auxiliará na alteração de cadastros, contendo os valores objeto a ser alterado
let tituloLivro;         //variável que armazenará o título do livro a ser cadastrado/alterado
let autorLivro;          //variável que armazenará o autor principal do livro a ser cadastrado/alterado
let outrosAutoresLivros; //variável que armazenará outros autores do livro a ser cadastrado/alterado
let edicaoLivro;         //variável que armazenará o n° da edição do livro a ser cadastrado/alterado
let publicacaoLivro;     //variável que armazenará a publicação do livro a ser cadastrado/alterado
let paginasLivro;        //variável que armazenará o n° de páginas do livro a ser cadastrado/alterado
let isbnLivro;           //variável que armazenará o ISBN do livro a ser cadastrado/alterado
let assuntosLivro;       //array que armazenará os assuntos do livro a ser cadastrado/alterado
let isbnBusca;      //armazenará o ISBN a ser buscado no acervo
let posicao;        //índice do objeto encontrado dentro da lista acervo
let op;             //operador das opções de alteração do cadastro do livro (título, autor principal, ISBN, etc)
let alterar;        //booleano que indicará ao laço de repetição das opções de alteração (do/while) uma nova repetição (ou não)
let continuar;      //se 'sim', o usuário continuará alterando o mesmo livro, se 'nao', irá voltar ao menu principal
let nao_encontrou = true;  //se for 'true', não aparecerá a mensagem de 'livro não encontrado'; se for 'false', aparecerá.
let remover;        //se for 'sim', confirma a remoção do cadastro do livro; se for 'nao', voltará ao menu principal
let loop = true;

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
    assuntos: ["Ecologia", "Diversidade biológica", "Ecossistemas", "Comunidades vegetais"],
};

const livro2 = {
    titulo: "A História da Gastronomia",
    autor: "Maria Leonor de Macedo Soares Leal",
    outrosAutores: "ex:Jane Austen",
    edicao: "1",
    publicacao: "Rio de Janeiro: Senac, 2005",
    paginas: "137",
    isbn: "8585746777",
    assuntos: ["Gastronomia", "Culinária", "Tecnologia de alimentos", "História"],
};

//array contendo os objetos cadastrados
acervo = [livro1, livro2];
acervo = [livro1 , livro2];

while (loop) {
    console.clear(); // Limpa a tela do terminal toda vez que o loop inicia
    console.log("__________CATALOGO_DE_LIVROS__________\n")
    console.log("                 MENU\n");
    console.log("1 - Listar livros registrados");
    console.log("2 - Cadastrar novo livro");
    console.log("3 - Buscar livro");
    console.log("4 - Alterar livro");
    console.log("5 - Remover livro");
    console.log("0 - Sair do sistema");
    op = readline.questionInt("\nEscolha uma opcao: ");

    nao_encontrou = true; //este valor deve ser true a cada início do loop, para indicar quando um livro cadastrado não for encontrado durante a busca, alteração e remoção.

    switch (op) {
        case 1:
            console.clear();
            console.log("__________LISTAGEM DOS LIVROS CADASTRADOS__________\n");

            for (const livro of acervo){
                console.log(`${livro.titulo}`.toUpperCase());
                console.log("------------------------------------------------------------------");
                console.log(`Autor principal: ${livro.autor}`);
                console.log(`Outros autores:  ${livro.outrosAutores}`);
                console.log(`Edição:          ${livro.edicao}`);
                console.log(`Paginas:         ${livro.paginas}`);
                console.log(`Publicação:      ${livro.publicacao}`);
                console.log(`ISBN:            ${livro.isbn}`);
                console.log(`assuntos:        ${livro.assuntos}\n\n`);
            }
            readline.keyInPause();
            break;

        case 2:
            console.log("__________CADASTRO DE LIVRO__________\n");
            tituloLivro = readline.question("Digite o titulo do livro: ");
            autorLivro = readline.question("Digite o autor do livro: ");
            outrosAutoresLivro = readline.question("Digite o nome dos outros autores (ex: autor1,autor2):").split(',');
            edicaoLivro = readline.question("Digite o número da edição do livro: ");
            paginasLivro = readline.question("Digite o número de páginas do livro: ");
            publicacaoLivro = readline.question("Digite a publicação do livro (ex: São Paulo: Companhia das Letras, 2000): ");
            isbnLivro = readline.question("Digite o ISBN do livro: ");

            while (true) {
                assuntosLivro = readline.question("Digite os assuntos do livro separados por vírgula (ex: assunto1,assunto2): ");
                if (assuntosLivro.length !== 0) {
                    assuntosLivro = assuntosLivro.split(',')
                    break;
                } else {
                    console.log("Pelo menos um assunto deve ser fornecido.");
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

            acervo.push(livro)
            console.log("\n\tLivro cadastrado com sucesso!\n");
            readline.keyInPause();
            break;

        case 3:
            break;

        case 4:
            console.clear();
            console.log("__________ALTERANDO CADASTRO DE LIVRO__________\n");
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
                    console.log(`Edição:          ${livro.edicao}`);
                    console.log(`Paginas:         ${livro.paginas}`);
                    console.log(`Publicação:      ${livro.publicacao}`);
                    console.log(`ISBN:            ${livro.isbn}`);
                    console.log(`assuntos:        ${livro.assuntos}\n\n`);

                    do {
                        op = readline.questionInt(`
O que deseja alterar?
---------------------
1. Título
2. Autor Principal
3. Edição
4. Publicação
5. Páginas 
6. ISBN
7. Assuntos
0. Sair
____________________
=> `);

                        switch (op) {
                            case 1:
                                tituloLivro = readline.question('Digite o título do livro: ');
                                livro_alterado.titulo = tituloLivro;
                                console.log('\n\tAlteração realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edição:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicação:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);
                                
                                readline.keyInPause();
                                acervo[posicao] = livro_alterado;
                                acervo[posicao] = livro_alterado;
                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nERRO: Resposta inválida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;
                                        break;

                            case 2:
                                autorLivro = readline.question('Digite o autor do livro: ');
                                livro_alterado.autor = autorLivro;

                                console.log('\n\tAlteração realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edição:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicação:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);

                                readline.keyInPause();
                                acervo[posicao] = livro_alterado;
                                acervo[posicao] = livro_alterado;
                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta inválida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 3:
                                edicaoLivro = readline.question('Digite o número da edição do livro: ');
                                livro_alterado.edicao = edicaoLivro;
    
                                console.log('\n\tAlteração realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edição:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicação:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);

                                readline.keyInPause();
                                acervo[posicao] = livro_alterado;
                                acervo[posicao] = livro_alterado;
                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta inválida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 4:
                                publicacaoLivro = readline.question('Digite a publicação do livro (ex: São Paulo: Companhia das Letras, 2000): ');
                                livro_alterado.publicacao = publicacaoLivro;

                                console.log('\n\tAlteração realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edição:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicação:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);
                                
                                readline.keyInPause();
                                acervo[posicao] = livro_alterado;
                                acervo[posicao] = livro_alterado;
                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta inválida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 5:
                                paginasLivro = readline.question('Digite o número de páginas do livro: ');
                                livro_alterado.paginas = paginasLivro;

                                console.log('\n\tAlteração realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edição:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicação:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);
                                
                                readline.keyInPause();
                                acervo[posicao] = livro_alterado;
                                acervo[posicao] = livro_alterado;
                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta inválida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 6:
                                isbnLivro = readline.question('Digite o ISBN do livro: ');
                                livro_alterado.isbn = isbnLivro;
                                
                                console.log('\n\tAlteração realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edição:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicação:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);
                                
                                readline.keyInPause();
                                acervo[posicao] = livro_alterado;
                                acervo[posicao] = livro_alterado;
                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta inválida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;
                            case 7:
                                while (true) {
                                    assuntosLivro = readline.question("Digite os assuntos do livro separados por vírgula (ex: assunto1,assunto2): ");
                                    if (assuntosLivro.length !== 0) {
                                        assuntosLivro = assuntosLivro.split(',');
                                        livro_alterado.assuntos = assuntosLivro;
                                        break;
                                    } else {
                                        console.log("Pelo menos um assunto deve ser fornecido.");
                                    }
                                }

                                console.log('\n\tAlteração realizada com sucesso!\n');
                                console.log(`${livro.titulo}`.toUpperCase());
                                console.log("------------------------------------------------------------------");
                                console.log(`Autor principal: ${livro.autor}`);
                                console.log(`Outros autores:  ${livro.outrosAutores}`);
                                console.log(`Edição:          ${livro.edicao}`);
                                console.log(`Paginas:         ${livro.paginas}`);
                                console.log(`Publicação:      ${livro.publicacao}`);
                                console.log(`ISBN:            ${livro.isbn}`);
                                console.log(`assuntos:        ${livro.assuntos}\n\n`);
                                
                                readline.keyInPause();
                                acervo[posicao] = livro_alterado;
                                acervo[posicao] = livro_alterado;
                            
                                do {
                                    continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
                                    continuar = continuar.toLowerCase();
                                    if (continuar == 'sim') {
                                        alterar = true;
                                    } else if (continuar == 'nao') {
                                        alterar = false;
                                    } else {
                                        console.log('\nResposta inválida!');
                                    }
                                } while (continuar != 'sim' && continuar != 'nao');
                                break;

                            case 0:
                                alterar = false;
                                break;
                            default:
                                alterar = true;
                                console.log('\nOpção incorreta. Tente novamente.');
                                break;
                        }
                    } while (alterar);
                    nao_encontrou = false;
                    break;
                          nao_encontrou = false;
                          break;
                }
            }
            if (nao_encontrou) {
                console.log('\nLivro não encontrado!\n');
                console.keyInPause();
            }
            break;

        case 5:
            console.log("__________REMOVENDO CADASTRO DE LIVRO__________\n");
            isbnBusca = readline.question('Digite o ISBN do livro: ');
            for (const livro of acervo) {
                if (livro.isbn === isbnBusca) {
                    posicao = acervo.indexOf(livro);
                    nao_encontrou = false;
                    console.log('\n\tLivro encontrado:');
                    console.log(`${livro.titulo}`.toUpperCase());
                    console.log("------------------------------------------------------------------");
                    console.log(`Autor principal: ${livro.autor}`);
                    console.log(`Outros autores:  ${livro.outrosAutores}`);
                    console.log(`Edição:          ${livro.edicao}`);
                    console.log(`Paginas:         ${livro.paginas}`);
                    console.log(`Publicação:      ${livro.publicacao}`);
                    console.log(`ISBN:            ${livro.isbn}`);
                    console.log(`assuntos:        ${livro.assuntos}\n\n`);

                    do {
                        remover = readline.question('\nDeseja remover o livro? <sim / nao> : ');
                        remover = remover.toLowerCase();
                        if (remover == 'sim') {
                            acervo.splice(posicao, 1);
                            console.log('\nRemoção concluída!\n');
                        } else if (remover == 'nao') {
                            console.log('\nRemoção cancelada!');
                        } else {
                            console.log('\nResposta inválida! Tente novamente.');
                        }
                    } while (remover !== 'sim' && remover !== 'nao');
                }
            }
            if (nao_encontrou) {
                console.log('\nLivro não encontrado!\n');
            }
            readline.keyInPause();
            break;
        case 0:
            console.log("\nFechando sistema de catálogo...");
            loop = false;
            break;
        default:
            console.log("\nOpção inválida!\n\n");
            readline.keyInPause();
            break;
    }
}
