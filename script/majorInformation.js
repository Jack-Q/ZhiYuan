/// <reference path="jquery-2.1.1.js" />
/// <reference path="majorDetial.js" />
/// <reference path="../majorInformation.html" />


window.addEventListener( "load", function () {

    //The Data For Classification And Detial ID Mapping.
    var status = {
        lv1: true,
        lv1id: undefined,
        lv2: true,
        lv2id: undefined,
        lv3: true,
        lv3id: undefined,
        detial: true,
        detialid: undefined,
    };

    function openLv1() {

        if ( !status.lv2 ) {
            openLv2()
        }

        status.lv1 = true;
        $( 'div#lv1-box' ).removeClass( 'lv1-box-close' ).addClass( 'lv1-box-open' );
    }
    function fillminiLv1() {
        $( 'div#lv1-miniview-name' ).text( majorClass[status.lv1id].name );
    }
    function closeLv1() {
        status.lv1 = false;
        $( 'div#lv1-box' ).removeClass( 'lv1-box-open' ).addClass( 'lv1-box-close' );
    }
    function openLv2() {

        if ( !status.lv3 ) {
            openLv3()
        }

        status.lv2 = true;
        $( 'div#lv2-box' ).removeClass( 'lv2-box-close' ).addClass( 'lv2-box-open' );

    }
    function fillLv2() {
        lv2Box = $( 'div#lv2-fullview-content-box' );
        lv2Box.empty();
        var colors = ['#af9'];
        for ( var i = 0; i < majorClass[status.lv1id].content.length; i++ ) {
            var node = '<div id="lv2-selector-' + i + '" class="lv2-selector';
            node += '">' + majorClass[status.lv1id].content[i].name;
            node += '<\/div>'
            lv2Box.append( node );
            var color = colors[Math.ceil( Math.random() * ( colors.length - 1 ) )];
            $( "#lv2-selector-" + i ).css( { 'background-color': color } ).click(( function ( i ) {
                return function () {
                    status.lv2id = i;
                    fillminiLv2();
                    fillLv3();
                    closeLv2();
                };
            } )( i ) );
        }
    }
    function fillminiLv2() {
        $( 'div#lv2-miniview-name' ).text( majorClass[status.lv1id].content[status.lv2id].name );
    }
    function closeLv2() {
        status.lv2 = false;
        $( 'div#lv2-box' ).removeClass( 'lv2-box-open' ).addClass( 'lv2-box-close' );

    }
    function openLv3() {
        $( 'div#detial-inner-box' ).removeClass( 'loaded' );

        status.lv3 = true;
        $( 'div#lv3-box' ).removeClass( 'lv3-box-close' ).addClass( 'lv3-box-open' );

    }
    function fillLv3() {
        lv3Box = $( 'div#lv3-fullview-content-box' );
        lv3Box.empty();
        var colors = ['#fbe'];
        for ( var i = 0; i < majorClass[status.lv1id].content[status.lv2id].content.length; i++ ) {
            var node = '<div id="lv3-selector-' + i + '" class="lv3-selector';
            node += '">' + majorClass[status.lv1id].content[status.lv2id].content[i].name;
            node += '<\/div>'
            lv3Box.append( node );
            var color = colors[Math.ceil( Math.random() * ( colors.length - 1 ) )];
            $( "#lv3-selector-" + i ).css( { 'background-color': color } ).click(( function ( i ) {
                return function () {
                    status.lv3id = i;
                    fillminiLv3();
                    fillDetial();
                    closeLv3();
                };
            } )( i ) );
        }
        lv3Box.append( '<div class="lv3-clear"><\/div>' );
    }
    function fillminiLv3() {
        $( 'div#lv3-miniview-name' ).text( majorClass[status.lv1id].content[status.lv2id].content[status.lv3id].name );
    }
    function closeLv3() {
        status.lv3 = false;
        $( 'div#lv3-box' ).removeClass( 'lv3-box-open' ).addClass( 'lv3-box-close' );

    }
    function openDetial() {

    }
    function fillDetial() {
        $( 'div#detial-title' ).text( majorClass[status.lv1id].content[status.lv2id].content[status.lv3id].name );
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if ( ajax.readyState == 4 && ajax.status == 200 ) {
                var result = JSON.parse( ajax.responseText );
                if ( result.sta ) {
                    $( 'div#detial-inner-box' ).addClass( 'loaded' );
                    $( 'div#detial-content' ).empty().append( decodeURI( result.content ) );
                }
            }
        }
        ajax.open( 'get', 'majorAjax.php?id=' + majorClass[status.lv1id].content[status.lv2id].content[status.lv3id].id, true );
        ajax.send();

    }
    function closeDetial() {

    }

    //Initial Lv1 Menu
    ( function () {
        var lv1Menu = [{
            len: 0, jq: $( 'div#lv1-row1' )
        }, {
            len: 0, jq: $( 'div#lv1-row2' )
        }, {
            len: 0, jq: $( 'div#lv1-row3' )
        }, {
            len: 0, jq: $( 'div#lv1-row4' )
        }, ];
        for ( var i = 0; i < majorClass.length; i++ ) {
            var minRow = 0;
            for ( var j = 1; j < lv1Menu.length; j++ ) {
                if ( lv1Menu[j].len < lv1Menu[minRow].len ) {
                    minRow = j;
                }
            }
            var node = '<span id="lv1-selector-' + i + '" class="lv1-width' + majorClass[i].width;
            node += '">' + majorClass[i].name;
            node += '<\/span>'
            lv1Menu[minRow].jq.append( node );
            lv1Menu[minRow].len += majorClass[i].width;
            $( "#lv1-selector-" + i ).click(( function ( i ) {
                return function () {
                    status.lv1id = i;
                    fillminiLv1();
                    fillLv2();
                    closeLv1();
                };
            } )( i ) );

        }
        //Hide Loading Animation
        $( "div#lv1-loading" ).hide();
    } )();

    $( 'div#lv1-miniview-open' ).click( openLv1 );
    $( 'div#lv1-miniview-name' ).click( openLv1 );

    $( 'div#lv2-miniview-open' ).click( openLv2 );
    $( 'div#lv2-miniview-name' ).click( openLv2 );

    $( 'div#lv3-miniview-open' ).click( openLv3 );
    $( 'div#lv3-miniview-name' ).click( openLv3 );


}, false );
