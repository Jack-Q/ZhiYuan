<?php

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Welcome</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-size: 20px;
            font-family: 'Segoe UI','Segoe UI Light','Microsoft YaHei',sans-serif;
        }

        li > p {
            margin: 5px;
            padding: 15px;
            color: #025;
            background-color: #afe;
            font-family: Consolas,sans-serif;
        }

        body > div {
            width: 800px;
            margin: 50px auto 0 auto;
            padding: 15px;
        }
    </style>
</head>
<body>
    <div>
        <hr>
        <p>This is only avaliable for limited users.</p>
        <hr>
        <p>

            Most of functions are under construction, please wait...
            <br />
            Current availble list:
        </p>
        <ol>
            <li>
                <a href="dataManage.php">
                    View Raw Admit Data
                </a>
                <p>
                    Login information:<br />
                    System: MySQL<br />
                    Server: 10.0.16.16:4066<br />
                    Username: O9kPfOPv<br />
                    Password: OWP6M2iTZ1pW<br />
                    Database: jackq201m_mysql_tp15sq0g<br /><br />
                    (Beacuse of the limit of JD-cloud, you must add "&select=AdmitInfo" at the end of the
                    url after login the database management systems)
                </p>
            </li>
            <li>
                <a href="admitDataQuery.php">
                    Query Admit Information
                </a>
                <p>
                    Current in beta test stage.
                </p>
            </li>
        </ol>
    </div>
</body>
</html>
