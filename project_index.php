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
            width:90%;
            max-width: 800px;
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
                <a href="admitDataQuery.php">
                    Query Admit Information
                </a>
                <p>
                    Current in beta test stage.
                    <br />
                    TODO: Add paging fiunction to query result page.
                </p>
            </li>
            <li>
                <a href="majorInformation.html">
                    View Major Information
                </a>
                <p>
                    Current in beta test stage.
                </p>
            </li>
            <li>
                <a href="careerInformation.html">
                    View Career Information
                </a>
                <p>
                    Current in beta test stage.
                    <br />
                    TODO: Shorten some labels of menu that are too long to fit in the box,

                </p>
            </li>
        </ol>
        <hr />

    </div>
</body>
</html>
