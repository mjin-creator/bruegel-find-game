브뤼겔 숨은 장면 찾기 - 사용자 제공 10문제 반영판

[구성]
- index.html : 메인 화면
- app.js : 게임 로직
- style.css : 디자인
- config.js : 결과 전송 URL 설정
- GoogleAppsScript.gs : Google Sheets 연동용 스크립트
- assets/full01~full10 : 문제별 전체 그림
- assets/q01~q10 : 문제별 확대 그림

[특징]
- 이름 입력 후 시작
- 10문제 랜덤 출제
- 문제당 5초 제한
- 문제마다 다른 전체 그림 사용 가능
- 맞히면 10점, 틀리면 자동 다음 문제
- 결과는 점수 / 정답 수 / 정답 소요시간 저장
- 같은 점수면 정답 소요시간이 짧은 사람이 상위 순위

[배포 방법]
1) 압축을 풀고 GitHub 저장소에 업로드
2) GitHub Pages 활성화
3) 생성된 주소를 QR 코드로 제작하여 전시장에 비치

[전체 결과를 한곳에 모으는 방법]
1) Google Sheets 새 파일 생성
2) 앱스 스크립트 열기
3) GoogleAppsScript.gs 내용 붙여넣기
4) 웹 앱으로 배포 후 URL 복사
5) config.js 의 submissionUrl에 붙여넣기

예시:
window.QUIZ_CONFIG = {{ submissionUrl: 'https://script.google.com/macros/s/배포주소/exec' }};

[주의]
- config.js 가 빈 문자열이면 현재 기기에서만 저장되는 시연 모드입니다.
- 상품 지급용 실제 행사라면 이름만 받기보다 '이름 + 번호' 방식도 추천합니다.
- 업로드하신 그림을 기준으로 문제 좌표를 반영했습니다. 현장 테스트 후 허용 범위를 더 넓히거나 좁힐 수 있습니다.