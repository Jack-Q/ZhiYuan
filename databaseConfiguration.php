<?php
if(!(strpos($_SERVER["SERVER_NAME"],'localhost')===FALSE) 
    || !(strpos($_SERVER["SERVER_NAME"],'169.254.80.80')===FALSE) ){
    define('DATABASE_HOST','localhost');
    define('DATABASE_USER','LocalDBU1jyl');
    define('DATABASE_PASSWORD','[|QGEiO_J$t{');
    define('DATABASE_NAME','LocalDB');
}else{
    define('DATABASE_HOST','10.0.16.16:4066');
    define('DATABASE_USER','O9kPfOPv');
    define('DATABASE_PASSWORD','OWP6M2iTZ1pW');
    define('DATABASE_NAME','jackq201m_mysql_tp15sq0g');
}
?>