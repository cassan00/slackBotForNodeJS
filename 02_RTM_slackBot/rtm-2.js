// 3. 웹소켓 클라이언트 작성


// 1) 웹소켓 엔드포인트 추출
var client = require('https');		
var WebSocket = require('ws'); 		// 웹소켓 모듈 require
var slackUrl = "https://slack.com/api/rtm.connect?token=xoxb-444533421776-447970011956-BQXf1BIWMZzYAhLhZRdXVakT"

var wsUrl;
var wsClient;		

var request = client.request(slackUrl, function(response){
	console.log(">> My Slack APU res code >> "+request.statusCode);
	response.on('data', function(data){
		json  = JSON.parse(data);	// 응답 데이터는 JSON 타입으로 파싱
		wsUrl = json.url;			// 웹 소켓 중단점 주소 추출
		console.log(">> WebSorcker URL (END POINT)>> "+ json.url + "\n");

		// 2) 웹 소켓 중단점과 커넥팅
		wsClient = new WebSocket(wsUrl); 
		
		// 3) 웹 소켓 이벤트 핸들러를 이용해 슬랙동작 확인 
		// 생성한 wsClient 객체의 on 메소드를 통해 수신 이벤트의 처리
		
		// 3.1) open
		wsClient.on('open', function(message){
			console.log('================ [WebSocket] Connection Established ==============');
		});
		// 3.2) message
		wsClient.on('message', function(message){
			console.log('# [SLACK MESSAGE HERE] >>' + message);
		});
		// 3.3) close 
		wsClient.on('close', function(code){
			console.log('================ [WebSocket] disconnected ================' + code);	
		});
		// 3.4) error
		wsClient.on('error', function(error){
			console.log('# [WebSoret] Error >> '+error.code);
		});


	})
})


request.on('error', function(error){
	console.log(error);
})

request.end();




/* 
[실행결과]
================ [WebSocket] Connection Established ==============
# [SLACK MESSAGE HERE] >>{"type": "hello"}   // 최초연결시 환영메세지



Apps > 메메 에 메세지를 보내면
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"message","user":"UD4JCJKNJ","text":"\uc74c..","client_msg_id":"b5cb508f-d9dc-474b-a8e9-74c7b545ad5f","team":"TD2FPCDNU","channel":"DD61HUYKD","event_ts":"1538912819.000100","ts":"1538912819.000100"}
# [SLACK MESSAGE HERE] >>{"type":"desktop_notification","title":"Dev Testing for `S`","subtitle":"DevS","msg":"1538912819.000100","ts":"1538912819.000100","content":"\uc74c..","channel":"DD61HUYKD","launchUri":"slack:\/\/channel?id=DD61HUYKD&message=1538912819000100&team=TD2FPCDNU","avatarImage":"https:\/\/secure.gravatar.com\/avatar\/8a4dc7aaee365286c12986b6ee90f335.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0020-192.png","ssbFilename":"knock_brush.mp3","imageUri":null,"is_shared":false,"event_ts":"1538912819.000100"}

확인가능


=> 이때 팀, 채널, 사용자 고유의 값은 고유값(암호화)으로 표기되기 대문에 SlcakEvent를 활용해야함.
*/
