//habilitando a biblioteca readline-sync
const readline = require('readline-sync');

//classe banco
class banco {
    constructor() {
    this.acervo = [];
    }

    //métodos do menu
    listar() {
        console.clear();
        console.log("\n__________LISTAGEM DOS LIVROS CADASTRADOS__________\n");

        for (const livro of this.acervo){
            console.log(`${livro.getTituloLivro}`.toUpperCase());
            console.log("------------------------------------------------------------------");
            console.log(`Autor principal: ${livro.getAutorLivro}`);
            console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
            console.log(`Edicao:          ${livro.getEdicaoLivro}`);
            console.log(`Paginas:         ${livro.getPaginasLivro}`);
            console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
            console.log(`ISBN:            ${livro.getIsbnLivro}`);
            console.log(`assuntos:        ${livro.getAssuntosLivro}\n\n`);
        }

        readline.keyInPause();
    }


    cadastrar() {
        //variáveis locais
        let loop = true;
        let continuar = '';
        let nao_encontrou = true;

        console.clear();
        console.log("\n__________CADASTRO DE LIVRO__________\n");
        
        //criando um novo objeto livro
        const livro = new livro();

        //adicionando valores no novo objeto livro
        livro.setAssuntosLivro = readline.question('Digite os assuntos do livro (ex: Ficcao, Romance): ');

        while(loop){
            livro.setTituloLivro = readline.question("Digite o titulo do livro: ");
            if(livro.setTituloLivro.length !==0 ){
                break;
            }else{
                    console.log("------------------------------------------------------")
                    console.log("Campo Obrigatorio! Por favor forneça o Titulo do livro")
                    console.log("------------------------------------------------------")
            }
        }

        livro.setAutorLivro = readline.question("Digite o nome do autor do livro: ");
        livro.setOutrosAutoresLivro = readline.question("Digite o nome dos outros autores (ex: autor1,autor2):").split(',');
        livro.setEdicaoLivro = readline.question("Digite o numero da edicao do livro: ");
        livro.setPaginasLivro = readline.question("Digite o numero de paginas do livro: ");
        livro.setPublicacaoLivro = readline.question("Digite a publicacao do livro (ex: Sao Paulo: Companhia das Letras, 2000): ");

        while(loop){
            nao_encontrou = true;
            livro.setIsbnLivro = readline.question("Digite o ISBN do livro: ");
            for (const livro of this.acervo) {
                if (livro.isbn === livro.setIsbnLivro) {
                    nao_encontrou = false;
                    break;
                }
            }

            if(livro.setIsbnLivro.length !==0 && nao_encontrou === true){
                break;
            } else if(nao_encontrou === false) {
                console.log("----------------------------------------------------");
                console.log("                ISBN ja cadastrado!");
                console.log("----------------------------------------------------");
            } else{
                console.log("----------------------------------------------------");
                console.log("Campo Obrigatorio! Por favor forneça o ISBN do livro.");
                console.log("----------------------------------------------------");
            }
        }

        while (loop) {
            livro.setAssuntosLivro = readline.question("Digite os assuntos do livro separados por virgula (ex: assunto1,assunto2): ");
            if (livro.setAssuntosLivro.length !== 0) {
                livro.setAssuntosLivro = livro.setAssuntosLivro.split(',');
                break;
            } else {
                console.log("-----------------------------------------")
                console.log("Pelo menos um assunto deve ser fornecido.");
                console.log("-----------------------------------------")
            }
        }

        //condição para cadastrar ou não o livro
        do {
            console.log(`${livro.getTituloLivro}`.toUpperCase());
            console.log("------------------------------------------------------------------");
            console.log(`Autor principal: ${livro.getAutorLivro}`);
            console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
            console.log(`Edicao:          ${livro.getEdicaoLivro}`);
            console.log(`Paginas:         ${livro.getPaginasLivro}`);
            console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
            console.log(`ISBN:            ${livro.getIsbnLivro}`);
            console.log(`assuntos:        ${livro.getAssuntosLivro}\n\n`);

            continuar = readline.question('\nDeseja cadastrar este livro? <sim / nao> : ');
            continuar = continuar.toLowerCase();
            if (continuar == 'sim') {
                this.acervo.push(livro);
                continuar = '';
                console.log("\n\tLivro cadastrado com sucesso!\n");
            } else if (continuar == 'nao') {
                continuar = '';
                livro = null;
            } else {
                console.log('\nResposta invalida!');
            }
        } while (continuar != 'sim' && continuar != 'nao');

        //condição para continuar ou não cadastrando novos livros
        do {
            continuar = readline.question('\nDeseja continuar alterando este livro? <sim / nao> : ');
            continuar = continuar.toLowerCase();
            if (continuar == 'sim') {
                loop = true;
            } else if (continuar == 'nao') {
                loop = false;
            } else {
                console.log('\nResposta invalida!');
            }
        } while (continuar != 'sim' && continuar != 'nao');

 }


 buscar() {
    do {
        //variáveis locais
        let continuar = true;
        let nao_encontrou = true;
        let op = '';

        console.clear();
        console.log(titulo("__________BUSCAR LIVRO__________"));
        let isbnBusca = readline.question('Digite o ISBN do livro: ');
        for (const livro of this.acervo) {
            if (livro.isbn === isbnBusca) {
                console.log(`\n\x1b[92mLivro encontrado:\x1b[0m\n`);
                console.log(`${livro.getTituloLivro}`.toUpperCase());
                console.log("------------------------------------------------------------------");
                console.log(`Autor principal: ${livro.getAutorLivro}`);
                console.log(`Outros autores:  ${livro.getOutrosAutoresLivro}`);
                console.log(`Edicao:          ${livro.getEdicaoLivro}`);
                console.log(`Paginas:         ${livro.getPaginasLivro}`);
                console.log(`Publicacao:      ${livro.getPublicacaoLivro}`);
                console.log(`ISBN:            ${livro.getIsbnLivro}`);
                console.log(`assuntos:        ${livro.getAssuntosLivro}\n\n`);
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
 }


 alterar() {
    console.clear();
    console.log("\n__________ALTERANDO CADASTRO DE LIVRO__________\n");
    isbnBusca = readline.question('Digite o ISBN do livro: ');
    for (const livro of this.acervo) {
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
    
}
}
