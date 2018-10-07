


# slackBotForNodeJS 

## 개요
nodeJS를 통해 chatBot 을 만드는 개인프로젝트


## 구성

### 1. > slackBot_01_AI 
 - Api.ai 를 이용한 slackBot 
 - bot.js 실행시 API-KEY로 연결해 놓은 Slack에 존재하는 mimi 봇과 간단한 대화를 나눌수 있다.
 - 테스트로 `x 더하기 y` 까지만 됨
 - 활용자료 : https://speakerdeck.com/kwanlae/slack-bot

 ### 2. > slackBot_02_RTM
  - Slack에서 지원하는 botType 중 `Real time Message` 샘플소스
  - 이 방식은 항시 웹소켓 포트를 열어둬 서버상 부담이 있음
  - 다만 OverHead를 줄이며서 실시간 처리에 적합
  - (개발중)

 ### 3. (Event API)
  - Slack에서 지원하는 botType 중 `Event API` 샘플소스
  - 일반적인 웹 서버형태의 개발
  - 오버헤드가 있더라도 이벤트 단위의 트랜잭션 발생
  - (미작업)
 

## 주의사항
  1. 실제로 사용하려면 배포서버 필요
  2. 해당 소스에 있는 KEY들은 개인이 사용하는 것으로 Slack별, bot 별로 별도의 key를 발급받아써야함. 


-------------------------

## History 

20181005 : init project 
20181007 : 패키지정리, 이전 소스 update, README 작성






