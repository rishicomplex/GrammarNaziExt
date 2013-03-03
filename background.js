
chrome.tabs.executeScript(null,
      {file:"clicked_script.js"});
function handl(info,tab){
	chrome.tabs.executeScript(null,{code:"handle()"});
}
function undu(info,tab){
	chrome.tabs.executeScript(null,{code:"undoo()"});
}
chrome.contextMenus.create({"title": "Blitzkrieg!", "contexts":["selection"],"onclick": handl});
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(
      null, {code:"run()"});
});