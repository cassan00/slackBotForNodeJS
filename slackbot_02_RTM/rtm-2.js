// 3. 웹소켓 클라이언트 작성


// 1) 웹소켓 엔드포인트 추출
var client = require('https');		
var slackUrl = "https://slack.com/api/rtm.connect?token=xoxb-444533421776-447970011956-BQXf1BIWMZzYAhLhZRdXVakT"
/*
https://slack.com/api/rtm.connect 으로 접속하면 다음 결과를 확인할 수 있다.
{"ok":false,"error":"not_authed"}
*/
var wsUrl;

var request = client.request(slackUrl, function(response){
	console.log(">> My Slack APU res code >> "+request.statusCode);
	response.on('data', function(data){
		json  = JSON.parse(data);	// 응답 데이터는 JSON 타입으로 파싱
		wsUrl = json.url;			// 웹 소켓 중단점 주소 추출
		console.log(">> WebSorcker URL (END POINT)>> "+ json.url + "\n");

		// todo. 2) 웹 소켓 중단점과 커넥팅
		// todo. 3) 웹 소켓 이벤트 핸들러를 이용해 슬랙동작 확인 

	})
})


request.on('error', function(error){
	console.log(error);
})

request.end();



