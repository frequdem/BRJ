!function(t){function e(n){if(o[n])return o[n].exports;var a=o[n]={exports:{},id:n,loaded:!1};return t[n].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){o(1),o(3),o(8),o(7),o(5),o(4),o(6),o(2),function(t){var e;PanoAJK.Main.Core=function(t){e=this,e.sys={WebGLContext:new PanoAJK.Main.WebGLContext,canvasObject:t.canvas,canvas:t.canvas.core,pts:t.pts||{},imageList:{},imageLoadingList:[],imagePreloadedCount:{},imageLoadedCount:{},imageLoadedList:[],firstPath:t.firstPath,currentPath:t.firstPath,wanderBool:t.smoothSwitch||!1},e.objsToDraw={},e.selId=-1,e.init()},PanoAJK.Main.Core.prototype={constructor:PanoAJK.Main.Core,init:function(){var t=e.sys.canvas.getContext("webgl");if(t||(t=e.sys.canvas.getContext("experimental-webgl")),!t)throw"Could not create WebGL context.";e.sys.gl=t,e.sys.projection=(new PanoAJK.Math.Matrix4).setPerspective(60,e.sys.canvas.width/e.sys.canvas.height,10,3e3),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.clearColor(0,0,0,1);var o={GIcontext:e,cubeData:new e.sys.WebGLContext.cube(200),firstPath:e.sys.firstPath};e.objsToDraw.skybox=new PanoAJK.Main.Skybox(o),e.sys.wanderBool&&(e.objsToDraw.neighPts=new PanoAJK.Main.NeighPts(e))},refresh:function(t){t.update(),e.sys.wanderBool&&(e.checkMouseOverNeighpt(t),t.moveToNextpt()),e.sys.gl.clear(e.sys.gl.COLOR_BUFFER_BIT|e.sys.gl.DEPTH_BUFFER_BIT),e.objsToDraw.skybox.render(t),e.objsToDraw.neighPts&&e.objsToDraw.neighPts.render(t)},checkMouseOverNeighpt:function(t){e.selId=-1;for(var o=t,n=e.objsToDraw.neighPts.neighPtData.positions,a=0;a<n.length;a++){var r=(new PanoAJK.Math.Matrix4).set(e.sys.projection).multiply(o.vmMat4).multiplyVector4(new Vector4([n[a][0],n[a][1],n[a][2],1])),i=[r.elements[0]/r.elements[3],r.elements[1]/r.elements[3]];if(Math.abs(i[0]-o.mouse[0])+Math.abs(i[1]-o.mouse[1])<.12){e.selId=a;break}}}}}(window.jQuery||window.Zepto)},function(t,e){PanoAJK={Component:{},Main:{},Math:{}}},function(t,e,o){o(1);var n=PanoAJK.Math.Matrix4=function(t){var e,o,n;if(t&&"object"==typeof t&&t.hasOwnProperty("elements")){for(o=t.elements,n=new Float32Array(16),e=0;e<16;++e)n[e]=o[e];this.elements=n}else this.elements=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])};n.prototype.set=function(t){var e,o,n;if(o=t.elements,n=this.elements,o!==n){for(e=0;e<16;++e)n[e]=o[e];return this}},n.prototype.concat=function(t){var e,o,n,a,r,i,s,h;if(o=this.elements,n=this.elements,a=t.elements,o===a)for(a=new Float32Array(16),e=0;e<16;++e)a[e]=o[e];for(e=0;e<4;e++)r=n[e],i=n[e+4],s=n[e+8],h=n[e+12],o[e]=r*a[0]+i*a[1]+s*a[2]+h*a[3],o[e+4]=r*a[4]+i*a[5]+s*a[6]+h*a[7],o[e+8]=r*a[8]+i*a[9]+s*a[10]+h*a[11],o[e+12]=r*a[12]+i*a[13]+s*a[14]+h*a[15];return this},n.prototype.multiply=n.prototype.concat,n.prototype.multiplyVector3=function(t){var e=this.elements,o=t.elements,n=new a,r=n.elements;return r[0]=o[0]*e[0]+o[1]*e[4]+o[2]*e[8]+e[12],r[1]=o[0]*e[1]+o[1]*e[5]+o[2]*e[9]+e[13],r[2]=o[0]*e[2]+o[1]*e[6]+o[2]*e[10]+e[14],n},n.prototype.multiplyVector4=function(t){var e=this.elements,o=t.elements,n=new r,a=n.elements;return a[0]=o[0]*e[0]+o[1]*e[4]+o[2]*e[8]+o[3]*e[12],a[1]=o[0]*e[1]+o[1]*e[5]+o[2]*e[9]+o[3]*e[13],a[2]=o[0]*e[2]+o[1]*e[6]+o[2]*e[10]+o[3]*e[14],a[3]=o[0]*e[3]+o[1]*e[7]+o[2]*e[11]+o[3]*e[15],n},n.prototype.setInverseOf=function(t){var e,o,n,a,r;if(o=t.elements,n=this.elements,a=new Float32Array(16),a[0]=o[5]*o[10]*o[15]-o[5]*o[11]*o[14]-o[9]*o[6]*o[15]+o[9]*o[7]*o[14]+o[13]*o[6]*o[11]-o[13]*o[7]*o[10],a[4]=-o[4]*o[10]*o[15]+o[4]*o[11]*o[14]+o[8]*o[6]*o[15]-o[8]*o[7]*o[14]-o[12]*o[6]*o[11]+o[12]*o[7]*o[10],a[8]=o[4]*o[9]*o[15]-o[4]*o[11]*o[13]-o[8]*o[5]*o[15]+o[8]*o[7]*o[13]+o[12]*o[5]*o[11]-o[12]*o[7]*o[9],a[12]=-o[4]*o[9]*o[14]+o[4]*o[10]*o[13]+o[8]*o[5]*o[14]-o[8]*o[6]*o[13]-o[12]*o[5]*o[10]+o[12]*o[6]*o[9],a[1]=-o[1]*o[10]*o[15]+o[1]*o[11]*o[14]+o[9]*o[2]*o[15]-o[9]*o[3]*o[14]-o[13]*o[2]*o[11]+o[13]*o[3]*o[10],a[5]=o[0]*o[10]*o[15]-o[0]*o[11]*o[14]-o[8]*o[2]*o[15]+o[8]*o[3]*o[14]+o[12]*o[2]*o[11]-o[12]*o[3]*o[10],a[9]=-o[0]*o[9]*o[15]+o[0]*o[11]*o[13]+o[8]*o[1]*o[15]-o[8]*o[3]*o[13]-o[12]*o[1]*o[11]+o[12]*o[3]*o[9],a[13]=o[0]*o[9]*o[14]-o[0]*o[10]*o[13]-o[8]*o[1]*o[14]+o[8]*o[2]*o[13]+o[12]*o[1]*o[10]-o[12]*o[2]*o[9],a[2]=o[1]*o[6]*o[15]-o[1]*o[7]*o[14]-o[5]*o[2]*o[15]+o[5]*o[3]*o[14]+o[13]*o[2]*o[7]-o[13]*o[3]*o[6],a[6]=-o[0]*o[6]*o[15]+o[0]*o[7]*o[14]+o[4]*o[2]*o[15]-o[4]*o[3]*o[14]-o[12]*o[2]*o[7]+o[12]*o[3]*o[6],a[10]=o[0]*o[5]*o[15]-o[0]*o[7]*o[13]-o[4]*o[1]*o[15]+o[4]*o[3]*o[13]+o[12]*o[1]*o[7]-o[12]*o[3]*o[5],a[14]=-o[0]*o[5]*o[14]+o[0]*o[6]*o[13]+o[4]*o[1]*o[14]-o[4]*o[2]*o[13]-o[12]*o[1]*o[6]+o[12]*o[2]*o[5],a[3]=-o[1]*o[6]*o[11]+o[1]*o[7]*o[10]+o[5]*o[2]*o[11]-o[5]*o[3]*o[10]-o[9]*o[2]*o[7]+o[9]*o[3]*o[6],a[7]=o[0]*o[6]*o[11]-o[0]*o[7]*o[10]-o[4]*o[2]*o[11]+o[4]*o[3]*o[10]+o[8]*o[2]*o[7]-o[8]*o[3]*o[6],a[11]=-o[0]*o[5]*o[11]+o[0]*o[7]*o[9]+o[4]*o[1]*o[11]-o[4]*o[3]*o[9]-o[8]*o[1]*o[7]+o[8]*o[3]*o[5],a[15]=o[0]*o[5]*o[10]-o[0]*o[6]*o[9]-o[4]*o[1]*o[10]+o[4]*o[2]*o[9]+o[8]*o[1]*o[6]-o[8]*o[2]*o[5],r=o[0]*a[0]+o[1]*a[4]+o[2]*a[8]+o[3]*a[12],0===r)return this;for(r=1/r,e=0;e<16;e++)n[e]=a[e]*r;return this},n.prototype.invert=function(){return this.setInverseOf(this)},n.prototype.setOrtho=function(t,e,o,n,a,r){var i,s,h,c;if(t===e||o===n||a===r)throw"null frustum";return s=1/(e-t),h=1/(n-o),c=1/(r-a),i=this.elements,i[0]=2*s,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2*h,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=-2*c,i[11]=0,i[12]=-(e+t)*s,i[13]=-(n+o)*h,i[14]=-(r+a)*c,i[15]=1,this},n.prototype.setFrustum=function(t,e,o,n,a,r){var i,s,h,c;if(t===e||n===o||a===r)throw"null frustum";if(a<=0)throw"near <= 0";if(r<=0)throw"far <= 0";return s=1/(e-t),h=1/(n-o),c=1/(r-a),i=this.elements,i[0]=2*a*s,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=2*a*h,i[6]=0,i[7]=0,i[8]=(e+t)*s,i[9]=(n+o)*h,i[10]=-(r+a)*c,i[11]=-1,i[12]=0,i[13]=0,i[14]=-2*a*r*c,i[15]=0,this},n.prototype.frustum=function(t,e,o,a,r,i){return this.concat((new n).setFrustum(t,e,o,a,r,i))},n.prototype.setPerspective=function(t,e,o,n){var a,r,i,s;if(o===n||0===e)throw"null frustum";if(o<=0)throw"near <= 0";if(n<=0)throw"far <= 0";if(t=Math.PI*t/180/2,i=Math.sin(t),0===i)throw"null frustum";return r=1/(n-o),s=Math.cos(t)/i,a=this.elements,a[0]=s/e,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=s,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=-(n+o)*r,a[11]=-1,a[12]=0,a[13]=0,a[14]=-2*o*n*r,a[15]=0,this},n.prototype.perspective=function(t,e,o,a){return this.concat((new n).setPerspective(t,e,o,a))},n.prototype.scale=function(t,e,o){var n=this.elements;return n[0]*=t,n[4]*=e,n[8]*=o,n[1]*=t,n[5]*=e,n[9]*=o,n[2]*=t,n[6]*=e,n[10]*=o,n[3]*=t,n[7]*=e,n[11]*=o,this},n.prototype.setTranslate=function(t,e,o){var n=this.elements;return n[0]=1,n[4]=0,n[8]=0,n[12]=t,n[1]=0,n[5]=1,n[9]=0,n[13]=e,n[2]=0,n[6]=0,n[10]=1,n[14]=o,n[3]=0,n[7]=0,n[11]=0,n[15]=1,this},n.prototype.translate=function(t,e,o){var n=this.elements;return n[12]+=n[0]*t+n[4]*e+n[8]*o,n[13]+=n[1]*t+n[5]*e+n[9]*o,n[14]+=n[2]*t+n[6]*e+n[10]*o,n[15]+=n[3]*t+n[7]*e+n[11]*o,this},n.prototype.setRotate=function(t,e,o,n){var a,r,i,s,h,c,u,l,d,m,p,f;return t=Math.PI*t/180,a=this.elements,r=Math.sin(t),i=Math.cos(t),0!==e&&0===o&&0===n?(e<0&&(r=-r),a[0]=1,a[4]=0,a[8]=0,a[12]=0,a[1]=0,a[5]=i,a[9]=-r,a[13]=0,a[2]=0,a[6]=r,a[10]=i,a[14]=0,a[3]=0,a[7]=0,a[11]=0,a[15]=1):0===e&&0!==o&&0===n?(o<0&&(r=-r),a[0]=i,a[4]=0,a[8]=r,a[12]=0,a[1]=0,a[5]=1,a[9]=0,a[13]=0,a[2]=-r,a[6]=0,a[10]=i,a[14]=0,a[3]=0,a[7]=0,a[11]=0,a[15]=1):0===e&&0===o&&0!==n?(n<0&&(r=-r),a[0]=i,a[4]=-r,a[8]=0,a[12]=0,a[1]=r,a[5]=i,a[9]=0,a[13]=0,a[2]=0,a[6]=0,a[10]=1,a[14]=0,a[3]=0,a[7]=0,a[11]=0,a[15]=1):(s=Math.sqrt(e*e+o*o+n*n),1!==s&&(h=1/s,e*=h,o*=h,n*=h),c=1-i,u=e*o,l=o*n,d=n*e,m=e*r,p=o*r,f=n*r,a[0]=e*e*c+i,a[1]=u*c+f,a[2]=d*c-p,a[3]=0,a[4]=u*c-f,a[5]=o*o*c+i,a[6]=l*c+m,a[7]=0,a[8]=d*c+p,a[9]=l*c-m,a[10]=n*n*c+i,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1),this},n.prototype.setRotateKe=function(t,e,o,n,a){var r,i,s,h,c,u,l,d,m,p;return r=this.elements,0!==o&&0===n&&0===a?(o<0&&(t=-t),r[0]=1,r[4]=0,r[8]=0,r[12]=0,r[1]=0,r[5]=e,r[9]=-t,r[13]=0,r[2]=0,r[6]=t,r[10]=e,r[14]=0,r[3]=0,r[7]=0,r[11]=0,r[15]=1):0===o&&0!==n&&0===a?(n<0&&(t=-t),r[0]=e,r[4]=0,r[8]=t,r[12]=0,r[1]=0,r[5]=1,r[9]=0,r[13]=0,r[2]=-t,r[6]=0,r[10]=e,r[14]=0,r[3]=0,r[7]=0,r[11]=0,r[15]=1):0===o&&0===n&&0!==a?(a<0&&(t=-t),r[0]=e,r[4]=-t,r[8]=0,r[12]=0,r[1]=t,r[5]=e,r[9]=0,r[13]=0,r[2]=0,r[6]=0,r[10]=1,r[14]=0,r[3]=0,r[7]=0,r[11]=0,r[15]=1):(i=Math.sqrt(o*o+n*n+a*a),1!==i&&(s=1/i,o*=s,n*=s,a*=s),h=1-e,c=o*n,u=n*a,l=a*o,d=o*t,m=n*t,p=a*t,r[0]=o*o*h+e,r[1]=c*h+p,r[2]=l*h-m,r[3]=0,r[4]=c*h-p,r[5]=n*n*h+e,r[6]=u*h+d,r[7]=0,r[8]=l*h+m,r[9]=u*h-d,r[10]=a*a*h+e,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1),this},n.prototype.rotate=function(t,e,o,a){return this.concat((new n).setRotate(t,e,o,a))},n.prototype.setLookAt=function(t,e,o,n,a,r,i,s,h){var c,u,l,d,m,p,f,g,w,P,y,A;return u=n-t,l=a-e,d=r-o,m=1/Math.sqrt(u*u+l*l+d*d),u*=m,l*=m,d*=m,p=l*h-d*s,f=d*i-u*h,g=u*s-l*i,w=1/Math.sqrt(p*p+f*f+g*g),p*=w,f*=w,g*=w,P=f*d-g*l,y=g*u-p*d,A=p*l-f*u,c=this.elements,c[0]=p,c[1]=P,c[2]=-u,c[3]=0,c[4]=f,c[5]=y,c[6]=-l,c[7]=0,c[8]=g,c[9]=A,c[10]=-d,c[11]=0,c[12]=0,c[13]=0,c[14]=0,c[15]=1,this.translate(-t,-e,-o)},n.prototype.dropShadow=function(t,e){var o=new n,a=o.elements,r=t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3];return a[0]=r-e[0]*t[0],a[1]=-e[1]*t[0],a[2]=-e[2]*t[0],a[3]=-e[3]*t[0],a[4]=-e[0]*t[1],a[5]=r-e[1]*t[1],a[6]=-e[2]*t[1],a[7]=-e[3]*t[1],a[8]=-e[0]*t[2],a[9]=-e[1]*t[2],a[10]=r-e[2]*t[2],a[11]=-e[3]*t[2],a[12]=-e[0]*t[3],a[13]=-e[1]*t[3],a[14]=-e[2]*t[3],a[15]=r-e[3]*t[3],this.concat(o)};var a=PanoAJK.Math.Vector3=function(t){var e=new Float32Array(3);t&&"object"==typeof t&&(e[0]=t[0],e[1]=t[1],e[2]=t[2]),this.elements=e};a.prototype.length=function(){return Math.sqrt(Math.pow(this.elements[0],2)+Math.pow(this.elements[1],2)+Math.pow(this.elements[2],2))},a.prototype.dot=function(t){var e=this.elements,o=t.elements;return e[0]*o[0]+e[1]*o[1]+e[2]*o[2]},a.prototype.cross=function(t){var e=this.elements,o=t.elements,n=e[0],a=e[1],r=e[2];return e[0]=a*o[2]-r*o[1],e[1]=r*o[0]-n*o[2],e[2]=n*o[1]-a*o[0],this},a.prototype.setLength=function(t){var e=this.length()/t;return 0==e?(this.elements[0]=0,this.elements[1]=0,this.elements[2]=0):(this.elements[0]=this.elements[0]/e,this.elements[1]=this.elements[1]/e,this.elements[2]=this.elements[2]/e),this},a.prototype.add=function(t){var e=t.elements;return this.elements[0]=this.elements[0]+e[0],this.elements[1]=this.elements[1]+e[1],this.elements[2]=this.elements[2]+e[2],this},a.prototype.subtract=function(t){var e=t.elements;return this.elements[0]=this.elements[0]-e[0],this.elements[1]=this.elements[1]-e[1],this.elements[2]=this.elements[2]-e[2],this},a.prototype.normalize=function(){var t=this.elements,e=t[0],o=t[1],n=t[2],a=Math.sqrt(e*e+o*o+n*n);return a?1==a?this:(a=1/a,t[0]=e*a,t[1]=o*a,t[2]=n*a,this):(t[0]=0,t[1]=0,t[2]=0,this)},a.prototype.scale=function(t){var e=this.elements;return e[0]=t*e[0],e[1]=t*e[1],e[2]=t*e[2],this},a.prototype.copy=function(t){var e=this.elements,o=t.elements;return e[0]=o[0],e[1]=o[1],e[2]=o[2],this},a.prototype.applyQuat=function(t){var e=this.elements,o=e[0],n=e[1],a=e[2],r=t[0],i=t[1],s=t[2],h=t[3],c=h*o+i*a-s*n,u=h*n+s*o-r*a,l=h*a+r*n-i*o,d=-r*o-i*n-s*a;e[0]=c*h+d*-r+u*-s-l*-i,e[1]=u*h+d*-i+l*-r-c*-s,e[2]=l*h+d*-s+c*-i-u*-r},a.prototype.reverse=function(){var t=this.elements;t[0]=-t[0],t[1]=-t[1],t[2]=-t[2]};var r=PanoAJK.Math.Vector4=function(t){var e=new Float32Array(4);t&&"object"==typeof t&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3]),this.elements=e},i=PanoAJK.Math.Quat=function(){this[0]=0,this[1]=0,this[2]=0,this[3]=1};i.prototype.setFromAxisAngle=function(t,e){e=.5*e;var o=Math.sin(e);this[0]=o*t[0],this[1]=o*t[1],this[2]=o*t[2],this[3]=Math.cos(e)}},function(t,e,o){o(1),function(t){PanoAJK.Main.WebGLContext=function(){},PanoAJK.Main.WebGLContext.prototype={constructor:PanoAJK.Main.WebGLContext,createProgram:function(t,e,o){var n=t.createShader(t.VERTEX_SHADER);if(t.shaderSource(n,e),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS))throw"Error in vertex shader:  "+t.getShaderInfoLog(n);var a=t.createShader(t.FRAGMENT_SHADER);if(t.shaderSource(a,o),t.compileShader(a),!t.getShaderParameter(a,t.COMPILE_STATUS))throw"Error in fragment shader:  "+t.getShaderInfoLog(a);var r=t.createProgram();if(t.attachShader(r,n),t.attachShader(r,a),t.linkProgram(r),!t.getProgramParameter(r,t.LINK_STATUS))throw"Link error in program:  "+t.getProgramInfoLog(r);return r},getTextContent:function(t){for(var e=document.getElementById(t),o=e.firstChild,n="";o;)3==o.nodeType&&(n+=o.textContent,o=o.nextSibling);return n},createProgramComplete:function(t,e,o){var n=this.getTextContent(e),a=this.getTextContent(o),r=this.createProgram(t,n,a);return r},cube:function(t){for(var e=(t||1)/2,o=[],n=[],a=[[-e,-e,e,e,-e,e,e,e,e,-e,e,e],[-e,-e,-e,-e,e,-e,e,e,-e,e,-e,-e],[-e,e,-e,-e,e,e,e,e,e,e,e,-e],[-e,-e,-e,e,-e,-e,e,-e,e,-e,-e,e],[e,-e,-e,e,e,-e,e,e,e,e,-e,e],[-e,-e,-e,-e,-e,e,-e,e,e,-e,e,-e]],r=function(t){var e,a=o.length/3;for(e=0;e<12;e++)o.push(t[e]);n.push(a,a+1,a+2,a,a+2,a+3)},i=0;i<6;i++)r(a[i]);this.vertexPositions=new Float32Array(o),this.indices=new Uint8Array(n)}}}(window.jQuery||window.Zepto)},function(t,e,o){o(1),o(2),function(t){PanoAJK.Main.Camera=function(t,e,o,n,a){var r=this;r.loc=t||new PanoAJK.Math.Vector3,r.tar=e||new PanoAJK.Math.Vector3([0,0,-1]),r.up=o||new PanoAJK.Math.Vector3([0,1,0]),r.upperLimit=n||1,r.lowerLimit=a||-1,r.dir=(new PanoAJK.Math.Vector3).copy(r.tar).subtract(r.loc)}}(window.jQuery||window.Zepto)},function(t,e,o){o(1),function(t){var e,o;PanoAJK.Main.Canvas=function(n,a){var r=t(n);r.attr({width:r.width()}),e=a?a:r.height()/r.width(),r.attr({height:r.width()*e}),this.core=n,this.halfDiagonal=10*Math.sqrt(this.core.width*this.core.width+this.core.height*this.core.height),o=r.width()/t("body").width()},PanoAJK.Main.Canvas.prototype={constructor:PanoAJK.Main.Canvas,width:function(){return this.core.width},height:function(){return this.core.height},resizeViewport:function(t){t.sys.gl.viewport(0,0,t.sys.canvas.width,t.sys.canvas.height)},resize:function(n){var a=t("body").width(),r=t(this.core);r.attr({width:a*o}),r.css({width:r.attr("width")+"px"}),r.attr({height:r.width()*e}),r.css({height:r.attr("height")+"px"}),this.halfDiagonal=10*Math.sqrt(this.core.width*this.core.width+this.core.height*this.core.height),n&&this.resizeViewport(n)}}}(window.jQuery||window.Zepto)},function(t,e,o){o(1),o(2),function(t){var e,o,n=0,a=new PanoAJK.Math.Vector3,r=new PanoAJK.Math.Vector3,i=new PanoAJK.Math.Vector3,s=new PanoAJK.Math.Vector3,h=[-1e4,1e4],c=[-1e4,1e4];PanoAJK.Main.Controller=function(t,n){o=this,o.GI=t,o.canvas=e=o.GI.sys.canvas,o.rotBool=o.moveBool=!1,o.rotInertia=!1,o.DIRHORIZONTAL_UPDATE=!0,o.loc=n.loc,o.tar=n.tar,o.dir=n.dir,o.up=n.up,o.upperLimit=n.upperLimit||1,o.lowerLimit=n.lowerLimit||-1,o.dirHorizontal=new PanoAJK.Math.Vector3,o.movesp=1,o.rotatesp=20,o.zoomsp=1,o.rotInertiasp=.92,o.smooothTime=5e3,o.mouse=[0,0],o.clickBool=!1,o.smoothRotate={bool:!1,count:0,step:0,axis:new PanoAJK.Math.Vector3([0,0,0]),quat:new PanoAJK.Math.Quat,forward1:!1,forward1Dist:0,forward2:!1,forward2Dist:0},o.bindEvent(),o.update()},PanoAJK.Main.Controller.prototype={constructor:PanoAJK.Main.Controller,bindEvent:function(){t(e).on("mousedown",o.mousedown).on("mousemove",o.mousemove).on("touchstart",o.touchstart).on("NeighPts.tap",o.touchtap)},offEvent:function(){t(e).off("mousedown",o.mousedown).off("mousemove",o.mousemove).off("touchstart",o.touchstart).off("NeighPts.tap",o.touchtap)},update:function(){o.zoomCam(),o.moveCam(),o.rotateCamQuat();var t=o.loc.elements,e=o.tar.elements;o.tar.copy(new PanoAJK.Math.Vector3(t).add(o.dir)),o.vmMat4=(new PanoAJK.Math.Matrix4).setLookAt(t[0],t[1],t[2],e[0],e[1],e[2],0,1,0),o.DIRHORIZONTAL_UPDATE&&(o.dirHorizontal.elements[0]=o.dir.elements[0],o.dirHorizontal.elements[2]=o.dir.elements[2],o.dirHorizontal.normalize())},zoomCam:function(){if(0!=n){var t=o.zoomsp*n;o.loc.add((new PanoAJK.Math.Vector3).copy(o.dir).setLength(t)),n=0}},moveCam:function(){if(r.elements[0]!=a.elements[0]||r.elements[1]!=a.elements[1]){var t=new PanoAJK.Math.Vector3(r.elements).subtract(a).setLength(o.dir.length()*o.movesp),e=new PanoAJK.Math.Vector3([0,1,0]).setLength(t.elements[1]);e.subtract(new PanoAJK.Math.Vector3([0,1,0]).cross(o.dir).setLength(t.elements[0])),o.loc.add(e),o.tar.add(e),a.copy(r)}},rotateCamQuat:function(){var t=new PanoAJK.Math.Quat;1==o.rotInertia?(o.angle=o.angle*o.rotInertiasp,o.angle<2e-4&&(o.rotInertia=!1)):(o.axis=new PanoAJK.Math.Vector3,o.angle=o.rotatesp*Math.acos(i.dot(s)/(i.length()*s.length())),o.axis.copy(s).cross(i).normalize()),Math.abs(o.angle)>2e-4&&(t.setFromAxisAngle(o.axis.elements,-o.angle),o.dir.applyQuat(t),o.up.applyQuat(t),s.applyQuat(t),i.copy(s))},mousewheel:function(){event.preventDefault(),event.stopPropagation(),event.wheelDelta?n+=event.wheelDelta/40:event.detail&&(n+=event.detail/3)},mousedown:function(n){switch(n.preventDefault(),n.stopPropagation(),n.button){case 0:i.copy(o.getCoordOnBallForPano(n.clientX,n.clientY)),s.copy(i),o.rotBool=!0,o.rotInertia=!1,h=[n.clientX,n.clientY]}t(e).on("mouseup",o.mouseup.bind(null,n))},mousemove:function(t){if(o.rotBool)s.copy(o.getCoordOnBallForPano(t.clientX,t.clientY));else if(o.moveBool)r.copy(o.getCoordOnScreen(t.clientX,t.clientY));else{var n=e.getBoundingClientRect();o.mouse=[2*(t.clientX-n.left)/e.width-1,1-2*(t.clientY-n.top)/e.height]}},mouseup:function(n){switch(n.preventDefault(),n.stopPropagation(),n.button){case 0:o.rotBool=!1,o.rotInertia=!0,Math.abs(h[0]-n.clientX)+Math.abs(h[1]-n.clientY)<.1&&(h=[1e4,1e4],o.clickBool=!0)}t(e).off("mouseup",o.mouseup.bind(null,n))},moveToNextpt:function(){if(GI.selId!=-1&&o.clickBool){o.offEvent(),GI.sys.currentPath=GI.objsToDraw.neighPts.neighPtData.paths[GI.selId],GI.objsToDraw.skybox.updateTexture(GI.sys.currentPath,!1);var t=new PanoAJK.Math.Vector3([GI.objsToDraw.neighPts.neighPtData.positions[GI.selId][0],0,GI.objsToDraw.neighPts.neighPtData.positions[GI.selId][2]]).normalize();o.smoothRotate.bool||(o.smoothRotate.axis=(new PanoAJK.Math.Vector3).copy(o.dir),o.smoothRotate.axis.cross(t).normalize(),o.smoothRotate.step=Math.acos(o.dir.dot(t))/20,o.smoothRotate.quat.setFromAxisAngle(o.smoothRotate.axis.elements,o.smoothRotate.step),o.smoothRotate.bool=!0)}o.smoothRotate.bool&&GI.objsToDraw.skybox.imgLoadedBool?o.smoothRotate.count<20?(o.dir.applyQuat(o.smoothRotate.quat),o.smoothRotate.count+=1):(o.tar.copy(o.dir),o.smoothRotate.count=0,o.smoothRotate.bool=!1,o.smoothRotate.forward1=!0,o.smoothRotate.forward1Dist=o.smoothRotate.forward2Dist=0):o.smoothRotate.forward1?(o.loc.add((new PanoAJK.Math.Vector3).copy(o.dir).setLength(1.2)),o.smoothRotate.forward1Dist+=1.2,GI.sys.cubeProgram.switchRatio=o.smoothRotate.forward1Dist/36,GI.sys.cubeProgram.switchRatio=GI.sys.cubeProgram.switchRatio>.92?1:GI.sys.cubeProgram.switchRatio,36==o.smoothRotate.forward1Dist&&(GI.objsToDraw.skybox.applyTexture(GI.sys.currentPath),o.smoothRotate.forward1=!1,o.smoothRotate.forward2=!0,o.loc.setLength(90).reverse())):o.smoothRotate.forward2&&(o.loc.add((new PanoAJK.Math.Vector3).copy(o.dir).setLength(3)),o.smoothRotate.forward2Dist+=3,GI.sys.cubeProgram.switchRatio=1-o.smoothRotate.forward2Dist/90,GI.sys.cubeProgram.switchRatio=GI.sys.cubeProgram.switchRatio>.92?1:GI.sys.cubeProgram.switchRatio,90==o.smoothRotate.forward2Dist&&(GI.sys.cubeProgram.switchRatio=0,o.smoothRotate.forward2=!1,o.loc=new PanoAJK.Math.Vector3,o.bindEvent()),GI.objsToDraw.neighPts.updateDate()),o.clickBool=!1},touchstart:function(t){switch(t.touches.length){case 1:i.copy(o.getCoordOnBallForPano(t.touches[0].clientX,t.touches[0].clientY)),s.copy(i),o.rotBool=!0,o.rotInertia=!1,c=[t.touches[0].clientX,t.touches[0].clientY];break;case 2:}e.addEventListener("touchmove",o.touchmove,!1),e.addEventListener("touchend",o.touchend,!1)},touchmove:function(t){switch(t.touches.length){case 1:o.rotBool&&s.copy(o.getCoordOnBallForPano(t.touches[0].clientX,t.touches[0].clientY));break;case 2:}},touchend:function(n){switch(n.changedTouches.length){case 1:if(o.rotBool=!1,o.rotInertia=!0,Math.abs(c[0]-n.changedTouches[0].clientX)+Math.abs(c[1]-n.changedTouches[0].clientY)<.12){o.clickBool=!0;var a=e.getBoundingClientRect();o.mouse=[2*(n.changedTouches[0].clientX-a.left)/e.width-1,1-2*(n.changedTouches[0].clientY-a.top)/e.height],c=[1e4,1e4],t("canvas").trigger("NeighPts.tap")}break;case 2:}e.removeEventListener("touchmove",o.touchmove,!1),e.removeEventListener("touchend",o.touchend,!1)},touchtap:function(t){GI.objsToDraw.neighPts.shine()},getCoordOnBallForPano:function(t,n){var a=new PanoAJK.Math.Vector3([0,1,0]),r=new PanoAJK.Math.Vector3([0,1,0]),i=e.getBoundingClientRect(),s=new PanoAJK.Math.Vector3([(t-i.left-.5*e.width)/GI.sys.canvasObject.halfDiagonal,(n-i.top-.5*e.height)/GI.sys.canvasObject.halfDiagonal,0]),h=s.length();return h>1?s.normalize():s.elements[2]=Math.sqrt(1-h*h),a.setLength(s.elements[1]),a.add(r.cross(o.dir).setLength(s.elements[0])),a.add(r.copy(o.dir).setLength(s.elements[2])),a},getCoordOnScreen:function(t,o){var n=e.getBoundingClientRect();return new PanoAJK.Math.Vector3([(t-n.left)/e.width,(o-n.top)/e.height,0])},forwardBackwardCam:function(){var t;o.forwardBit&&(t=(new PanoAJK.Math.Vector3).copy(o.dir).setLength(o.deepTouch),t.reverse(),o.loc.add(t),o.tar.add(t),o.forwardBit=!1,o.ForwardAlready=!0),o.backwardBit&&(t=(new PanoAJK.Math.Vector3).copy(o.dir).setLength(.08*o.deepTouch),o.loc.add(t),o.tar.add(t),o.loc.length()>o.deepTouch&&(o.backwardBit=!1,o.ForwardAlready=!1))},rotateCamMatrix:function(){var t=new PanoAJK.Math.Vector3,e=new PanoAJK.Math.Matrix4,n=o.rotatesp*Math.acos(i.dot(s)/(i.length()*s.length()));if(Math.abs(n)>.001){t.copy(s).cross(i).normalize(),e.setRotate(-n,t.elements[0],t.elements[1],t.elements[2]);var a=new PanoAJK.Math.Vector3;a.copy(o.dir),o.dir=new PanoAJK.Math.Matrix4(e).multiplyVector3(o.dir),o.dir.elements[1]<=o.lowerLimit||o.dir.elements[1]>=o.upperLimit?o.dir=a:o.up=new PanoAJK.Math.Matrix4(e).multiplyVector3(o.up),s=new PanoAJK.Math.Matrix4(e).multiplyVector3(s),i.copy(s)}}}}(window.jQuery||window.Zepto)},function(t,e,o){o(1),o(3),o(2),function(t){var e,o,n,a,r,i,s,h,c,u;PanoAJK.Main.NeighPts=function(t){e=t,o=e.sys.gl,u=this;var l={vShaderId:"vNeighshader",fShaderId:"fNeighshader"};n=e.sys.neighProgram=e.sys.WebGLContext.createProgramComplete(o,l.vShaderId,l.fShaderId),o.useProgram(n),a=o.getAttribLocation(n,"aCoords"),r=o.getUniformLocation(n,"uViewMat"),i=o.getUniformLocation(n,"uProjection"),s=o.getUniformLocation(n,"uAlpha"),h=o.getAttribLocation(n,"aIdCur"),c=o.getUniformLocation(n,"uIdSel"),u.neighPtData={vertexPositions:[4.59,0,0,4.58,0,.41,4.52,0,.84,4.42,0,1.26,4.27,0,1.69,4.08,0,2.11,3.85,0,2.51,3.57,0,2.9,3.25,0,3.25,2.9,0,3.57,2.51,0,3.85,2.11,0,4.08,1.69,0,4.27,1.26,0,4.42,.84,0,4.52,.41,0,4.58,0,0,4.59,-.41,0,4.58,-.84,0,4.52,-1.26,0,4.42,-1.69,0,4.27,-2.11,0,4.08,-2.51,0,3.85,-2.9,0,3.57,-3.25,0,3.25,-3.57,0,2.9,-3.85,0,2.51,-4.08,0,2.11,-4.27,0,1.69,-4.42,0,1.26,-4.52,0,.84,-4.58,0,.41,-4.59,0,0,-4.58,0,-.41,-4.52,0,-.84,-4.42,0,-1.26,-4.27,0,-1.69,-4.08,0,-2.11,-3.85,0,-2.51,-3.57,0,-2.9,-3.25,0,-3.25,-2.9,0,-3.57,-2.51,0,-3.85,-2.11,0,-4.08,-1.69,0,-4.27,-1.26,0,-4.42,-.84,0,-4.52,-.41,0,-4.58,0,0,-4.59,.41,0,-4.58,.84,0,-4.52,1.26,0,-4.42,1.69,0,-4.27,2.11,0,-4.08,2.51,0,-3.85,2.9,0,-3.57,3.25,0,-3.25,3.57,0,-2.9,3.85,0,-2.51,4.08,0,-2.11,4.27,0,-1.69,4.42,0,-1.26,4.52,0,-.84,4.58,0,-.41,2.65,0,0,2.64,0,-.24,2.61,0,-.48,2.55,0,-.73,2.47,0,-.98,2.36,0,-1.22,2.22,0,-1.45,2.06,0,-1.67,1.88,0,-1.88,1.67,0,-2.06,1.45,0,-2.22,1.22,0,-2.36,.98,0,-2.47,.73,0,-2.55,.48,0,-2.61,.24,0,-2.64,0,0,-2.65,-.24,0,-2.64,-.48,0,-2.61,-.73,0,-2.55,-.98,0,-2.47,-1.22,0,-2.36,-1.45,0,-2.22,-1.67,0,-2.06,-1.88,0,-1.88,-2.06,0,-1.67,-2.22,0,-1.45,-2.36,0,-1.22,-2.47,0,-.98,-2.55,0,-.73,-2.61,0,-.48,-2.64,0,-.24,-2.65,0,0,-2.64,0,.24,-2.61,0,.48,-2.55,0,.73,-2.47,0,.98,-2.36,0,1.22,-2.22,0,1.45,-2.06,0,1.67,-1.88,0,1.88,-1.67,0,2.06,-1.45,0,2.22,-1.22,0,2.36,-.98,0,2.47,-.73,0,2.55,-.48,0,2.61,-.24,0,2.64,0,0,2.65,.24,0,2.64,.48,0,2.61,.73,0,2.55,.98,0,2.47,1.22,0,2.36,1.45,0,2.22,1.67,0,2.06,1.88,0,1.88,2.06,0,1.67,2.22,0,1.45,2.36,0,1.22,2.47,0,.98,2.55,0,.73,2.61,0,.48,2.64,0,.24],indices:[90,37,38,36,37,91,38,89,90,41,88,40,89,38,39,39,40,88,87,41,42,90,91,37,94,95,34,32,33,95,34,95,33,93,34,35,92,93,36,34,93,94,36,93,35,92,36,91,44,45,84,43,44,84,46,82,45,81,47,48,48,80,81,80,48,49,82,46,47,81,82,47,86,87,42,88,89,39,87,88,41,45,82,83,43,84,85,45,83,84,85,86,43,42,43,86,31,32,96,95,96,32,31,98,30,97,31,96,31,97,98,29,30,99,30,98,99,100,29,99,28,29,100,27,101,26,28,100,27,103,25,26,24,105,23,25,103,24,22,23,105,100,101,27,102,103,26,104,105,24,103,104,24,106,107,22,21,107,108,22,107,21,105,106,22,19,20,108,19,110,18,108,20,21,18,110,17,16,17,111,110,111,17,109,110,19,108,109,19,101,102,26,78,79,49,80,49,79,78,51,77,50,78,49,76,77,51,76,51,52,51,78,50,53,75,52,52,75,76,74,55,73,74,75,53,72,57,71,70,59,69,58,70,71,55,72,73,53,54,74,56,72,55,56,57,72,57,58,71,69,59,60,69,60,68,58,59,70,67,60,61,67,68,60,62,65,66,67,61,66,65,63,64,127,64,0,63,0,64,62,63,65,61,62,66,54,55,74,11,116,117,13,114,115,115,116,13,120,9,119,118,10,117,9,118,119,10,11,117,15,112,113,112,15,16,15,113,14,111,112,16,14,114,13,14,113,114,13,116,12,12,116,11,7,120,121,3,125,126,124,5,123,4,124,125,2,127,1,0,1,127,2,3,126,127,2,126,125,3,4,120,8,9,8,120,7,9,10,118,121,122,7,5,6,122,6,7,122,5,122,123,5,124,4],positions:[],paths:[]},u.coordsBuffer=o.createBuffer(),u.idsBuffer=o.createBuffer(),u.indexBuffer=o.createBuffer(),o.uniformMatrix4fv(i,!1,e.sys.projection.elements),u.alpha=.1,u.updateDate()},PanoAJK.Main.NeighPts.prototype={constructor:PanoAJK.Main.NeighPts,updateDate:function(){var t=e.sys.currentPath.split("/")[2];u.neighPtData.paths=[],u.neighPtData.positions=[];for(var o=0;o<e.sys.pts[t].length;o++){u.neighPtData.paths.push(e.sys.pts[t][o].path),u.neighPtData.positions.push(e.sys.pts[t][o].position);for(var n=[],a=[],r=[],i=0;i<u.neighPtData.positions.length;i++){for(var s=0;s<u.neighPtData.vertexPositions.length;s++)switch(s%3){case 0:r.push(i),n.push(u.neighPtData.vertexPositions[s]+u.neighPtData.positions[i][0]);break;case 1:n.push(u.neighPtData.vertexPositions[s]+u.neighPtData.positions[i][1]);break;case 2:n.push(u.neighPtData.vertexPositions[s]+u.neighPtData.positions[i][2])}for(var h=0;h<u.neighPtData.indices.length;h++)a.push(u.neighPtData.indices[h]+u.neighPtData.vertexPositions.length/3*i)}u.neighPtData.coord=new Float32Array(n),u.neighPtData.index=new Uint16Array(a),u.neighPtData.ptIds=new Float32Array(r),u.count=u.neighPtData.index.length}},render:function(t){o.useProgram(n),o.bindBuffer(o.ARRAY_BUFFER,u.coordsBuffer),o.bufferData(o.ARRAY_BUFFER,u.neighPtData.coord,o.STATIC_DRAW),o.vertexAttribPointer(a,3,o.FLOAT,!1,0,0),o.enableVertexAttribArray(a),o.bindBuffer(o.ARRAY_BUFFER,u.idsBuffer),o.bufferData(o.ARRAY_BUFFER,u.neighPtData.ptIds,o.STATIC_DRAW),o.vertexAttribPointer(h,1,o.FLOAT,!1,0,0),o.enableVertexAttribArray(h),e.selId!=-1?u.brighten():e.selId==-1&&u.darken(),o.uniform1f(s,u.alpha),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,u.indexBuffer),o.bufferData(o.ELEMENT_ARRAY_BUFFER,u.neighPtData.index,o.STATIC_DRAW),o.uniformMatrix4fv(r,!1,t.vmMat4.elements),o.drawElements(o.TRIANGLES,u.count,o.UNSIGNED_SHORT,0)},brighten:function(){u.alpha<=1&&(u.alpha+=.1,o.uniform1i(c,e.selId))},darken:function(){u.alpha>.11&&(u.alpha=.1,o.uniform1i(c,e.selId))},shine:function(){o.uniform1i(c,e.selId),u.alpha=1}}}(window.jQuery||window.Zepto)},function(t,e,o){o(1),o(3),o(2),function(t){var e,o,n,a,r,i,s;PanoAJK.Main.Skybox=function(t){r=t.GIcontext,this.modelData=t.cubeData,this.count=this.modelData.indices.length,i=r.sys.gl,e=this;var h={vShaderId:"vshader",fShaderId:"fshader"};s=r.sys.cubeProgram=r.sys.WebGLContext.createProgramComplete(i,h.vShaderId,h.fShaderId),s.switchRatio=0,i.useProgram(s),o=i.getAttribLocation(s,"coords"),n=i.getUniformLocation(s,"modelview"),a=i.getUniformLocation(s,"projection"),s.uCubeSamplerCurLoc=i.getUniformLocation(s,"uCubeSamplerCur"),s.uSwitchRatioLoc=i.getUniformLocation(s,"uSwitchRatio"),i.enableVertexAttribArray(o),i.enable(i.DEPTH_TEST),i.uniformMatrix4fv(a,!1,r.sys.projection.elements),e.coordsBuffer=i.createBuffer(),e.indexBuffer=i.createBuffer(),e.updateTexture(t.firstPath,!0)},PanoAJK.Main.Skybox.prototype={constructor:PanoAJK.Main.Skybox,render:function(t){var a=e.modelData;i.useProgram(s),i.bindBuffer(i.ARRAY_BUFFER,e.coordsBuffer),i.bufferData(i.ARRAY_BUFFER,a.vertexPositions,i.STATIC_DRAW),i.vertexAttribPointer(o,3,i.FLOAT,!1,0,0),i.enableVertexAttribArray(o),i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.indexBuffer),i.bufferData(i.ELEMENT_ARRAY_BUFFER,a.indices,i.STATIC_DRAW),i.uniformMatrix4fv(n,!1,t.vmMat4.elements),i.uniform1f(s.uSwitchRatioLoc,s.switchRatio),i.drawElements(i.TRIANGLES,e.count,i.UNSIGNED_BYTE,0)},updateTexture:function(o,n){if(t.inArray(o,r.sys.imageLoadedList)!=-1)n?e.applyTexture(o):e.imgLoadedBool=!0;else if(t.inArray(o,r.sys.imageLoadingList)!=-1){var a=r.sys.imageList[o]=new Array(6);e.urls=[o+"_right.jpg",o+"_left.jpg",o+"_top.jpg",o+"_bottom.jpg",o+"_front.jpg",o+"_back.jpg"];var i=0;e.imgLoadedBool=!1;for(var s=0;s<6;s++)a[s]=new Image,a[s].crossOrigin="annoymous",a[s].onload=function(){i++,6==i&&(n?e.applyTexture(o):e.imgLoadedBool=!0)},a[s].src=e.urls[s]}else{var a=r.sys.imageList[o]=new Array(6);e.urls=[o+"_right.jpg",o+"_left.jpg",o+"_top.jpg",o+"_bottom.jpg",o+"_front.jpg",o+"_back.jpg"],r.sys.imageLoadedCount[o]=0,e.imgLoadedBool=!1,r.sys.imageLoadingList.push(o);for(var h=0;h<6;h++)a[h]=new Image,a[h].crossOrigin="annoymous",a[h].onload=function(){r.sys.imageLoadedCount[o]++,6==r.sys.imageLoadedCount[o]&&(r.sys.imageLoadedList.push(o),r.sys.imageLoadingList.splice(t.inArray(o,r.sys.imageLoadingList),1),n?e.applyTexture(o):e.imgLoadedBool=!0)},a[h].src=e.urls[h]}},preloadTexture:function(e){if(t.inArray(e,r.sys.imageLoadedList)==-1){var o=[e+"_right.jpg",e+"_left.jpg",e+"_top.jpg",e+"_bottom.jpg",e+"_front.jpg",e+"_back.jpg"];r.sys.imagePreloadedCount[e]=0;var n=r.sys.imageList[e]=new Array(6);r.sys.imageLoadingList.push(e);for(var a=0;a<6;a++)n[a]=new Image,n[a].crossOrigin="annoymous",n[a].onload=function(){r.sys.imagePreloadedCount[e]++,r.sys.imageLoadedCount[e]=r.sys.imagePreloadedCount[e],6==r.sys.imagePreloadedCount[e]&&(r.sys.imageLoadedList.push(e),r.sys.imageLoadingList.splice(t.inArray(e,r.sys.imageLoadingList),1))},n[a].src=o[a]}},applyTexture:function(o){var n=r.sys.imageList[o],a=i.createTexture();i.bindTexture(i.TEXTURE_CUBE_MAP,a);for(var s=[i.TEXTURE_CUBE_MAP_POSITIVE_X,i.TEXTURE_CUBE_MAP_NEGATIVE_X,i.TEXTURE_CUBE_MAP_POSITIVE_Y,i.TEXTURE_CUBE_MAP_NEGATIVE_Y,i.TEXTURE_CUBE_MAP_POSITIVE_Z,i.TEXTURE_CUBE_MAP_NEGATIVE_Z],h=0;h<6;h++)i.texImage2D(s[h],0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,n[h]),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MIN_FILTER,i.LINEAR);i.generateMipmap(i.TEXTURE_CUBE_MAP);var c=o.split("/")[2],u=r.sys.pts;for(var l in u[c])t.inArray(u[c][l].path,r.sys.imageLoadedList)==-1&&e.preloadTexture(u[c][l].path)}}}(window.jQuery||window.Zepto)}]);