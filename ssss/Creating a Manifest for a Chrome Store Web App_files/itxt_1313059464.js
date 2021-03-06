/* This source code is Copyright (c) Vibrant Media 2001-2011 and forms part of the patented Vibrant Media product "IntelliTXT" (sm). */ 
$iTXT.js.loader["$iTXT.itxt.Controller"]=true;$iTXT.itxt.Controller_Load=function(){var undefined;var $itxtUtil=$iTXT.core.Util;$iTXT.itxt.Controller=$iTXT.core.Class.create({templateLoadUnSubFunc:null,jsLoadUnSubFunc:null,initialiserLoaded:false,templatesLoaded:false,requiresContextualization:false,skipRecontext:false,limitClientParams:[],init:function(_options)
{$iTXT.js.modAdTypes=true;$iTXT.itxt.currentController=this;var tmpDispArr=[];$iTXT.subscribe("$iTXT:tmpl:load",$iTXT.core.Event.bind(this,this.templatesLoad),tmpDispArr);this.templateLoadUnSubFunc=tmpDispArr.pop();$iTXT.core.$(document).itxtSubscribe("$iTXT:controller:livelookup",$iTXT.core.Event.bind(this,this.dropLiveLookup));if(!$iTXT.js.librariesLoaded)
{$iTXT.core.$(document).itxtSubscribe("$iTXT:js:load",$iTXT.core.Event.bind(this,this.librariesLoad),tmpDispArr);this.jsLoadUnSubFunc=tmpDispArr.pop();}
else
{this.librariesLoad();}
if(!window.onunload)
{window.onunload=function(){};}},librariesLoad:function()
{if('function'==typeof this.jsLoadUnSubFunc)
{this.jsLoadUnSubFunc();}
$iTXT.debug.info($iTXT.debug.Category.GENERAL,"Libraries Loaded");$iTXT.fire("$iTXT:libraries:loaded",this);$iTXT.subscribe("$iTXT:hooks:loaded",$iTXT.core.Event.bind(this,this.hooksLoaded));if(!$iTXT.js.qaol||$iTXT.js.pageLoaded)
{$iTXT.debug.info($iTXT.debug.Category.GENERAL,"QAOL is FALSE. Kicking Off!");this.kickOff();}
else
{$iTXT.debug.info($iTXT.debug.Category.GENERAL,"QAOL is TRUE. Checking for window.onload function!");var oldOnload=null;if(window.onload)
{$iTXT.debug.info($iTXT.debug.Category.GENERAL,"Overriding Page window.onload function!");oldOnload=window.onload;}
var t=this;window.onload=function()
{$iTXT.debug.info($iTXT.debug.Category.GENERAL,"Window.OnLoad()!");if(null!=oldOnload)
{oldOnload(arguments);}
t.kickOff();}}},kickOff:function()
{new $iTXT.metrics.Events();$iTXT.fire("$iTXT:metrics:evt",{n:"ll"});this.dropInitialiser();},dropInitialiser:function()
{if($iTXT.js.serverUrl&&$iTXT.cnst.CONTROLLER_INITIALISER)
{var initialiserUrl=$iTXT.js.serverUrl+$iTXT.cnst.CONTROLLER_INITIALISER+"?ts="+$itxtUtil.ts();$iTXT.data.Dom.detectSearchEngines();initialiserUrl+=this._buildSearchEngineParams();if(undefined==this.contentLength)
{this.contentLength=0;try
{this.contentLength=$itxtUtil.convertSpaces($itxtUtil.cleanString($itxtUtil.getInnerText(document.body,$iTXT.js.domTO))).length;}
catch(e)
{this.contentLength=-1;}}
initialiserUrl+="&pagecl="+this.contentLength;var encoding=$itxtUtil.getContentEncoding();if(encoding&&''!=encoding)
{initialiserUrl+="&enc="+encoding;}
initialiserUrl+="&fv="+$iTXT.core.Flash.version.major;initialiserUrl+="&muid=";if(this.limitClientParams&&this.limitClientParams.length>0)
{initialiserUrl+="&lcp="+encodeURIComponent(this.limitClientParams.join(','));}
if(!$iTXT.js.pageRef)
{var refurl=($iTXT.glob&&$iTXT.glob.params)?$iTXT.glob.params.get('refurl',document.location.href):document.location.href;initialiserUrl+="&refurl="+encodeURIComponent(refurl);}
initialiserUrl+="&"+$iTXT.js.pageQuery;$iTXT.fire("$iTXT:initialiser:drop",this);$iTXT.debug.info($iTXT.debug.Category.GENERAL,"Dropping Initialiser: ");$itxtUtil.dropScript(initialiserUrl,$iTXT.core.Event.bind(this,this.initialiserLoad));}},initialiserLoad:function(cbr)
{$iTXT.fire("$iTXT:initialiser:loaded",this);$iTXT.debug.info($iTXT.debug.Category.GENERAL,"Initialiser Loaded");$iTXT.glob.newTooltipChrome=1;if(cbr)
{new $iTXT.data.Channel();$iTXT.js.requiresContextualization=cbr.requiresContextualization;$iTXT.js.chunkKey=cbr.chunkKey;$iTXT.js.requiresAdverts=cbr.requiresAdverts;var isDraggable=$iTXT.glob.params.getBool("drag",1);var useMobile=false;var isPlatform=$iTXT.core.Browser.isPlatform(["iOS/iPhone","iOS/iPad","iOS/iPod","Android"]);var isForced=$iTXT.glob.params.getBool("tt.force.mobile",false);var isChromeOn=$iTXT.glob.params.getBool("js.mob.chrome.on",true);if((isPlatform||isForced)&&isChromeOn)
{if($iTXT.core.Browser.supportsFeature('cssgradients','cssborderradius')||$iTXT.glob.params.get("tt.force.mobile",false))
{useMobile=true;}}
if(undefined==$iTXT.ui.tt)
{if(useMobile)
{$iTXT.ui.tt=new $iTXT.ui.MobileTooltip({draggable:isDraggable});}
else
{$iTXT.ui.tt=new $iTXT.ui.Tooltip({draggable:isDraggable});}
this.ttHolder=$iTXT.core.Builder.make("DIV",{id:"itxtttholder",style:"z-index: 9900000; position: absolute; top: 0; left:0;"},[$iTXT.ui.tt.rootElement]);document.body.appendChild(this.ttHolder);$iTXT.ui.tt.build();}
$iTXT.data.PixelController.init();$iTXT.glob.params.set("server",$iTXT.data.al.server,$iTXT.cnst.WEIGHTING_CHANNEL_DEFAULT);var ldr=$iTXT.glob.params.get("ldr","0");if("1"==ldr&&''!=document.referrer)
{var mtOpts={mt:56,mv:document.referrer,advert:{params:$iTXT.glob.params}};$iTXT.fire("$iTXT:data:log:monitor",mtOpts);}
this.initialiserLoaded=true;$iTXT.fire("$iTXT:metrics:evt",{n:"intl"});$iTXT.data.Country.init($iTXT.glob.params.get("cc","en"));$iTXT.glob.params.set("so",$iTXT.cnst.Source.ITXT,$iTXT.cnst.WEIGHTING_CAMPAIGN_DEFAULT);if(!this.skipRecontext)
{$iTXT.js.pageContextualized=1;if(!!window.Worker)
{$iTXT.data.Context.getContent();}
else
{$iTXT.data.Context.getContent();}
if($iTXT.glob.params.get('context.timeout.log',-1)>0&&$iTXT.data.Context.timedOut)
{var mtOpts={mt:116,mv:$iTXT.data.Context.lastTimeOut,mv2:$iTXT.data.Context.getProcessedPercentage(),advert:{params:$iTXT.glob.params}};$iTXT.fire("$iTXT:data:log:monitor",mtOpts);}
if($iTXT.js.requiresContextualization)
{if($iTXT.data.Context.timedOut)
{$iTXT.debug.info($iTXT.debug.Category.CONTEXT,"Contextualisation timed out. Do not send any data.");this.dropAdvertiser();}else{this.dropContextualizer();}}
else
{if($iTXT.js.requiresAdverts)
{this.advertiserLoad();}}}}},dropContextualizer:function()
{if($iTXT.js.serverUrl&&$iTXT.cnst.CONTROLLER_CONTEXTUALIZER)
{this.getRelatedContentDetails();$iTXT.fire("$iTXT:metrics:evt",{n:"contint",t:'interval'});var contextualizerUrl=$iTXT.js.serverUrl+$iTXT.cnst.CONTROLLER_CONTEXTUALIZER+"?ts="+$itxtUtil.ts();contextualizerUrl+=this._buildSearchEngineParams();var extraPrms=["dfr","rc.a.d","rc.a.t","rc.a.st"];contextualizerUrl+=this._buildQueryParams($iTXT.glob.params,extraPrms);contextualizerUrl+="&pagecl="+this.contentLength;var tree=$iTXT.data.Context.tree;if($iTXT.data.Context.treeObjectMode)
{tree=$itxtUtil.serialiseJSON(tree,$iTXT.data.Context.allowedFields);}
contextualizerUrl+='&jsoncl='+tree.length;contextualizerUrl+='&ppc='+$iTXT.data.Context.getProcessedPercentage();contextualizerUrl+="&hn="+$iTXT.data.Context.textNodes.length;if($iTXT.data.Context.pageTitle){contextualizerUrl+="&ttxt="+encodeURIComponent($iTXT.data.Context.pageTitle);}
var opts={url:contextualizerUrl,callback:$iTXT.core.Event.bind(this,this.contextualizerLoad),data:tree}
$iTXT.fire("$iTXT:contextualizer:drop",this);$iTXT.debug.info($iTXT.debug.Category.GENERAL,"Drop Contextualiser");$iTXT.core.Ajax.postData(opts);}},contextualizerLoad:function()
{$iTXT.debug.info($iTXT.debug.Category.GENERAL,"Contextualiser Loaded");$iTXT.fire("$iTXT:contextualizer:loaded",this);$iTXT.fire("$iTXT:metrics:evt",{n:"contint"});$iTXT.fire("$iTXT:metrics:evt",{n:"contl"});if($iTXT.js.requiresAdverts)
{this.dropAdvertiser();}},dropAdvertiser:function()
{if($iTXT.js.serverUrl&&$iTXT.cnst.CONTROLLER_ADVERTISER)
{$iTXT.fire("$iTXT:metrics:evt",{n:"advint",t:'interval'});var advertiserUrl=$iTXT.js.serverUrl+$iTXT.cnst.CONTROLLER_ADVERTISER+"?ts="+$itxtUtil.ts();var extraPrms=["ign86"];advertiserUrl+=this._buildQueryParams($iTXT.glob.params,extraPrms);$iTXT.fire("$iTXT:advertiser:drop",this);$iTXT.debug.info($iTXT.debug.Category.GENERAL,"Drop Advertiser");$itxtUtil.dropScript(advertiserUrl,$iTXT.core.Event.bind(this,this.advertiserLoad));}},advertiserLoad:function()
{$iTXT.debug.info($iTXT.debug.Category.GENERAL,"Advertiser Loaded");$iTXT.fire("$iTXT:advertiser:loaded",this);$iTXT.fire("$iTXT:metrics:evt",{n:"advint"});$iTXT.fire("$iTXT:metrics:evt",{n:"advl"});$iTXT.tmpl.check();},templatesLoad:function()
{$iTXT.debug.info($iTXT.debug.Category.GENERAL,"Templates Loaded");this.templatesLoaded=true;if('function'==typeof this.templateLoadUnSubFunc)
{this.templateLoadUnSubFunc();}
$iTXT.fire("$iTXT:metrics:evt",{n:"tl"});$iTXT.ui.HookManager.execute();},_buildQueryParams:function(pms,extraKeys)
{var retStr="";var cnst=$iTXT.cnst.Params;var keys=[cnst.REF,cnst.REF_MD5,cnst.UID,cnst.UID_MD5,"ipid","cc","rcc","reg","dma","city","auat","fo",["did","a.did"],["syid","a.syid"],["pid","a.pid"],"eat","dat","sest","seid","sehs","ugoogle"];extraKeys=extraKeys||[];keys=keys.concat(extraKeys);retStr+="&"+$itxtUtil.generateQueryString(keys,pms);return retStr;},_buildSearchEngineParams:function()
{var rs="";if($iTXT.js.SearchEngineSettings.current)
{rs+="&sest="+$iTXT.js.SearchEngineSettings.current.sest;rs+="&seid="+$iTXT.js.SearchEngineSettings.current.seid;rs+="&sehs="+$iTXT.js.SearchEngineSettings.current.sehs;}
return rs;},getRelatedContentDetails:function()
{var tObj=$iTXT.glob.params.get("iet");var tObjIdx=$iTXT.glob.params.get("ieto",1);var sObj=$iTXT.glob.params.get("ies");var sObjIdx=$iTXT.glob.params.get("ieso",1);var dObj=$iTXT.glob.params.get("ied");var dObjIdx=$iTXT.glob.params.get("iedo",1);var title=undefined;var subtitle=undefined;var date=undefined;if(dObj)
{var dateTag=$iTXT.data.Dom.getElementByTagName(dObj,dObjIdx-1);if(dateTag)
{date=$itxtUtil.getText(dateTag);}
else
{dateTag=$iTXT.data.Dom.getElementByClassName(dObj,dObjIdx-1);if(dateTag)
{date=$itxtUtil.getText(dateTag);}}}
if(tObj)
{var titleTag=$iTXT.data.Dom.getNodeByTagClassOrId(tObj,tObjIdx-1);if(titleTag)
{title=$itxtUtil.getText(titleTag);}}
if(sObj)
{var sTitleTag=$iTXT.data.Dom.getNodeByTagClassOrId(sObj,sObjIdx-1);if(sTitleTag)
{subtitle=$itxtUtil.getText(sTitleTag);}}
var w=$iTXT.cnst.WEIGHTING_DEFAULT_CHANNEL;$iTXT.glob.params.set("rc.a.d",date,w);$iTXT.glob.params.set("rc.a.t",title,w);$iTXT.glob.params.set("rc.a.st",subtitle,w);},dropTimeoutID:-1,scriptDropped:false,hooksLoaded:function(e)
{var hks=e.data||[];if(hks.length>0)
{$iTXT.subscribe("$iTXT:ad:view",$iTXT.core.Event.bind(this,this.adView));$iTXT.debug.info($iTXT.debug.Category.GENERAL,"<b>Dropping Channel Script Src In 7 Seconds</b>");var t=this;this.dropTimeoutID=setTimeout(function(){t.dropSS();},7000);}
else
{this.dropSS();}},adView:function(e)
{if(!this.scriptDropped)
{var ad=e.data||null;if(ad)
{if(-1!=this.dropTimeoutID)
{$iTXT.debug.info($iTXT.debug.Category.GENERAL,"<b>Cancelled dropping channel script src</b>");clearTimeout(this.dropTimeoutID);}
var script=ad.params.get("scriptsrc");if(script)
{$iTXT.debug.info($iTXT.debug.Category.GENERAL,"<b>Dropping Advert Script Src</b>");this.dropSS(unescape(script));}}}},dropSS:function(s)
{s=s||$iTXT.glob.params.get("scriptsrc");if('string'==typeof s&&s.indexOf("http:"!=-1))
{$iTXT.debug.info($iTXT.debug.Category.GENERAL,"<b>Dropping Script Src: "+s+"</b>");$itxtUtil.dropScript(s);this.scriptDropped=true;}}});if(undefined==$iTXT.itxt.currentController)
{new $iTXT.itxt.Controller();}}
$iTXT.js.loader["$iTXT.itxt.GoogleAnalytics"]=true;var _gaq=_gaq||[];$iTXT.itxt.GoogleAnalytics_Load=function()
{var undefined;$iTXT.itxt.GoogleAnalytics=$iTXT.core.Class.create({gaID:"",trackerName:"",initialGAQueue:[],gaReady:false,init:function(_options)
{this.gaID=_options.gaID||"";this.trackerName=_options.trackerName||"";if(undefined==window._gat)
{var src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';$iTXT.debug.info($iTXT.debug.Category.GOOGLEANALYTICS,"Google Analytics Does Not Exist Already, Dropping Script: "+src);$iTXT.core.Util.dropScript(src);}
var t=this;_gaq.push
(function()
{$iTXT.debug.info($iTXT.debug.Category.GOOGLEANALYTICS,"<b>Google Analytics "+t.trackerName+" Ready!!</b>");t.ready();});switch(this.trackerName)
{case"itxt":break;case"adtypeXX":break;default:$iTXT.core.$(document).itxtBatchSubscribe([["$iTXT:hook:click",$iTXT.core.Event.bind(this,this._hookClick)],["$iTXT:tt:click",$iTXT.core.Event.bind(this,this._ttClick)],["$iTXT:tt:open",$iTXT.core.Event.bind(this,this._ttOpen)],["$iTXT:tt:mouse:over",$iTXT.core.Event.bind(this,this._ttOver)],["$iTXT:tt:close",$iTXT.core.Event.bind(this,this._ttCls)],["$iTXT:tt:close:btn:click",$iTXT.core.Event.bind(this,this._ttCloseClick)],["$iTXT:tt:what:btn:click",$iTXT.core.Event.bind(this,this._ttWhatsClick)],["$iTXT:tt:vmlogo:click",$iTXT.core.Event.bind(this,this._ttWhatsClick)],["$iTXT:tt:hdr:mouse:down",$iTXT.core.Event.bind(this,this._ttMoved)]]);break;}},ready:function()
{this.gaReady=true;$iTXT.debug.info($iTXT.debug.Category.GOOGLEANALYTICS,"Setting Up Initial Tracker, "+this.trackerName+", for the account "+this.gaID);var gaSampleRate=$iTXT.glob.params.get('ga.samplerate','1');_gat._createTracker(this.gaID,this.trackerName);_gaq.push([this.trackerName+'._setDomainName','none']);_gaq.push([this.trackerName+'._setAllowLinker',true]);_gaq.push([this.trackerName+'._setAllowHash',false]);_gaq.push([this.trackerName+'._setSampleRate',gaSampleRate]);_gaq.push([this.trackerName+'._trackPageview',document.location.href]);_gaq.push([this.trackerName+'._setCustomVar',1,"IPID",$iTXT.js.ipid+" - "+document.location.hostname]);_gaq.push([this.trackerName+'._setCustomVar',2,"Vertical",$iTXT.js.verticalId]);for(var i=0;i<this.initialGAQueue.length;i++)
{var eventDetails=this.initialGAQueue[i];this._logEvent(eventDetails[0],eventDetails[1]);}
if(this.trackerName=="itxt")
{this._pageHit();}},_logEvent:function(name,data,adType)
{if(adType&&this.trackerName.replace(/adtype/gi,"")!=adType)
{return;}
if(true===this.gaReady)
{$iTXT.debug.info($iTXT.debug.Category.GOOGLEANALYTICS,"Logging Google Analytics Event for "+this.trackerName+" ("+name+", "+$iTXT.core.Util.serialiseJSON(data)+")");var evtObj=[this.trackerName+"."+name];if($iTXT.core.Util.isArray(data))
{evtObj=evtObj.concat(data);}
else
{evtObj.push(data);}
_gaq.push(evtObj);}
else
{$iTXT.debug.info($iTXT.debug.Category.GOOGLEANALYTICS,"Internally Queuing Early Google Analytics Event ("+name+", "+$iTXT.core.Util.serialiseJSON(data)+")");this.initialGAQueue.push([name,data]);}},_pageHit:function(e)
{this._logEvent("_trackEvent",["Network Insights","Page Hit"],"itxt");},_hookClick:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{this._logEvent("_trackEvent",[ad.params.get("iono"),"KW Click",ad.hook.keyword],ad.params.get("A.AT"));}},_ttOpen:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{this._logEvent("_trackEvent",[ad.params.get("iono"),"Ad View",ad.hook.keyword],ad.params.get("A.AT"));}},_ttClick:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{this._logEvent("_trackEvent",[ad.params.get("iono"),"Unit Click",ad.hook.keyword],ad.params.get("A.AT"));}},_ttOver:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad&&!ad.gaMoused)
{this._logEvent("_trackEvent",[ad.params.get("iono"),"Unit Mouseover",ad.hook.keyword],ad.params.get("A.AT"));}
ad.gaMoused=true;},_ttCls:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{ad.gaMoused=false;}},_ttMoved:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{this._logEvent("_trackEvent",[ad.params.get("iono"),"Unit Drag",ad.hook.keyword],ad.params.get("A.AT"));}},_ttCloseClick:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{this._logEvent("_trackEvent",[ad.params.get("iono"),"Close Click",ad.hook.keyword],ad.params.get("A.AT"));}},_ttWhatsClick:function(e)
{var o=e.data||{};var ad=o.advert||$iTXT.ui.tt.currentAdvert;if(ad)
{this._logEvent("_trackEvent",[ad.params.get("iono"),"WhatsThis Click",ad.hook.keyword],ad.params.get("A.AT"));}}});$iTXT.data.GoogleAnalyticsController={init:function()
{$iTXT.core.$(document).itxtBatchSubscribe([["$iTXT:advertiser:loaded",$iTXT.core.Event.bind(this,this.kickOffAdTypeTrackers)],["$iTXT:initialiser:drop",$iTXT.core.Event.bind(this,this.kickOffPageViewTracker)]]);},kickOffPageViewTracker:function()
{if($iTXT.js.gaPageViewTracker){var tracker=new $iTXT.itxt.GoogleAnalytics({trackerName:'itxt',gaID:$iTXT.js.gaPageViewTracker});}
else
{$iTXT.debug.info($iTXT.debug.Category.GOOGLEANALYTICS,"Page View tracker is not set.");}},kickOffAdTypeTrackers:function()
{if(true==$iTXT.js.gaEnabled)
{var trackers=$iTXT.js.gaTrackingIds;var alltrackers="";for(var t in trackers)
{for(var at in $iTXT.data.AdvertManager.ads)
{if($iTXT.data.AdvertManager.ads[at].params.get("A.AT")==t.replace(/adtype/gi,""))
{var tracker=new $iTXT.itxt.GoogleAnalytics({trackerName:t,gaID:trackers[t]});break;}}
alltrackers+="{"+t+": "+trackers[t]+"}, ";}
$iTXT.debug.info($iTXT.debug.Category.GOOGLEANALYTICS,"All available ad type trackers: ["+alltrackers+"]");}
else
{$iTXT.debug.info($iTXT.debug.Category.GOOGLEANALYTICS,"Google Analtics is turned off");}}};$iTXT.data.GoogleAnalyticsController.init();};