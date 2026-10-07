/**
 * 브뤼겔 그림찾기 게임: 구글 시트 > 확장 프로그램 > Apps Script 에 붙여넣으세요.
 * 이 코드를 넣은 스프레드시트 자체가 기록 저장소가 됩니다.
 * 웹앱 배포 실행 사용자: 나 / 액세스: 모든 사용자
 */
const SHEET_NAME = '참가결과';
function doPost(e) {
  const lock=LockService.getScriptLock();
  if(!lock.tryLock(10000))return ContentService.createTextOutput('BUSY');
  try{
    const d=JSON.parse(e.postData.contents||'{}');
    const sid=String(d.sessionId||'').slice(0,100);
    const name=String(d.name||'').trim().slice(0,18);
    const score=Number(d.score),correct=Number(d.correct),time=Number(d.correctTimeMs);
    if(!sid||!name||!Number.isInteger(score)||score<0||score>100||score%10!==0||!Number.isInteger(correct)||correct<0||correct>10||score!==correct*10||!Number.isInteger(time)||time<0||time>50000){return ContentService.createTextOutput('INVALID')}
    const ss=SpreadsheetApp.getActiveSpreadsheet();
    let sheet=ss.getSheetByName(SHEET_NAME);
    if(!sheet){sheet=ss.insertSheet(SHEET_NAME);sheet.appendRow(['제출시각','참가ID','이름','점수','정답수','정답 소요시간(ms)']);sheet.setFrozenRows(1)}
    const last=sheet.getLastRow();
    if(last>1){const ids=sheet.getRange(2,2,last-1,1).getValues().flat();if(ids.includes(sid))return ContentService.createTextOutput('DUPLICATE')}
    // 구글 시트 수식 삽입 공격 방지: 이름을 항상 텍스트로 저장
    const safeName=/^[=+\-@]/.test(name)?"'"+name:name;
    sheet.appendRow([new Date(),sid,safeName,score,correct,time]);
    return ContentService.createTextOutput('OK');
  }catch(err){return ContentService.createTextOutput('ERROR')}
  finally{lock.releaseLock()}
}
/** 상위 10명: 점수 내림차순, 정답 소요시간 오름차순, 제출시각 오름차순.
 * 같은 이름 여러 번 참여 시 가장 좋은 기록만 남깁니다.
 * 앱스 스크립트 편집기에서 showTop10 실행 후 실행 로그에서 확인하세요.
 */
function showTop10(){
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
 if(!sheet||sheet.getLastRow()<2){Logger.log('아직 참가 기록이 없습니다.');return}
 const rows=sheet.getRange(2,1,sheet.getLastRow()-1,6).getValues();
 const better=(a,b)=>b[3]-a[3]||a[5]-b[5]||new Date(a[0])-new Date(b[0]);
 const best=new Map();
 for(const row of rows){const k=String(row[2]).trim();if(!best.has(k)||better(row,best.get(k))<0)best.set(k,row)}
 const top=[...best.values()].sort(better).slice(0,10);
 Logger.log(top.map((r,i)=>`${i+1}위 / ${r[2]} / ${r[3]}점 / ${r[5]}ms`).join('\n'));
}
