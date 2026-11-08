const prices={"WPVC":200,"Tough PVC":120,"Laminate Door":250,"Lamination Door":130};
const recommendations={"Bedroom":["Laminate Door","WPVC","Tough PVC","Lamination Door"],"Bathroom":["WPVC","Tough PVC","Laminate Door","Lamination Door"],"Main door":["Laminate Door","Lamination Door","WPVC","Tough PVC"],"Double door":["Laminate Door","WPVC","Tough PVC","Lamination Door"],"Outdoor":["Laminate Door","WPVC","Lamination Door","Tough PVC"]};
const materialDescriptions={"WPVC":"A versatile option to discuss for bedroom, bathroom and other suitable spaces. Confirm site suitability with the shop.","Tough PVC":"A practical option with specific sheet-size rules. Final billable sheet size is confirmed after measurement review.","Laminate Door":"Explore decorative finishes and designs for spaces where appearance is important.","Lamination Door":"Compare finish options and installation requirements with the shop."};
const designs=[
 ["PD-101","Classic Panel","Classic","A timeless panel-inspired sample design."],
 ["PD-102","Modern Lines","Modern","A clean contemporary sample with simple lines."],
 ["PD-103","Geometric Grace","Geometric","A geometric sample pattern for a modern interior."],
 ["PD-104","Warm Wood","Wood finish","A warm wood-look sample for a welcoming space."],
 ["PD-105","Signature Panels","Classic","A refined panel-style sample design."],
 ["PD-106","Urban Slate","Modern","A minimal slate-tone sample concept."]
];
let activeCategory="",activeMaterial="",activeProduct=null;
const $=id=>document.getElementById(id);
const materialSection=$("materials"),catalogue=$("catalogue"),detail=$("productDetail");
function go(el){el.scrollIntoView({behavior:"smooth",block:"start"});}
function hideViews(){materialSection.hidden=true;catalogue.hidden=true;detail.hidden=true;}
function showMaterials(category){activeCategory=category;hideViews();materialSection.hidden=false;$("materialTitle").textContent=`Recommended for ${category}`;const list=$("materialsList");list.innerHTML=recommendations[category].map((name,i)=>`<button class="material-card" data-material="${name}"><span class="material-rank">${i+1}</span><span><b>${name}</b><small>${materialDescriptions[name]}</small></span><strong class="material-price">₹${prices[name].toLocaleString("en-IN")} / sq. ft.</strong></button>`).join("");list.querySelectorAll("[data-material]").forEach(b=>b.addEventListener("click",()=>showCatalogue(b.dataset.material)));document.querySelectorAll(".category-card").forEach(b=>b.classList.toggle("selected",b.dataset.category===category));go(materialSection);}
function showCatalogue(material){activeMaterial=material;hideViews();catalogue.hidden=false;$("catalogueTitle").textContent=material+" doors";$("catalogueDescription").textContent=`Sample ${material} catalogue · Indicative rate ₹${prices[material].toLocaleString("en-IN")} per sq. ft.`;renderProducts();go(catalogue);}
function renderProducts(){let list=designs.slice();const q=$("productSearch").value.trim().toLowerCase(),style=$("styleFilter").value,sort=$("sortProducts").value;list=list.filter(d=>(!q||(d[0]+" "+d[1]).toLowerCase().includes(q))&&(style==="all"||d[2]===style));if(sort==="low")list.reverse();if(sort==="high")list.sort((a,b)=>b[0].localeCompare(a[0]));$("productGrid").innerHTML=list.map(d=>`<button class="product-card" data-design="${d[0]}"><div class="door-art"><span class="design-tag">SAMPLE DESIGN</span><div class="door-leaf ${styleClass(d[2])}"></div></div><div class="product-info"><small>${d[0]} · ${d[2]}</small><b>${d[1]}</b><div class="product-meta"><span>${activeMaterial}</span><strong>₹${prices[activeMaterial]} / sq. ft.</strong></div></div></button>`).join("")||"<p>No sample designs match your search.</p>";$("productGrid").querySelectorAll("[data-design]").forEach(b=>b.addEventListener("click",()=>showProduct(b.dataset.design)));}
function styleClass(style){return style==="Modern"?"style-modern":style==="Geometric"?"style-geometric":style==="Classic"?"style-classic":"style-wood";}
function showProduct(id){activeProduct=designs.find(d=>d[0]===id);hideViews();detail.hidden=false;detail.innerHTML=`<button class="back-link" id="backCatalogue">← Back to ${activeMaterial} designs</button><div class="detail-layout"><div><div class="door-art detail-main-art"><span class="design-tag">${activeProduct[0]}</span><div class="door-leaf ${styleClass(activeProduct[2])}"></div></div><div class="detail-thumbs"><button class="thumb">Front</button><button class="thumb">Finish</button><button class="thumb">Detail</button></div></div><div class="detail-copy"><span class="eyebrow">PRABHAT DOORS · SAMPLE PRODUCT</span><h2>${activeProduct[1]}</h2><p>Design number: <b>${activeProduct[0]}</b></p><div class="detail-price">₹${prices[activeMaterial].toLocaleString("en-IN")} <small>per sq. ft. · indicative</small></div><p>${activeProduct[3]} ${materialDescriptions[activeMaterial]}</p><div class="spec-list"><div class="spec-row"><span>Material</span><b>${activeMaterial}</b></div><div class="spec-row"><span>Category</span><b>${activeCategory}</b></div><div class="spec-row"><span>Design style</span><b>${activeProduct[2]}</b></div><div class="spec-row"><span>Availability</span><b>Sample only</b></div></div><div class="detail-actions"><button class="btn primary" id="productOrder">Start order / quote</button><button class="outline-btn" id="productEnquiry">Enquire about this design</button><button class="outline-btn" id="saveDesign">♡ Save design</button></div><p class="demo-note">Temporary illustration and sample design number. Actual product details will be supplied by Prabhat Doors.</p></div></div>`;$("backCatalogue").onclick=()=>showCatalogue(activeMaterial);$("productEnquiry").onclick=()=>openEnquiry(`${activeProduct[0]} · ${activeProduct[1]} · ${activeMaterial}`);$("productOrder").onclick=()=>openOrder();$("saveDesign").onclick=e=>{e.currentTarget.textContent="♥ Saved (demo)";};go(detail);}
document.querySelectorAll(".category-card").forEach(b=>b.addEventListener("click",()=>showMaterials(b.dataset.category)));
$("backCategories").onclick=()=>{hideViews();go($("categories"));};
$("backMaterials").onclick=()=>showMaterials(activeCategory);
["productSearch","styleFilter","sortProducts"].forEach(id=>$(id).addEventListener(id==="productSearch"?"input":"change",renderProducts));
$("calcBtn").onclick=()=>{const w=Number($("calcWidth").value),h=Number($("calcHeight").value);$("calcOutput").textContent=w>0&&h>0?`Estimated area: ${(w*h/144).toFixed(2)} sq. ft. (${w} × ${h} inches). This is a basic area estimate, not a final quote.`:"Please enter valid width and height in inches.";};

let pdAuth=null,pdDb=null,pdUser=null,pdRole="customer",pdDbMod=null,pdAuthMod=null,pdAuthStateReady=null;
const pdFirebaseReady=(async()=>{
 const [{firebaseConfig,isConfigured},appM,authM,dbM]=await Promise.all([
  import("./config.js"),
  import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
  import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"),
  import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js")
 ]);
 if(!isConfigured)throw new Error("Firebase is not configured in config.js.");
 const app=appM.initializeApp(firebaseConfig);
 pdAuth=authM.getAuth(app);pdDb=dbM.getFirestore(app);pdAuthMod=authM;pdDbMod=dbM;
 pdAuthStateReady=new Promise(resolve=>authM.onAuthStateChanged(pdAuth,async u=>{
  pdUser=u;pdRole="customer";
  if(u){try{const s=await dbM.getDoc(dbM.doc(pdDb,"users",u.uid));pdRole=s.exists()?s.data().role:"customer";}catch(e){console.error(e)}}
  const b=$("ownerBtn");if(b)b.textContent=u?(pdRole==="owner"?"Owner dashboard":"My account"):"Sign in";
 resolve(u);
 }));
 return true;
})();
function pdAuthDialog(){
 let d=$("pdAccountDialog");if(d)return d;
 d=document.createElement("dialog");d.id="pdAccountDialog";
 d.innerHTML=`<form method="dialog" class="dialog-content"><button class="dialog-close" aria-label="Close">×</button><span class="eyebrow">PRABHAT DOORS ACCOUNT</span><h2>Sign in to continue</h2><p class="muted">Browse freely. Sign in or create a free account to send orders and enquiries.</p><label>Email address<input id="pdEmail" type="email" required></label><label>Password<input id="pdPassword" type="password" minlength="6" required></label><button class="btn primary full" id="pdSignIn">Sign in</button><button class="outline-btn full" type="button" id="pdSignUp">Create customer account</button><p id="pdAuthMsg" class="form-message"></p></form>`;
 document.body.appendChild(d);
 $("pdSignIn").onclick=async e=>{e.preventDefault();try{await pdFirebaseReady;await pdAuthMod.signInWithEmailAndPassword(pdAuth,$("pdEmail").value.trim(),$("pdPassword").value);d.close();}catch(x){$("pdAuthMsg").textContent=pdErr(x)}};
 $("pdSignUp").onclick=async()=>{try{await pdFirebaseReady;const email=$("pdEmail").value.trim(),password=$("pdPassword").value;if(!email||password.length<6)throw new Error("Enter a valid email and password of at least 6 characters.");const c=await pdAuthMod.createUserWithEmailAndPassword(pdAuth,email,password);await pdDbMod.setDoc(pdDbMod.doc(pdDb,"users",c.user.uid),{role:"customer",email,createdAt:pdDbMod.serverTimestamp()});d.close();}catch(x){$("pdAuthMsg").textContent=pdErr(x)}};
 return d;
}
function pdErr(e){if(e?.message?.includes("Firebase is not configured"))return "Online ordering is not configured. Please contact the shop on WhatsApp.";return ({ "auth/email-already-in-use":"This email already has an account. Please sign in.","auth/invalid-credential":"Email or password is incorrect.","auth/invalid-email":"Enter a valid email address.","auth/weak-password":"Use a password with at least 6 characters.","auth/network-request-failed":"Network error. Please try again."})[e.code]||e.message||"Something went wrong."}
async function pdRequireLogin(){
 await pdFirebaseReady;
 if(pdAuthStateReady)await pdAuthStateReady;
 if(pdAuth?.currentUser && pdUser?.uid!==pdAuth.currentUser.uid){pdUser=pdAuth.currentUser;try{const u=await pdDbMod.getDoc(pdDbMod.doc(pdDb,"users",pdUser.uid));pdRole=u.exists()?u.data().role:"customer";}catch{pdRole="customer";}}
 if(pdUser)return true;
 const d=pdAuthDialog();d.showModal();$("pdAuthMsg").textContent="Sign in or create an account, then submit your request again.";return false;
}
async function pdSave(collectionName,data){
 await pdFirebaseReady;
 if(pdAuthStateReady)await pdAuthStateReady;
 if(pdAuth?.currentUser && pdUser?.uid!==pdAuth.currentUser.uid)pdUser=pdAuth.currentUser;
 if(!pdUser)throw new Error("Please sign in first.");
 const ref=await pdDbMod.addDoc(pdDbMod.collection(pdDb,collectionName),{
  ...data,customerUid:pdUser.uid,customerEmail:pdUser.email||"",status:"New",createdAt:pdDbMod.serverTimestamp()
 });
 return ref.id;
}
function openEnquiry(product="General door enquiry"){
 $("enquiryProduct").textContent=`Selected requirement: ${product}. Sign in is required to send this enquiry.`;
 $("enquiryText").value=product;$("enquiryMessage").textContent="";$("enquiryDialog").showModal();
}
function openOrder(){
 const label=activeProduct?`${activeProduct[0]} · ${activeProduct[1]} · ${activeMaterial} · ${activeCategory}`:"General door requirement";
 $("orderProduct").textContent=label;$("orderMessage").textContent="";$("orderDialog").showModal();
}
$("submitOrder").onclick=async e=>{
 e.preventDefault();
 if(!(await pdRequireLogin()))return;
 const name=$("orderName").value.trim(),mobile=$("orderMobile").value.trim(),w=Number($("orderWidth").value),h=Number($("orderHeight").value);
 if(!name||!/^\d{10}$/.test(mobile)||w<=0||h<=0){$("orderMessage").textContent="Enter your name, valid 10-digit mobile number and measurements.";return;}
 const btn=$("submitOrder");btn.disabled=true;
 try{const id=await pdSave("orders",{customerName:name,phone:mobile,product:$("orderProduct").textContent,widthInches:w,heightInches:h,estimatedAreaSqFt:Number((w*h/144).toFixed(2)),frameType:$("orderFrame").value,requestType:$("orderType").value,notes:$("orderNotes").value.trim()});$("orderMessage").textContent=`Request received by the shop. Reference: ${id}`;}
 catch(x){$("orderMessage").textContent=pdErr(x)}finally{btn.disabled=false}
};
$("previewEnquiry").onclick=async e=>{
 e.preventDefault();
 if(!(await pdRequireLogin()))return;
 const name=$("enquiryName").value.trim(),mobile=$("enquiryMobile").value.trim(),message=$("enquiryText").value.trim();
 if(!name||!/^\d{10}$/.test(mobile)||!message){$("enquiryMessage").textContent="Enter your name, valid mobile number and message.";return;}
 const btn=$("previewEnquiry");btn.disabled=true;
 try{const id=await pdSave("enquiries",{customerName:name,phone:mobile,message,productContext:$("enquiryProduct").textContent});$("enquiryMessage").textContent=`Enquiry sent to the shop. Reference: ${id}`;}
 catch(x){$("enquiryMessage").textContent=pdErr(x)}finally{btn.disabled=false}
};
$("generalEnquiry").onclick=()=>openEnquiry();
$("ownerBtn").onclick=async()=>{
 try{await pdFirebaseReady;if(!pdUser){pdAuthDialog().showModal();return;}if(pdRole!=="owner"){alert("This account is not the shop owner account.");return;}await pdShowOwner();}
 catch(x){alert(pdErr(x))}
};
async function pdShowOwner(){
 let d=$("pdOwnerDialog");if(!d){d=document.createElement("dialog");d.id="pdOwnerDialog";d.innerHTML=`<div class="dialog-content"><button class="dialog-close" id="pdOwnerClose">×</button><span class="eyebrow">LIVE OWNER DASHBOARD</span><h2>Customer requests</h2><div id="pdOwnerRecords">Loading…</div></div>`;document.body.appendChild(d);$("pdOwnerClose").onclick=()=>d.close();}
 d.showModal();
 const cols=["orders","enquiries","builderRequests"],snapshots={};
 const draw=()=>{const all=cols.flatMap(c=>(snapshots[c]||[]).map(x=>({...x,kind:c})));all.sort((a,b)=>(b.createdAt?.toMillis?.()||0)-(a.createdAt?.toMillis?.()||0));$("pdOwnerRecords").innerHTML=all.length?all.map(x=>`<div class="card" style="margin:10px 0;padding:12px"><b>${x.kind==="orders"?"Order / quotation":x.kind==="enquiries"?"Customer enquiry":"Builder project enquiry"}</b><p>${pdEsc(x.customerName)} · ${pdEsc(x.phone)}</p><p>${pdEsc(x.product||x.productContext||x.message||x.projectName||"")}</p><small>Status: ${pdEsc(x.status||"New")} · ${pdEsc(x.customerEmail||"")}</small></div>`).join(""):"No requests received yet.";};
 cols.forEach(c=>pdDbMod.onSnapshot(pdDbMod.query(pdDbMod.collection(pdDb,c),pdDbMod.orderBy("createdAt","desc")),s=>{snapshots[c]=s.docs.map(x=>({id:x.id,...x.data()}));draw();},e=>{$("pdOwnerRecords").textContent="Could not load records: "+pdErr(e)}));
}
function pdEsc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("builderSubmit").onclick=async e=>{
 e.preventDefault();
 if(!(await pdRequireLogin()))return;
 const name=$("builderName").value.trim(),mobile=$("builderMobile").value.trim();
 if(!name||!/^\d{10}$/.test(mobile)){$("builderMessage").textContent="Enter your name and valid 10-digit mobile number.";return;}
 const doors=[...document.querySelectorAll(".project-door-row")].map(r=>{const s=r.querySelectorAll("select");return {location:s[0]?.value||"",material:s[1]?.value||"",quantity:Number(r.querySelector("input")?.value||1)}});
 const btn=$("builderSubmit");btn.disabled=true;
 try{const id=await pdSave("builderRequests",{customerName:name,phone:mobile,projectName:$("projectName").value.trim(),doors});$("builderMessage").textContent=`Project enquiry sent to the shop. Reference: ${id}`;}
 catch(x){$("builderMessage").textContent=pdErr(x)}finally{btn.disabled=false}
};

$("menuBtn").onclick=()=>{const nav=document.querySelector(".desktop-nav");nav.style.display=nav.style.display==="flex"?"none":"flex";nav.style.position="absolute";nav.style.top="66px";nav.style.left="0";nav.style.right="0";nav.style.padding="18px";nav.style.background="#fffefa";nav.style.flexDirection="column";};
$("addDoor").onclick=()=>{const row=document.createElement("div");row.className="project-door-row";row.innerHTML=`<label>Location<select><option>Bedroom</option><option>Bathroom</option><option>Main door</option><option>For terrace</option></select></label><label>Material<select><option>WPVC</option><option>Tough PVC</option><option>Laminate Door</option><option>Lamination Door</option></select></label><label>Quantity<input type="number" min="1" value="1"></label>`;$("projectDoors").appendChild(row);};
const translations={en:{},hi:{},mr:{}};$("language").addEventListener("change",e=>{document.documentElement.lang=e.target.value;const note={en:"Language preference selected.",hi:"भाषा चुनी गई।",mr:"भाषा निवडली."};$("calcOutput").textContent=note[e.target.value]+" Enter measurements to calculate an estimate.";});
hideViews();
                                                                                                                                              
