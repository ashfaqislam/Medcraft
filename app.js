const KEY="medcraft_demo_v1";
const ADMIN_ID="admin";
const ADMIN_PASS="medcraft123";

let db=JSON.parse(localStorage.getItem(KEY)||'{"students":[],"content":[]}');
function save(){localStorage.setItem(KEY,JSON.stringify(db));}
function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}
function currentUser(){return JSON.parse(localStorage.getItem("medcraft_current")||"null")}
function setUser(u){localStorage.setItem("medcraft_current",JSON.stringify(u))}
function logout(){localStorage.removeItem("medcraft_current");updateNav();showPage("home")}
function updateNav(){
  const u=currentUser();
  document.getElementById("publicNav").classList.toggle("hidden",!!u);
  document.getElementById("userNav").classList.toggle("hidden",!u);
}
document.getElementById("registerForm").addEventListener("submit",e=>{
  e.preventDefault();
  const s={id:regId.value.trim(),name:regName.value.trim(),phone:regPhone.value.trim(),email:regEmail.value.trim(),password:regPassword.value,status:"pending"};
  if(db.students.some(x=>x.id===s.id)) return alert("এই Student ID আগে থেকেই আছে।");
  db.students.push(s);save();e.target.reset();
  alert("Registration submitted. Admin verification-এর পর access চালু হবে।");
  showPage("login");
});
document.getElementById("loginForm").addEventListener("submit",e=>{
  e.preventDefault();
  const id=loginId.value.trim(), pass=loginPassword.value;
  if(id===ADMIN_ID && pass===ADMIN_PASS){setUser({role:"admin",name:"Admin"});updateNav();showPage("admin");renderAdmin();return;}
  const s=db.students.find(x=>x.id===id && x.password===pass);
  if(!s)return alert("Student ID অথবা Password ভুল।");
  if(s.status!=="approved")return alert("তোমার account এখনও Admin verification-এর অপেক্ষায় আছে।");
  setUser({role:"student",id:s.id,name:s.name});updateNav();loadStudent();showPage("dashboard");
});
function dashTab(id,btn){
  document.querySelectorAll(".dash-tab").forEach(x=>x.classList.remove("active-tab"));
  document.getElementById(id).classList.add("active-tab");
  if(btn){document.querySelectorAll(".sidebar .side").forEach(x=>x.classList.remove("active"));btn.classList.add("active")}
  if(id==="classes"||id==="live"||id==="exams"||id==="materials")renderStudentContent();
}
function adminTab(id,btn){
  document.querySelectorAll(".admin-tab").forEach(x=>x.classList.remove("active-tab"));
  document.getElementById(id).classList.add("active-tab");
  if(btn){document.querySelectorAll("#admin .side").forEach(x=>x.classList.remove("active"));btn.classList.add("active")}
  renderAdmin();
}
function loadStudent(){
  const u=currentUser(),s=db.students.find(x=>x.id===u.id); if(!s)return;
  studentName.textContent=s.name.split(" ")[0];profileName.textContent=s.name;profileId.textContent=s.id;profilePhone.textContent=s.phone;profileEmail.textContent=s.email||"—";
  renderStudentContent();
}
function renderStudentContent(){
  const c=db.content;
  classList.innerHTML=c.filter(x=>x.type==="class").map(x=>`<div><b>${esc(x.title)}</b><span>${x.link?`<a href="${escAttr(x.link)}" target="_blank"><button>Watch</button></a>`:"Link not added"}</span></div>`).join("")||"<div>No recorded classes yet.</div>";
  liveList.innerHTML=c.filter(x=>x.type==="live").map(x=>`<div class="highlight"><b>${esc(x.title)}</b><p>লাইভ ক্লাসে যুক্ত হতে নিচের button ব্যবহার করো।</p>${x.link?`<a href="${escAttr(x.link)}" target="_blank"><button class="primary">Join Class</button></a>`:""}</div>`).join("")||"<div class='highlight'>No live classes yet.</div>";
  examList.innerHTML=c.filter(x=>x.type==="exam").map(x=>`<div class="highlight"><b>${esc(x.title)}</b><p>Exam details এখানে থাকবে।</p>${x.link?`<a href="${escAttr(x.link)}" target="_blank"><button class="primary">Open Exam</button></a>`:""}</div>`).join("")||"<div class='highlight'>No exams yet.</div>";
  materialList.innerHTML=c.filter(x=>x.type==="material").map(x=>`<div><b>${esc(x.title)}</b><span>${x.link?`<a href="${escAttr(x.link)}" target="_blank"><button>Open</button></a>`:"Link not added"}</span></div>`).join("")||"<div>No materials yet.</div>";
}
document.getElementById("contentForm").addEventListener("submit",e=>{
  e.preventDefault();
  db.content.push({type:contentType.value,title:contentTitle.value.trim(),link:contentLink.value.trim()});
  save();e.target.reset();renderAdmin();alert("Content added.");
});
function renderAdmin(){
  const p=db.students.filter(x=>x.status==="pending").length,a=db.students.filter(x=>x.status==="approved").length;
  pendingCount.textContent=p;approvedCount.textContent=a;contentCount.textContent=db.content.length;
  studentList.innerHTML=db.students.map((s,i)=>`<div><div><b>${esc(s.name)}</b><br><small>${esc(s.id)} • ${esc(s.phone)}</small></div><div class="student-actions"><span class="status ${s.status}">${s.status}</span>${s.status==="pending"?`<button class="primary" onclick="approve(${i})">Approve</button><button onclick="rejectStudent(${i})">Reject</button>`:""}</div></div>`).join("")||"<div>No registrations yet.</div>";
  adminContentList.innerHTML=db.content.map((x,i)=>`<div><b>${esc(x.title)}</b><span>${x.type}<button onclick="removeContent(${i})">Delete</button></span></div>`).join("")||"<div>No content yet.</div>";
}
function approve(i){db.students[i].status="approved";save();renderAdmin();alert("Student approved.");}
function rejectStudent(i){db.students[i].status="rejected";save();renderAdmin();alert("Student rejected.");}
function removeContent(i){db.content.splice(i,1);save();renderAdmin();}
function esc(s){return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function escAttr(s){return esc(s)}
updateNav();
const u=currentUser();
if(u?.role==="student"){loadStudent();showPage("dashboard")}
if(u?.role==="admin"){renderAdmin();showPage("admin")}
