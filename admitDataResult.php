﻿<?php
    require_once('databaseConfiguration.php');
    $errorOccurance=FALSE;
    $selectType;
    $yearType;
    $briefDescription;
    $dataRows;
    $dataConut;
    $databaseConnection;
    $wenliType=isset($_REQUEST['typeWL'])
        &&(!empty($_REQUEST['typeWL']))
        &&($_REQUEST['typeWL']=='1');
    if($wenliType){
        $wenliType=TRUE;
    }else{
        $wenliType=FALSE;
    }
    $pageOffset=isset($_GET['offset'])
        &&(!empty($_GET['offset']))
        &&(intval(trim($_GET['offset'])));
    if($pageOffset){
        $pageOffset=intval(trim($_GET['offset']));
    }else{
        $pageOffset=1;
    }
    
    function curPageURL() {
        $pageURL = 'http';
        if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
            $pageURL .= "://";
        if ($_SERVER["SERVER_PORT"] != "80") {
            $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
        } else {
            $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
        }
        return $pageURL;
    }
    function connectDatabase(){
        global $databaseConnection;
        $databaseConnection=mysql_connect(DATABASE_HOST,DATABASE_USER, DATABASE_PASSWORD);
        if (!$databaseConnection)
        {
            echo('Oops ! Run into error ! ');
            echo('<br /> So sorry for the for the inconvenience caused by database error.');
            die("Database selection failed: " . $databaseConnection->connect_error);
        }
        mysql_select_db(DATABASE_NAME, $databaseConnection);
    }
    function closeDatabase(){
        global $databaseConnection;
        mysql_close($databaseConnection);
        
    }
    function wenli2String(){
        global $wenliType;
        if($wenliType){
            return '文';
        }else{
            return '理';
        }
    }
    function typePC2wordPC($typePC){
        switch($typePC){
            case 'Pre':
                return '提前批';
            case 'One':
                return '第一批';
            case 'Two':
                return '第二批';
            case 'Thr':
                return '第三批';
            default:
                return '';
        }
    }
    function year2yearType($yearStr){
        switch ($yearStr) {
            case '2013' : return 2;
            case '2012' : return 3;
            case '2011' : return 4;
            default : return 0;
        }
    }
    function fillHTMLRow($RowLine,$line){
        echo '<tr><td>'.($line+1).'</td>'; 
        echo '<td><a href="admitDataResult.php?queryType=1&typeWL='.($wenliType?1:0).'&queryYear=0&SchoolName='
            .urlencode($RowLine[0]).'">'.$RowLine[0].'<div class="resultTooltip1">查看近三年'
			.$RowLine[0].wenli2String().'科考生录取情况</div></a></td>';
        echo '<td><a href="admitDataResult.php?queryType=3&typeWL='.($wenliType?1:0).'&queryYear=0&SchoolName='
            .urlencode($RowLine[0]).'&MajorName='.urlencode($RowLine[1]).'">'.$RowLine[1]
			.'<div class="resultTooltip2">查看近三年'.$RowLine[0]
			.$RowLine[1].'专业考生录取情况</div></a></td>';
        echo '<td>'.$RowLine[2].'</td>';
        echo '<td>'.$RowLine[3].'</td>';
        echo '<td>'.$RowLine[4].'</td>';
        if($RowLine[7]=='Pre'){
            echo '<td><a href="admitDataResult.php?queryType=4&queryYear='
                .year2yearType($RowLine[8]).'&typeWL='.($wenliType?1:0).'">'.typePC2wordPC($RowLine[7])
				.'<div class="resultTooltip3">查看'.$RowLine[8].'年'
                .wenli2String().'科提前批次录取情况</div></a></td>';
        }else{
            echo '<td>'.typePC2wordPC($RowLine[7]).'</td>';
        }
        echo '<td>'.$RowLine[8].'</td></tr>';
    }
    function fetchDataByScore($lowerBnd,$upperBnd,$yearInd){
        global $databaseConnection;
        global $errorOccurance;
        global $dataConut;
        global $dataRows;
        global $briefDescription;
        global $wenliType;
        $YEAR_STR;
        $queryStr='SELECT * FROM AdmitInfo WHERE ( Score BETWEEN ';
        $queryStr.=$lowerBnd.' AND '.$upperBnd;
        $queryStr.=' ) AND ';
        switch($yearInd){
            case '0':
                $YEAR_STR='近三';
                $queryStr.='( Year BETWEEN 2011 AND 2013 )';
                break;
            case '1':
                $YEAR_STR='近两';
                $queryStr.='( Year BETWEEN 2012 AND 2013 )';
                break;
            case '2':
                $YEAR_STR='2013';
                $queryStr.='( Year = 2013 )';
                break;
            case '3':
                $YEAR_STR='2012';
                $queryStr.='( Year = 2012 )';
                break;
            case '4':
                $YEAR_STR='2011';
                $queryStr.='( Year = 2011 )';
                break;
            default:
                $YEAR_STR='';
                $errorOccurance=TRUE;
        }
        $queryStr.=$wenliType?'AND ( TypeWL = "W") ':'AND ( TypeWL = "L") ';
        $queryStr.=' ORDER BY Score DESC , Year DESC';
        $result=mysql_query($queryStr,$databaseConnection);
        if(!$result){
            $errorOccurance=TRUE;
            return;
        }
        $dataConut=mysql_num_rows($result);
        $dataRows=$result;
        $briefDescription='检索'.$YEAR_STR.'年分数在'.$lowerBnd.'到'
            .$upperBnd.'的考生('.wenli2String().'科)录取考生录取信息,';
        if($dataConut==0){
            $briefDescription.='未检索到结果。';
        }else{
            $briefDescription.='检索到'.$dataConut.'个结果。';
        }
    }
    function fetchDataBySchool($school,$yearInd){
        global $databaseConnection;
        global $errorOccurance;
        global $dataConut;
        global $dataRows;
        global $briefDescription;
        global $wenliType;
        $YEAR_STR;
        $queryStr='SELECT * FROM AdmitInfo WHERE ( College = "';
        $queryStr.=$school;
        $queryStr.='" ) AND ';
        switch($yearInd){
            case '0':
                $YEAR_STR='近三';
                $queryStr.='( Year BETWEEN 2011 AND 2013 )';
                break;
            case '1':
                $YEAR_STR='近两';
                $queryStr.='( Year BETWEEN 2012 AND 2013 )';
                break;
            case '2':
                $YEAR_STR='2013';
                $queryStr.='( Year = 2013 )';
                break;
            case '3':
                $YEAR_STR='2012';
                $queryStr.='( Year = 2012 )';
                break;
            case '4':
                $YEAR_STR='2011';
                $queryStr.='( Year = 2011 )';
                break;
            default:
                $YEAR_STR='';
                $errorOccurance=TRUE;
        }
        $queryStr.=$wenliType?'AND ( TypeWL = "W") ':'AND ( TypeWL = "L") ';
        $queryStr.=' ORDER BY Rank , Year DESC';
        $result=mysql_query($queryStr,$databaseConnection);
        if(!$result){
            $errorOccurance=TRUE;
            return;
        }
        $dataConut=mysql_num_rows($result);
        $dataRows=$result;
        $briefDescription='检索'.$YEAR_STR.'年'.$school.'考生('.wenli2String().'科)录取考生录取信息,';
        if($dataConut==0){
            $briefDescription.='未检索到结果。';
        }else{
            $briefDescription.='检索到'.$dataConut.'个结果。';
        }
    }
    function fetchDataByRank($lowerBnd,$upperBnd,$yearInd){
        global $databaseConnection;
        global $errorOccurance;
        global $dataConut;
        global $dataRows;
        global $briefDescription;
        global $wenliType;
        $YEAR_STR;
        $queryStr='SELECT * FROM AdmitInfo WHERE ( Rank BETWEEN ';
        $queryStr.=$lowerBnd.' AND '.$upperBnd;
        $queryStr.=' ) AND ';
        switch($yearInd){
            case '0':
                $YEAR_STR='近三';
                $queryStr.='( Year BETWEEN 2011 AND 2013 )';
                break;
            case '1':
                $YEAR_STR='近两';
                $queryStr.='( Year BETWEEN 2012 AND 2013 )';
                break;
            case '2':
                $YEAR_STR='2013';
                $queryStr.='( Year = 2013 )';
                break;
            case '3':
                $YEAR_STR='2012';
                $queryStr.='( Year = 2012 )';
                break;
            case '4':
                $YEAR_STR='2011';
                $queryStr.='( Year = 2011 )';
                break;
            default:
                $YEAR_STR='';
                $errorOccurance=TRUE;
        }
        $queryStr.=$wenliType?'AND ( TypeWL = "W") ':'AND ( TypeWL = "L") ';
        $queryStr.=' ORDER BY Rank , Year DESC';
        $result=mysql_query($queryStr,$databaseConnection);
        if(!$result){
            $errorOccurance=TRUE;
            return;
        }
        $dataConut=mysql_num_rows($result);
        $dataRows=$result;
        $briefDescription='检索'.$YEAR_STR.'年全省排名在'.$lowerBnd.'到'
            .$upperBnd.'的考生('.wenli2String().'科)录取考生录取信息,';
        if($dataConut==0){
            $briefDescription.='未检索到结果。';
        }else{
            $briefDescription.='检索到'.$dataConut.'个结果。';
        }
    }
    function fetchDataBySchoolAndMajor($school,$major,$yearInd){
        global $databaseConnection;
        global $errorOccurance;
        global $dataConut;
        global $dataRows;
        global $briefDescription;
        global $wenliType;
        $YEAR_STR;
        $queryStr='SELECT * FROM AdmitInfo WHERE ( College = "';
        $queryStr.=$school;
        $queryStr.='" ) AND ( Major ="';
        $queryStr.=$major;
        $queryStr.='" ) AND ';
        switch($yearInd){
            case '0':
                $YEAR_STR='近三';
                $queryStr.='( Year BETWEEN 2011 AND 2013 )';
                break;
            case '1':
                $YEAR_STR='近两';
                $queryStr.='( Year BETWEEN 2012 AND 2013 )';
                break;
            case '2':
                $YEAR_STR='2013';
                $queryStr.='( Year = 2013 )';
                break;
            case '3':
                $YEAR_STR='2012';
                $queryStr.='( Year = 2012 )';
                break;
            case '4':
                $YEAR_STR='2011';
                $queryStr.='( Year = 2011 )';
                break;
            default:
                $YEAR_STR='';
                $errorOccurance=TRUE;
        }
        $queryStr.=$wenliType?'AND ( TypeWL = "W") ':'AND ( TypeWL = "L") ';
        $queryStr.=' ORDER BY Year DESC , Rank';
        $result=mysql_query($queryStr,$databaseConnection);
        if(!$result){
            $errorOccurance=TRUE;
            return;
        }
        $dataConut=mysql_num_rows($result);
        $dataRows=$result;
        $briefDescription='检索'.$YEAR_STR.'年'.$school.$major.'专业考生录取信息,';
        if($dataConut==0){
            $briefDescription.='未检索到结果。';
        }else{
            $briefDescription.='检索到'.$dataConut.'个结果。';
        }
    }
    function fetchDataByPreAdmissionYear($yearInd){        
        global $databaseConnection;
        global $errorOccurance;
        global $dataConut;
        global $dataRows;
        global $briefDescription;
        global $wenliType;
        $YEAR_STR;
        $queryStr='SELECT * FROM AdmitInfo WHERE ( TypePC = "Pre" ) AND ';
        switch($yearInd){
            case '0':
                $YEAR_STR='近三';
                $queryStr.='( Year BETWEEN 2011 AND 2013 )';
                break;
            case '1':
                $YEAR_STR='近两';
                $queryStr.='( Year BETWEEN 2012 AND 2013 )';
                break;
            case '2':
                $YEAR_STR='2013';
                $queryStr.='( Year = 2013 )';
                break;
            case '3':
                $YEAR_STR='2012';
                $queryStr.='( Year = 2012 )';
                break;
            case '4':
                $YEAR_STR='2011';
                $queryStr.='( Year = 2011 )';
                break;
            default:
                $YEAR_STR='';
                $errorOccurance=TRUE;
        }
        $queryStr.=$wenliType?' AND ( TypeWL = "W") ':'AND ( TypeWL = "L") ';
        $queryStr.=' ORDER BY Rank , Year DESC';
        $result=mysql_query($queryStr,$databaseConnection);
        if(!$result){
            $errorOccurance=TRUE;
            return;
        }
        $dataConut=mysql_num_rows($result);
        $dataRows=$result;
        $briefDescription='检索'.$YEAR_STR.'年提前批次'.wenli2String().'科考生录取信息,';
        if($dataConut==0){
            $briefDescription.='未检索到结果。';
        }else{
            $briefDescription.='检索到'.$dataConut.'个结果。';
        }
    }
    if(isset($_GET['queryType'])){
        $selectType=$_GET['queryType'];
        switch ($selectType){
            case '0':
                //By Score
                if(isset($_GET['queryYear'],$_GET['lowerBound'],$_GET['upperBound'])){
                    $lowerBound=intval(trim($_GET['lowerBound']));
                    $upperBound=intval(trim($_GET['upperBound']));
                    $yearType=$_GET['queryYear'];
                    if(!($lowerBound>$upperBound)){
                        connectDatabase();
                        fetchDataByScore($lowerBound,$upperBound,$yearType);
                        closeDataBase();
                    }else{
                        $errorOccurance=TRUE;
                    }
                }else{
                    $errorOccurance=TRUE;
                }
                break;
            case '1':
                //By School
                if(isset($_GET['queryYear'],$_GET['SchoolName'])&&!empty($_GET['SchoolName'])){
                    $school=trim($_GET['SchoolName']);
                    $yearType=$_GET['queryYear'];
                    if($school){
                        connectDatabase();
                        fetchDataBySchool($school,$yearType);
                        closeDataBase();
                    }else{
                        $errorOccurance=TRUE;
                    }                    
                }else{
                    $errorOccurance=TRUE;
                }
                break;
            case '2':
                //By Rank
                if(isset($_GET['queryYear'],$_GET['lowerBound'],$_GET['upperBound'])){
                    $lowerBound=intval(trim($_GET['lowerBound']));
                    $upperBound=intval(trim($_GET['upperBound']));
                    $yearType=$_GET['queryYear'];
                    if(!($lowerBound>$upperBound)){
                        connectDatabase();
                        fetchDataByRank($lowerBound,$upperBound,$yearType);
                        closeDataBase();
                    }else{
                        $errorOccurance=TRUE;
                    }                    
                }else{
                    $errorOccurance=TRUE;
                }
                break;
            case '3':
                //By School & Major
                if(isset($_GET['queryYear'],$_GET['SchoolName'],$_GET['MajorName'])
                    &&!empty($_GET['SchoolName'])
                    &&!empty($_GET['MajorName'])){
                    $school=trim($_GET['SchoolName']);
                    $major=trim($_GET['MajorName']);
                    $yearType=$_GET['queryYear'];
                    if($school&&$major){
                        connectDatabase();
                        fetchDataBySchoolAndMajor($school,$major,$yearType);
                        closeDataBase();
                    }else{
                        $errorOccurance=TRUE;
                    }                    
                }else{
                    $errorOccurance=TRUE;
                }
                break;
            case '4':
                //By Pre Admission Year
                if(isset($_GET['queryYear'])){
                    $yearType=$_GET['queryYear'];
                    connectDatabase();
                    fetchDataByPreAdmissionYear($yearType);
                    closeDataBase();
                }else{
                    $errorOccurance=TRUE;
                }
                break;

            default:
            $errorOccurance=TRUE;
        }
    }else{
        $errorOccurance=TRUE;
    }


?>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ansi" />
    <title>历年高校录取情况查询结果</title>
    <meta charset="utf-8" />
    <link href="css/admitDataResult.css" rel="stylesheet" />
    <?php include('header.php');?>
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
            <div>历年高校录取情况查询结果<sup style="font-size: 0.4em; color: #4af; -ms-word-wrap: break-word; word-wrap: break-word;">beta</sup></div>
        </div>
        <div class="queryResult">
            <?php
                if($errorOccurance){
            ?>
            <div class="errorResult">
                <p style="font-size:2.7em;text-indent:1em;margin-bottom:35px;">:(</p>
                <p> Sorry！解析您的请求时出错了...</p>
            </div>
            <?php
                }else{
            ?>
            <div class="successResult">
                <div class="briefDescription">
                    <?php echo $briefDescription; ?>
                </div>
                <div id="detialResult">
                    <?php
                        if(!$dataConut>0){
                    ?>
                    <div class="resultNotFound">
                        <p style="font-size:2.7em;text-indent:1em;margin-bottom:35px;margin-top:0;">:(</p>
                        <p> 没有找到符合要求的结果。</p>
                    </div>
                    <?php        
                        }elseif($dataConut>15){
                    ?>
                    <table id="resultTable" cellspacing="0" >
                        <thead>
                            <tr>
                                <td width="5%">序号</td>
                                <td width="30%">学校</td>
                                <td width="25%">专业</td>
                                <td width="9%">全省排名</td>
                                <td width="5%">分数</td>
                                <td width="3%"><abbr title="本位次录取人数">人数</abbr></td>
                                <td width="8%">批次</td>
                                <td width="5%">年份</td>
                            </tr>
                        </thead>
                        <tbody>
                        <?php
                            
                            $pagesCount=ceil($dataConut/15);
                            
                            if($pageOffset>1&&$pageOffset<=$pagesCount){
                                $minRow=15*$pageOffset-15;
                                $maxRow=15*$pageOffset<$dataConut?15*$pageOffset:$dataConut;
                                for($i=0;$i<$maxRow;$i++){
                                    $row=mysql_fetch_row($dataRows);
                                    if($i>=$minRow){
                                        fillHTMLRow($row,$i);
                                    }
                                }
                            }else{
                                for($i=0;$i<15;$i++){
                                    $row=mysql_fetch_row($dataRows);
                                    fillHTMLRow($row,$i);
                                }
                            }
                                                            
                        ?>
                        </tbody>
                    </table>
                    <?php        
                        }else{
                    ?>
                    <table id="resultTable" cellspacing="0" >
                        <thead>
                            <tr>
                                <td width="5%">序号</td>
                                <td width="30%">学校</td>
                                <td width="25%">专业</td>
                                <td width="9%">全省排名</td>
                                <td width="5%">分数</td>
                                <td width="3%"><abbr title="本位次录取人数">人数</abbr></td>
                                <td width="8%">批次</td>
                                <td width="5%">年份</td>
                            </tr>
                        </thead>
                        <tbody>
                        <?php
                            for($i=0;$i<$dataConut;$i++){
                                $row=mysql_fetch_row($dataRows);
                                fillHTMLRow($row,$i);
                            }                                
                        ?>
                        </tbody>
                    </table>
                    <?php        
                        }
                    ?>
                </div>
                <div class="pageNavBox">
                <?php
                    if($dataConut>15){
                        $pagesCount=ceil($dataConut/15);
                        $curURL=curPageURL();
                        $curURL_offsetPos=strpos($curURL,'offset');
                        if($curURL_offsetPos===FALSE){
                            $newURLBase=$curURL.'&offset=';
                        }else{
                            $curURL_hashPos=strpos($curURL,'&',$curURL_offsetPos);
                            if($curURL_hashPos==FALSE){
                                $newURLBase=substr($curURL,0,strpos($curURL,'=',$curURL_offsetPos)+1);
                            }else{
                                $newURLBase_Part1=substr($curURL,0,$curURL_offsetPos);
                                $newURLBase_Part2=substr($curURL,$curURL_hashPos+1,strlen($curURL));
                                $newURLBase=$newURLBase_Part1.$newURLBase_Part2.'&offset=';
                            }
                        }
                ?>
                    <div class="pageNavNums">
                        <?php
                            if($pagesCount<=7){
                                if($pageOffset==1){
                                    //First Page
                                    for($i=1;$i<=$pagesCount;$i++){
                                        if($i===$pageOffset){
                                            echo '<span class="pageNavNums-on">'.$i.'</span>';
                                        }else{
                                            echo '<span><a href="'.$newURLBase.$i.'">'.$i.'</a></span>';
                                        }
                                    }
                                    echo '<span title="下一页"><a href="'.$newURLBase.($pageOffset+1).'">&gt;</a></span>';
                                }elseif($pageOffset==$pagesCount){
                                    //Last Page
                                    echo '<span title="上一页"><a href="'.$newURLBase.($pageOffset-1).'">&lt;</a></span>';
                                    for($i=1;$i<=$pagesCount;$i++){
                                        if($i===$pageOffset){
                                            echo '<span class="pageNavNums-on">'.$i.'</span>';
                                        }else{
                                            echo '<span><a href="'.$newURLBase.$i.'">'.$i.'</a></span>';
                                        }
                                    }
                                }else{
                                    echo '<span title="上一页"><a href="'.$newURLBase.($pageOffset-1).'">&lt;</a></span>';
                                    for($i=1;$i<=$pagesCount;$i++){
                                        if($i===$pageOffset){
                                            echo '<span class="pageNavNums-on">'.$i.'</span>';
                                        }else{
                                            echo '<span><a href="'.$newURLBase.$i.'">'.$i.'</a></span>';
                                        }
                                    }
                                    echo '<span title="下一页"><a href="'.$newURLBase.($pageOffset+1).'">&gt;</a></span>';
                                }
                            }else{
                                if($pageOffset==1){
                                    echo '<span class="pageNavNums-on">1</span>';
                                    echo '<span><a href="'.$newURLBase.'2">2</a></span>';
                                    echo '<span><a href="'.$newURLBase.'3">3</a></span>';
                                    echo '<span><a href="'.$newURLBase.'4">4</a></span>';
                                    echo '<span><a href="'.$newURLBase.'5">5</a></span>';
                                    echo '<span>...</span>';
                                    echo '<span><a href="'.$newURLBase.$pagesCount.'">'.$pagesCount.'</a></span>';
                                    echo '<span title="下一页"><a href="'.$newURLBase.($pageOffset+1).'">&gt;</a></span>';
                                }elseif($pageOffset==$pagesCount){
                                    echo '<span title="上一页"><a href="'.$newURLBase.($pageOffset-1).'">&lt;</a></span>';
                                    echo '<span><a href="'.$newURLBase.'1">1</a></span>';
                                    echo '<span>...</span>';
                                    echo '<span><a href="'.$newURLBase.($pagesCount-4).'">'.($pagesCount-4).'</a></span>';
                                    echo '<span><a href="'.$newURLBase.($pagesCount-3).'">'.($pagesCount-3).'</a></span>';
                                    echo '<span><a href="'.$newURLBase.($pagesCount-2).'">'.($pagesCount-2).'</a></span>';
                                    echo '<span><a href="'.$newURLBase.($pagesCount-1).'">'.($pagesCount-1).'</a></span>';
                                    echo '<span class="pageNavNums-on">'.$pagesCount.'</span>';
                                }elseif($pageOffset<=4){
                                    echo '<span title="上一页"><a href="'.$newURLBase.($pageOffset-1).'">&lt;</a></span>';
                                    echo '<span><a href="'.$newURLBase.'1">1</a></span>';
                                    
                                    echo $pageOffset==2?'<span class="pageNavNums-on">2</span>':'<span><a href="'.$newURLBase.'2">2</a></span>';
                                    echo $pageOffset==3?'<span class="pageNavNums-on">3</span>':'<span><a href="'.$newURLBase.'3">3</a></span>';
                                    echo $pageOffset==4?'<span class="pageNavNums-on">4</span>':'<span><a href="'.$newURLBase.'4">4</a></span>';

                                    echo '<span><a href="'.$newURLBase.'5">5</a></span>';
                                    echo '<span>...</span>';
                                    echo '<span><a href="'.$newURLBase.$pagesCount.'">'.$pagesCount.'</a></span>';
                                    echo '<span title="下一页"><a href="'.$newURLBase.($pageOffset+1).'">&gt;</a></span>';
                                    
                                }elseif($pageOffset>=$pagesCount-3){
                                    echo '<span title="上一页"><a href="'.$newURLBase.($pageOffset-1).'">&lt;</a></span>';
                                    echo '<span><a href="'.$newURLBase.'1">1</a></span>';
                                    echo '<span>...</span>';
                                    echo '<span><a href="'.$newURLBase.($pagesCount-4).'">'.($pagesCount-4).'</a></span>';

                                    echo $pageOffset==($pagesCount-3)?'<span class="pageNavNums-on">'.($pagesCount-3).'</span>'
                                        :'<span><a href="'.$newURLBase.($pagesCount-3).'">'.($pagesCount-3).'</a></span>';
                                    echo $pageOffset==($pagesCount-2)?'<span class="pageNavNums-on">'.($pagesCount-2).'</span>'
                                        :'<span><a href="'.$newURLBase.($pagesCount-2).'">'.($pagesCount-2).'</a></span>';
                                    echo $pageOffset==($pagesCount-1)?'<span class="pageNavNums-on">'.($pagesCount-1).'</span>'
                                        :'<span><a href="'.$newURLBase.($pagesCount-1).'">'.($pagesCount-1).'</a></span>';
                                    
                                    echo '<span><a href="'.$newURLBase.$pagesCount.'">'.$pagesCount.'</a></span>';
                                    echo '<span title="下一页"><a href="'.$newURLBase.($pageOffset+1).'">&gt;</a></span>';
                                    
                                }else{
                                    echo '<span title="上一页"><a href="'.$newURLBase.($pageOffset-1).'">&lt;</a></span>';
                                    echo '<span><a href="'.$newURLBase.'1">1</a></span>';
                                    echo '<span>...</span>';
                                    echo '<span><a href="'.$newURLBase.($pageOffset-1).'">'.($pageOffset-1).'</a></span>';
                                    echo '<span class="pageNavNums-on">'.$pageOffset.'</span>';
                                    echo '<span><a href="'.$newURLBase.($pageOffset+1).'">'.($pageOffset+1).'</a></span>';
                                    echo '<span>...</span>';
                                    echo '<span><a href="'.$newURLBase.$pagesCount.'">'.$pagesCount.'</a></span>';
                                    echo '<span title="下一页"><a href="'.$newURLBase.($pageOffset+1).'">&gt;</a></span>';
                                }
                            }
                        ?>
                    </div>
                    <div class="pageNavDis">
                        每页15个结果，共<?php
                            echo $pagesCount;
                        ?>页。
                    </div>
                <?php
                    }
                ?>
                </div>
            </div>
            <?php
                }
            ?>
        </div>
    </div>
    
    <?php include('footer.php')?>
</body>
</html>
