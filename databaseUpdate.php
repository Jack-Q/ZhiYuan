<?php
    
    require_once('databaseConfiguration.php');
    $errorOccurance=FALSE;
    
    $correntID=1;//+1000*intval($_GET[offset]);
    $databaseConnection;
    $wenliType;
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
    function year2yearType($yearStr){
	
        switch ($yearStr) {
            case '2013' : return 2;
            case '2012' : return 3;
            case '2011' : return 4;
            default : return 0;
        }
    }
	function getAdmissionLine($year,$pc){
        global $wenliType;
		if(!$wenliType){
			switch($year){
				case '2' : //2013
					return $pc=='1'?493:440;
					break;
				case '3' : //2012
					return $pc=='1'?530:476;
					break;
				case '4' : //2011
					return $pc=='1'?570:520;
					break;
				default:
					return 0;
			}
		}else{
			switch($year){
				case '2' : //2013
					return $pc=='1'?507:459;
					break;
				case '3' : //2012
					return $pc=='1'?539:492;
					break;
				case '4' : //2011
					return $pc=='1'?543:496;
					break;
				default:
					return 0;
			}
		}
	}
	function calcDelta($score ,$year){
		$year=year2yearType($year);
		$score = intval($score);
		if($score>=getAdmissionLine($year,'1')){
			return 1000+($score-getAdmissionLine($year,'1'));
		}elseif($score>=getAdmissionLine($year,'2')){
			return 2000+($score-getAdmissionLine($year,'2'));
		}else{
			return -1;
		}
	}
    connectDatabase();
    $looptime=0;
    while($errorOccurance==FALSE){
        $queryStr='SELECT * FROM `AdmitInfo` WHERE ID = '.$correntID;
        $result=mysql_query($queryStr,$databaseConnection);
        if(!$result){
            $errorOccurance=TRUE;
        }
        $RowLine=mysql_fetch_row($result);
        $wenliType=$RowLine[5]==='W'?TRUE:FALSE;
		$delta=calcDelta($RowLine[3],$RowLine[8]);
        $queryStr='UPDATE admitinfo SET Delta ='.$delta.' WHERE ID = '.$correntID;
        $correntID++;
        echo $queryStr+";\n";
    }

    closeDatabase();

?>