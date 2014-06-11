<?php
    //http://localhost:51073/admitDataResult.php?queryType=0&queryYear=0&lowerBound=500&upperBound=152
    //http://localhost:51073/admitDataResult.php?queryType=1&queryYear=1&SchoolName=%E5%AE%89%E5%BE%BD%E5%86%9C%E4%B8%9A%E5%A4%A7%E5%AD%A6
    //http://localhost:51073/admitDataResult.php?queryType=2&queryYear=0&lowerBound=578&upperBound=255
    $errorOccurance=FALSE;
    $selectType;
    if(isset($_GET[queryType])){
        $selectType=$_GET[queryType];
        echo $_GET[queryType];
    }else{
        $errorAccurance=TRUE;
    }
?>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ansi" />
    <title>历年高校录取情况查询结果</title>
    <meta charset="utf-8" />
    <link href="css/admitDataResult.css" rel="stylesheet" />
</head>
<body>
    <div class="mainContainer">
        <div class="titleArea">
            <div>
                <a href="admitDataQuery.php" style="border:none;">
                    <svg viewBox="-5 -5 110 110" width="70" height="70" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000" stroke="#000" transform="matrix(-1 0 0 -1 100 100)"
                              d="M 49.728 100 C 28.272 100 8.345 85.217 2.348 64.838 C -1.614 53.198 -0.53 39.666 5.361 27.793 C 11.253 15.891 21.388 6.811 33.167 2.882 C 38.436 0.976 44.086 0 49.905 0 C 62.263 0 74.345 4.543 83.062 12.456 C 97.088 24.541 103.244 44.73 98.323 62.661 C 93.491 82.001 76.3 97.161 56.523 99.484 C 54.34 99.825 52.037 100 49.728 100 Z M 49.905 3.873 C 44.537 3.873 39.323 4.771 34.428 6.541 C 23.582 10.157 14.262 18.526 8.825 29.514 C 3.397 40.468 2.384 52.916 6.036 63.664 C 11.49 82.206 30.263 96.132 49.727 96.132 C 51.833 96.132 53.937 95.967 55.998 95.648 C 74.282 93.5 90.115 79.534 94.581 61.676 C 99.124 45.116 93.455 26.52 80.493 15.356 C 72.453 8.045 61.323 3.873 49.905 3.873 Z"></path>
                        <path fill="#000" stroke="#000" transform="matrix(-1 0 0 -1 100 100)"
                              d="M 24.78 54.784 C 24.78 51.559 24.78 48.326 24.78 45.068 C 35.779 45.082 46.767 45.082 57.777 45.082 C 52.942 40.465 48.02 35.918 43.251 31.237 C 47.393 31.378 51.603 30.906 55.708 31.616 C 62.487 37.429 68.811 43.776 75.271 49.94 C 68.589 56.208 62.006 62.6 55.235 68.775 C 51.185 68.774 47.135 68.775 43.082 68.775 C 47.827 63.946 52.828 59.369 57.778 54.731 C 46.768 54.802 35.779 54.73 24.78 54.784 Z"></path>
                    </svg>
                </a>
            </div>
            <div>
                历年高校录取情况查询结果
            </div>
        </div>
        <div class="queryResult">
            <?php
                if($errorOccurance){
                    
                }else{
                    $returnStr='<div class="errorResult">'
                    .'<p style="font-size:2.7em;text-indent:1em;margin-bottom:35px;">'
                    .':(</p><p> Oops! An error occured while<br /> prasing your query.</p></div>';
                    echo $returnStr;
                }
            ?>
            <div class="successResult">
                <div class="briefDescription">
                    检索近三年分数在{1}到{2}的考生录取信息，找到{n}个结果。
                    检索2012年分数在{1}到{2}的考生录取信息，找到{n}个结果。
                    检索近三年全省排名在{1}到{2}的考生录取信息，找到{n}个结果。
                    检索近三年{university}考生录取信息，找到{n}个结果。
                </div>
                <div id="detialResult">
                    <table id="resultTable" cellspacing="0" >
                        <thead>
                            <tr>
                                <td width="5%">序号</td>
                                <td width="30%">学校</td>
                                <td width="20%">专业</td>
                                <td width="10%">全省排名</td>
                                <td width="5%">分数</td>
                                <td width="5%"><abbr title="本位次录取人数">人数</abbr></td>
                                <td width="10%">批次</td>
                                <td width="5%">年份</td>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
