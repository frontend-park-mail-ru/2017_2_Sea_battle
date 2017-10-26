function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function generateLeaderboardView(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (players, title) {;pug_debug_line = 1;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\\Modules\\Views\\BaseMenuView\\BaseMenuHeader.pug";
pug_html = pug_html + "\u003CH1 class=\"viewTitle\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\\Modules\\Views\\BaseMenuView\\BaseMenuHeader.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002FH1\u003E";
;pug_debug_line = 3;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Ctable class=\"leaderTable\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 5;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 6;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Cth class=\"tableHeader\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "Name\u003C\u002Fth\u003E";
;pug_debug_line = 7;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Cth class=\"tableHeader\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "Score\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 9;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 10;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
// iterate players
;(function(){
  var $$obj = players;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var player = $$obj[pug_index0];
;pug_debug_line = 11;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 12;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Cth class=\"contents\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = player.login) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
;pug_debug_line = 13;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Cth class=\"contents\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = player.score) ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var player = $$obj[pug_index0];
;pug_debug_line = 11;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 12;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Cth class=\"contents\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = player.login) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
;pug_debug_line = 13;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + "\u003Cth class=\"contents\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\u002FModules\u002FViews\u002FLeaderboardView\u002FLeaderboardView.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = player.score) ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
;pug_debug_line = 1;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\\Modules\\Views\\BaseMenuView\\BaseMenuFoot.pug";
pug_html = pug_html + "\u003Cdiv class=\"button\" data-id=\"back\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "D:\\Study\\TP\\FrontJohn\\2017_2_Sea_battle\\Data\\Modules\\Views\\BaseMenuView\\BaseMenuFoot.pug";
pug_html = pug_html + "Back\u003C\u002Fdiv\u003E";}.call(this,"players" in locals_for_with?locals_for_with.players:typeof players!=="undefined"?players:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}