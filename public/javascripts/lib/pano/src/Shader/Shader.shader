    <!--相邻全景位置顶点着色器-->
    <script type="x-shader/x-vertex" id="vNeighshader">
         attribute vec4 aCoords;
         uniform mat4 uProjection;
         uniform mat4 uViewMat;
         uniform int uIdSel;
         attribute float aIdCur;
         uniform float uAlpha;
         varying float vAlpha;
         void main() {
            if(int(aIdCur) == uIdSel){
                vAlpha = uAlpha;
            }else{
                vAlpha = 0.1;
            }
            gl_Position = uProjection * uViewMat* aCoords;
            //gl_PointSize = 20.0;
         }
     </script>
    <!--相邻全景位置片元着色器-->
    <script type="x-shader/x-fragment" id="fNeighshader">
         precision mediump float;
         varying float vAlpha;
         void main() {
              gl_FragColor = vec4(0.46,0.7,0.7,vAlpha);
         }
     </script>
