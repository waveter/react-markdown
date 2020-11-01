import jsBeautify from 'js-beautify';
listMessage = [];
oldLog = console.log;
console.log = (x) => {
    listMessage.push(x);
}
command = `function test2() {
function test() {a = 1;
a = a +3;
console.log(a);
return a + 5;
}
test();
}
`
oldLog(jsBeautify);
eval(command);
try {
    b = test2();
} catch (e) {
    //oldLog(e);
}
oldLog(listMessage);