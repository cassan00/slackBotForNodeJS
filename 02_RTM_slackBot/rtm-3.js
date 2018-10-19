// 3. 웹소켓 클라이언트 작성


// 1) 웹소켓 엔드포인트 추출
var client = require('https');		
var WebSocket = require('ws'); 		// 웹소켓 모듈 require
var slackUrl = "https://slack.com/api/rtm.connect?token=xoxb-444533421776-447970011956-BQXf1BIWMZzYAhLhZRdXVakT"

var wsUrl;
var wsClient;		

var request = client.request(slackUrl, function(response){
	console.log(">> My Slack APU res code >> "+request.statusCode);
	
	// data Event ----------------------------------------------------
	response.on('data', function(data){
		// ? : data 값을 디버거로 찍어보고 싶다 어떤 값이 들어있는지..
		json  = JSON.parse(data);	// 응답 데이터는 JSON 타입으로 파싱
		wsUrl = json.url;			// 웹 소켓 중단점 주소 추출
		
		console.log("* WebSocker URL (END POINT) : "+ json.url + "\n");
		console.log("* json self ID : " + json.self.id + "\n");   // connet ID 

		// 2) 웹 소켓 중단점과 커넥팅
		wsClient = new WebSocket(wsUrl); 
		
		// 3) 웹 소켓 이벤트 핸들러를 이용해 슬랙동작 확인 
		// 생성한 wsClient 객체의 on 메소드를 통해 수신 이벤트의 처리
		
		// 3.1) open
		wsClient.on('open', function(message){
			console.log('================ [WebSocket] Connection 성공! ==============');
		});
		// 3.2) message
		wsClient.on('message', function(message){
			console.log('# [SLACK MESSAGE HERE] >>' + message);
		});
		// 3.3) close 
		wsClient.on('close', function(code){
			console.log('================ [WebSocket] disconnected ================' + code);	

			// 4) 특정한 메세지가 수신되었을떄. 채널에 메세지를 전송
			jsonSlackMsg = JSON.parse(message);
			containText = jsonSlackMsg.text;
			if(jsonSlackMsg.type == "message" && (
					//jsonSlackMsg.text.includdes("Hello")
					containText.includdes("Hello") ||  	containText.includdes("안녕")) 		) {
				var botMsg = { 
					"id"      : json.self.id,
					"type"    : "message",
					"channel" : jsonSlackMsg.channel,
					"text"    : "만나서 반가워!"
				};
				// 웹소켓 연결을 통해 slack 상에 메세지 update => send 
				wsClinet.send(JSON.stringify(botMsg));		// Slack Server는 JSON 포멧이므로 파싱

			}

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
# [SLACK MESSAGE HERE] >>{"type": "hello"}
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"message","user":"UD4JCJKNJ","text":"x\uc6a9\uc790\uc758 \uba54\uc138\uc9c0\uc5d0 '\uc548\ub155', 'hello' \ub77c\ub294 \ubb38\uc790\uc5f4\uc774\uc788\uc73c\uba74 \uc0c8\ub85c \uc791\uc131\ud55c \ucf54\ub4dc\uac00 \uc751\ub2f5\ud560 \uac83\uc785\ub2c8\ub2e4.","client_msg_id":"87b94dbb-aebd-4389-a812-fc167f1a3d68","team":"TD2FPCDNU","channel":"DD61HUYKD","event_ts":"1538914469.000100","ts":"1538914469.000100"}
# [SLACK MESSAGE HERE] >>{"type":"desktop_notification","title":"Dev Testing for `S`","subtitle":"DevS","msg":"1538914469.000100","ts":"1538914469.000100","content":"\uc0ac\uc6a9\uc790\uc758 \uba54\uc138\uc9c0\uc5d0 '\uc548\ub155', 'hello' \ub77c\ub294 \ubb38\uc790\uc5f4\uc774\uc788\uc73c\uba74 \uc0c8\ub85c \uc791\uc131\ud55c \ucf54\ub4dc\uac00 \uc751\ub2f5\ud560 \uac83\uc785\ub2c8\ub2e4.","channel":"DD61HUYKD","launchUri":"slack:\/\/channel?id=DD61HUYKD&message=1538914469000100&team=TD2FPCDNU","avatarImage":"https:\/\/secure.gravatar.com\/avatar\/8a4dc7aaee365286c12986b6ee90f335.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0020-192.png","ssbFilename":"knock_brush.mp3","imageUri":null,"is_shared":false,"event_ts":"1538914469.000100"}
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"user_typing","channel":"DD61HUYKD","user":"UD4JCJKNJ"}
# [SLACK MESSAGE HERE] >>{"type":"message","user":"UD4JCJKNJ","text":"\uc785\ub825\ud558\ub294 \ub3d9\uc548\uc5d0\ub3c4 \uc9c0\uc18d\uc801\uc73c\ub85c message EVENT\uac00 \ud638\ucd9c\ub418\uace0\uc787\uc2b5\ub2c8\ub2e4.","client_msg_id":"1d9f5b78-286d-4677-b909-1e74cb8c303f","team":"TD2FPCDNU","channel":"DD61HUYKD","event_ts":"1538914485.000100","ts":"1538914485.000100"}
# [SLACK MESSAGE HERE] >>{"type":"desktop_notification","title":"Dev Testing for `S`","subtitle":"DevS","msg":"1538914485.000100","ts":"1538914485.000100","content":"\uc785\ub825\ud558\ub294 \ub3d9\uc548\uc5d0\ub3c4 \uc9c0\uc18d\uc801\uc73c\ub85c message EVENT\uac00 \ud638\ucd9c\ub418\uace0\uc787\uc2b5\ub2c8\ub2e4.","channel":"DD61HUYKD","launchUri":"slack:\/\/channel?id=DD61HUYKD&message=1538914485000100&team=TD2FPCDNU","avatarImage":"https:\/\/secure.gravatar.com\/avatar\/8a4dc7aaee365286c12986b6ee90f335.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0020-192.png","ssbFilename":"knock_brush.mp3","imageUri":null,"is_shared":false,"event_ts":"1538914486.000100"}




------> 인코딩설정에서 막힘.
text값이 한글이 아니라 유니코드로 날아오고 있어 include 를 타지 않느다.

D:\RBFL\000. workspace\nodeJS\slackbotTest\02_RTM_slackBot>type encodingTest_Uni.txt
이 문서는 unicode이다.

D:\RBFL\000. workspace\nodeJS\slackbotTest\02_RTM_slackBot>type encodingTEST.txt
癤우씠 臾몄꽌??UTF-8?대떎.

=> 윈도우 상에서 만든 text 파일을 정상적으로 읽고있다.


----> 뭐가 문제지?
1. cmd 가 한글을 인식하지 못하거나 특정 인코딩을 해석하지 못함
	=> 유니코드 txt 를 읽어왔으므로 그건 아님 
2. 정상적으로 쏴주지만 어디선가 유니코드로 받아옴?
	=> 소스코드 오류 
3. js 파일이 한글을 출력못함?
	=> 테스트 (O), 소스상 한글 잘 출력함 
4. 그냥 유니코드로 쏴주는게 맞음
	=> 치환하세요




*/




