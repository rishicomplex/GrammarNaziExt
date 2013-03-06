import urllib2
import urllib
import  xml.dom.minidom as dom


import cherrypy

from google.appengine.ext.webapp.util import run_wsgi_app


def removeNonAscii(s): 
    return "".join(i for i in s if ord(i)<128)



def getCorrectedText(text=" "):
    lang = 'en'
    caps ="1"
    digits = "1"

    text =removeNonAscii(text.replace("$$$$", " $$$$ "))
    print "INPUT"
    print text
    print "RESPONSE"

    body =u'<?xml version="1.0" encoding="utf-8" ?>'
    body += u'<spellrequest textalreadyclipped="0" ignoredubs="1" ignoredigits="'+digits+u'" ignoreallcaps="'+caps+u'">'
    body += u"<text>"+text+u"</text>";
    body += u'</spellrequest>';


    url = "https://www.google.com/tbproxy/spell?lang="+lang;

    headers = { 'content-type': 'application/json; charset=utf-8' }

    req = urllib2.Request(url, body , headers)
    response = None
    while(not response):
        response = urllib2.urlopen(req)

    the_page = response.read()

   


    xml = dom.parseString(the_page)
    corrections = xml.getElementsByTagName('c');

    delta = 0
    for correction in corrections:
        start = int(correction.getAttribute('o'))
        length =int( correction.getAttribute('l'))
        correct_word= correction.childNodes[0].data.split('\t')[0]
        
        start = start + delta
        original_word= text[start:start+length]
        correct_word = "<font title='"+original_word+"'color='red'>"+correct_word+"</font>"
        text = text[:start] + correct_word +text[start+length:]
        delta += len(correct_word) - length
        
    
    
    corrected_string = text.replace(" $$$$ " , "$$$$")
    print "OUTPUT"
    print corrected_string
    return corrected_string
    
        
class Root():
    @cherrypy.expose
    def index(self, text=""):
        if text == "":
            return "Welcome to GrammarNazi. Chrome Extension coming up. Please be patient :) "
        else:
            return getCorrectedText(text)




app = cherrypy.tree.mount(Root(), '/')
run_wsgi_app(app)
