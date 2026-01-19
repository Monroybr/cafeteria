const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
//NOTA: cuando aparecen las llaves significa que exporta varios y cuando no tiene solo exporta uno
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css( done){
    //compilar sass
    //pasos: -1 identificar archivo, 2 compilarla, 3-guardar el .css
    src('src/scss/app.scss') //identificar el archivo
        .pipe( sass() ) //compilarlo -- a la funcion sass se le puede pasar un objeto JS
        .pipe( postcss( [autoprefixer() ] ))
        .pipe(dest('build/css')) //guardar

    done();
}

function dev(){
    watch('src/scc/**/*.scss', css);
}

exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);

//series- se inicia una tarea y hasta que finaliza inicia la siguiente
//parallel - todas inician al mismo tiempo