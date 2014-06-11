//Start...

//Version 1：
/*
//TODO: Set  a global var to recall every thing afterwards 
document.getElementById( 'resultBox' ).innerHTML = "<table id='tb'><table>";

function getPage( score ) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if ( ajax.readyState == 4 && ajax.status == 200 ) {
            var serverContent = ajax.responseText;
            var startPos = serverContent.indexOf( '<div class="mainBox">' );
            var endPos = serverContent.indexOf( '<!-- main end -->', startPos );
            serverContent = serverContent.substr( startPos, endPos - startPos );

            if ( serverContent.indexOf( '系统检索不到您所查询的相关信息。查询条件可能存在误差，请返回修改!' ) !== -1 ) {
                //No result
                //resultContent = 'None in' + score + '.';
                //nodeDiv.innerText = resultContent;
            } else if ( serverContent.indexOf( '页次：1/1页' ) !== -1 ) {
                startPos = serverContent.indexOf( '<tr>' );
                startPos = serverContent.indexOf( '<tr>', startPos + 5 );
                endPos = serverContent.indexOf( '</table>', startPos + 5 );
                serverContent = serverContent.substr( startPos, endPos - startPos );
                serverContent = serverContent.replace( /input/g, 'n' );
                document.getElementById( 'tb' ).innerHTML += serverContent;
            } else {
                var matchStr = '页次：1/'
                var matchPos = serverContent.indexOf( matchStr ) + matchStr.length;
                var pages = serverContent.substr( matchPos, serverContent.indexOf( '页', matchPos ) - matchPos );
                pages = new Number( pages );
                for ( var i = 1, j = 0; i <= pages; i++, j++ ) {
                    setTimeout( function ( i ) {
                        return function () {
                            getScorePage( score, i );
                        };
                    }( i ), 1000 * j );
                }
            }
        }
    }
    ajax.open( 'get', 'http://ewt360.com/LNLQXX/SearchResult?act=mark&Years=2013&WL=l&BZ=b&PiCi=0&Score=' + score + '&ProvinceCode=0&page=1', true );
    ajax.send();
}
function getScorePage( score, page ) {

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if ( ajax.readyState == 4 && ajax.status == 200 ) {
            var serverContent = ajax.responseText;
            var startPos = serverContent.indexOf( '<div class="mainBox">' );
            var endPos = serverContent.indexOf( '<!-- main end -->', startPos );
            serverContent = serverContent.substr( startPos, endPos - startPos );

            startPos = serverContent.indexOf( '<tr>' );
            startPos = serverContent.indexOf( '<tr>', startPos + 5 );
            endPos = serverContent.indexOf( '</table>', startPos + 5 );
            serverContent = serverContent.substr( startPos, endPos - startPos );

            serverContent = serverContent.replace( /input/g, 'n' );

            document.getElementById( 'tb' ).innerHTML += serverContent;
        }
    }
    ajax.open( 'get', 'http://ewt360.com/LNLQXX/SearchResult?act=mark&Years=2013&WL=l&BZ=b&PiCi=0&Score=' + score + '&ProvinceCode=0&page=' + page, true );
    ajax.send();
}
*/

//V2
//Configurations
var YEAR = '2013';
var HIGHER_BOUND = 401;
var LOWER_BOUND = 400;
var TIME_DEALY = 500;

document.getElementsByTagName( 'body' )[0].innerHTML = "<table><tbody id='tb'></tbody><table>";
var taskList = [];

function taskHandle() {
    console.log( 'Current Task ID:' + currentTask + '\nCurrent Task Count:' + taskList.length );
    if ( taskList[currentTask] ) {
        getResult( taskList[currentTask].score, taskList[currentTask].page );
        currentTask++;
    }
}
function getResult( score, page ) {
    if ( page == 1 ) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if ( ajax.readyState == 4 && ajax.status == 200 ) {
                var serverContent = ajax.responseText;
                var startPos = serverContent.indexOf( '<div class="mainBox">' );
                var endPos = serverContent.indexOf( '<!-- main end -->', startPos );
                serverContent = serverContent.substr( startPos, endPos - startPos );

                if ( serverContent.indexOf( '系统检索不到您所查询的相关信息。查询条件可能存在误差，请返回修改!' ) !== -1 ) {
                } else if ( serverContent.indexOf( '页次：1/1页' ) !== -1 ) {
                    startPos = serverContent.indexOf( '<tr>' );
                    startPos = serverContent.indexOf( '<tr>', startPos + 5 );
                    endPos = serverContent.indexOf( '</table>', startPos + 5 );
                    serverContent = serverContent.substr( startPos, endPos - startPos );
                    serverContent = serverContent.replace( /input/g, 'n' );
                    document.getElementById( 'tb' ).innerHTML += serverContent;
                } else {

                    var matchStr = '页次：1/'
                    var matchPos = serverContent.indexOf( matchStr ) + matchStr.length;
                    var pages = serverContent.substr( matchPos, serverContent.indexOf( '页', matchPos ) - matchPos );
                    pages = new Number( pages );
                    for ( var i = 2; i <= pages; i++ ) {
                        taskList.push( {
                            score: score,
                            page: i
                        } );
                    }

                    startPos = serverContent.indexOf( '<tr>' );
                    startPos = serverContent.indexOf( '<tr>', startPos + 5 );
                    endPos = serverContent.indexOf( '</table>', startPos + 5 );
                    serverContent = serverContent.substr( startPos, endPos - startPos );
                    serverContent = serverContent.replace( /input/g, 'n' );
                    document.getElementById( 'tb' ).innerHTML += serverContent;
                }
            }
        }
        ajax.open( 'get', 'http://ewt360.com/LNLQXX/SearchResult?act=mark&Years='
            + YEAR + '&WL=l&BZ=b&PiCi=0&Score=' + score + '&ProvinceCode=0&page=1', true );
        ajax.send();
    } else {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if ( ajax.readyState == 4 && ajax.status == 200 ) {
                var serverContent = ajax.responseText;
                var startPos = serverContent.indexOf( '<div class="mainBox">' );
                var endPos = serverContent.indexOf( '<!-- main end -->', startPos );
                serverContent = serverContent.substr( startPos, endPos - startPos );

                startPos = serverContent.indexOf( '<tr>' );
                startPos = serverContent.indexOf( '<tr>', startPos + 5 );
                endPos = serverContent.indexOf( '</table>', startPos + 5 );
                serverContent = serverContent.substr( startPos, endPos - startPos );
                serverContent = serverContent.replace( /input/g, 'n' );
                document.getElementById( 'tb' ).innerHTML += serverContent;
            }
        }
        ajax.open( 'get', 'http://ewt360.com/LNLQXX/SearchResult?act=mark&Years='
            + YEAR + '&WL=l&BZ=b&PiCi=0&Score=' + score + '&ProvinceCode=0&page='
            + page, true );
        ajax.send();
    }
}
//Fill Basic List
for ( var i = HIGHER_BOUND; i >= LOWER_BOUND; i-- ) {
    taskList.push( {
        score: i,
        page: 1
    } );
}
var currentTask = 0;
setInterval( taskHandle, TIME_DEALY );