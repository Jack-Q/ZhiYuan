﻿//Start...

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

//Province&College Info Getter
var result = [];
function a( i ) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if ( ajax.readyState == 4 && ajax.status == 200 ) {
            var serverContent = ajax.responseText;
            serverContent = JSON.parse( serverContent );
            if ( serverContent.Data.length && serverContent.Data.length > 0 ) {
                serverContent = serverContent.Data;
                result.push( { pro: i, data: serverContent } );
                console.log( i );
            }
        }
    }
    ajax.open( 'post', 'http://ewt360.com/Ajax/School', true );

    ajax.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );

    ajax.send( 'ProvinceCode=' + i + '0000&Years=2013&WL=w&BZ=b&Pre=undefined' );
}
for ( var i = 10; i < 99; i++ ) {
    a( i );
}

setTimeout( function () { console.log( JSON.stringify( result ) ); }, 50000 );



//Major Information Getter
//http://ewt360.com/Major/Speciality/4

var doc = document.getElementsByTagName( 'body' )[0];
doc.innerHTML = "";
function getMajor( pageID ) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if ( ajax.readyState == 4 && ajax.status == 200 ) {
            var serverContent = ajax.responseText;
            var startPos = serverContent.indexOf( '<div class="infoDetail">' );
            var endPos = serverContent.indexOf( '</div>', startPos );
            serverContent = serverContent.substr( startPos, endPos - startPos + 5 );

            startPos = serverContent.indexOf( '<h1' );
            endPos = serverContent.indexOf( '</div', startPos );
            serverContent = serverContent.substr( startPos, endPos - startPos );
            var serverNull = '%3Ch1%20class=%22title%20mrgB15%22%3E%20%3C/h1%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%20style=%22font-size:14px%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/p%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbr%20/%3E%3Cbr%20/%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20';
            serverContent = encodeURI( serverContent )
            if ( serverContent != serverNull ) {
                console.log( 'Fetching Data with id ' + pageID + ' Successed.' );
                doc.innerHTML += '<p>' + ( serverContent ) + '</p>';
            } else {
                console.log( 'Fetching Data with id ' + pageID + ' Failed.' );
            }

        }
    }
    ajax.open( 'get', 'http://ewt360.com/Major/Speciality/' + pageID, true );
    ajax.send();
}

for ( var i = 0; i < 20; i++ ) {
    getMajor( i );
}

//Major Class Information Getter
//http://ewt360.com/Major/Speciality/4

var doc = document.getElementsByTagName( 'body' )[0];
doc.innerHTML = "<table id='MY'><tbody></tbody></table>";
function getMajor( pageID ) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if ( ajax.readyState == 4 && ajax.status == 200 ) {
            var serverContent = ajax.responseText;
            var startPos = serverContent.indexOf( '<tr>' );
            startPos = serverContent.indexOf( '<tr>', startPos + 5 );
            var endPos = serverContent.indexOf( '</table>', startPos );
            serverContent = serverContent.substr( startPos, endPos - startPos );
            document.getElementById( 'MY' ).children[0].innerHTML += serverContent;
        }
    }
    ajax.open( 'get', 'http://ewt360.com/Major?page=' + pageID, true );
    ajax.send();
}

for ( var i = 1; i < 67; i++ ) {
    getMajor( i );
}




//Career Information Getter
//http://ewt360.com/Career/Detail/4

var FROM = 0;
var END = 1000;
var doc = document.getElementsByTagName( 'body' )[0];
doc.innerHTML = "";
function getMajor( pageID ) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if ( ajax.readyState == 4 && ajax.status == 200 ) {
            var serverContent = ajax.responseText;
            var startPos = serverContent.indexOf( '<div class="infoDetail">' );
            var endPos = serverContent.indexOf( '</div>', startPos );
            serverContent = serverContent.substr( startPos, endPos - startPos + 5 );

            startPos = serverContent.indexOf( '<h1' );
            startPos = serverContent.indexOf( '<p', startPos );
            endPos = serverContent.indexOf( '</div', startPos );
            serverContent = serverContent.substr( startPos, endPos - startPos );
            var serverNull = "%3Cp%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%"
                + "20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2"
                + "0%20%20%20%3Cbr%20/%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20"
                + "%20%20%20%20%20%20%3Cbr%20/%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%"
                + "20%20%20%20%20%3C/p%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20";
            serverContent = encodeURI( serverContent );
            if ( serverContent != serverNull ) {
                console.log( 'Fetching Data with id ' + pageID + ' Successed.' );
                doc.innerHTML += '( ' + pageID
                    + ' , "' + serverContent
                    + '" ),';

            } else {
                console.log( 'Fetching Data with id ' + pageID + ' Failed.' );
            }
            pageID < END ?
            getMajor( pageID + 1 ) : console.log( '===============ENDED===============' );
        }
    }
    ajax.open( 'get', 'http://ewt360.com/Career/Detail/' + pageID, true );
    ajax.send();
}
getMajor( FROM );

//Major Class Information Getter
//http://ewt360.com/Major/Speciality/4

var doc = document.getElementsByTagName( 'body' )[0];
doc.innerHTML = "<table id='MY'><tbody></tbody></table>";
function getMajor( pageID ) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if ( ajax.readyState == 4 && ajax.status == 200 ) {
            var serverContent = ajax.responseText;
            var startPos = serverContent.indexOf( '<tr>' );
            startPos = serverContent.indexOf( '<tr>', startPos + 5 );
            var endPos = serverContent.indexOf( '</table>', startPos );
            serverContent = serverContent.substr( startPos, endPos - startPos );
            document.getElementById( 'MY' ).children[0].innerHTML += serverContent;
        }
    }
    ajax.open( 'get', 'http://ewt360.com/Career?page=' + pageID, true );
    ajax.send();
}


for ( var i = 0; i < 1; i++ ) {
    getMajor( i );
}


//Career Information Getter V2
var getIDList = [4,
5,
6,
7,
8,
9,
10,
11,
12,
13,
14,
15,
16,
17,
18,
19,
20,
21,
22,
23,
24,
25,
26,
27,
28,
29,
30,
31,
32,
33,
34,
35,
36,
37,
38,
39,
40,
41,
42,
43,
44,
45,
46,
47,
48,
49,
50,
51,
52,
53,
54,
55,
56,
57,
58,
59,
60,
61,
62,
63,
64,
65,
66,
67,
68,
69,
70,
71,
72,
73,
74,
75,
76,
77,
78,
79,
80,
81,
82,
83,
84,
85,
86,
87,
88,
89,
90,
91,
92,
93,
94,
95,
96,
97,
98,
99,
100,
101,
102,
103,
104,
105,
106,
107,
108,
109,
110,
111,
112,
113,
114,
115,
116,
117,
118,
119,
120,
121,
122,
123,
124,
125,
126,
127,
128,
129,
130,
131,
132,
133,
134,
135,
136,
137,
138,
139,
140,
141,
142,
143,
144,
145,
146,
147,
148,
149,
150,
151,
152,
153,
154,
155,
156,
157,
158,
159,
160,
161,
162,
163,
164,
165,
166,
167,
168,
169,
170,
171,
172,
173,
174,
175,
176,
177,
178,
179,
180,
181,
182,
183,
184,
185,
186,
187,
188,
189,
190,
191,
192,
193,
194,
195,
196,
197,
198,
199,
200,
201,
202,
203,
204,
205,
206,
207,
208,
209,
210,
211,
212,
213,
214,
215,
216,
217,
218,
219,
220,
221,
222,
223,
224,
225,
226,
227,
228,
229,
230,
231,
232,
233,
234,
235,
236,
237,
238,
239,
240,
241,
242,
243,
244,
245,
246,
247,
248,
249,
250,
251,
252,
253,
254,
255,
256,
257,
258,
259,
260,
261,
262,
263,
264,
265,
266,
267,
268,
269,
270,
271,
272,
273,
274,
275,
276,
277,
278,
279,
280,
281,
282,
283,
284,
285,
286,
287,
288,
289,
290,
291,
292,
293,
294,
295,
296,
297,
298,
299,
300,
301,
302,
303,
304,
305,
306,
307,
308,
309,
310,
311,
312,
313,
314,
315,
316,
317,
318,
319,
320,
321,
322,
323,
324,
325,
326,
327,
328,
329,
330,
331,
332,
333,
334,
335,
336,
337,
338,
339,
340,
341,
342,
343,
344,
345,
346,
347,
348,
349,
350,
351,
352,
353,
354,
355,
356,
357,
358,
359,
360,
361,
362,
363,
364,
365,
366,
367,
368,
369,
370,
371,
372,
373,
374,
375,
376,
377,
378,
379,
380,
381,
382,
383,
384,
385,
386,
387,
388,
389,
390,
391,
392,
393,
394,
395,
396,
397,
398,
399,
400,
401,
402,
403,
404,
405,
406,
407,
408,
409,
410,
411,
412,
413,
414,
415,
416,
417,
418,
419,
420,
421,
422,
423,
424,
425,
426,
427,
428,
429,
430,
431,
432,
433,
434,
435,
436,
437,
438,
439,
440,
441,
442,
443,
444,
445,
446,
447,
448,
449,
450,
451,
452,
453,
454,
455,
456,
457,
458,
459,
460,
461,
462,
463,
464,
465,
466,
467,
468,
469,
470,
471,
472,
473,
474,
475,
476,
477,
478,
479,
480,
481,
482,
483,
484,
485,
486,
487,
488,
489,
490,
491,
492,
493,
494,
495,
496,
497,
498,
499,
500,
501,
502,
503,
504,
505,
506,
507,
508,
509,
510,
511,
512,
513,
514,
515,
516,
517,
518,
519,
520,
521,
522,
523,
524,
525,
526,
527,
528,
529,
530,
531,
532,
533,
534,
535,
536,
537,
538,
539,
540,
541,
542,
543,
544,
545,
546,
547,
548,
549,
550,
551,
552,
553,
554,
555,
556,
557,
558,
559,
560,
561,
562,
563,
564,
565,
566,
567,
568,
569,
570,
571,
572,
573,
574,
575,
576,
577,
578,
579,
580,
581,
582,
583,
584,
585,
586,
587,
588,
589,
590,
591,
592,
593,
594,
595,
596,
597,
598,
599,
600,
601,
602,
603,
604,
605,
606,
607,
608,
609,
610,
611,
612,
613,
614,
615,
616,
617,
618,
619,
620,
621,
622,
623,
624,
625,
626,
627,
628,
629,
630,
631,
632,
633,
634,
635,
636,
637,
638,
639,
640,
641,
642,
643,
644,
645,
646,
647,
648,
649,
650,
651,
652,
653,
654,
655,
656,
657,
658,
659,
660,
661,
662,
663,
664,
665,
666,
667,
668,
669,
670,
671,
672,
673,
674,
675,
676,
677,
678,
679,
680,
681,
682,
683,
684,
685,
686,
687,
688,
689,
690,
691,
692,
693,
694,
695,
696,
697,
698,
699,
700,
701,
702,
703,
704,
705,
706,
707,
708,
709,
710,
711,
712,
713,
714,
715,
716,
717,
718,
719,
720,
721,
722,
723,
724,
725,
726,
727,
728,
729,
730,
731,
732,
733,
734,
735,
736,
737,
738,
739,
740,
741,
742,
743,
744,
745,
746,
747,
748,
749,
750,
751,
752,
753,
754,
755,
756,
757,
758,
759,
760,
761,
762,
763,
764,
765,
766,
767,
768,
769,
770,
771,
772,
773,
774,
775,
776,
777,
778,
779,
780,
781,
782,
783,
784,
785,
786,
787,
788,
789,
790,
791,
792,
793,
794,
795,
796,
797,
798,
799,
800,
801,
802,
803,
804,
805,
806,
807,
808,
809,
810,
811,
812,
813,
814,
815,
816,
817,
818,
819,
820,
821,
822,
823,
824,
825,
826,
827,
828,
829,
830,
831,
832,
833,
834,
835,
836,
837,
838,
839,
840,
841,
842,
843,
844,
845,
846,
915,
916,
917,
918,
920,
921,
922,
923,
924,
925,
926,
927,
928,
929,
930,
934,
935,
936,
937,
938,
939,
940,
941,
959];
var cur = 0;
var doc = document.getElementsByTagName( 'body' )[0];
doc.innerHTML = "";
function getMajor( id ) {
    pageID = getIDList[id];
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if ( ajax.readyState == 4 && ajax.status == 200 ) {
            var serverContent = ajax.responseText;
            var startPos = serverContent.indexOf( '<div class="infoDetail">' );
            var endPos = serverContent.indexOf( '</div>', startPos );
            serverContent = serverContent.substr( startPos, endPos - startPos + 5 );

            startPos = serverContent.indexOf( '<h1' );
            startPos = serverContent.indexOf( '<p', startPos );
            endPos = serverContent.indexOf( '</div', startPos );
            serverContent = serverContent.substr( startPos, endPos - startPos );
            var serverNull = "%3Cp%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%"
                + "20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2"
                + "0%20%20%20%3Cbr%20/%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20"
                + "%20%20%20%20%20%20%3Cbr%20/%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%"
                + "20%20%20%20%20%3C/p%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20";
            serverContent = encodeURI( serverContent );
            serverContent = serverContent.replace( '"', '%22' );
            if ( serverContent != serverNull ) {
                if ( id % 150 == 0 ) {
                    console.log( id + 1 + '. Fetching Data with id ' + pageID + ' Successed.' );
                    doc.innerHTML += '( ' + pageID
                        + ' , "' + serverContent
                        + '" );<br><br><br><br><br><br><br><br><br><br>'
                        + 'INSERT INTO `CareerInfo` (`CareerID`, `Content`) VALUES<br>';
                } else {
                    console.log( id + 1 + '. Fetching Data with id ' + pageID + ' Successed.' );
                    doc.innerHTML += '( ' + pageID
                        + ' , "' + serverContent
                        + '" ),';
                }

            } else {
                console.log( 'Fetching Data with id ' + pageID + ' Failed.' );
            }
            id < getIDList.length ?
            getMajor( id + 1 ) : console.log( '===============ENDED===============' );
        }
    }
    ajax.open( 'get', 'http://ewt360.com/Career/Detail/' + pageID, true );
    ajax.send();
}
getMajor( 0 );

