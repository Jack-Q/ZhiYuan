<?php

?>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ansi" />
    <title>历年全国高校录取情况查询</title>
    <meta charset="utf-8" />
    <link href="css/admitData.css" rel="stylesheet" />
    <script src="script/admitData.js"></script>
</head>
<body>
    <div class="mainContainer">
        <div class="titleArea">
            <div>
                <a href="\" style="border:none;">
                    <svg viewBox="-5 -5 110 110" width="70" height="70" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000" stroke="#000" transform="matrix(-1 0 0 -1 99.9998 100)" d="M 49.728 100 C 28.272 100 8.345 85.217 2.348 64.838 C -1.614 53.198 -0.53 39.666 5.361 27.793 C 11.253 15.891 21.388 6.811 33.167 2.882 C 38.436 0.976 44.086 0 49.905 0 C 62.263 0 74.345 4.543 83.062 12.456 C 97.088 24.541 103.244 44.73 98.323 62.661 C 93.491 82.001 76.3 97.161 56.523 99.484 C 54.34 99.825 52.037 100 49.728 100 Z M 49.905 3.873 C 44.537 3.873 39.323 4.771 34.428 6.541 C 23.582 10.157 14.262 18.526 8.825 29.514 C 3.397 40.468 2.384 52.916 6.036 63.664 C 11.49 82.206 30.263 96.132 49.727 96.132 C 51.833 96.132 53.937 95.967 55.998 95.648 C 74.282 93.5 90.115 79.534 94.581 61.676 C 99.124 45.116 93.455 26.52 80.493 15.356 C 72.453 8.045 61.323 3.873 49.905 3.873 Z"></path>
                        <path fill="#000" stroke="#000" transform="matrix(-1 0 0 -1 100.051 99.9868)" d="M 24.78 54.784 C 24.78 51.559 24.78 48.326 24.78 45.068 C 35.779 45.082 46.767 45.082 57.777 45.082 C 52.942 40.465 48.02 35.918 43.251 31.237 C 47.393 31.378 51.603 30.906 55.708 31.616 C 62.487 37.429 68.811 43.776 75.271 49.94 C 68.589 56.208 62.006 62.6 55.235 68.775 C 51.185 68.774 47.135 68.775 43.082 68.775 C 47.827 63.946 52.828 59.369 57.778 54.731 C 46.768 54.802 35.779 54.73 24.78 54.784 Z"></path>
                    </svg>
                </a>
            </div>
            <div>历年高校录取情况查询<sup style="font-size: 0.4em;color:#4af;word-wrap: break-word;">beta</sup></div>
        </div>
        <div class="queryArea">
            <div class="selector" id="selector">
                <div class="selectionOn" id="scoreType">
                    按录取分数
                </div>
                <div class="selectionOff" id="schoolType">
                    按学校
                </div>
                <div class="selectionOff" id="rankType">
                    按全省排名
                </div>
            </div>
            <div class="formArea">
                <div class="formSet" id="formSet">
                    <div class="formPage" id="scoreForm">
                        <div class="formPageTitle">
                            按录取分数查询
                        </div>
                        <div>
                            <form id="queryByScore" method="get" action="admitDataResult.php">
                                <input type="hidden" name="queryType" value="0" />
                                <div class="formSet">
                                    <span class="label">查询年份</span>
                                    <select id="queryYear" name="queryYear">
                                        <optgroup label="综合">
                                            <option value="0" selected="selected">近三年</option>
                                            <option value="1">近两年</option>
                                        </optgroup>
                                        <optgroup label="单年">
                                            <option value="2">2013</option>
                                            <option value="3">2012</option>
                                            <option value="4">2011</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div class="formSet">
                                    <span class="label">录取分数</span>
                                    下界<input type="number" min="0" max="749" step="1" name="lowerBound" spellcheck="false" placeholder="在此输入查询分数段的最小值" />
                                    上界<input type="number" min="1" max="750" step="1" name="upperBound" spellcheck="false" placeholder="在此输入查询分数段的最大值" />
                                </div>
                                <hr />
                                <div class="submitArea">
                                    <input type="reset" title="清空表单内容" value="清空" />
                                    <input type="submit" title="提交查询" value="查询" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="formPage" id="scoreForm">
                        <div class="formPageTitle">
                            按学校查询
                        </div>
                        <div>
                            <form id="queryBySchool" method="get" action="admitDataResult.php">
                                <input type="hidden" name="queryType" value="1" />
                                <div class="formSet">
                                    <span class="label">查询年份</span>
                                    <select id="queryYear" name="queryYear">
                                        <optgroup label="综合">
                                            <option value="0" selected="selected">近三年</option>
                                            <option value="1">近两年</option>
                                        </optgroup>
                                        <optgroup label="单年">
                                            <option value="2">2013</option>
                                            <option value="3">2012</option>
                                            <option value="4">2011</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div class="formSet">
                                    <span class="label">学校</span>
                                    省份
                                    <select id="provinceSelection">
                                        <optgroup label="华北地区">
                                            <option value="11" selected="selected">北京市</option>
                                            <option value="12">天津市</option>
                                            <option value="13">河北省</option>
                                            <option value="14">山西省</option>
                                            <option value="15">内蒙古自治区</option>
                                        </optgroup>
                                        <optgroup label="东北地区">
                                            <option value="21">辽宁省</option>
                                            <option value="22">吉林省</option>
                                            <option value="23">黑龙江省</option>
                                        </optgroup>
                                        <optgroup label="华东地区">
                                            <option value="31">上海市</option>
                                            <option value="32">江苏省</option>
                                            <option value="33">浙江省</option>
                                            <option value="34">安徽省</option>
                                            <option value="35">福建省</option>
                                            <option value="36">江西省</option>
                                            <option value="37">山东省</option>
                                        </optgroup>
                                        <optgroup label="华中地区">
                                            <option value="41">河南省</option>
                                            <option value="42">湖北省</option>
                                            <option value="43">湖南省</option>
                                        </optgroup>
                                        <optgroup label="华南地区">
                                            <option value="44">广东省</option>
                                            <option value="45">广西壮族自治区</option>
                                            <option value="46">海南省</option>
                                        </optgroup>
                                        <optgroup label="西南地区">
                                            <option value="50">重庆市</option>
                                            <option value="51">四川省</option>
                                            <option value="52">贵州省</option>
                                            <option value="53">云南省</option>
                                            <option value="54">西藏自治区</option>
                                        </optgroup>
                                        <optgroup label="西北地区">
                                            <option value="61">陕西省</option>
                                            <option value="62">甘肃省</option>
                                            <option value="63">青海省</option>
                                            <option value="64">宁夏回族自治区</option>
                                            <option value="65">新疆维吾尔自治区</option>
                                        </optgroup>
                                        <optgroup label="港澳台地区">
                                            <option value="99">港澳台</option>
                                        </optgroup>
                                    </select>
                                    学校
                                    <select name="SchoolName" id="schoolSeletion">
                                    </select>
                                </div>
                                <hr />
                                <div class="submitArea">
                                    <input type="reset" title="清空表单内容" value="清空" />
                                    <input type="submit" title="提交查询" value="查询" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="formPage" id="scoreForm">
                        <div class="formPageTitle">
                            按全省排名查询
                        </div>
                        <div>
                            <form id="queryByScore" method="get" action="admitDataResult.php">
                                <input type="hidden" name="queryType" value="2" />
                                <div class="formSet">
                                    <span class="label">查询年份</span>
                                    <select id="queryYear" name="queryYear">
                                        <optgroup label="综合">
                                            <option value="0" selected="selected">近三年</option>
                                            <option value="1">近两年</option>
                                        </optgroup>
                                        <optgroup label="单年">
                                            <option value="2">2013</option>
                                            <option value="3">2012</option>
                                            <option value="4">2011</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div class="formSet">
                                    <span class="label">全省排名</span>
                                    下界<input type="number" min="1" max="50000" step="1" name="lowerBound" spellcheck="false" placeholder="在此输入查询全省排名范围的最小值" />
                                    上界<input type="number" min="1" max="50000" step="1" name="upperBound" spellcheck="false" placeholder="在此输入查询全省排名范围的最大值" />
                                </div>
                                <hr />
                                <div class="submitArea">
                                    <input type="reset" title="清空表单内容" value="清空" />
                                    <input type="submit" title="提交查询" value="查询" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
