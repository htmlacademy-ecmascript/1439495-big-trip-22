(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",l="week",o="month",u="quarter",c="year",d="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,o),r=n-s<0,a=t.clone().add(i+(r?-1:1),o);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:c,w:l,d:a,D:d,h:r,m:s,s:i,ms:n,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",$={};$[y]=h;var g=function(e){return e instanceof w},b=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();$[r]&&(s=r),n&&($[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var l=t.name;$[l]=t,s=l}return!i&&s&&(y=s),s||!i&&y},D=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new w(n)},M=_;M.l=b,M.i=g,M.w=function(e,t){return D(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function h(e){this.$L=b(e.locale,null,!0),this.parse(e)}var m=h.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(e,t){var n=D(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return D(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<D(e)},m.$g=function(e,t,n){return M.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,u=!!M.u(t)||t,p=M.p(e),f=function(e,t){var i=M.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return u?i:i.endOf(a)},v=function(e,t){return M.w(n.toDate()[e].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},h=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case c:return u?f(1,0):f(31,11);case o:return u?f(1,m):f(0,m+1);case l:var $=this.$locale().weekStart||0,g=(h<$?h+7:h)-$;return f(u?_-g:_+(6-g),m);case a:case d:return v(y+"Hours",0);case r:return v(y+"Minutes",1);case s:return v(y+"Seconds",2);case i:return v(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var l,u=M.p(e),p="set"+(this.$u?"UTC":""),f=(l={},l[a]=p+"Date",l[d]=p+"Date",l[o]=p+"Month",l[c]=p+"FullYear",l[r]=p+"Hours",l[s]=p+"Minutes",l[i]=p+"Seconds",l[n]=p+"Milliseconds",l)[u],v=u===a?this.$D+(t-this.$W):t;if(u===o||u===c){var h=this.clone().set(d,1);h.$d[f](v),h.init(),this.$d=h.set(d,Math.min(this.$D,h.daysInMonth())).$d}else f&&this.$d[f](v);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[M.p(e)]()},m.add=function(n,u){var d,p=this;n=Number(n);var f=M.p(u),v=function(e){var t=D(p);return M.w(t.date(t.date()+Math.round(e*n)),p)};if(f===o)return this.set(o,this.$M+n);if(f===c)return this.set(c,this.$y+n);if(f===a)return v(1);if(f===l)return v(7);var h=(d={},d[s]=e,d[r]=t,d[i]=1e3,d)[f]||1,m=this.$d.getTime()+n*h;return M.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),r=this.$H,a=this.$m,l=this.$M,o=n.weekdays,u=n.months,c=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},d=function(e){return M.s(r%12||12,e,"0")},f=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:M.s(l+1,2,"0"),MMM:c(n.monthsShort,l,u,3),MMMM:c(u,l),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,o,2),ddd:c(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:M.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:M.s(a,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:s};return i.replace(v,(function(e,t){return t||h[e]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,p){var f,v=M.p(d),h=D(n),m=(h.utcOffset()-this.utcOffset())*e,_=this-h,y=M.m(this,h);return y=(f={},f[c]=y/12,f[o]=y,f[u]=y/3,f[l]=(_-m)/6048e5,f[a]=(_-m)/864e5,f[r]=_/t,f[s]=_/e,f[i]=_/1e3,f)[v]||_,p?y:M.a(y)},m.daysInMonth=function(){return this.endOf(o).$D},m.$locale=function(){return $[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=b(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},h}(),S=w.prototype;return D.prototype=S,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",o],["$y",c],["$D",d]].forEach((function(e){S[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),D.extend=function(e,t){return e.$i||(e(t,w,D),e.$i=!0),D},D.locale=b,D.isDayjs=g,D.unix=function(e){return D(1e3*e)},D.en=$[y],D.Ls=$,D.p={},D}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class i{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var a=n(484),l=n.n(a);const o="D MMM";function u(e=1,t=100){return Math.floor(e+Math.random()*(t+1-e))}function c(e){return e[u(0,e.length-1)]}function d(e){return e?l()(e).format(o):""}class p{constructor({point:e,offers:t}){this.point=e,this.offers=t}getTemplate(){return function(e,t){const{price:n,dateFrom:i,dateTo:s,destination:r,isFavorite:a,offers:o,type:u}=e;return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="2019-03-18">${d(i)}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${u}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${u} ${r.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="2019-03-18T10:30">${d(i)}</time>\n            &mdash;\n            <time class="event__end-time" datetime="2019-03-18T11:00">${d(s)}</time>\n          </p>\n          <p class="event__duration">${c=i,p=s,l()(p).diff(c,"d")}D</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${n}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${t.offers.map((e=>{if(o.includes(e.id))return`<li class="event__offer">\n                <span class="event__offer-title">${e.title}</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">${e.price}</span>\n              </li>`})).join("")}\n        </ul>\n        <button class="event__favorite-btn ${a?"event__favorite-btn--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`;var c,p}(this.point,this.offers)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const f=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];class v{constructor({point:e,offers:t}){this.point=e,this.offers=t}getTemplate(){return function(e,t){const{price:n,dateFrom:i,dateTo:s,destination:r,offers:a,type:l}=e,o=t.find((e=>e.type===l));return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-1">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${l}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${f.map((e=>`<div class="event__type-item">\n                  <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}" ${e===l?"checked":""}>\n                  <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${e}</label>\n                </div>`)).join("")}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              ${l}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${r.name}" list="destination-list-1">\n            <datalist id="destination-list-1">\n              <option value="Amsterdam"></option>\n              <option value="Geneva"></option>\n              <option value="Chamonix"></option>\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${d(i)}">\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${d(s)}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${n}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Delete</button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </header>\n        <section class="event__details">\n          <section class="event__section  event__section--offers">\n            <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n            <div class="event__available-offers">\n            ${o.offers.map((e=>`<div class="event__offer-selector">\n                <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${e.id}" type="checkbox" name="event-offer-luggage" ${a.includes(e.id)?"checked":""}>\n                <label class="event__offer-label" for="event-offer-luggage-${e.id}">\n                  <span class="event__offer-title">${e.title}</span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">${e.price}</span>\n                </label>\n              </div>`)).join("")}\n            </div>\n          </section>\n\n          <section class="event__section  event__section--destination">\n            <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n            <p class="event__destination-description">${r.description}</p>\n\n            <div class="event__photos-container">\n              <div class="event__photos-tape">\n              ${r.pictures.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`)).join("")}\n              </div>\n            </div>\n          </section>\n        </section>\n      </form>\n    </li>`}(this.point,this.offers)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const h=[{id:1,description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:`https://loremflickr.com/248/152?random=${u()}`,description:"Chamonix"}]},{id:2,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.",name:"Amsterdam",pictures:[{src:`https://loremflickr.com/248/152?random=${u()}`,description:"Amsterdam"}]},{id:3,description:"Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.",name:"Geneva",pictures:[{src:`https://loremflickr.com/248/152?random=${u()}`,description:"Geneva"}]},{id:4,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",name:"Paris",pictures:[{src:`https://loremflickr.com/248/152?random=${u()}`,description:"Paris"}]},{id:5,description:"Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.",name:"London",pictures:[{src:`https://loremflickr.com/248/152?random=${u()}`,description:"London"}]}];function m(){return c(h)}const _=[{id:1,price:1100,dateFrom:new Date("2023-12-20"),dateTo:new Date("2023-12-23"),destination:m(),isFavorite:!1,offers:[1],type:c(f)},{id:2,price:2e3,dateFrom:new Date("2023-12-15"),dateTo:new Date("2023-12-23"),destination:m(),isFavorite:!0,offers:[1],type:c(f)},{id:3,price:100,dateFrom:new Date("2023-12-20"),dateTo:new Date("2023-12-21"),destination:m(),isFavorite:!1,offers:[2,3],type:c(f)},{id:4,price:8100,dateFrom:new Date("2023-12-01"),dateTo:new Date("2023-12-31"),destination:m(),isFavorite:!1,offers:[2],type:c(f)},{id:5,price:1300,dateFrom:new Date("2023-12-19"),dateTo:new Date("2023-12-23"),destination:m(),isFavorite:!0,offers:[1,3],type:c(f)},{id:6,price:600,dateFrom:new Date("2023-10-18"),dateTo:new Date("2023-12-24"),destination:m(),isFavorite:!1,offers:[1,4],type:c(f)}];function y(){return c(_)}const $=[],g=document.querySelector(".trip-events"),b=document.querySelector(".trip-controls__filters"),D=new class{offers=function(){for(let e=0;e<f.length;e++){const t={};t.type=f[e];const n=[];for(let e=1;e<=4;e++)n.push({id:e,title:"Upgrade",price:u(0,1e3)});t.offers=n,$.push(t)}return $}();events=Array.from({length:4},y);getEvents(){return this.events}getOffers(){return this.offers}},M=new class{tripListComponent=new r;constructor(e,t,n){this.listContainer=e,this.filterContainer=t,this.eventsModel=n}init(){this.eventsList=[...this.eventsModel.getEvents()],this.offersList=[...this.eventsModel.getOffers()],t(new i,this.filterContainer),t(new s,this.listContainer),t(this.tripListComponent,this.listContainer),t(new v({point:this.eventsList[0],offers:this.offersList}),this.tripListComponent.getElement());for(let e=1;e<this.eventsList.length;e++){const n=this.offersList.find((t=>t.type===this.eventsList[e].type));t(new p({point:this.eventsList[e],offers:n}),this.tripListComponent.getElement())}}}(g,b,D);M.init()})()})();
//# sourceMappingURL=bundle.c4b8b3bb816ddfd4a0be.js.map