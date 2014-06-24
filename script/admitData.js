﻿
window.addEventListener( "load", function () {

    var provinceIdMap = [
        //1x:华北地区
        { id: 11, name: '北京市' },
        { id: 12, name: '天津市' },
        { id: 13, name: '河北省' },
        { id: 14, name: '山西省' },
        { id: 15, name: '内蒙古自治区' },
        //2x东北地区
        { id: 21, name: '辽宁省' },
        { id: 22, name: '吉林省' },
        { id: 23, name: '黑龙江省' },
        //3x华东地区
        { id: 31, name: '上海市' },
        { id: 32, name: '江苏省' },
        { id: 33, name: '浙江省' },
        { id: 34, name: '安徽省' },
        { id: 35, name: '福建省' },
        { id: 36, name: '江西省' },
        { id: 37, name: '山东省' },
        //4x华中地区
        { id: 41, name: '河南省' },
        { id: 42, name: '湖北省' },
        { id: 43, name: '湖南省' },
        //4x华南地区
        { id: 44, name: '广东省' },
        { id: 45, name: '广西壮族自治区' },
        { id: 46, name: '海南省' },
        //5x西南地区
        { id: 50, name: '重庆市' },
        { id: 51, name: '四川省' },
        { id: 52, name: '贵州省' },
        { id: 53, name: '云南省' },
        { id: 54, name: '西藏自治区' },
        //6x西北地区
        { id: 61, name: '陕西省' },
        { id: 62, name: '甘肃省' },
        { id: 63, name: '青海省' },
        { id: 64, name: '宁夏回族自治区' },
        { id: 65, name: '新疆维吾尔自治区' },
        //港澳台地区
        { id: 99, name: '港澳台' },
    ]
    var provincCollegeData = [
        {
            "pro": 12,
            "data": ["北京科技大学天津学院", "河北工业大学", "南开大学", "南开大学滨海学院", "天津财经大学", "天津财经大学珠江学院", "天津城建大学", "天津大学", "天津大学仁爱学院", "天津工业大学", "天津科技大学", "天津理工大学", "天津理工大学中环信息学院", "天津农学院", "天津商业大学", "天津商业大学宝德学院", "天津师范大学", "天津师范大学津沽学院", "天津体育学院", "天津天狮学院", "天津外国语大学", "天津外国语大学滨海外事学院", "天津医科大学", "天津医科大学临床医学院", "天津职业技术师范大学", "天津中医药大学", "中国民航大学"]
        }, {
            "pro": 14,
            "data": ["长治学院", "长治医学院", "晋中学院", "吕梁学院", "山西财经大学", "山西财经大学华商学院", "山西大同大学", "山西大学", "山西大学商务学院", "山西工商学院", "山西农业大学", "山西农业大学信息学院", "山西师范大学", "山西师范大学现代文理学院", "山西医科大学", "山西医科大学晋祠学院", "山西中医学院", "太原工业学院", "太原科技大学", "太原科技大学华科学院", "太原理工大学", "太原理工大学现代科技学院", "太原师范学院", "忻州师范学院", "运城学院", "中北大学", "中北大学信息商务学院"]
        }, {
            "pro": 13,
            "data": ["保定学院", "北华航天工业学院", "北京交通大学海滨学院", "北京中医药大学东方学院", "沧州师范学院", "防灾科技学院", "河北大学", "河北大学工商学院", "河北工程大学", "河北工程大学科信学院", "河北金融学院", "河北经贸大学", "河北科技大学", "河北科技大学理工学院", "河北科技学院", "河北联合大学", "河北联合大学轻工学院", "河北师范大学", "河北师范大学汇华学院", "河北外国语学院", "河北医科大学临床学院", "华北电力大学(保定)", "华北电力大学科技学院", "华北科技学院", "廊坊师范学院", "石家庄经济学院", "石家庄经济学院华信学院", "石家庄铁道大学", "石家庄铁道大学四方学院", "石家庄学院", "唐山师范学院", "唐山学院", "燕京理工学院", "燕山大学", "燕山大学里仁学院", "中国地质大学长城学院", "中央司法警官学院"]
        }, {
            "pro": 11,
            "data": ["北方工业大学", "北京城市学院", "北京大学", "北京第二外国语学院", "北京第二外国语学院中瑞酒店管理学院", "北京服装学院", "北京工商大学", "北京工商大学嘉华学院", "北京工业大学耿丹学院", "北京航空航天大学", "北京化工大学", "北京建筑大学", "北京交通大学", "北京科技大学", "北京理工大学", "北京联合大学", "北京林业大学", "北京农学院", "北京师范大学", "北京石油化工学院", "北京体育大学", "北京外国语大学", "北京物资学院", "北京信息科技大学", "北京印刷学院", "北京邮电大学", "北京邮电大学世纪学院", "北京语言大学", "北京中医药大学", "对外经济贸易大学", "国际关系学院", "华北电力大学(北京)", "清华大学", "首都经济贸易大学", "首都师范大学", "首都师范大学科德学院", "首都体育学院", "外交学院", "中国传媒大学", "中国地质大学(北京)", "中国矿业大学(北京)", "中国劳动关系学院", "中国农业大学", "中国青年政治学院", "中国人民大学", "中国人民公安大学", "中国石油大学(北京)", "中国政法大学", "中华女子学院", "中央财经大学", "中央民族大学"]
        }, {
            "pro": 22,
            "data": ["白城师范学院", "北华大学", "长春大学", "长春大学旅游学院", "长春工程学院", "长春工业大学", "长春工业大学人文信息学院", "长春建筑学院", "长春理工大学", "长春理工大学光电信息学院", "长春师范大学", "长春中医药大学", "东北师范大学", "东北师范大学人文学院", "吉林财经大学", "吉林财经大学信息经济学院", "吉林大学", "吉林工程技术师范学院", "吉林工商学院", "吉林华桥外国语学院", "吉林建筑大学", "吉林警察学院", "吉林农业科技学院", "吉林师范大学", "吉林师范大学博达学院", "吉林医药学院", "延边大学"]
        }, {
            "pro": 23,
            "data": ["大庆师范学院", "东北林业大学", "东北农业大学", "东北农业大学成栋学院", "哈尔滨工业大学", "哈尔滨广厦学院", "哈尔滨华德学院", "哈尔滨剑桥学院", "哈尔滨金融学院", "哈尔滨商业大学", "哈尔滨师范大学", "哈尔滨体育学院", "哈尔滨学院", "哈尔滨医科大学", "哈尔滨远东理工学院", "黑河学院", "黑龙江八一农垦大学", "黑龙江大学", "黑龙江东方学院", "黑龙江工程学院", "黑龙江科技大学", "黑龙江中医药大学", "佳木斯大学", "牡丹江师范学院", "齐齐哈尔大学", "齐齐哈尔工程学院", "齐齐哈尔医学院", "绥化学院"]
        }, {
            "pro": 21,
            "data": ["鞍山师范学院", "渤海大学", "渤海大学文理学院", "大连大学", "大连东软信息学院", "大连工业大学", "大连海事大学", "大连海洋大学", "大连交通大学", "大连科技学院", "大连理工大学城市学院", "大连民族学院", "大连外国语大学", "大连医科大学中山学院", "东北财经大学", "东北大学", "辽东学院", "辽宁大学", "辽宁对外经贸学院", "辽宁工程技术大学", "辽宁何氏医学院", "辽宁科技学院", "辽宁师范大学", "辽宁师范大学海华学院", "辽宁石油化工大学", "辽宁医学院医疗学院", "辽宁中医药大学杏林学院", "沈阳城市学院", "沈阳大学", "沈阳工程学院", "沈阳工业大学", "沈阳航空航天大学", "沈阳建筑大学", "沈阳理工大学", "沈阳农业大学", "沈阳师范大学", "沈阳体育学院", "中国刑事警察学院"]
        }, {
            "pro": 15,
            "data": ["集宁师范学院", "内蒙古财经大学", "内蒙古大学", "内蒙古大学创业学院", "内蒙古科技大学", "内蒙古民族大学", "内蒙古师范大学", "内蒙古师范大学鸿德学院"]
        }, {
            "pro": 31,
            "data": ["复旦大学", "华东师范大学", "华东政法大学", "上海财经大学", "上海大学", "上海电机学院", "上海电力学院", "上海对外经贸大学", "上海海关学院", "上海海事大学", "上海海洋大学", "上海建桥学院", "上海交通大学", "上海金融学院", "上海立信会计学院", "上海杉达学院", "上海商学院", "上海师范大学", "上海师范大学天华学院", "上海体育学院", "上海外国语大学", "上海外国语大学贤达经济人文学院", "上海应用技术学院", "上海政法学院"]
        }, {
            "pro": 32,
            "data": ["常州大学", "常州大学怀德学院", "常州工学院", "东南大学", "东南大学成贤学院", "河海大学", "淮海工学院", "淮阴工学院", "淮阴师范学院", "江南大学", "江苏大学", "江苏科技大学", "江苏科技大学苏州理工学院", "江苏理工学院", "江苏师范大学", "江苏师范大学科文学院", "金陵科技学院", "南京财经大学红山学院", "南京大学", "南京大学金陵学院", "南京工程学院", "南京工业大学", "南京工业大学浦江学院", "南京航空航天大学", "南京航空航天大学金城学院", "南京理工大学泰州科技学院", "南京理工大学紫金学院", "南京林业大学", "南京农业大学", "南京森林警察学院", "南京审计学院", "南京审计学院金审学院", "南京师范大学", "南京师范大学中北学院", "南京晓庄学院", "南京信息工程大学", "南京信息工程大学滨江学院", "南京医科大学康达学院", "南京邮电大学", "南京邮电大学通达学院", "南京政治学院", "南通大学", "南通大学杏林学院", "三江学院", "苏州大学", "苏州大学文正学院", "苏州大学应用技术学院", "苏州科技学院", "苏州科技学院天平学院", "无锡太湖学院", "西交利物浦大学", "徐州工程学院", "盐城工学院", "盐城师范学院", "扬州大学", "扬州大学广陵学院", "中国传媒大学南广学院", "中国矿业大学(徐州)", "中国矿业大学徐海学院", "中国人民解放军国际关系学院", "中国药科大学"]
        }, {
            "pro": 34,
            "data": ["安徽财经大学", "安徽大学", "安徽建筑大学", "安徽理工大学", "安徽农业大学", "安徽师范大学", "安庆师范学院", "合肥工业大学", "合肥学院", "淮北师范大学", "淮北师范大学信息学院"]
        }, {
            "pro": 35,
            "data": ["福建工程学院", "福建江夏学院", "福建农林大学", "福建农林大学东方学院", "福建师范大学", "福建师范大学闽南科技学院", "福建师范大学协和学院", "福建医科大学", "福建中医药大学", "福州大学", "福州大学阳光学院", "福州大学至诚学院", "福州外语外贸学院", "华侨大学", "华侨大学厦门工学院", "集美大学", "集美大学诚毅学院", "龙岩学院", "闽江学院", "闽南理工学院", "闽南师范大学", "宁德师范学院", "莆田学院", "泉州师范学院", "三明学院", "武夷学院", "厦门大学", "厦门大学嘉庚学院", "厦门理工学院"]
        }, {
            "pro": 33,
            "data": ["杭州电子科技大学", "杭州师范大学", "杭州师范大学钱江学院", "湖州师范学院", "湖州师范学院求真学院", "嘉兴学院", "嘉兴学院南湖学院", "丽水学院", "宁波大红鹰学院", "宁波大学", "宁波大学科学技术学院", "宁波工程学院", "宁波诺丁汉大学", "上海财经大学浙江学院", "绍兴文理学院", "绍兴文理学院元培学院", "台州学院", "同济大学浙江学院", "温州大学城市学院", "温州大学瓯江学院", "浙江传媒学院", "浙江大学", "浙江大学宁波理工学院", "浙江工商大学", "浙江工业大学之江学院", "浙江科技学院", "浙江理工大学", "浙江农林大学", "浙江师范大学行知学院", "浙江外国语学院", "浙江万里学院", "浙江越秀外国语学院", "浙江中医药大学", "中国计量学院", "中国计量学院现代科技学院"]
        }, {
            "pro": 41,
            "data": ["安阳工学院", "安阳师范学院", "安阳师范学院人文管理学院", "河南财经政法大学", "河南城建学院", "河南大学", "河南大学民生学院", "河南工程学院", "河南工业大学", "河南科技大学", "河南科技学院", "河南理工大学", "河南理工大学万方科技学院", "河南农业大学", "河南中医学院", "华北水利水电大学", "黄河科技学院", "洛阳理工学院", "南阳理工学院", "南阳师范学院", "平顶山学院", "商丘师范学院", "外国语学院", "新乡学院", "郑州成功财经学院", "郑州大学", "郑州航空工业管理学院", "郑州华信学院", "郑州科技学院", "郑州轻工业学院", "郑州升达经贸管理学院", "中原工学院", "中原工学院信息商务学院", "周口师范学院"]
        }, {
            "pro": 37,
            "data": ["北京电影学院现代创意媒体学院", "滨州学院", "滨州医学院", "德州学院", "菏泽学院", "济南大学", "济南大学泉城学院", "济宁学院", "聊城大学", "聊城大学东昌学院", "临沂大学", "鲁东大学", "齐鲁工业大学", "青岛滨海学院", "青岛大学", "青岛黄海学院", "青岛理工大学", "青岛理工大学琴岛学院", "青岛农业大学", "曲阜师范大学", "曲阜师范大学杏坛学院", "山东财经大学", "山东财经大学燕山学院", "山东大学", "山东大学威海分校", "山东工商学院", "山东建筑大学", "山东交通学院", "山东科技大学", "山东科技大学泰山科技学院", "山东理工大学", "山东农业大学", "山东女子学院", "山东青年政治学院", "山东师范大学", "山东万杰医学院", "山东协和学院", "山东英才学院", "山东政法学院", "山东中医药大学", "泰山学院", "潍坊科技学院", "潍坊学院", "潍坊医学院", "烟台大学", "烟台大学文经学院", "烟台南山学院", "枣庄学院", "中国海洋大学", "中国石油大学胜利学院"]
        }, {
            "pro": 43,
            "data": ["长沙理工大学", "长沙理工大学城南学院", "长沙学院", "长沙医学院", "国防科学技术大学", "衡阳师范学院", "湖南财政经济学院", "湖南城市学院", "湖南大学", "湖南工程学院", "湖南工学院", "湖南工业大学", "湖南警察学院", "湖南科技大学", "湖南科技大学潇湘学院", "湖南科技学院", "湖南理工学院", "湖南理工学院南湖学院", "湖南农业大学", "湖南农业大学东方科技学院", "湖南女子学院", "湖南人文科技学院", "湖南商学院", "湖南商学院北津学院", "湖南涉外经济学院", "湖南师范大学", "湖南文理学院", "湖南文理学院芙蓉学院", "怀化学院", "南华大学", "南华大学船山学院", "邵阳学院", "湘南学院", "湘潭大学", "中南大学", "中南林业科技大学", "中南林业科技大学涉外学院"]
        }, {
            "pro": 44,
            "data": ["北京理工大学珠海学院", "北京师范大学-香港浸会大学联合国际学院", "北京师范大学珠海分校", "电子科技大学中山学院", "东莞理工学院", "佛山科学技术学院", "广东第二师范学院", "广东工业大学华立学院", "广东海洋大学", "广东海洋大学寸金学院", "广东技术师范学院", "广东金融学院", "广东石油化工学院", "广东外语外贸大学", "广东外语外贸大学南国商学院", "广东药学院", "广东医学院", "广州大学", "广州中医药大学", "韩山师范学院", "华南理工大学", "华南农业大学", "华南师范大学", "惠州学院", "吉林大学珠海学院", "暨南大学", "嘉应学院", "南方医科大学", "汕头大学", "韶关学院", "深圳大学", "五邑大学", "湛江师范学院", "肇庆学院", "中山大学", "中山大学南方学院", "仲恺农业工程学院"]
        }, {
            "pro": 45,
            "data": ["百色学院", "广西财经学院", "广西大学行健文理学院", "广西民族大学", "广西民族师范学院", "广西师范大学", "广西师范大学漓江学院", "广西师范学院", "广西外国语学院", "广西中医药大学", "广西中医药大学赛恩斯新医药学院", "桂林电子科技大学", "桂林电子科技大学信息科技学院", "桂林理工大学", "桂林理工大学博文管理学院", "梧州学院", "玉林师范学院"]
        }, {
            "pro": 50,
            "data": ["长江师范学院", "四川外国语大学", "四川外国语大学重庆南方翻译学院", "西南大学", "西南政法大学", "重庆大学", "重庆大学城市科技学院", "重庆工商大学", "重庆工商大学派斯学院", "重庆工商大学融智学院", "重庆科技学院", "重庆理工大学", "重庆三峡学院", "重庆师范大学", "重庆师范大学涉外商贸学院", "重庆文理学院", "重庆邮电大学", "重庆邮电大学移通学院"]
        }, {
            "pro": 51,
            "data": ["成都东软学院", "成都理工大学", "成都理工大学工程技术学院", "成都体育学院", "成都信息工程学院", "成都学院", "成都中医药大学", "电子科技大学", "电子科技大学成都学院", "乐山师范学院", "绵阳师范学院", "四川大学", "四川大学锦城学院", "四川大学锦江学院", "四川警察学院", "四川理工学院", "四川师范大学", "四川师范大学成都学院", "四川师范大学文理学院", "四川外国语大学成都学院", "四川文理学院", "武警警官学院", "西华大学", "西华师范大学", "西南财经大学", "西南财经大学天府学院", "西南交通大学", "西南科技大学", "西南科技大学城市学院", "西南民族大学", "西南石油大学", "宜宾学院", "中国民用航空飞行学院"]
        }, {
            "pro": 46,
            "data": ["海口经济学院", "海南大学", "海南师范大学", "海南医学院", "琼州学院", "三亚学院"]
        }, {
            "pro": 42,
            "data": ["长江大学", "长江大学文理学院", "汉口学院", "湖北大学", "湖北大学知行学院", "湖北第二师范学院", "湖北工程学院", "湖北工程学院新技术学院", "湖北工业大学", "湖北工业大学工程技术学院", "湖北工业大学商贸学院", "湖北经济学院", "湖北经济学院法商学院", "湖北警官学院", "湖北科技学院", "湖北理工学院", "湖北民族学院", "湖北汽车工业学院", "湖北师范学院", "湖北文理学院", "湖北文理学院理工学院", "湖北医药学院", "湖北中医药大学", "华中科技大学文华学院", "华中科技大学武昌分校", "华中农业大学", "华中农业大学楚天学院", "华中师范大学", "江汉大学", "江汉大学文理学院", "荆楚理工学院", "军事经济学院", "三峡大学", "三峡大学科技学院", "武昌工学院", "武昌理工学院", "武汉长江工商学院", "武汉大学", "武汉纺织大学", "武汉纺织大学外经贸学院", "武汉工程大学", "武汉工程大学邮电与信息工程学院", "武汉科技大学", "武汉科技大学城市学院", "武汉理工大学", "武汉理工大学华夏学院", "武汉轻工大学", "武汉生物工程学院", "武汉体育学院", "武汉体育学院体育科技学院", "中国地质大学(武汉)", "中国地质大学江城学院", "中南财经政法大学", "中南财经政法大学武汉学院", "中南民族大学"]
        }, {
            "pro": 61,
            "data": ["长安大学", "空军工程大学", "陕西服装工程学院", "陕西国际商贸学院", "陕西科技大学", "陕西科技大学镐京学院", "陕西师范大学", "陕西学前师范学院", "陕西中医学院", "商洛学院", "渭南师范学院", "武警工程大学", "西安财经学院", "西安财经学院行知学院", "西安电子科技大学", "西安翻译学院", "西安工程大学", "西安工业大学", "西安工业大学北方信息工程学院", "西安建筑科技大学", "西安建筑科技大学华清学院", "西安交通大学", "西安交通大学城市学院", "西安科技大学", "西安科技大学高新学院", "西安理工大学", "西安欧亚学院", "西安培华学院", "西安石油大学", "西安思源学院", "西安体育学院", "西安外国语大学", "西安外事学院", "西安文理学院", "西安医学院", "西安邮电大学", "西北大学", "西北大学现代学院", "西北工业大学", "西北工业大学明德学院", "西北农林科技大学", "西北政法大学", "西京学院", "榆林学院"]
        }, {
            "pro": 52,
            "data": ["安顺学院", "毕节学院", "贵阳医学院", "贵州财经大学", "贵州财经大学商务学院", "贵州大学", "贵州民族大学人文科技学院", "贵州师范大学", "贵州师范大学求是学院", "贵州师范学院", "凯里学院", "黔南民族师范学院", "铜仁学院", "兴义民族师范学院", "遵义师范学院", "遵义医学院"]
        }, {
            "pro": 62,
            "data": ["甘肃农业大学", "甘肃政法学院", "河西学院", "兰州大学", "兰州交通大学", "兰州理工大学", "兰州理工大学技术工程学院", "兰州商学院", "兰州商学院长青学院", "陇东学院", "天水师范学院", "西北民族大学", "西北师范大学"]
        }, {
            "pro": 54,
            "data": ["西藏大学", "西藏民族学院"]
        }, {
            "pro": 53,
            "data": ["楚雄师范学院", "大理学院", "红河学院", "昆明理工大学", "昆明理工大学津桥学院", "昆明学院", "昆明医科大学", "昆明医科大学海源学院", "普洱学院", "文山学院", "云南财经大学", "云南大学", "云南大学滇池学院", "云南大学旅游文化学院", "云南警官学院", "云南民族大学", "云南师范大学", "云南师范大学商学院", "云南师范大学文理学院", "云南中医学院"]
        }, {
            "pro": 63,
            "data": ["青海民族大学", "青海师范大学"]
        }, {
            "pro": 64,
            "data": ["北方民族大学", "宁夏大学", "宁夏理工学院", "宁夏师范学院", "银川能源学院", "中国矿业大学银川学院"]
        }, {
            "pro": 65,
            "data": ["喀什师范学院", "石河子大学", "塔里木大学", "新疆财经大学", "新疆大学", "新疆师范大学", "伊犁师范学院"]
        }, {
            "pro": 36,
            "data": ["东华理工大学", "东华理工大学长江学院", "赣南师范学院", "华东交通大学", "华东交通大学理工学院", "江西财经大学", "江西财经大学现代经济管理学院", "江西服装学院", "江西科技师范大学", "江西科技师范大学理工学院", "江西科技学院", "江西理工大学", "江西理工大学应用科学学院", "江西农业大学", "江西农业大学南昌商学院", "江西师范大学", "江西师范大学科学技术学院", "井冈山大学", "景德镇陶瓷学院", "景德镇陶瓷学院科技艺术学院", "九江学院", "南昌大学", "南昌大学共青学院", "南昌大学科学技术学院", "南昌工程学院", "南昌工学院", "南昌航空大学", "南昌航空大学科技学院", "南昌理工学院", "上饶师范学院", "新余学院", "宜春学院"]
        }];
    var provinceSelection = document.getElementById( "provinceSelection" );
    var schoolSelection = document.getElementById( "schoolSeletion" );
    function fillSchoolList( province ) {
        for ( var i = 0; i < provincCollegeData.length; i++ ) {
            if ( provincCollegeData[i].pro == province ) {
                var nodetext;
                for ( var j = 0; j < provincCollegeData[i].data.length; j++ ) {
                    nodetext += '<option value="' + provincCollegeData[i].data[j]
                        + '">' + provincCollegeData[i].data[j] + '</option>';
                }
                schoolSelection.innerHTML = nodetext;
                return;
            }
        }
        schoolSelection.innerHTML = "";
    }
    provinceSelection.onchange = function () {
        fillSchoolList( provinceSelection.value );
    }
    fillSchoolList( 11 );

    var formSet = document.getElementById( "formSet" );
    var typeSet = [
        document.getElementById( "scoreType" ),
        document.getElementById( "schoolType" ),
        document.getElementById( "rankType" ),
        document.getElementById( "preType" ),
        document.getElementById( "deltaType" ),
    ];

    typeSet[0].addEventListener( "click", function () { changeMode( 0 ); }, false );
    typeSet[1].addEventListener( "click", function () { changeMode( 1 ); }, false );
    typeSet[2].addEventListener( "click", function () { changeMode( 2 ); }, false );
    typeSet[3].addEventListener( "click", function () { changeMode( 3 ); }, false );
    typeSet[4].addEventListener( "click", function () { changeMode( 4 ); }, false );


    function changeMode( btn ) {
        formSet.style.top = '-' + ( btn * 450 ) + 'px';
        for ( var i = 0; i < typeSet.length; i++ ) {
            if ( i == btn ) {
                typeSet[i].className = 'selectionOn';
            } else {
                typeSet[i].className = 'selectionOff';
            }
        }

    }
}, false );