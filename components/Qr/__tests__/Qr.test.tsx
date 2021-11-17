import React from "react";
import renderer from "react-test-renderer";

import Qr from "../Qr";

describe("Qr", () => {
  it.skip("renders Qr unchanged", () => {
    const tree = renderer
      .create(
        <Qr
          user_sign_qr_code={{
            light: "<svg></svg>",
            dark: "<svg></svg>",
          }}
          approver_sign_qr_code={{
            light: "<svg></svg>",
            dark: "<svg></svg>",
          }}
          user_signature={
            '{"lines":[{"points":[{"x":51,"y":132},{"x":51,"y":132},{"x":51,"y":132},{"x":61.770546777252704,"y":125.94156743779536},{"x":83.82211011821293,"y":113.03141161376793},{"x":113.72278640249998,"y":96.85499853701555},{"x":146.45672575080818,"y":83.29610770615113},{"x":174.5408194622688,"y":70.48944729939333},{"x":201.40022392973157,"y":60.15464799047295},{"x":220.30476330226344,"y":53.88792980715773},{"x":229.11261056384407,"y":52.15699854236707},{"x":229.2740047442408,"y":52.20752173485336},{"x":225.64202363000348,"y":59.613005370477595},{"x":190.42023160675728,"y":91.94271611264088},{"x":78.15900491240383,"y":208.67534069103698},{"x":258.036790419513,"y":188.66342407190893},{"x":229.970527135663,"y":207.63936613216526},{"x":191.9540053090955,"y":233.61505813972326},{"x":163.8231229217599,"y":254.4310386270521},{"x":149.6234268911732,"y":266.17587607654036},{"x":142.39092810938774,"y":272.9110208684577},{"x":141.91962281685716,"y":273.4572522661309},{"x":142.52730423559316,"y":274.00062597409834},{"x":150.00000000647628,"y":274.0002787745416},{"x":150.00000000647628,"y":274.0002787745416}],"brushColor":"#e1f7de","brushRadius":3},{"points":[{"x":157,"y":264},{"x":157,"y":264},{"x":152,"y":264},{"x":145,"y":264},{"x":131.80244722357588,"y":267.47304020432216},{"x":112.44108663348435,"y":276.47125006239884},{"x":90.1396534802333,"y":289.90420250934824},{"x":69.02142296998774,"y":303.71590022129664},{"x":52.03377465930559,"y":314.7348640641877},{"x":43.007189772516455,"y":320.69423978758186},{"x":40.78344545664948,"y":322.37803236302983},{"x":40.78344545664948,"y":322.37803236302983},{"x":40.78344545664948,"y":322.37803236302983},{"x":55.09403551907191,"y":324.9418962479908},{"x":80.00351327044586,"y":325.7947028926624},{"x":104.00014051764882,"y":325.9589367312491},{"x":125.0634776029656,"y":322.8704606995775},{"x":142.4514066755377,"y":307.9128376874919},{"x":156.70198475858012,"y":273.54248373477105},{"x":156.70198475858012,"y":273.54248373477105}],"brushColor":"#e1f7de","brushRadius":3},{"points":[{"x":181,"y":162},{"x":181,"y":162},{"x":181.7502167317269,"y":143.9947984385541},{"x":181.8637252868308,"y":138.99845223391424},{"x":181.6441743154787,"y":136.96531972749807},{"x":181.5942843836151,"y":136.78431130768055},{"x":179.84094496941628,"y":136.37235631825365},{"x":148.1126553591729,"y":155.8598160597951},{"x":115.71913039186362,"y":181.29462439898612},{"x":81.70115751126865,"y":208.27184790355298},{"x":57.54557374616732,"y":229.0836548520139},{"x":44.700869965206095,"y":239.27148533994793},{"x":39.99985236163849,"y":244.52773199762188},{"x":39.54061150973175,"y":245.15602744256793},{"x":49.17729974994528,"y":247.55218723654866},{"x":74.09503709273456,"y":243.06367902292902},{"x":104.22264596157089,"y":234.61931476700698},{"x":133.30922032237845,"y":224.90132234530853},{"x":160.25761110715425,"y":216.73924403213627},{"x":177.12618176286756,"y":213.22403403430235},{"x":189.01402004096252,"y":212.40993161625042},{"x":194.00863594597578,"y":212.6781976194208},{"x":197.37627738064867,"y":219.60406823461375},{"x":187.32818907403308,"y":243.47012336163337},{"x":167.35886681837064,"y":273.0282785982671},{"x":150.22274297947067,"y":299.9389795803344},{"x":140.19032868030595,"y":315.91848419154115},{"x":137.54494215364946,"y":321.5664680515729},{"x":137.40100467470094,"y":322.16586031179696},{"x":149.0763202167414,"y":324.04605145557343},{"x":173.2566972814943,"y":316.73622403036154},{"x":200.16076850840602,"y":310.3796287861512},{"x":226.05597066627456,"y":306.8176278369842},{"x":245.01586619019957,"y":305.4360533756359},{"x":256.00197651045875,"y":305.1539942171351},{"x":259.48284798383,"y":306.6418156071944},{"x":257.1803499345765,"y":318.1172477502495},{"x":237.67753258498635,"y":343.25913994233497},{"x":218.14846680468477,"y":363.66523089768},{"x":206.21823833696058,"y":375.7330965170752},{"x":200.44448758924491,"y":380.9693015407937},{"x":200.44448758924491,"y":380.9693015407937},{"x":200.44448758924491,"y":380.9693015407937},{"x":215.5819641011491,"y":367.0596747155979},{"x":232.1995856028281,"y":354.59944740417535},{"x":246.0157687573905,"y":345.34027527611056},{"x":254.8468890853615,"y":340.073344741716},{"x":256.7861049038186,"y":338.96905674011384},{"x":256.7861049038186,"y":338.96905674011384},{"x":247.27249241665783,"y":344.13629196385426},{"x":230.2955933218494,"y":353.17923922148935},{"x":216.34725321140402,"y":360.2784410546289},{"x":208.35884324200205,"y":364.301333828046},{"x":205.23030408444765,"y":366.05994571747215},{"x":205.23030408444765,"y":366.05994571747215}],"brushColor":"#e1f7de","brushRadius":3}],"width":302,"height":463}'
          }
          approver_signature={
            '{"lines":[{"points":[{"x":13,"y":151},{"x":13,"y":151},{"x":13.013606076167855,"y":150.91836354299286},{"x":26.324615674282292,"y":133.74252570454485},{"x":52.62166259259483,"y":109.10245798844018},{"x":80.46872259004827,"y":84.93287744966216},{"x":107.2935913965718,"y":63.72152093337885},{"x":128.14991357393592,"y":48.53223182417422},{"x":141.0894173734201,"y":39.44763372003635},{"x":150.77961214281981,"y":33.957625841888316},{"x":153.59390292533416,"y":32.602712896054705},{"x":153.59390292533416,"y":32.602712896054705},{"x":135.6317750145473,"y":56.22399641502333},{"x":102.90269832493512,"y":94.44270411487814},{"x":68.0482280929082,"y":132.57147323506013},{"x":42.7407378769642,"y":164.3088508725638},{"x":29.88633001634775,"y":179.42873770124328},{"x":25.587725762008915,"y":185.1908187956142},{"x":25.587725762008915,"y":185.1908187956142},{"x":42.44864388669515,"y":178.27649847425226},{"x":86.92618402151638,"y":150.20256013471788},{"x":132.83544104478153,"y":123.05406790986588},{"x":172.7042426446838,"y":101.82045280648597},{"x":201.5517385891448,"y":88.51325438405787},{"x":217.4232375591868,"y":82.21353126897614},{"x":220.38143188173234,"y":81.10515849768757},{"x":220.38143188173234,"y":81.10515849768757},{"x":180.97634590707457,"y":107.6479884527135},{"x":132.77306451225633,"y":144.3643631696993},{"x":90.52938731478424,"y":181.06494592760512},{"x":64.49922019102793,"y":204.0304889882195},{"x":55.01817080654143,"y":214.5441831983958},{"x":54.54108447427558,"y":215.5646628720386},{"x":58.006344548192324,"y":215.72414800160928},{"x":102.7085596481624,"y":191.82854361870997},{"x":163.75505518935526,"y":157.9138555100229},{"x":214.78152803446469,"y":128.9610049552343},{"x":259.62710813582765,"y":106.67058664265184},{"x":282.594702405425,"y":95.60437284467517},{"x":289.5321038801689,"y":92.47024533654776},{"x":266.26995001165255,"y":105.131615982006},{"x":208.94210923576725,"y":144.59771307768676},{"x":146.0225421492936,"y":185.71761209504893},{"x":90.67515187316135,"y":230.2392879712911},{"x":50.58240793746425,"y":264.1268181691709},{"x":33.51664487743628,"y":279.0503267159006},{"x":30.80374900687266,"y":282.35979596432276},{"x":30.80374900687266,"y":282.35979596432276},{"x":64.84590179236216,"y":262.0716887319558},{"x":119.0324706099895,"y":225.36506341090058},{"x":171.83879502804265,"y":194.05973254344931},{"x":221.77182522011753,"y":165.94383907016007},{"x":248.55670552223464,"y":153.5239939041783},{"x":259.54403916899946,"y":148.49649582627086},{"x":259.54403916899946,"y":148.49649582627086},{"x":251.5586222372803,"y":151.74130152007558},{"x":205.13069958491323,"y":179.8893856283089},{"x":153.0316410255786,"y":213.73157704852719},{"x":104.6489424255667,"y":253.20693602429827},{"x":68.55824727160373,"y":284.09841291127356},{"x":54.31835247289276,"y":297.83444698510976},{"x":52.57593772088428,"y":300.18204717578544},{"x":60.07772809404453,"y":298.96265023343403},{"x":114.93153973956056,"y":264.2110295215626},{"x":181.8226842564552,"y":225.03239207419537},{"x":246.63171631534186,"y":192.67983773408645},{"x":284.53623515912466,"y":175.47936963029207},{"x":302.52156167572844,"y":167.44677614978423},{"x":306.36125308290536,"y":166.0504958436816},{"x":306.2569579814915,"y":166.1078740032922},{"x":259.2081271298084,"y":193.02083706391318},{"x":203.09829210321632,"y":227.8365497269149},{"x":144.9887256577722,"y":266.6664408942565},{"x":106.58249924410593,"y":299.12692619773793},{"x":86.39261846361877,"y":317.91283679882054},{"x":82.07085057949489,"y":322.5922595857485},{"x":82.07085057949489,"y":322.5922595857485},{"x":116.36453615667233,"y":310.0595017044292},{"x":169.5877859473412,"y":284.58996892803805},{"x":219.55280865141705,"y":261.5155727800887},{"x":260.4265243255945,"y":245.22179407389845},{"x":282.3097996850022,"y":237.90305553655136},{"x":289.15109317750336,"y":236.33801680921889},{"x":289.15109317750336,"y":236.33801680921889},{"x":266.39790809773194,"y":247.38034579220079},{"x":224.0881846544184,"y":273.82031810985103},{"x":180.01790170708645,"y":302.71052246427814},{"x":140.73333274963272,"y":333.3127841016216},{"x":120.33329093904088,"y":352.84998920030006},{"x":114.28043156710503,"y":358.79548985025235},{"x":114.19933607870904,"y":358.9241504498783},{"x":141.4177050101944,"y":348.19954146284886},{"x":186.71555724439656,"y":323.84159546078433},{"x":229.62010535595545,"y":302.6564513206496},{"x":258.4806182642569,"y":290.3529609548706},{"x":273.5404070841231,"y":283.48854278502637},{"x":278.30822872600146,"y":281.8983518547637},{"x":278.30822872600146,"y":281.8983518547637},{"x":270.6024541259006,"y":284.8523250322314},{"x":242.27927803446204,"y":300.14882069402034},{"x":222.08331819074638,"y":312.81254393416526},{"x":209.8844168580137,"y":321.5153950070128},{"x":206.3515371594942,"y":324.8691254740018},{"x":205.47279726772277,"y":326.1071808599441},{"x":205.47279726772277,"y":326.1071808599441},{"x":211.47693846096055,"y":328.65568960331973},{"x":229.00977395817966,"y":329.6576668758393},{"x":229.00977395817966,"y":329.6576668758393}],"brushColor":"#e1f7de","brushRadius":3}],"width":302,"height":463}'
          }
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
