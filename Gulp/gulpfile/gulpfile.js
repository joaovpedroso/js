var gulp = require('gulp');
//Minificador
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
//Concatenador
var concat = require('gulp-concat');
//Otimizador de Imagens
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');


//Tarefas (tasks)

//Javascript
gulp.task('js', function(){
    //Pegar os arquivos da pasta JS
    //Ignorar arquivo - return gulp.src(['assets/js/*.js', '!DIRETORIO_DO_ARQUIVO']);
    return gulp.src(['assets/js/*.js'])
        //Nome final do novo arquivo JS que será minificado
        .pipe( concat('scripts.js') )
        //Minificar arquivo
        .pipe( uglify() )
    //Destino do arquivo JS final
    .pipe( gulp.dest('assets/js/') )    ;
});

//CSS
gulp.task('css', function(){
    //Pegar os arquivos da pasta JS
    //Ignorar arquivo - return gulp.src(['assets/js/*.js', '!DIRETORIO_DO_ARQUIVO']);
    return gulp.src(['assets/css/*.css'])
        //Nome final do novo arquivo CSS que será minificado
        .pipe( concat('scripts.css') )
        //Minificar arquivo
        .pipe( cssmin() )
    //Destino do arquivo CSS final
    .pipe( gulp.dest('assets/css/') )   ; 
});

//Otimizador de imagens
gulp.task('images', function(){
    return gulp.src('assets/images/**/*')
        .pipe( newer( 'assets/images/min/' ) )
        .pipe( imagemin( {optimizationLevel: 5} ) )
        .pipe( gulp.dest( 'assets/images/min/' ) );
});

//Observador
gulp.task('watch', function(){
    //Quando for alterado algum arquivo dentro do diretório
    //gulp.watch('DIRETORIO A SER OBSERVADO', [TAREFA A SER REALIZADA])
    gulp.watch('assets/js/*.js', ['js']);
    gulp.watch('assets/css/*.css', ['css']);
});

//Default - Ação padrão gulp - Executar todas as tarefas
gulp.task('default',['css','js','watch']);