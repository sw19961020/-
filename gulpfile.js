var {src,dest,watch,series,parallel,watch, parallel} = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var file_include = require('gulp-file-include');
var webserver = require('gulp-webserver');

function cleanTask(){
    return src('./dist',{allowEmpty : true})
        .pipe(clean());
}

function sassTask(){
    return src('./src/css/*.scss')
        .pipe(sass())
        .pipe(dest('./dist/css'));
}

function file_includeTask(){
    return src('./src/view/*.html')
        .pipe(file_include({
            prefix : '@',
            basepath : './src/view/templates'
        }))
        .pipe(dest('./dist/view'));
}

function jsTask(){
    return src('./src/js/**')
        .pipe(dest('./dist/js'));
}

function libTask(){
    return src('./src/lib/**')
    .pipe(dest('./dist/lib'));

}

function apiTask(){
    return src('./src/api/**')
    .pipe(dest('./dist/api'));

}

function webserverTask(){
    return src('./dist')
        .pipe(webserver({
            host : 'localhost',
            port : 4000,
            open : './view/index.html',
            livereload : true 
        }));
}

function staticTask(){
    return src('./src/static/**')
        .pipe(dest('./dist/static'));
}

function watchTask(){
    watch('./src/view/**',file_includeTask);
    watch('./src/css/**',sassTask);
    watch('./src/static/**',staticTask);
    watch('./src/js/**',jsTask);
    watch('./src/lib/**',libTask);
    watch('./src/api/**',apiTask);
}




module.exports = {
    dev : series(cleanTask,parallel(file_includeTask,sassTask,staticTask,jsTask,libTask,apiTask),parallel(webserverTask,watchTask)) ,
    build: series(cleanTask)
}