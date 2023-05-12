import chalk from 'chalk';
import fs, { lstatSync, readFile } from 'fs'
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';

const caminho = process.argv;

  async function ImprimeLista(valida, resultado, identificador = ""){

if(valida){
    console.log(
        chalk.yellow('Lista Validada'),
        chalk.black.bgGreen(identificador),
     await listaValidada(resultado))
}else{

        console.log(
            chalk.yellow('Lista de links'),
            chalk.black.bgGreen(identificador),
            resultado)
        }
    }

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try {
        lstatSync(caminho)
    } catch (erro) {
        if(erro.code === 'ENOENT'){
            console.log(chalk.red('Arquivo ou diretorio não existe'))
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(argumentos[2])
        ImprimeLista(valida, resultado)
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async(nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            ImprimeLista(valida, lista, nomeDeArquivo)



        })
        }
}


processaTexto(caminho)