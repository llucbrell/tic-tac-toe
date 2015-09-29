/*--------------------------------------------------------------------------------------------------------
       dP                dP       dP                                                          dP          
       88                88       88                                                          88          
       88d888b. .d8888b. 88d888b. 88d888b. .d8888b. .d8888b. .d8888b. .d8888b. .d8888b. .d888b88 .d8888b. 
       88'  `88 88'  `88 88'  `88 88'  `88 88ooood8 Y8ooooo. 88'  `"" 88'  `"" 88'  `88 88'  `88 88ooood8 
       88    88 88.  .88 88.  .88 88.  .88 88.  ...       88 88.  ... 88.  ... 88.  .88 88.  .88 88.  ... 
       dP    dP `88888P' 88Y8888' 88Y8888' `88888P' `88888P' `88888P' `88888P' `88888P' `88888P8 `88888P'

                                                                             copyright Lucas_C/llucbrell
                                                                                    hobbescode@gmail.com

                                                                                             
                                   i8@@8Li.                t@8000                                   
                                 .GitL:::GGGC;             G8ifGt80LtL11,.                          
                                  C,Li;i8i;Ci:ti  i11i:;i::i00ii;;ifffi;;f@8                        
                                  ,L;0L88iCf;L01f.   ,;  ifG0101f0t:;:;;;1GC                        
                                    t@80CL0LfC,    ,1i :;ii CGti1;G8fi::fCiL:                       
                                      L0C11tGf;      ,1;   L .;:.         Lii                       
                                      ,i0fLGt;f1.    t:                    1.                       
                                    ;0C8Li;t88L;:,,i  :t,          :1 .,  .t                        
                                  18i;i;1fC8tL,      .             ,  1. :L                         
                                1C:;G8Gf;f;             ::::      ;LG0t. iLG0CCi                    
            ..t0fC0tGt,       iC:ifCGCt:             ;,    ;L  i G1G0C11CLCL1C88CGti                
          ,Li;G01f01C::GC.   C8G1;:;:;              t           ii8@@@@@C  ;G81iGfitCtt1tf:         
        .CiGtL,      :0:;8: Gi:i08@8.           ..                .ifft,       iL:.       .1        
       .0CLfi          Ct;;08Cffti1.          .,                                f.  i   it:         
       t1i:L            0GLf:::;;;i          ;.                                 i  :.  ;   ::       
       0@@@;            ,iGt:::;:1          f                                    ;; ,i  i1ti        
       C@@@.             18888@@8C         .f     :t11:                               t. i          
       .8@0               G;:::;C8f      :;.L   ,i   , f                                            
                          ff:C8L;;;: t81,:8::f..f    @1 1                                           
                          G0i:::i8L10@8,,ff,f0L0. t@,.f.1                                           
                           C1:18L:i8;88,:Lf8t:f:   : Lt:.                                           
                           ,80C:::8t:L8f:G@G,:L   ,@8  i   ;i.                                      
                            ,8:::t8i::C8C1@8CfG   f@G i ;;    ;1                                    
                              tC:t8f::,;C8C1L0f     .G1f..1 G@,1                                    
                                i0t01::::::f01,f1,iG0;1  Gf    1                                    
                                   :tC00Lt:.      ;G,       8L1. 
                          .LG:;                    f.  f@@1  t.  
                      ,;.0ttC::::                   L   :t: ,:   
                 i;ftttttttt8:::;                    .L.  :1.    
             .:Gtttttfttttttttf;::;                              
         i8tttttft::Cttttttttt;::::                              
         tttC,.;;:::::fttttttttt::::;                            
       ,::1Lt8;:::::::tttttttttt;:::f                            
     8:0tttttttG;::::::;tttttttttt:::;                           
   CtfttttttttttG::::::::tttttttttt:::i                          
   ttttttttttttttt:::::::;tttttttttC:::                          
    Gtttttttttttttt:::::::Gtttttttttf::t                         
    .ttttttttttttttt:L.Cii;tttttttttL;f1                                   
     Lttttttttttttttfift,8ttttttttff            
      Gttttttttttttt0fttttttttt,                
       tttttttt1GGttCtLtG8G                     
        .1ft.i,.  t18i           GGGf;;;:::::;::i;:;C  
                t          .ifi:::;:;1fft11if;L11LLf1itC8fi   
                   ;  C8LttttCCLttttttttG1ft        1f        
                   :         t                     G          
                  ;         ;                 
                 L        t                   
               C       t                     
                 8    C                       
                 ;Ct                          
  
----------------------------------------------------------------------------------------------------------*/


  var gl; // WebGL context
  var prg; // The program (shaders)
  var c_width = 0; // Variable to store the width of the canvas
  var c_height = 0; // Variable to store the height of the canvas
  
  var squareVertexBuffer = null; //The vertex buffer for the square
  var squareIndexBuffer = null; // The index buffer for the square
  
  var indices = []; //JavaScript array to store the indices of the square
  var vertices = []; //JavaScript array to store the vertices of the square
  var canvas;

  function initProgram() {

 /*
  * The program contains a series of instructions that tell the Graphic Processing Unit (GPU)
  * what to do with every vertex and fragment that we pass it. (more about this on chapter 3)
  * The vertex shader and the fragment shader together are called the program.
  * Inicialize the context and attach the shaders to it
  */
    var fgShader = utils.getShader(gl, "shader-fs");
    var vxShader = utils.getShader(gl, "shader-vs");

    prg = gl.createProgram();
    gl.attachShader(prg, vxShader);
    gl.attachShader(prg, fgShader);
    gl.linkProgram(prg);

    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
    }

    gl.useProgram(prg);

    //The following lines allow us obtaining a reference to the uniforms and attributes defined in the shaders.
    //This is a necessary step as the shaders are NOT written in JavaScript but in a 
    //specialized language called GLSL. More about this on chapter 3.
    prg.vertexPosition = gl.getAttribLocation(prg, "aVertexPosition");
  
  }


 
/*
  function initProgram() {

 /*
  * Alternative to the initProgram using files form angel's-WEBGL
  * Better in for debugging tasks
  * Works fine with both initProgram
  *


     prg = initShaders( gl, "shader-vs", "shader-fs" );
     gl.useProgram( prg );



   }
*/



  function initBuffers(vertices, indices) {
   
 /*
  * Creates the buffers that contain the geometry of the polygon
  * The vertices are the points coordenates and the indices are
  * the way we create the polygons  
  *    
  *    example square
  *            #0 +--------------+  #3
  *               |              |
  *               |              |
  *               |      .(0,0)  |
  *               |              |
  *               |              | 
  *            #1 +--------------+  #2
  */

   
    //The following code snippet creates a vertex buffer and binds the vertices to it
    squareVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    //The following code snippet creates a vertex buffer and binds the indices to it
    squareIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
  
  


  function drawScene(){

 /*
  * Draws the scene
  */
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
    gl.viewport(0,0,c_width, c_height);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
    gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prg.vertexPosition);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
  }
  
 
  function renderLoop() {
 /*
  * Render Loop
  */
    utils.requestAnimFrame(renderLoop);
    drawScene();
  }
  
 

  function runWebGLApp(){
//cone doesnt work fine 
/*
vertices =
[ 
 1.5, 0, 0,
-1.5, 1, 0,
-1.5, 0.809017, 0.587785,
-1.5, 0.309017, 0.951057,
-1.5, -0.309017, 0.951057,
-1.5, -0.809017, 0.587785,
-1.5, -1, 0.0,
-1.5, -0.809017, -0.587785,
-1.5, -0.309017, -0.951057,
-1.5, 0.309017, -0.951057,
-1.5, 0.809017, -0.587785
];

indices = [0, 1, 2,
0, 2, 3,
0, 3, 4,
0, 4, 5,
0, 5, 6,
0, 6, 7,
0, 7, 8,
0, 8, 9,
0, 9, 10,
0, 10, 1];
*/

//tetraedro
/*
  vertices=  
   [-0.5,-0.5,0.0,    //Vertex 0
    -0.25,0.5,0.0,   //Vertex 1
    0.0,-0.5,0.0,  //Vertex 2
    0.25,0.5,0.0,    //Vertex 3
    0.5,-0.5,0.0   //Vertex 4
    ]; 

    indices = [0,1,2,0,2,3,2,3,4]; //For triangles


//square
  
 vertices =  [
    -0.5,0.5,0.0,   //Vertex 0
    -0.5,-0.5,0.0,  //Vertex 1
    0.5,-0.5,0.0,   //Vertex 2
    0.5,0.5,0.0];   //Vertex 3

    indices = [3,2,1,3,1,0];



/ *    
  *    example square
  * #0 (-0.5,0.5) +--------------+  (0.5,0.5)  #3
  *     mouse     |              |
  *               |              |
  *               |      .(0,0)  |
  *               |              |
  *               |              | 
  * #1(-0.5,-0.5) +--------------+  (0.5,-0.5) #2
 



/*
  * Executes the WebGL application
  * This function is invoked on the onLoad event of the webpage. 
  *
    //Obtains a WebGL context
    gl = utils.getGLContext('canvas-element-id');
    //Initializes the program (shaders). More about this on chapter 3!
    initProgram();
    //Initializes the buffers that we are going to use to draw the square (vertex buffer and index buffer)
    initBuffers(vertices, indices);
    //Renders the square!
    renderLoop();

  */

canvas  = document.getElementById("canvas-element-id");

canvas.addEventListener("mousedown", function(event){


       //use the mouse to get the coordinates//

vertices =  [
  2*event.clientX/canvas.width-1, 2*(canvas.height-event.clientY)/canvas.height-1, 0.0 ,//Vertex 0
 (2*event.clientX/canvas.width-1), (2*(canvas.height-event.clientY)/canvas.height-1)-0.25 ,0.0,
 (2*event.clientX/canvas.width-1)+0.25,(2*(canvas.height-event.clientY)/canvas.height-1)-0.25, 0.0, 
 (2*event.clientX/canvas.width-1)+0.25, 2*(canvas.height-event.clientY)/canvas.height-1 ,0.0
 ]
    
  

  indices= [3,2,1, 3,1,0];

       //Initializes the buffers that we are going to use to draw the square (vertex buffer and index buffer)
    initBuffers(vertices, indices);
    //Renders the square!
    renderLoop();
    } );
  

    //Obtains a WebGL context
    gl = utils.getGLContext('canvas-element-id');
    //Initializes the program (shaders). More about this on chapter 3!
    initProgram();
  }























                  
/*----------------------------------------------------------------------------------------------------------

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


888               888       888                                                       888      
888               888       888                                                       888      
888               888       888                                                       888           
888-~88e  e88~-_  888-~88e  888-~88e   e88~~8e   d88~\  e88~~\  e88~~\  e88~-_   e88~\888  e88~~8e  
888  888 d888   i 888  888b 888  888b d888  88b C888   d888    d888    d888   i d888  888 d888  88b 
888  888 8888   | 888  8888 888  8888 8888__888  Y88b  8888    8888    8888   | 8888  888 8888__888 
888  888 Y888   ' 888  888P 888  888P Y888    ,   888D Y888    Y888    Y888   ' Y888  888 Y888    , 
888  888  "88_-~  888-_88"  888-_88"   "88___/  \_88P   "88__/  "88__/  "88_-~   "88_/888  "88___/  
                        
                                                                        copyright Lucas_C/llucbrell
                                                                           hobbescode@gmail.com    
            :088C;                                                      
          ,008000LtCCt.  it;1;tC00G00LfLG0t                             
         :800808000Gt.t0GCCGGG00L; ...:tLCt1tt0G,                       
          i0800LCL880C.,;  fG0t                ,8G0G000GC,               
          ;0080C.    .    f0C                   ,80000GG00;              
           :8080GftC.                .           .; 1GfGGLi              
             ,LG80C.             1G1 .0C; .1CCG1    :8GL0L.              
               .C800Gf:        ,t. 1   G0fL.C  Cf    ;                   
              18@0G80GCf     ::   :0G0 1t  :0G t1   i,                  
               t01     L     ,i         t:      ,L ..11                  
            .Gti@.1i ,C1C    ;         ;1       11:GG0f                  
         .1C1..L8018C8C0:    f        1G;      :L   ,Lf                  
          ,C0t  ;C,CG000    1       C,fi      G     C.                  
      18G1            :C,   1,   ,LGCG01    .Gt  LftL                   
        :1f01                 .f08080G00Gtf0L, fC0080G1                 
      tC1;                  :0LLt,.,,,,tL0G.    ;:t8C.                  
     C808Lt10,              @G f800G88881 1G:      ;C0C0C.              
          i0                i0808808088C81;GC       ff:                 
        ;01:i1:               f0000GG008000G.        ;ff,               
        :f1. 1i                 .f@0000000,        ii   .               
           iG.                                      .1f.                
          ,1CG88L     :       .                 ,   it,                 
                 .tt, tt      i1;;f0L          :,i0L:                   
               .i:    ,;L:                 G:   ,t                      
                        .G0t,           .f0  i;  ;:                     
                 tCGL       i@8G0LLLLC80f,. L                            
              ,LG1:            ..,,,.                                   
              18G000GGL.            .1.                                 
             LG;    .;LG           ft                                   
             G8i      ,fGL         1G:                                   
         .1G0G800CCG0G0i             1t;.                               
         .GGG0GGGCGCG0G0,            :Cf;.                              
          f0C        .GL            ;10L                                
         fGG.       if                ;C;                               
         100GG00C;,Ct;:.           .0f,if1                              
        .G0CGG08L000:GL.            :C.                                 
        10G  ,1CG00GG:               .Ci                                
----------------------------------------------------------------------------------------------------------*/

/*

     xx
    xxxx
   xxxxxx
  xxxxxxxx


   x
  xxx
 xxxxx
xxxxxxx 

    x
   xxx 
  xxxxx
 xxxxxxx
xxxxxxxxx
xxxxxxxxx
xxxxxxxxx
xxxxxxxxx
xxxxxxxxx
 xxxxxxx
 xxxxxxx
  xxxxx
  xxxxx
   xxx
   xxx
    x


MARIO 8bits

        "rrrrr
        rrrrrrrrr
        xxx  x .
       x x   x   .
       x xx   x   .
       xx    xxxx 
        .       . 
        xxrxrx
       xxxrxxrxxx
      xxxxrrrrxxxx 
     .  xr0rr0rx  .
     .   rrrrrr   .
     .  rrrrrrrr  .
        rrr  rrr
       mmm    mmm
      mmmm    mmmm

       x=black 
       r=red
       _=pink
       0=gold
       .= end_or_start_line_after_empty(pink)"

*/