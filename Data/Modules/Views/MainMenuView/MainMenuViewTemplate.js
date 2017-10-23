function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function generateMainMenuView(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (menus, title) {;pug_debug_line = 1;pug_debug_filename = "D:\\Study\\TP\\Front\\2017_2_Sea_battle\\Data\\Modules\\Views\\BaseMenuView\\BaseMenuHeader.pug";
pug_html = pug_html + "\u003CH1 class=\"viewTitle\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "D:\\Study\\TP\\Front\\2017_2_Sea_battle\\Data\\Modules\\Views\\BaseMenuView\\BaseMenuHeader.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002FH1\u003E";
;pug_debug_line = 3;pug_debug_filename = "D:\\Study\\TP\\Front\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FMainMenuView\u002FMainMenuView.pug";
// iterate menus
;(function(){
  var $$obj = menus;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var menu = $$obj[pug_index0];
;pug_debug_line = 4;pug_debug_filename = "D:\\Study\\TP\\Front\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FMainMenuView\u002FMainMenuView.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"button\""+pug_attr("data-id", menu.id, true, false)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "D:\\Study\\TP\\Front\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FMainMenuView\u002FMainMenuView.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = menu.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var menu = $$obj[pug_index0];
;pug_debug_line = 4;pug_debug_filename = "D:\\Study\\TP\\Front\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FMainMenuView\u002FMainMenuView.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"button\""+pug_attr("data-id", menu.id, true, false)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "D:\\Study\\TP\\Front\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FMainMenuView\u002FMainMenuView.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = menu.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);
}.call(this,"menus" in locals_for_with?locals_for_with.menus:typeof menus!=="undefined"?menus:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}