function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function generateAboutMenuView(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (text, title) {;pug_debug_line = 1;pug_debug_filename = "\u002Fhome\u002Fjohn\u002FGit\u002F2017_2_Sea_battle\u002FData\u002FModules\u002FViews\u002FBaseMenuView\u002FBaseMenuHeader.pug";
pug_html = pug_html + "\u003CH1 class=\"viewTitle\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "\u002Fhome\u002Fjohn\u002FGit\u002F2017_2_Sea_battle\u002FData\u002FModules\u002FViews\u002FBaseMenuView\u002FBaseMenuHeader.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002FH1\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002Fhome\u002Fjohn\u002FGit\u002F2017_2_Sea_battle\u002FData\u002FModules\u002FViews\u002FAboutMenuView\u002FAboutMenuView.pug";
pug_html = pug_html + "\u003Cdiv class=\"aboutText\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002Fhome\u002Fjohn\u002FGit\u002F2017_2_Sea_battle\u002FData\u002FModules\u002FViews\u002FAboutMenuView\u002FAboutMenuView.pug";
// iterate text
;(function(){
  var $$obj = text;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var line = $$obj[pug_index0];
;pug_debug_line = 5;pug_debug_filename = "\u002Fhome\u002Fjohn\u002FGit\u002F2017_2_Sea_battle\u002FData\u002FModules\u002FViews\u002FAboutMenuView\u002FAboutMenuView.pug";
pug_html = pug_html + "\u003Cdiv class=\"aboutLine\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002Fhome\u002Fjohn\u002FGit\u002F2017_2_Sea_battle\u002FData\u002FModules\u002FViews\u002FAboutMenuView\u002FAboutMenuView.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = line) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var line = $$obj[pug_index0];
;pug_debug_line = 5;pug_debug_filename = "\u002Fhome\u002Fjohn\u002FGit\u002F2017_2_Sea_battle\u002FData\u002FModules\u002FViews\u002FAboutMenuView\u002FAboutMenuView.pug";
pug_html = pug_html + "\u003Cdiv class=\"aboutLine\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002Fhome\u002Fjohn\u002FGit\u002F2017_2_Sea_battle\u002FData\u002FModules\u002FViews\u002FAboutMenuView\u002FAboutMenuView.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = line) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "\u002Fhome\u002Fjohn\u002FGit\u002F2017_2_Sea_battle\u002FData\u002FModules\u002FViews\u002FBaseMenuView\u002FBaseMenuFoot.pug";
pug_html = pug_html + "\u003Cdiv class=\"button\" data-id=\"back\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "\u002Fhome\u002Fjohn\u002FGit\u002F2017_2_Sea_battle\u002FData\u002FModules\u002FViews\u002FBaseMenuView\u002FBaseMenuFoot.pug";
pug_html = pug_html + "Back\u003C\u002Fdiv\u003E";}.call(this,"text" in locals_for_with?locals_for_with.text:typeof text!=="undefined"?text:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}