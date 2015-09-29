/*--------------------------------------------------------------------------------------------------------
       dP                dP       dP                                                 dP          
       88                88       88                                                 88          
       88d888b. .d8888b. 88d888b. 88d888b. .d8888b. .d8888b. .d8888b. .d8888b. .d888b88 .d8888b. 
       88'  `88 88'  `88 88'  `88 88'  `88 88ooood8 Y8ooooo. 88'  `"" 88'  `88 88'  `88 88ooood8 
       88    88 88.  .88 88.  .88 88.  .88 88.  ...       88 88.  ... 88.  .88 88.  .88 88.  ... 
       dP    dP `88888P' 88Y8888' 88Y8888' `88888P' `88888P' `88888P' `88888P' `88888P8 `88888P'

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
   var cBuffer;
  var indices = []; //JavaScript array to store the indices of the square
  var vertices = []; //JavaScript array to store the vertices of the square
  var canvas; // Variable to store the object Canvas
  var bufferNumber=0; // Counter for the buffers
  var colorBricks= []; // Array to store the colors of every vertex

  var controlLinePositionX;
  var controlLinePositionY;
  var lastX;
  var lastY;

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

 //-------------------------------------------------------------------------------------------------------//
                        // VERTEX BUFFER  
    //The following code snippet creates a vertex buffer and binds the vertices to it
    squareVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
     
/*   UNCOMENT FOR DISPLAY BUFFER EFFICIENCY
 *
 *   //This code shows th size and usage of the buffer in the console
 *  console.log("VertexBufferObject"+ bufferNumber+ " " +"SIZE-->"
 *    + gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE)
 *    + " USAGE-->"+ gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_USAGE)
 *    );
 */

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
//-------------------------------------------------------------------------------------------------------//
                        //COLOR BUFFER

     //This code is to create a buffer to store the colors
    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER,  new Float32Array(colorBricks), gl.STATIC_DRAW ); //pass the colors

/*   UNCOMENT FOR DISPLAY BUFFER EFFICIENCY
 *
 *  //This code shows th size and usage of the buffer in the console
 *  console.log("IndexColorBuffer"+ bufferNumber+ " " +"SIZE-->"
 *    + gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE)
 *    + " USAGE-->"+ gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_USAGE)
 *    );
 */

//-------------------------------------------------------------------------------------------------------//
                        //INDEX BUFFER


    //The following code snippet creates a vertex buffer and binds the indices to it
    squareIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

/* UNCOMMENT FOR DISPLAY BUFFER EFFICIENCY
 *
 *  //This code shows th size and usage of the buffer in the console
 *  console.log("IndexBufferObject"+ bufferNumber+ " " +"SIZE-->"
 *    + gl.getBufferParameter(gl.ELEMENT_ARRAY_BUFFER, gl.BUFFER_SIZE)
 *    + " USAGE-->"+ gl.getBufferParameter(gl.ELEMENT_ARRAY_BUFFER, gl.BUFFER_USAGE)
 *    );
 *
 */

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    bufferNumber++;//change the number of buffer in console log
   

  }    

//-------------------------------------------------------------------------------------------------------//
                        //END BUFFERs




  
  


  function drawScene(){

 /*
  * Draws the scene
  */
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.enable(gl.DEPTH_TEST);
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
    gl.viewport(0,0,c_width, c_height);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
    gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prg.vertexPosition);


    //This code is to link the vertex buffer with the color buffer 

    var vColor = gl.getAttribLocation( prg, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
   
    
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
  
 

  function printBrick(color, size, Xposition, Yposition, end){
 
 /*
  * map the canvas coorditnates to webGL coordinates
  */
    var _Xposition=2*Xposition/canvas.width-1;
    var _Yposition=2*(canvas.height-Yposition)/canvas.height-1;

      //print bricks independently
     if(!end){
         createBrick(size, _Xposition, _Yposition);
         attachColor(color);
         
     }
      else{     
        createBrick(size, _Xposition, _Yposition);
        attachColor(color);
           buildObject3D();
           
        } 
     }

    function printBrickLine( string, size, Xposition, Yposition, end){
        //global X and Y positon for lines
        controlLinePositionX=Xposition;
        controlLinePositionY=Yposition;
        //to remember the las first brick position
        lastX=Xposition;
        lastY=Yposition;
       
      //maps the coordinates canvas to webGL coordinates (vertex0 coordinates)
         var controlLinePositionX=2*Xposition/canvas.width-1; 
         var controlLinePositionY=2*(canvas.height-Yposition)/canvas.height-1;

         
        var _lengthString= string.length;

     if(!end){
        for(var i=0; i<_lengthString; i++){
          createBrick(size, controlLinePositionX, controlLinePositionY);    
          controlLinePositionX+=size; //move the coordinates of the brick to make a line
        }
        controlLinePositionY-=size;

     }
     else{
         for(var i=0; i<_lengthString; i++){
          createBrick(size, controlLinePositionX, controlLinePositionY);
          controlLinePositionX+=size; //move the coordinates of the brick to make a line

        }
           
        
          
     }
        buildObject3D();
    }
  

/* 
 var vertex3x=(2*Xposition/canvas.width-1)+size; 
   var vertex3y=2*(canvas.height-Yposition)/canvas.height-1; 
   var vertex3z=0.0; //Vertex 3
  */

function buildObject3D(){

    //Obtains a WebGL context
    gl = utils.getGLContext('canvas-element-id');
    //Initializes the program (shaders). More about this on chapter 3!
    initProgram();
     //Initializes the buffers that we are going to use to draw the square (vertex buffer and index buffer)
    initBuffers(vertices, indices);
    //Renders the square!
    renderLoop();
    
}


function createBrick(size, Xposition, Yposition){


/*
  * Creates the vertices of a single blick
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


   var vertex0x=Xposition; 
   var vertex0y=Yposition; 
   var vertex0z=0.0; //Vertex 0
 
   var vertex1x=Xposition; 
   var vertex1y=Yposition-size; 
   var vertex1z=0.0; //Vertex 1

   var vertex2x=Xposition+size; 
   var vertex2y=Yposition-size; 
   var vertex2z=0.0; //Vertex 2

   var vertex3x=Xposition+size; 
   var vertex3y=Yposition; 
   var vertex3z=0.0; //Vertex 3

   //add vertices of the brick to array of vertices, ready to draw

   vertices.push(vertex0x);
   vertices.push(vertex0y);
   vertices.push(vertex0z);
   vertices.push(vertex1x);
   vertices.push(vertex1y);
   vertices.push(vertex1z);
   vertices.push(vertex2x);
   vertices.push(vertex2y);
   vertices.push(vertex2z);
   vertices.push(vertex3x);
   vertices.push(vertex3y);
   vertices.push(vertex3z);


   createIndices();    

}


function createIndices(){
  if(indices.length===0){
     indices= [3,2,1,3,1,0];
  }
  else{
    var indice1= indices[indices.length-1]+4;
    var indice2= indices[indices.length-2]+4;
    var indice3= indices[indices.length-3]+4;
    var indice4= indices[indices.length-4]+4;
    var indice5= indices[indices.length-5]+4;
    var indice6= indices[indices.length-6]+4;

    //take the last 4 indices and add 4 to get the new square indices
    indices.push(indice1);
    indices.push(indice2);
    indices.push(indice3);
    indices.push(indice4);
    indices.push(indice5);
    indices.push(indice6);
  }
}

function attachColor(color){

    var _color= [1,0,0];
    colorBricks.push(1.0);
    //colorBricks.push(0);
    colorBricks.push(0.0);
    //colorBricks.push(1.0);
//console.log("colores"+ colorBricks);

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


888               888       888                                               888      
888               888       888                                               888      
888               888       888                                               888           
888-~88e  e88~-_  888-~88e  888-~88e   e88~~8e   d88~\  e88~~\  e88~-_   e88~\888  e88~~8e  
888  888 d888   i 888  888b 888  888b d888  88b C888   d888    d888   i d888  888 d888  88b 
888  888 8888   | 888  8888 888  8888 8888__888  Y88b  8888    8888   | 8888  888 8888__888 
888  888 Y888   ' 888  888P 888  888P Y888    ,   888D Y888    Y888   ' Y888  888 Y888    , 
888  888  "88_-~  888-_88"  888-_88"   "88___/  \_88P   "88__/  "88_-~   "88_/888  "88___/  
                        
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

          
          3D EASY EGG                 
                        xx xxx xx
                     xx           xx
                   xx               xx
                 xx                   xx 
                xx                     xx
               xx                       xx
              xx                         xx  
              xx                         xx
              xx                         xx
               xx                       xx
                xx                     xx
                 xx                   xx
                   xx               xx
                     xx           xx  
            --------------------------------------   









*/