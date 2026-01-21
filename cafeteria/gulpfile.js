const {src, dest, watch, series, parallel, lastRun} = require('gulp');

//CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
//NOTA: cuando aparecen las llaves significa que exporta varios y cuando no tiene solo exporta uno
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css( done){
    //compilar sass
    //pasos: -1 identificar archivo, 2 compilarla, 3-guardar el .css
    src('src/scss/app.scss') //identificar el archivo
        .pipe(sourcemaps.init())
        .pipe( sass() ) //compilarlo -- a la funcion sass se le puede pasar un objeto JS
        .pipe( postcss( [autoprefixer(), cssnano() ] ))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')) //guardar

    done();
}

function imagenes (){
    return src('src/img/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
}

function versionWebp(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
}

function versionAvif(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);

//series- se inicia una tarea y hasta que finaliza inicia la siguiente
//parallel - todas inician al mismo tiempo