    <!--顶点着色器-->
    <!--TODO: 如果发生Vertex受限，应该将投影矩阵和模型视图矩阵在js代码中计算出来，一并导入-->
    <script type="x-shader/x-vertex" id="vshader">
         uniform mat4 projection;
         uniform mat4 modelview;
         attribute vec3 coords;
         varying vec3 vCoords;
         void main() {
            vec4 eyeCoords = modelview * vec4(coords,1.0);
            gl_Position = projection * eyeCoords;
            vCoords = coords;//gl_Position.xyz;
         }
     </script>
    <!--片元着色器-->
    <script type="x-shader/x-fragment" id="fshader">
         precision mediump float;
         varying vec3 vCoords;
         uniform float uSwitchRatio;
         uniform samplerCube uCubeSamplerCur;

         void main() {
                vec4 texColor = textureCube(uCubeSamplerCur, vCoords);
                if(uSwitchRatio == 0.0){
                gl_FragColor = texColor;
                }else{
                gl_FragColor = (vec4(0.12,0.12,0.12,1.0) - texColor)*pow(uSwitchRatio,6.0) + texColor  ;
                }
                //gl_FragColor = vec4(0.5, 0.0, 0.0, 1.0);

         }
     </script>