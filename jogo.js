console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

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

  
        const chao ={

            spriteX:0,
            spriteY:610,
            largura:224,
            altura:112,
            x:0,
            y:canvas.height -112,

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
   


/* --------------------------------- //Bird --------------------------------- */

    const flappyBird={
        spriteX:0,
        spriteY:0,
        largura:33,
        altura:24,
        x:10,
        y:50,
        gravidade:0.25,
        Velocidade:0,
        
        atualiza(){
            flappyBird.Velocidade= flappyBird.Velocidade + flappyBird.gravidade
            
            flappyBird.y = flappyBird.y + flappyBird.Velocidade
        },
        
        desenha(){
            contexto.drawImage(
                sprites, 
                flappyBird.spriteX,flappyBird.spriteY,//sprite x sprite y 
                flappyBird.largura,flappyBird.altura, //tamanho do recorte na sprite
                flappyBird.x, flappyBird.y, //localização do recorte do canvas
                flappyBird.largura,flappyBird.altura,  //tamanho do recorte dWidth, dHeight
            );
        }
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

//
//telas
//
let telasAtiva = {};
function mudaParaTela(novaTela) {
    
    telasAtiva = novaTela;  
}
const Telas = {
  INICIO: {
        desenha() {
            planodeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha()
        },

        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){

        }
  }  
};

Telas.JOGO = {
    desenha() {
        planodeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
        
    },
    atualiza() {
        flappyBird.atualiza();
    }
};

function loop() {
    telasAtiva.desenha();
    telasAtiva.atualiza();
    requestAnimationFrame(loop)
}

window.addEventListener('click',function(){
    if(telasAtiva.click){
        telasAtiva.click();
    }
})

mudaParaTela(Telas.INICIO);
loop();

