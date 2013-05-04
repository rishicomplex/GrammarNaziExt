var data=[],pathName=[],hist=[];
function handle(){
	var h=window.data=document.getSelection();
	h.setBaseAndExtent(h.baseNode.parentNode,0,h.extentNode.parentNode,h.extentNode.length-1);
	var s = h.getRangeAt(0);
	var g=s.commonAncestorContainer;
	data=[];
	pathName=[];
	parse(g,h);
	console.log(data);
	hist.push({data:data,pathName:pathName});
	transform(pathName,data);
}
function parse(node,selecton){
	if(node.nodeType == 3){
		stuff = node.textContent.trim();
			if(stuff.length > 3){
				data.push(node.textContent);
				pathName.push(node);
			}
		return;
	}
	for(var i = node.firstChild;i!==null;i=i.nextSibling){
		if(!selecton.containsNode(i)){
			if(i.nodeName !="SCRIPT" && i.nodeName!="LINK" && i.nodeName!="STYLE")
			parse(i,selecton);
		}
		else if(i.nodeType == 3){
			stuff = i.textContent.trim();
			if(stuff.length > 3){
				data.push(i.textContent);
				pathName.push(i);
			}
		}
		else if(i.nodeType == 1){
			if(i.nodeName !="SCRIPT" && i.nodeName!="LINK" && i.nodeName!="STYLE")
			parse(i,selecton);
		}
	}
}
function undoo(){
	if(hist.length == 0) return;
	var t = hist.pop();
	for(var j =0;j<t.pathName.length;j++){
		t.pathName[j].textContent=t.data[j];
	}
}
function transform(pathName,data){
	grandstring = "";
	for(var i=0;i<data.length;i++){
		grandstring = grandstring.concat(data[i]).concat("$$$$");
	}
	runRegExpStr2();
	sendToServer("sree");
}




/*************************************************************************************************************************************************/



function runRegExp() {
	for(var i = 0; i < index; i++) {
		regexp(nodeList[i]);
	}
}


function runRegExpStr2() {
	grandstring = regexpstr2(grandstring);
}

function runRegExpStr() {
	grandstring = regexpstr(grandstring);
}

function regexp(node) {
	//remove shouting
	node.textContent = node.textContent.replace(/([A-Z,']+ [A-Z',\-]+[ A-Z,']*)/g, function(v) { return v.toLowerCase();});
	for(key in regex) {
		node.textContent = node.textContent.replace(regex[key], replacements[key]);
	}
	//separate check for capitalizations
	node.textContent = node.textContent.replace(/([!?.:]\s+[a-z])(?=[^\.\s]* )/g, function(v) { return v.toUpperCase();});
	node.textContent = node.textContent.replace(/([!?.:]\s+[a-z])(?=[^\s]*\.$|[^\s]*\. )/g, function(v) { return v.toUpperCase();});
	node.textContent = node.textContent.replace(/^\s*[a-z](?=[^\.\s]* )/g, function(v) {return v.toUpperCase();}); // don't capitalize urls
	
	
	//database stuff
	
}

function regexpstr2(str) {
	
	//database stuff
	for(key in database) {
		str = str.replace(databasereps[key], database[key]);
	}
	//remove shouting
	str = str.replace(/\b([A-Z?!.,'\-]+\s+[A-Z.,'?!\-]+[ A-Z,.'?!\-]*)/g, function(v) { return v.toLowerCase();});
	for(key in regex) {
		str = str.replace(regex[key], replacements[key]);
	}
	//separate check for capitalizations
	str = str.replace(/[!?.:]\s+(<.*?>)*[a-z](?!\S*\.\S+)/g, function(v) { var str = v.slice(0,v.length-1) + v.slice(v.length-1, v.length).toUpperCase(); return str;});  //capitalize after punctuation
	//str = str.replace(/([!?.:]\s+[a-z])(?=[^\s]*\.$|[^\s]*\. )/g, function(v) {  return v.toUpperCase();});
	str = str.replace(/\$\$\$\$\s*(<.*?>)*[a-z](?!\S*\.\S+)/g, function(v) {var str = v.slice(0,v.length-1) + v.slice(v.length-1, v.length).toUpperCase(); return str;}); // for places of node join
	str = str.replace(/^\s*(<.*?>)*[a-z](?!\S*\.\S+)/g, function(v) {var str = v.slice(0,v.length-1) + v.slice(v.length-1, v.length).toUpperCase(); return str;}); // for start of string
	
	return str;
}

function regexpstr(str) {
	
	//database stuff
	for(key in database) {
		str = str.replace(databasereps[key], "<font color='red' title='" + key + "'>" + database[key] + " </font>");
	}
	//remove shouting
	str = str.replace(/\b([A-Z?!.,'\-]+\s+[A-Z.,'?!\-]+[ A-Z,.'?!\-]*)/g, function(v) { return v.toLowerCase();});
	for(key in regex) {
		str = str.replace(regex[key], replacements[key]);
	}
	//separate check for capitalizations
	str = str.replace(/[!?.:]\s+(<.*?>)*[a-z](?!\S*\.\S+)/g, function(v) { var str = v.slice(0,v.length-1) + v.slice(v.length-1, v.length).toUpperCase(); return str;});  //capitalize after punctuation
	//str = str.replace(/([!?.:]\s+[a-z])(?=[^\s]*\.$|[^\s]*\. )/g, function(v) {  return v.toUpperCase();});
	str = str.replace(/\$\$\$\$\s*(<.*?>)*[a-z](?!\S*\.\S+)/g, function(v) {var str = v.slice(0,v.length-1) + v.slice(v.length-1, v.length).toUpperCase(); return str;}); // for places of node join
	str = str.replace(/^\s*(<.*?>)*[a-z](?!\S*\.\S+)/g, function(v) {var str = v.slice(0,v.length-1) + v.slice(v.length-1, v.length).toUpperCase(); return str;}); // for start of string
	
	return str;
}

database = {
"dat" : "that" ,
"wat" : "what" ,
"iz" : "is" ,
"ya" : "yes" ,
"ma" : "my" ,
"pls" : "please" ,
"plz" : "please" ,
"cum" : "come" ,
"dont" : "don't" ,
"wont" : "won't" ,
"cant" : "can't" ,
"k" : "ok" ,
"haz" : "has" ,
"gal" : "girl" ,
"thx" : "thanks" ,
"tx" : "thanks" ,
"thanx" : "thanks" ,
"alla" : "allah" ,
"y" : "why" ,
"ther" : "there" ,
"dats" : "that's" ,
"coz" : "because" ,
"bs" : "bullshit" ,
"tym" : "time" ,
"lyk" : "like" ,
"bro" : "brother" ,
"wud" : "would" ,
"b" : "be" ,
"gr8" : "great" ,
"wassup" : "what's up",
"u" : "you",
"r" : "are",
"c" : "see",
"cya" : "see you",
"cuz" : "because",
"ssup" : "what's up",
"wazzup" : "what's up",
"ur" : "your",
"cudve" : "could've" ,
"shud" : "should" ,
"kool" : "cool" ,
"shouldve" : "should've" ,
"da" : "the" ,
"gonna" : "going to" ,
"wanna" : "want to" ,
"c'mon" : "come on" ,
"didnt" : "didn't" ,
"l8" : "late" ,
"w8" : "wait" ,
"b4" : "before" ,
"luv" : "love" ,
"wut" : "what" ,
"brb" : "be" ,
"l8r" : "later" ,
"wot" : "what" ,
"2moro" : "tomorrow" ,
"m8" : "mate" ,
"njoy" : "enjoy" ,
"hppy" : "happy" ,
"btw" : "by the way" ,
"wnt" : "want" ,
"2nite" : "tonight" ,
"wz" : "was" ,
"gotta" : "got to" ,
"abt" : "about" ,
"meh" : "me" ,
"frm" : "from" ,
"duz" : "does" ,
"any1" : "anyone" ,
"no1" : "noone" ,
"lyk" : "like" ,
"da" : "the" ,
"ova" : "over" ,
"az" : "as" ,
"wnt" : "want" ,
"cn" : "can" ,
"eva" : "ever" ,
"goin" : "going" ,
"mite" : "might" ,
"nd" : "and" ,
"luvd" : "loved" ,
"nevr" : "never" ,
"b4" : "before" ,
"l8r" : "later" ,
"gr8" : "great" ,
"idk" : "I don't know" ,
"dis" : "this",
"watever" : "whatever",
"usb" : "USB", 
"fml" : "fuck my life",
"iphone" : "iPhone",
"dunno" : "don't know",
"wats" : "what is",
"ppl" : "people",
"its been" : "it's been",
"its pretty" : "it's pretty"
}

databasereps = {};
for(key in database) {
	databasereps[key] = new RegExp("\\b" + key + "(?=[\\s.,?!:])", 'gi');
}

replacements = { 
	//" ([!?,.])[!?,.]*" : "$1", //corrects ends of sentences - trims spaces and extra punctuation
	"([!?,.])+" : "$1", // removing consecutive punctuation
	"\\s*([!?,.])" : "$1", // removing space before punctuation
	"([!?,.:)])(?!com|org|net|edu|in|co\.in)(?=(<.*?>)*\\w*(<.*?>)*\\s)" : "$1 ", //adds space to starting of sentences
	"\\bi([.,?\\s])" : "I$1", //capitalizes Is
	"\\bi'm([.,?\\s])" : "I'm$1", //capitalizes I'ms
	"\\bi've([.,?\\s])" : "I've$1", //capitalizes I'ves
	"\\bi'll([.,?\\s])" : "I'll$1", //capitalizes I'lls
	"([a-vx-zA-VX-Z])\\1{2,}" : "$1$1" //get rid of repeated letters except w
	
	
};
 
regex = {};
for(key in replacements) {
	regex[key] = new RegExp(key, 'g');
}

/*
function getTextNodes(node) {
	var str;
    for(var child = node.firstChild; child; child = child.nextSibling) {
        if(child.nodeType === 3) { // text node
			str = child.textContent.trim();
			if(str.length > 3) {
				regexp(child);
			}
        }
        else if(child.nodeType === 1) { // element node
            getTextNodes(child);
        }
    }
}

getTextNodes(document.body);
*/
grandstring = "";
strings = {};
nodeList = {};
index = 0;
function parser(node){
	var str;
	for(var child = node.firstChild; child; child = child.nextSibling){
		if(child.nodeType == 3){
			str = child.textContent ? child.textContent : "";
			if(str.length > 3){
				strings[index]=str;
				grandstring = grandstring.concat(str).concat("$$$$");
				nodeList[index]=child;
				index++;
			}
		}
		else if(child.nodeType == 1){
			if(child.nodeName !="SCRIPT" && child.nodeName!="LINK" && child.nodeName!="STYLE")
			parser(child);
		}
	}
}

function otherChanges(){
	data = grandstring.split("$$$$");
	for(var i=0;i<pathName.length;i++){
		pathName[i].textContent=data[i];
		var d = document.createElement("span");
		d.innerHTML=data[i];
		pathName[i].textContent="";
		pathName[i].parentNode.insertBefore(d,pathName[i]);
		var t = pathName[i];
		pathName[i] = d.firstChild;
		t.remove();
	}
}
function sendToServer(name) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    grandstring = xmlhttp.responseText;
	if(name == "sree")
	{
	otherChanges();
	}
	else{
	reflectChanges();
	}
    }
  }
var uri = encodeURIComponent(grandstring);
xmlhttp.open("GET","http://gramchecker.appspot.com/?text=" + uri, true);
xmlhttp.send();
}

function reflectChanges() {
	var arr = grandstring.split("$$$$");
	for(var i = 0; i < arr.length - 1; i++) {
		if(nodeList[i].textContent === arr[i])
			continue;
		var d = document.createElement("span");
		//d.title=nodeList[i].textContent;
		d.innerHTML=arr[i];
		nodeList[i].textContent="";
		nodeList[i].parentNode.insertBefore(d,nodeList[i]);
		var t = nodeList[i];
		nodeList[i] = d.firstChild;
		t.remove();
	}
}

function yahooChanges(b){
b.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.innerHTML=grandstring.split("$$")[0];
}

function run(){
	parser(document.body);
	runRegExpStr();
	reflectChanges();
}

document.onreadystatechange=function(){
	if(location.host == "in.answers.yahoo.com" || location.host == "answers.yahoo.com"){
		a=document.getElementsByClassName('answer-details')[0];
		if(a == undefined) return false;
		b = a.cloneNode(true);
		b.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.innerHTML="<font color='red'>GrammerNazi says that your text should be:</font>";
		grandstring=a.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
		runRegExpStr();
		b.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.innerHTML=grandstring;
		a.parentNode.insertBefore(b,a);
	}
}