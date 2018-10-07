
console.log('한'.charCodeAt(0).toString(16));
console.log('글'.charCodeAt(0).toString(16));

console.log("--------------------------------------");

console.log(String.fromCharCode(parseInt('\d55c',16)));
console.log(String.fromCharCode(parseInt('\ae00',16)));

console.log("--------------------------------------");

console.log(String.fromCharCode(parseInt('한'.charCodeAt(0).toString(16),16)));
console.log(String.fromCharCode(parseInt('글'.charCodeAt(0).toString(16),16)));


console.log("================================================");


/* 1. 한글 -> 유니코드 */
var korStr = "아이고아이고";
for (var i = 0; i < korStr.length -1; i++) {
//	console.log(i);
	console.log(korStr.charCodeAt(i).toString(16));		
}

console.log("--------------------------------------");

/* 2. 유니코드 -> 한글 */
var uniStr = "\uc785\ub825\ud558\ub294";
//var uniStr = "\d55c\ae00\d55c\ae00\d55c\ae00";   //뭔가.. 이문자열에 문제가 있나?
//유니코드는 총 6글자, 첫글자가 \임을 응용한다.

var uniChar = "";
for (var i = 0; i < uniStr.length; i++) {
	console.log(uniStr);  // 바로 한글로 인식한다 
	console.log(uniStr.length);  // 4개로 바로 인식한다... cmd 에선 바로.... 4글자가 되어서?
	console.log(String.fromCharCode(parseInt('\uc785',16)));  // 출력 ''
	console.log(String.fromCharCode(parseInt('\c785',16)));   // 출력 o


//	console.log(korStr.charCodeAt(i).toString(16));		
}





