console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

let frames = 0; 
const som_HIT = new Audio();
som_HIT.src='./efeitos/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


/* ---------------------------- //Plano de Fundo ---------------------------- */

        const planodeFundo ={

            spriteX:390,
            spriteY:0,
            largura:275,
            altura:204,
            x:0,
            y:canvas.height - 204,

            desenha(){
                contexto.fillStyle = '#70c5ce';
                contexto.fillRect(0,0, canvas.width, canvas.height )

                contexto.drawImage(
                    sprites, 
                    planodeFundo.spriteX,planodeFundo.spriteY,//sprite x sprite y 
                    planodeFundo.largura,planodeFundo.altura, //tamanho do recorte na sprite
                    planodeFundo.x,planodeFundo.y, //localização do recorte do canvas
                    planodeFundo.largura,planodeFundo.altura,  //tamanho do recorte dWidth, dHeight
                );
                    contexto.drawImage(
                        sprites, 
                        planodeFundo.spriteX,planodeFundo.spriteY,//sprite x sprite y 
                        planodeFundo.largura,planodeFundo.altura, //tamanho do recorte na sprite
                        (planodeFundo.x + planodeFundo.largura),planodeFundo.y, //localização do recorte do canvas
                        planodeFundo.largura,planodeFundo.altura,  //tamanho do recorte dWidth, dHeight
                    );
                
            }    
        }

/* ---------------------------------- chao ---------------------------------- */

        function criaChao(){
             const chao = {

                spriteX:0,
                spriteY:610,
                largura:224,
                altura:112,
                x:0,
                y:canvas.height -112,
                atualiza(){

                    const movimentoDochao = 1;
                    const repeteEm = chao.largura / 2;
                    const movimentacao = chao.x = chao.x - movimentoDochao;
                    chao.x = movimentacao % repeteEm;

                },
                desenha(){
                    contexto.drawImage(
                        sprites, 
                        chao.spriteX,chao.spriteY,//sprite x sprite y 
                        chao.largura,chao.altura, //tamanho do recorte na sprite
                        chao.x,chao.y, //localização do recorte do canvas
                        chao.largura,chao.altura,  //tamanho do recorte dWidth, dHeight
                    );
                        contexto.drawImage(
                            sprites, 
                            chao.spriteX,chao.spriteY,//sprite x sprite y 
                            chao.largura,chao.altura, //tamanho do recorte na sprite
                            (chao.x + chao.largura),chao.y, //localização do recorte do canvas
                            chao.largura,chao.altura,  //tamanho do recorte dWidth, dHeight
                        );
                }    
            }
        return chao;    
        };
      
   


/* --------------------------------- //Bird --------------------------------- */

        function fazColisao(flappyBird,chao){
            const flappyBirdY= flappyBird.y + flappyBird.altura
            const chaoY = chao.y;

            if(flappyBirdY >= chaoY){
                return true
            }else{
                return false
            }
        }

        function CriaFlappyBird(){
            const flappyBird={
                spriteX:0,
                spriteY:0,
                largura:33,
                altura:24,
                x:10,
                y:50,
                pulo:4.6,
                pula(){
                    console.log('pulou')
                    flappyBird.Velocidade = -flappyBird.pulo;
                },
                gravidade:0.25,
                Velocidade:0,
                
                atualiza(){
                    
                    if(fazColisao(flappyBird, globais.chao)){
                        mudaParaTela(Telas.INICIO)
                        setTimeout( ()=>{
                            som_HIT.play();
                        },300);
                        return ;
                    }
        
                    flappyBird.Velocidade= flappyBird.Velocidade + flappyBird.gravidade   
                    flappyBird.y = flappyBird.y + flappyBird.Velocidade
                },
                movimentos: [
                    { spriteX: 0, spriteY: 0, }, // asa pra cima
                    { spriteX: 0, spriteY: 26, }, // asa no meio 
                    { spriteX: 0, spriteY: 52, }, // asa pra baixo
                    { spriteX: 0, spriteY: 26, }, // asa no meio 
                  ],

                  frameAtual:0,
                  atulizaFrameAtual(){
                    const intervaloDeFrames = 10;
                    const passouporIntervalo = frames % intervaloDeFrames == 0;

                    
                    
                    if(passouporIntervalo){
                    const baseDoIncremento = 1;
                    const incremento = baseDoIncremento + flappyBird.frameAtual;
                    const baseRepeticao = flappyBird.movimentos.length;
                    flappyBird.frameAtual = incremento % baseRepeticao
                   // console.log(incremento)
                    //console.log(baseRepeticao)
                }
                  },
                desenha(){
                    flappyBird.atulizaFrameAtual();
                    const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
                   
                    contexto.drawImage(
                        sprites, 
                        spriteX, spriteY,
                        flappyBird.largura,flappyBird.altura,//sprite x sprite y 
                        flappyBird.x,flappyBird.y, //tamanho do recorte na sprite
                        flappyBird.largura,flappyBird.altura,  //tamanho do recorte dWidth, dHeight
                    );
                }
            }
            return flappyBird;
        }

/* ---------------------------------- telas --------------------------------- */

 const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2 ) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
        );
    }

 }

               /*-----------Canos-----------*/


function criaCanos() {
    const canos= {
        largura: 52,
        altura: 400, 
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espacos: 80,
        desenha() {
            

            
            canos.pares.forEach(function(par){
                const yRandom = par.y; 
                const espacamentoEntreCanos = 90;
                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                //Cano Do Céu 
              contexto.drawImage(
                  sprites,
                  canos.ceu.spriteX, canos.ceu.spriteY,
                  canos.largura, canos.altura,
                  canoCeuX,canoCeuY,
                  canos.largura, canos.altura,
              )
             
              //Cano do chao
              const canoChaoX = par.x;
              const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
              contexto.drawImage(
                  sprites, 
                  canos.chao.spriteX, canos.chao.spriteY,
                  canos.largura, canos.altura,
                  canoChaoX,canoChaoY,
                  canos.largura, canos.altura,
              )

              par.canoCeu = {
                x: canoCeuX,
                y: canos.altura + canoCeuY 
            }
            par.canoChao = {
                x: canoChaoX,
                y: canoChaoY
            }

            })
        },

       




        temColissaoComOFlappyBird(par){

            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
           
            if(globais.flappyBird.x >= par.x){
                console.log('invadil canos')
                if(cabecaDoFlappy <= par.canoCeu.Y) {
                    return true;
                }

                if(peDoFlappy >= par.canoChao.y){
                    return true;
                }
            }

            return false;
        },

            pares: [],
            atualiza() {
                const passou100Frames = frames % 100 === 0;
                    if(passou100Frames){
                        console.log('passou 100 frames')
                        canos.pares.push({
                            x: canvas.width,
                            y: -150 * (Math.random() + 1),
                        });
                    }
                    canos.pares.forEach(function(par){
                        par.x = par.x - 2;

                        if(canos.temColissaoComOFlappyBird(par)){
                            console.log ('Voce perdeu')
                            mudaParaTela(Telas.INICIO);
                        }

                        if(par.x + canos.largura <= 0){
                            canos.pares.shift()
                        }
                    });
            }   
    }
    return canos;
}



//
//telas
//
const globais = {};
let telasAtiva = {};
function mudaParaTela(novaTela) {
    telasAtiva = novaTela;  

    if(telasAtiva.inicializa){
        telasAtiva.inicializa();
    }
}

const Telas = {
   INICIO: {
        inicializa() {
            globais.flappyBird = CriaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();

   },

        desenha() {
            planodeFundo.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha()
        },
            click(){
                mudaParaTela(Telas.JOGO)
            },
            atualiza(){
               globais.chao.atualiza();   
          }
    }  
};

Telas.JOGO = {
    desenha() {
        planodeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        
    },
  click(){
     
    globais.chao.atualiza();
    globais.flappyBird.pula()
  },

    atualiza() {
       globais.canos.atualiza();
       globais.flappyBird.atualiza();
    }
};

function loop() {
    telasAtiva.desenha();
    telasAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop)
}

window.addEventListener('click',function(){
    if(telasAtiva.click){
        telasAtiva.click();
    }
})

mudaParaTela(Telas.INICIO);
loop();

