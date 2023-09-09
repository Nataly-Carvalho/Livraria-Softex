const readline = require("readline-sync");
const clear = require("clear");

/*
VARIÁVEIS GLOBAIS
*/
let acervo;         //array contendo os objetos cadastrados
let livro_alterado; //auxiliará na alteração de cadastros, contendo os valores objeto a ser alterado
let titulo;         //variável que armazenará o título do livro a ser cadastrado/alterado
let autor;          //variável que armazenará o autor principal do livro a ser cadastrado/alterado
let edicao;         //variável que armazenará o n° da edição do livro a ser cadastrado/alterado
let publicacao;     //variável que armazenará a publicação do livro a ser cadastrado/alterado
let paginas;        //variável que armazenará o n° de páginas do livro a ser cadastrado/alterado
let isbn;           //variável que armazenará o ISBN do livro a ser cadastrado/alterado
let assuntos;       //array que armazenará os assuntos do livro a ser cadastrado/alterado
let isbnBusca;      //armazenará o ISBN a ser buscado no acervo
let posicao;        //índice do objeto encontrado dentro da lista acervo
let op;             //operador das opções de alteração do cadastro do livro (título, autor principal, ISBN, etc)
let alterar;        //booleano que indicará ao laço de repetição das opções de alteração (do/while) uma nova repetição (ou não)
let continuar;      //se 'sim', o usuário continuará alterando o mesmo livro, se 'nao', irá voltar ao menu principal
let elementos;      //indicará, na alteração/criação dos assuntos, o número de assuntos que terá o cadastro do livro
let nao_encontrou;  //se for 'true', não aparecerá a mensagem de 'livro não encontrado'; se for 'false', aparecerá.
let remover;        //se for 'sim', confirma a remoção do cadastro do livro; se for 'nao', voltará ao menu principal

//==================================================================================================================

// Livros de exemplo
const livro1 = {
    titulo: "A Economia da Natureza",
    autor: "Robert E. Ricklefs",
    edicao: "7",
    publicacao: "Rio de Janeiro: Guanabara Koogan, 2016",
    paginas: "606",
    isbn: "9788527728768",
    assuntos: ["Ecologia", "Diversidade biológica", "Ecossistemas", "Comunidades vegetais"],
};

const livro2 = {
    titulo: "A História da Gastronomia",
    autor: "Maria Leonor de Macedo Soares Leal",
    edicao: "1",
    publicacao: "Rio de Janeiro: Senac, 2005",
    paginas: "137",
    isbn: "8585746777",
    assuntos: ["Gastronomia", "Culinária", "Tecnologia de alimentos", "História"],
};

//array contendo os objetos cadastrados
acervo = [livro1 , livro2];

let loop = true;

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
    let op = readline.questionInt("\nEscolha uma opcao: ");

    switch (op) {
        case 1:
            console.clear();
            console.log("__________LISTA DE LIVROS CADASTRADOS__________\n")
            for (const livro of acervo){
                console.log(`${livro.titulo}`.toUpperCase());
                console.log("------------------------------------------------------------------");
                console.log(`Autor:      ${livro.autor}`);
                console.log(`Edição:     ${livro.edicao}`);
                console.log(`Paginas:    ${livro.paginas}`);
                console.log(`Publicação: ${livro.publicacao}`);
                console.log(`ISBN:       ${livro.isbn}`);
                console.log(`assuntos: ${livro.assuntos}\n\n`);
            }
            readline.keyInPause();        
            break;
        case 2:
            let tituloLivro = readline.question("Digite o titulo do livro: ");
            let autorLivro = readline.question("Digite o autor do livro: ");
            let edicaoLivro = readline.questionInt("Digite a edição do livro: ");
            let paginasLivro = readline.questionInt("Digite a quantidade de paginas do livro: ");
            let publicacaoLivro = readline.question("Digite o local de publicação do livro: ");
            let isbnLivro = readline.questionInt("Digite o ISBN do livro: ");
            let assuntosLivro =[];
            for(let i=0; i<4; i++){
                assuntosLivro[i] = readline.question(`Digite o assunto do livro ${i+1}: `);
            }
            const livro ={
                titulo: tituloLivro,
                autor:  autorLivro,
                edicao: edicaoLivro,
                publicacao: publicacaoLivro,
                paginas: paginasLivro,
                isbn: isbnLivro,
                assuntos: assuntosLivro
            }

            acervo.push(livro)
            console.log("Livro cadastrado com sucesso!");
            readline.keyInPause();
            break;
        case 3:
            break
        case 4:
            console.log('\nAlterando Cadastro');
            console.log('--------------');
            isbnBusca = readline.question('\nDigite o ISBN do livro: ');
            for (const livro of acervo) {
                if (livro.isbn === isbnBusca) {
                    posicao = acervo.indexOf(livro);
                    livro_alterado = acervo[posicao];
                    console.log('\n\tLivro encontrado.');
                    console.log('-----------------------------------------------------------------\n');
                    console.log('_________________________________________________________________');
                    console.log(`Título: "${livro.titulo}"`);
                    console.log('_________________________________________________________________');
                    console.log(`Autor(a) Principal: ${livro.autor}`);
                    console.log('_________________________________________________________________');
                    console.log(`Edição: ${livro.edicao}°`);
                    console.log('_________________________________________________________________');
                    console.log(`Publicação: ${livro.publicacao}`);
                    console.log('_________________________________________________________________');
                    console.log(`Páginas: ${livro.paginas}p`);
                    console.log('_________________________________________________________________');
                    console.log(`ISBN: ${livro.isbn}`);
                    console.log('_________________________________________________________________');
                    console.log(`Assuntos:`);
                    for (let n = 0; n < livro.assuntos.length; n++) {
                        console.log(`\t${livro.assuntos[n]}`);
                    }
                    console.log('_________________________________________________________________');
                    console.log('');
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
                                titulo = readline.question('\nTítulo: ');
                                livro_alterado.titulo = titulo;
                                console.log('\n________________________________\n');
                                console.log('Alteração realizada com sucesso!');
                                console.log('-----------------------------------------------------------------\n');
                                console.log('_________________________________________________________________');
                                console.log(`Título: "${livro_alterado.titulo}"`);
                                console.log('_________________________________________________________________');
                                console.log(`Autor(a) Principal: ${livro_alterado.autor}`);
                                console.log('_________________________________________________________________');
                                console.log(`Edição: ${livro_alterado.edicao}°`);
                                console.log('_________________________________________________________________');
                                console.log(`Publicação: ${livro_alterado.publicacao}`);
                                console.log('_________________________________________________________________');
                                console.log(`Páginas: ${livro_alterado.paginas}p`);
                                console.log('_________________________________________________________________');
                                console.log(`ISBN: ${livro_alterado.isbn}`);
                                console.log('_________________________________________________________________');
                                console.log(`Assuntos:`);
                                for (let n = 0; n < livro_alterado.assuntos.length; n++) {
                                    console.log(`\t${livro_alterado.assuntos[n]}`);
                                }
                                console.log('_________________________________________________________________');
                                console.log('');
                                readline.keyInPause();
                            
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
                            case 2:
                                autor = readline.question('\nAutor(a) Principal: ');
                                livro_alterado.autor = autor;
                                console.log('\n________________________________\n');
                                console.log('Alteração realizada com sucesso!');
                                console.log('-----------------------------------------------------------------\n');
                                console.log('_________________________________________________________________');
                                console.log(`Título: "${livro_alterado.titulo}"`);
                                console.log('_________________________________________________________________');
                                console.log(`Autor(a) Principal: ${livro_alterado.autor}`);
                                console.log('_________________________________________________________________');
                                console.log(`Edição: ${livro_alterado.edicao}°`);
                                console.log('_________________________________________________________________');
                                console.log(`Publicação: ${livro_alterado.publicacao}`);
                                console.log('_________________________________________________________________');
                                console.log(`Páginas: ${livro_alterado.paginas}p`);
                                console.log('_________________________________________________________________');
                                console.log(`ISBN: ${livro_alterado.isbn}`);
                                console.log('_________________________________________________________________');
                                console.log(`Assuntos:`);
                                for (let n = 0; n < livro_alterado.assuntos.length; n++) {
                                    console.log(`\t${livro_alterado.assuntos[n]}`);
                                }
                                console.log('_________________________________________________________________');
                                console.log('');
                                readline.keyInPause();
                            
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
                                edicao = readline.question('\nN° da edição: ');
                                livro_alterado.edicao = edicao;
                                console.log('\n________________________________\n');
                                console.log('Alteração realizada com sucesso!');
                                console.log('-----------------------------------------------------------------\n');
                                console.log('_________________________________________________________________');
                                console.log(`Título: "${livro_alterado.titulo}"`);
                                console.log('_________________________________________________________________');
                                console.log(`Autor(a) Principal: ${livro_alterado.autor}`);
                                console.log('_________________________________________________________________');
                                console.log(`Edição: ${livro_alterado.edicao}°`);
                                console.log('_________________________________________________________________');
                                console.log(`Publicação: ${livro_alterado.publicacao}`);
                                console.log('_________________________________________________________________');
                                console.log(`Páginas: ${livro_alterado.paginas}p`);
                                console.log('_________________________________________________________________');
                                console.log(`ISBN: ${livro_alterado.isbn}`);
                                console.log('_________________________________________________________________');
                                console.log(`Assuntos:`);
                                for (let n = 0; n < livro_alterado.assuntos.length; n++) {
                                    console.log(`\t${livro_alterado.assuntos[n]}`);
                                }
                                console.log('_________________________________________________________________');
                                console.log('');
                                readline.keyInPause();
                            
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
                                publicacao = readline.question('\nPublicação (Estado: nome da editora, ano)\n: ');
                                livro_alterado.publicacao = publicacao;
                                console.log('\n________________________________\n');
                                console.log('Alteração realizada com sucesso!');
                                console.log('-----------------------------------------------------------------\n');
                                console.log('_________________________________________________________________');
                                console.log(`Título: "${livro_alterado.titulo}"`);
                                console.log('_________________________________________________________________');
                                console.log(`Autor(a) Principal: ${livro_alterado.autor}`);
                                console.log('_________________________________________________________________');
                                console.log(`Edição: ${livro_alterado.edicao}°`);
                                console.log('_________________________________________________________________');
                                console.log(`Publicação: ${livro_alterado.publicacao}`);
                                console.log('_________________________________________________________________');
                                console.log(`Páginas: ${livro_alterado.paginas}p`);
                                console.log('_________________________________________________________________');
                                console.log(`ISBN: ${livro_alterado.isbn}`);
                                console.log('_________________________________________________________________');
                                console.log(`Assuntos:`);
                                for (let n = 0; n < livro_alterado.assuntos.length; n++) {
                                    console.log(`\t${livro_alterado.assuntos[n]}`);
                                }
                                console.log('_________________________________________________________________');
                                console.log('');
                                readline.keyInPause();
                            
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
                                paginas = readline.question('\nN° de páginas: ');
                                livro_alterado.paginas = paginas;
                                console.log('\n________________________________\n');
                                console.log('Alteração realizada com sucesso!');
                                console.log('-----------------------------------------------------------------\n');
                                console.log('_________________________________________________________________');
                                console.log(`Título: "${livro_alterado.titulo}"`);
                                console.log('_________________________________________________________________');
                                console.log(`Autor(a) Principal: ${livro_alterado.autor}`);
                                console.log('_________________________________________________________________');
                                console.log(`Edição: ${livro_alterado.edicao}°`);
                                console.log('_________________________________________________________________');
                                console.log(`Publicação: ${livro_alterado.publicacao}`);
                                console.log('_________________________________________________________________');
                                console.log(`Páginas: ${livro_alterado.paginas}p`);
                                console.log('_________________________________________________________________');
                                console.log(`ISBN: ${livro_alterado.isbn}`);
                                console.log('_________________________________________________________________');
                                console.log(`Assuntos:`);
                                for (let n = 0; n < livro_alterado.assuntos.length; n++) {
                                    console.log(`\t${livro_alterado.assuntos[n]}`);
                                }
                                console.log('_________________________________________________________________');
                                console.log('');
                                readline.keyInPause();
                            
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
                                isbn = readline.question('\nISBN: ');
                                livro_alterado.isbn = isbn;
                                console.log('\n________________________________\n');
                                console.log('Alteração realizada com sucesso!');
                                console.log('-----------------------------------------------------------------\n');
                                console.log('_________________________________________________________________');
                                console.log(`Título: "${livro_alterado.titulo}"`);
                                console.log('_________________________________________________________________');
                                console.log(`Autor(a) Principal: ${livro_alterado.autor}`);
                                console.log('_________________________________________________________________');
                                console.log(`Edição: ${livro_alterado.edicao}°`);
                                console.log('_________________________________________________________________');
                                console.log(`Publicação: ${livro_alterado.publicacao}`);
                                console.log('_________________________________________________________________');
                                console.log(`Páginas: ${livro_alterado.paginas}p`);
                                console.log('_________________________________________________________________');
                                console.log(`ISBN: ${livro_alterado.isbn}`);
                                console.log('_________________________________________________________________');
                                console.log(`Assuntos:`);
                                for (let n = 0; n < livro_alterado.assuntos.length; n++) {
                                    console.log(`\t${livro_alterado.assuntos[n]}`);
                                }
                                console.log('_________________________________________________________________');
                                console.log('');
                                readline.keyInPause();
                            
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
                                elementos = readline.questionInt('\nN° de assuntos: ');
                                assuntos = new Array(elementos);

                                for (let n = 0; n < assuntos.length; n++) {
                                    livro_alterado.assuntos[n] = readline.question(`Assunto ${n + 1}: `);
                                }
                            
                                console.log('\n________________________________\n');
                                console.log('Alteração realizada com sucesso!');
                                console.log('-----------------------------------------------------------------\n');
                                console.log('_________________________________________________________________');
                                console.log(`Título: "${livro_alterado.titulo}"`);
                                console.log('_________________________________________________________________');
                                console.log(`Autor(a) Principal: ${livro_alterado.autor}`);
                                console.log('_________________________________________________________________');
                                console.log(`Edição: ${livro_alterado.edicao}°`);
                                console.log('_________________________________________________________________');
                                console.log(`Publicação: ${livro_alterado.publicacao}`);
                                console.log('_________________________________________________________________');
                                console.log(`Páginas: ${livro_alterado.paginas}p`);
                                console.log('_________________________________________________________________');
                                console.log(`ISBN: ${livro_alterado.isbn}`);
                                console.log('_________________________________________________________________');
                                console.log(`Assuntos:`);
                                for (let n = 0; n < livro_alterado.assuntos.length; n++) {
                                    console.log(`\t${livro_alterado.assuntos[n]}`);
                                }
                                console.log('_________________________________________________________________');
                                console.log('');
                                readline.keyInPause();
                            
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
                }
            }
            if (nao_encontrou) {
                console.log('\nLivro não encontrado!\n');
                console.keyInPause();
            }
            break;
        case 5:
            console.log('\nRemovendo Cadastro');
            console.log('--------------------');
            isbnBusca = readline.question('\nDigite o ISBN do livro: ');
            for (const livro of acervo) {
                if (livro.isbn === isbnBusca) {
                    posicao = acervo.indexOf(livro);
                    nao_encontrou = false;
                    console.log('\n\tLivro encontrado.');
                    console.log('-----------------------------------------------------------------\n');
                    console.log('_________________________________________________________________');
                    console.log(`Título: "${livro.titulo}"`);
                    console.log('_________________________________________________________________');
                    console.log(`Autor(a) Principal: ${livro.autor}`);
                    console.log('_________________________________________________________________');
                    console.log(`Edição: ${livro.edicao}°`);
                    console.log('_________________________________________________________________');
                    console.log(`Publicação: ${livro.publicacao}`);
                    console.log('_________________________________________________________________');
                    console.log(`Páginas: ${livro.paginas}p`);
                    console.log('_________________________________________________________________');
                    console.log(`ISBN: ${livro.isbn}`);
                    console.log('_________________________________________________________________');
                    console.log(`Assuntos:`);
                    for (let n = 0; n < livro.assuntos.length; n++) {
                        console.log(`\t${livro.assuntos[n]}`);
                    }
                    console.log('_________________________________________________________________');
                    console.log('');

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
            console.log("Fechando sistema de catálogo...");
            loop = false;
            break;
        default:
            console.log("Opção inválida!")
            break;
    }
}
