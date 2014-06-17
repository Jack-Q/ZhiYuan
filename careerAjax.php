<?php
//Major Information Getter
require_once('databaseConfiguration.php');
$databaseConnection;
function connectDatabase(){
    global $databaseConnection;
    $databaseConnection=mysql_connect(DATABASE_HOST,DATABASE_USER, DATABASE_PASSWORD);
    if (!$databaseConnection){
        echo('{"sta":false}');
        die("Database selection failed: " . $databaseConnection->connect_error);
    }
    mysql_select_db(DATABASE_NAME, $databaseConnection);
}
function closeDatabase(){
    global $databaseConnection;
    mysql_close($databaseConnection);
}
if(!empty($_REQUEST['id'])){
    $req_id=$_REQUEST['id'];
    connectDatabase();
    $query='SELECT `Content` FROM `CareerInfo` WHERE `CareerID` = '.$req_id.' LIMIT 1';
    $result=mysql_query($query,$databaseConnection);
    if(!$result){
        echo('{"sta":false}'); 
        return;
    }else{
        $row=mysql_fetch_row($result);
        echo('{"sta":true,"content":"'.$row[0].'"}');
    } 
    closeDatabase();
}else{
    echo('{"sta":false}'); 
}

?>