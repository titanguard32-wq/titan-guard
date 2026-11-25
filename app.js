const cfg = window.TITAN_CONFIG || {};
const supabaseReady = !!(window.supabase && cfg.supabaseUrl?.startsWith("https://") && cfg.supabaseAnonKey && !cfg.supabaseAnonKey.includes("YOUR_"));
const db = supabaseReady ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey) : null;
const $ = (id) => document.getElementById(id);
let applicantId = null, questions = [], answers = {}, current = 0, deadline = 0, timerHandle = null, hrdRows = [];

function status(id, message, error=false){ const el=$(id); if(el){el.textContent=message;el.style.color=error?"#ff8b78":"#e9cc82";} }
function formObject(form){return Object.fromEntries(new FormData(form).entries());}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

$("applicant-form").addEventListener("submit", async e=>{
  e.preventDefault(); const data=formObject(e.currentTarget); status("applicant-status","Mengirim pendaftaran…");
  if(!db){status("applicant-status","Supabase belum dikonfigurasi. Isi public/config.js terlebih dahulu.",true);return;}
  const {data:row,error}=await db.from("applicants").insert({...data,status:"registered"}).select("id").single();
  if(error){status("applicant-status",error.message,true);return;}
  applicantId=row.id; status("applicant-status","Pendaftaran berhasil. Tahap ujian sekarang terbuka.");
  $("exam").hidden=false; $("exam").scrollIntoView({behavior:"smooth"});
  await startExam();
});

async function startExam(){
  status("exam-status","Menyiapkan ujian…");
  const {data:{session}}=await db.auth.getSession();
  // Exam start is delegated to a server function. Applicant must be authenticated/verified
  // in production; never trust a browser-provided applicant ID as authorization.
  const {data,error}=await db.functions.invoke("start-exam",{body:{applicant_id:applicantId}});
  if(error||!data?.attempt_id){status("exam-status","Ujian belum dapat dimulai. Pastikan Edge Function dan autentikasi kandidat sudah dikonfigurasi.",true);return;}
  window.examAttemptId=data.attempt_id; questions=data.questions||[]; answers={}; current=0;
  deadline=Date.now()+20*60*1000; renderQuestion(); timerHandle=setInterval(tick,1000); tick();
}
function tick(){
  const left=Math.max(0,Math.ceil((deadline-Date.now())/1000));
  $("exam-timer").textContent=`${String(Math.floor(left/60)).padStart(2,"0")}:${String(left%60).padStart(2,"0")}`;
  if(left===0){clearInterval(timerHandle);submitExam();}
}
function renderQuestion(){
  if(!questions.length)return;
  const q=questions[current]; $("exam-progress").textContent=`Soal ${current+1} dari ${questions.length}`;
  $("progress-bar").style.width=`${(current+1)/questions.length*100}%`; $("question-text").textContent=q.prompt;
  $("answer-options").innerHTML="";
  q.options.forEach((option,i)=>{const b=document.createElement("button");b.type="button";b.textContent=`${String.fromCharCode(65+i)}. ${option}`;if(answers[q.id]===i)b.classList.add("selected");b.onclick=()=>{answers[q.id]=i;renderQuestion();};$("answer-options").appendChild(b);});
  $("prev-question").disabled=current===0;$("next-question").hidden=current===questions.length-1;$("submit-exam").hidden=current!==questions.length-1;
}
$("prev-question").onclick=()=>{current=Math.max(0,current-1);renderQuestion();};
$("next-question").onclick=()=>{current=Math.min(questions.length-1,current+1);renderQuestion();};
$("submit-exam").onclick=submitExam;
async function submitExam(){
  if(!window.examAttemptId)return;clearInterval(timerHandle);status("exam-status","Mengirim jawaban dan menilai di server…");
  const payload={attempt_id:window.examAttemptId,answers:Object.entries(answers).map(([question_id,answer_index])=>({question_id,answer_index}))};
  const {data,error}=await db.functions.invoke("submit-exam",{body:payload});
  if(error){status("exam-status","Pengiriman gagal: "+error.message,true);return;}
  status("exam-status",`Hasil: ${data.score}/100 — ${data.passed?"LULUS AMBANG SELEKSI":"BELUM LULUS"}. Keputusan akhir tetap melalui verifikasi HRD.`);
}

$("client-form").addEventListener("submit",async e=>{
  e.preventDefault();const data=formObject(e.currentTarget);data.budget_idr=Number(data.budget_idr);
  if(data.budget_idr<10000000){status("client-status","Anggaran minimum layanan adalah Rp10.000.000.",true);return;}
  if(!db){status("client-status","Supabase belum dikonfigurasi. Isi public/config.js terlebih dahulu.",true);return;}
  status("client-status","Mengirim permintaan…");
  const {error}=await db.from("client_inquiries").insert(data);
  status("client-status",error?error.message:"Permintaan terkirim. Tim TITAN GUARD dapat menindaklanjuti melalui kontak yang dicantumkan.",!!error);
});

$("hrd-login").addEventListener("submit",async e=>{
  e.preventDefault();if(!db){status("hrd-status","Supabase belum dikonfigurasi.",true);return;}
  const d=formObject(e.currentTarget);const {error}=await db.auth.signInWithPassword({email:d.email,password:d.password});
  if(error){status("hrd-status",error.message,true);return;} await loadDashboard();
});
async function loadDashboard(){
  const {data:{user}}=await db.auth.getUser();if(!user)return;
  const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).single();
  if(profile?.role!=="hrd"&&profile?.role!=="admin"){status("hrd-status","Akun ini tidak memiliki akses HRD.",true);await db.auth.signOut();return;}
  const {data,error}=await db.from("applicants").select("id,full_name,position,status,exam_attempts(score,passed)").order("created_at",{ascending:false});
  if(error){status("hrd-status",error.message,true);return;}
  hrdRows=data||[];$("hrd-content").hidden=false;$("stat-applicants").textContent=hrdRows.length;
  const {count}=await db.from("client_inquiries").select("*",{count:"exact",head:true});$("stat-clients").textContent=count??0;
  $("stat-passed").textContent=hrdRows.filter(r=>r.exam_attempts?.some(a=>a.passed)).length;
  $("applicant-rows").innerHTML=hrdRows.map(r=>{const a=r.exam_attempts?.[0];return `<tr><td>${escapeHtml(r.full_name)}</td><td>${escapeHtml(r.position)}</td><td>${escapeHtml(r.status)}</td><td>${a?.score??"—"}</td><td><button data-id="${r.id}" class="approve-row">Setujui</button></td></tr>`;}).join("");
  document.querySelectorAll(".approve-row").forEach(b=>b.onclick=()=>approveApplicant(b.dataset.id));
}
async function approveApplicant(id){
  const {error}=await db.from("applicants").update({status:"approved"}).eq("id",id);
  if(error){status("hrd-status",error.message,true);return;}
  const {data,error:issueError}=await db.functions.invoke("issue-member-card",{body:{applicant_id:id}});
  if(issueError){status("hrd-status","Status disetujui, tetapi penerbitan kartu gagal: "+issueError.message,true);return;}
  showMemberCard(data);await loadDashboard();
}
function showMemberCard(data){
  $("member-name").textContent=data.full_name;$("member-position").textContent=data.position;$("member-number").textContent=data.member_number;
  JsBarcode("#member-barcode",data.verification_token,{format:"CODE128",displayValue:false,margin:0,height:55});$("member-dialog").showModal();
}
$("close-member").onclick=()=>$("member-dialog").close();
$("hrd-logout").onclick=async()=>{await db.auth.signOut();$("hrd-content").hidden=true;status("hrd-status","Anda telah keluar.");};
$("export-csv").onclick=()=>{
  const rows=[["Nama","Posisi","Status","Nilai"],...hrdRows.map(r=>[r.full_name,r.position,r.status,r.exam_attempts?.[0]?.score??""])];
  const csv=rows.map(r=>r.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="titan-guard-applicants.csv";a.click();URL.revokeObjectURL(a.href);
};
if(db)db.auth.onAuthStateChange((_event,session)=>{if(session)loadDashboard();});
