(self.webpackChunkakcssc_expo_website=self.webpackChunkakcssc_expo_website||[]).push([[72],{6072:(t,i,e)=>{"use strict";e.r(i),e.d(i,{HomeModule:()=>y});var s=e(2952),o=e(8098),n=e(3018),c=e(9699),l=e(62),r=e(3686),a=e(3647),g=e(629),d=e(8583),u=e(4527);function h(t,i){1&t&&(n.TgZ(0,"div",8),n.TgZ(1,"div",9),n._uU(2," You're not signed in to SOT. Please login to the portal and vote for your favorite startup now. Please contact the Support team if you haven't received your credentials. "),n.qZA(),n.qZA())}const p=function(t){return{active:t}};function f(t,i){if(1&t){const t=n.EpF();n.TgZ(0,"button",13),n.NdJ("click",function(){const i=n.CHM(t).$implicit;return n.oxw(2).selectFilter(i.category)}),n._uU(1),n.qZA()}if(2&t){const t=i.$implicit,e=n.oxw(2);n.Q6J("ngClass",n.VKq(2,p,e.selectedFilter.includes(t.category))),n.xp6(1),n.Oqu(t.category)}}function k(t,i){if(1&t&&(n.TgZ(0,"div",10),n.TgZ(1,"div",11),n.YNc(2,f,2,4,"button",12),n.qZA(),n.qZA()),2&t){const t=n.oxw();n.xp6(2),n.Q6J("ngForOf",t.categories)}}function m(t,i){if(1&t){const t=n.EpF();n.TgZ(0,"div",34),n.NdJ("dblclick",function(){return n.CHM(t),n.oxw(3).doubleClick()})("click",function(){n.CHM(t);const i=n.oxw().$implicit;return n.oxw(2).likePost(i._id)}),n._UZ(1,"span",35),n.qZA()}}function Z(t,i){1&t&&(n.TgZ(0,"div",36),n._UZ(1,"div",37),n.qZA())}function v(t,i){if(1&t){const t=n.EpF();n.TgZ(0,"div",34),n.NdJ("dblclick",function(){return n.CHM(t),n.oxw(3).doubleClick()})("click",function(){n.CHM(t);const i=n.oxw().$implicit;return n.oxw(2).dislikePost(i._id)}),n._UZ(1,"span",38),n.qZA()}}function w(t,i){if(1&t){const t=n.EpF();n.TgZ(0,"div",15),n.TgZ(1,"div",16),n.TgZ(2,"div",17),n.TgZ(3,"div",18),n.NdJ("click",function(){const i=n.CHM(t).$implicit;return n.oxw(2).openPostModal(i)}),n.TgZ(4,"div",19),n._UZ(5,"img",20),n.qZA(),n.qZA(),n.TgZ(6,"div",21),n.TgZ(7,"div",22),n.TgZ(8,"div",11),n.TgZ(9,"div",10),n.TgZ(10,"div",11),n.TgZ(11,"div",23),n.TgZ(12,"div",24),n._UZ(13,"img",25),n.qZA(),n.TgZ(14,"div",26),n.TgZ(15,"h5",27),n.NdJ("click",function(){const i=n.CHM(t).$implicit;return n.oxw(2).openPostModal(i)}),n._uU(16),n.qZA(),n.TgZ(17,"p",27),n.NdJ("click",function(){const i=n.CHM(t).$implicit;return n.oxw(2).openPostModal(i)}),n._uU(18),n.qZA(),n.qZA(),n.qZA(),n.TgZ(19,"div",11),n.TgZ(20,"div",28),n.TgZ(21,"div",27),n.NdJ("click",function(){const i=n.CHM(t).$implicit;return n.oxw(2).openPostModal(i)}),n._uU(22),n.qZA(),n.TgZ(23,"div",29),n.TgZ(24,"div",30),n.TgZ(25,"span",31),n.NdJ("click",function(){const i=n.CHM(t).$implicit;return n.oxw(2).openPostModal(i)}),n.qZA(),n.qZA(),n.YNc(26,m,2,0,"div",32),n.YNc(27,Z,2,0,"div",33),n.YNc(28,v,2,0,"div",32),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA()}if(2&t){const t=i.$implicit,e=n.oxw(2);n.xp6(5),n.MGl("src","",t.media," ",n.LSH),n.MGl("alt","",t.startup," "),n.xp6(8),n.s9C("src",t.startupImage,n.LSH),n.xp6(3),n.Oqu(t.startup),n.xp6(2),n.Oqu(t.category),n.xp6(4),n.hij(" ",t.likes," likes. "),n.xp6(4),n.Q6J("ngIf",e.signIn&&1==e.LikePrivilege.quota&&!e.LikePrivilege.post&&!e.liking&&"user"===e.role),n.xp6(1),n.Q6J("ngIf",e.signIn&&e.liking&&"user"===e.role),n.xp6(1),n.Q6J("ngIf",e.signIn&&e.LikePrivilege.post===t._id&&!e.liking&&"user"===e.role)}}function x(t,i){if(1&t&&(n.TgZ(0,"div",10),n.YNc(1,w,29,9,"div",14),n.qZA()),2&t){const t=n.oxw();n.xp6(1),n.Q6J("ngForOf",t.posts)}}const b=function(t,i){return{uil:!0,"uil-angle-down":t,"uil-angle-up":i}};let q=(()=>{class t{constructor(t,i,e,s,o,n){this.toast=t,this.commonService=i,this.router=e,this.spinner=s,this.modalService=o,this.authService=n,this.postsLoading=!0,this.posts=[],this.signIn=!1,this.toggler=!1,this.selectedFilter=[],this.fetchPost=[],this.categories=[],this.user={},this.LikePrivilege={},this.liking=!1,this.role=null}ngOnInit(){this.role=localStorage.getItem("role"),this.getCategory(),this.fetchAllPost(),this.signIn=this.authService.validUser(),this.signIn&&this.fetchUserLikes()}fetchUserLikes(){this.commonService.likeStatus().subscribe(t=>{this.LikePrivilege=t.data,console.log(this.LikePrivilege)},t=>{console.warn(t)})}doubleClick(){this.toast.warning("Double click is not allowed!","Sorry!")}likePost(t){this.liking=!0,this.commonService.likeStatus().subscribe(i=>{1===i.data.quota?this.commonService.likePost(t).subscribe(t=>{this.fetchUserLikes(),this.fetchAllPost(),this.liking=!1},t=>{console.warn(t),this.liking=!1}):this.toast.error("Cannot like this post! Please unlike all the post and try again.","you're out of likes!")},t=>{console.warn(t),this.liking=!1})}dislikePost(t){this.liking=!0,this.commonService.likeStatus().subscribe(i=>{-1===i.data.quota?this.commonService.dislikePost(t).subscribe(t=>{this.fetchUserLikes(),this.fetchAllPost(),this.liking=!1},t=>{console.warn(t),this.liking=!1}):this.toast.error("Cannot unlike this post!","Something went wrong!")},t=>{console.warn(t),this.liking=!1})}openPostModal(t){this.modalRef=this.modalService.show(o.S,{initialState:{post:t},class:"modal-lg"})}toggleFilters(){this.toggler=!this.toggler}selectFilter(t){this.spinner.show(),this.posts=[],this.selectedFilter.includes(t)?this.selectedFilter.splice(this.selectedFilter.indexOf(t),1):this.selectedFilter.push(t),this.posts=this.selectedFilter.length?this.fetchPost.filter(t=>this.selectedFilter.includes(t.category)):this.fetchPost,this.spinner.hide()}getCategory(){this.commonService.getCategory().subscribe(t=>{"SUCCESS"===t.acknowledgement.status?(this.categories=t.category,this.categories.forEach(t=>{t.selected=!1})):this.toast.error(t.acknowledgement.message,t.acknowledgement.status)},t=>{console.warn(t),this.toast.error(t.error.acknowledgement.message,t.error.acknowledgement.status)})}fetchAllPost(){this.spinner.show(),this.selectedFilter=[],this.commonService.getPost().subscribe(t=>{"SUCCESS"===t.acknowledgement.status?(this.fetchPost=t.posts,this.posts=t.posts,this.postsLoading=!1,this.spinner.hide()):this.toast.error(t.acknowledgement.message,t.acknowledgement.status)},t=>{this.toast.error(t.error.acknowledgement.message,t.error.acknowledgement.status)})}}return t.\u0275fac=function(i){return new(i||t)(n.Y36(c._W),n.Y36(l.v),n.Y36(s.F0),n.Y36(r.t2),n.Y36(a.tT),n.Y36(g.e))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-home"]],decls:10,vars:7,consts:[[1,"container-fluid"],["class","row justify-content-center mt-5",4,"ngIf"],[1,"row","justify-content-start","mt-5"],[1,"col-12","col-md-8"],[1,"d-flex","align-items-center",3,"click"],[1,"h5"],[2,"font-size","35px",3,"ngClass"],["class","row",4,"ngIf"],[1,"row","justify-content-center","mt-5"],[1,"col-10","alert-warning","alert-dismissible","rounded","p-2","text-center",2,"border-radius","25px"],[1,"row"],[1,"col-12"],["type","button","class","btn btn-outline-secondary  mb-2 mx-1",3,"ngClass","click",4,"ngFor","ngForOf"],["type","button",1,"btn","btn-outline-secondary","mb-2","mx-1",3,"ngClass","click"],["class","col-12 col-lg-4",4,"ngFor","ngForOf"],[1,"col-12","col-lg-4"],[1,"row","col-12","p-4","justify-content-center"],[1,"card","shadow","p-2"],[1,"row","justify-content-center",3,"click"],[1,"col-12","text-center"],[1,"border","border-secondary",2,"height","100%","width","100%",3,"src","alt"],[1,"col-12","mt-2"],[1,"row","justify-content-start"],[1,"row","mt-1"],[1,"col-2"],["alt","logo",1,"rounded-circle",2,"height","50px","width","50px",3,"src"],[1,"col-10"],[3,"click"],[1,"row","justify-content-between","align-items-center"],[1,"row","align-items-center"],[1,"col-1","offset-1",2,"font-size","30px"],["tooltip","view post",1,"uil","uil-eye","text-warning",3,"click"],["class","col-1 offset-1","style","font-size: 25px;",3,"dblclick","click",4,"ngIf"],["class","col-1 offset-1",4,"ngIf"],[1,"col-1","offset-1",2,"font-size","25px",3,"dblclick","click"],["tooltip","like",1,"uil","uil-thumbs-up","text-secondary"],[1,"col-1","offset-1"],["role","status",1,"spinner-border","text-primary",2,"font-size","xx-small"],["tooltip","liked",1,"uil","uil-thumbs-up","text-spin","text-primary"]],template:function(t,i){1&t&&(n.TgZ(0,"div",0),n.YNc(1,h,3,0,"div",1),n.TgZ(2,"div",2),n.TgZ(3,"div",3),n.TgZ(4,"p",4),n.NdJ("click",function(){return i.toggleFilters()}),n.TgZ(5,"span",5),n._uU(6,"Filter\xa0"),n.qZA(),n._UZ(7,"i",6),n.qZA(),n.YNc(8,k,3,1,"div",7),n.qZA(),n.qZA(),n.YNc(9,x,2,1,"div",7),n.qZA()),2&t&&(n.xp6(1),n.Q6J("ngIf",!i.signIn),n.xp6(6),n.Q6J("ngClass",n.WLB(4,b,1!=i.toggler,1==i.toggler)),n.xp6(1),n.Q6J("ngIf",1==i.toggler),n.xp6(1),n.Q6J("ngIf",!i.postsLoading))},directives:[d.O5,d.mk,d.sg,u.i9],styles:[""]}),t})();var A=e(4466);const T=[{path:"",component:q}];let y=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[s.Bz.forChild(T),A.m]]}),t})()}}]);