/* TITAN GUARD frontend
   1) Create a Supabase project.
   2) Paste Project URL and anon/publishable key below.
   Never put a service_role key in browser code.
*/
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY";
const configured = !SUPABASE_URL.startsWith("YOUR_") && !SUPABASE_ANON_KEY.startsWith("YOUR_");
const db = configured && window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const translations = {
  id: {
    navAbout:"Tentang",navServices:"Layanan",navCareers:"Karier",navNews:"Berita",navContact:"Kontak",applyNow:"Lamar Sekarang",
    heroEyebrow:"GLOBAL SECURITY • STANDAR PROFESIONAL",heroTitle:"KEAMANAN ADALAH<br><em>KOMITMEN KAMI.</em>",
    heroCopy:"Membangun kepercayaan melalui integritas, kesiapsiagaan, dan layanan keamanan profesional yang bertanggung jawab.",discover:"Kenali Perusahaan",join:"Bergabung Bersama Kami",heroMeta:"PROFESIONALISME · INTEGRITAS · KEPERCAYAAN",
    aboutTitle:"Dibangun di atas <em>integritas.</em>",aboutIntro:"TITAN GUARD adalah konsep perusahaan keamanan profesional yang mengutamakan perlindungan manusia, aset, dan lingkungan kerja melalui tata kelola yang bertanggung jawab.",
    vision:"Visi",visionText:"Menjadi penyedia layanan keamanan profesional yang dipercaya melalui standar layanan, etika, dan akuntabilitas.",mission:"Misi",missionText:"Mengembangkan personel kompeten, proses yang terukur, dan kemitraan yang menghormati hukum serta hak asasi manusia.",values:"Nilai Kami",valuesText:"Integritas, disiplin, profesionalisme, rasa hormat, transparansi, dan keselamatan.",
    companyNote:"Catatan: profil ini merupakan rancangan identitas perusahaan. Klaim tentang kantor, lisensi, klien, pengalaman, dan operasi hanya boleh dipublikasikan setelah benar-benar diverifikasi.",
    servicesTitle:"Layanan keamanan <em>profesional.</em>",servicesIntro:"Layanan dirancang berdasarkan penilaian risiko, kepatuhan hukum, dan kebutuhan klien.",
    service1:"Keamanan fasilitas",service1Text:"Pengamanan akses dan lingkungan fasilitas sesuai prosedur yang disetujui.",service2:"Perlindungan aset",service2Text:"Dukungan perlindungan aset, pemeriksaan risiko, dan pelaporan insiden.",service3:"Keamanan acara",service3Text:"Perencanaan keselamatan pengunjung, koordinasi, dan pengelolaan akses acara.",service4:"Konsultasi risiko",service4Text:"Penilaian risiko dan rekomendasi perbaikan keamanan yang proporsional.",
    careerTitle:"Karier dengan <em>tujuan.</em>",careerCopy:"Kami mencari individu yang menjunjung integritas, pelayanan, keselamatan, dan profesionalisme.",viewJobs:"Lihat Lowongan & Lamar",
    jobsTitle:"Lowongan <em>tersedia.</em>",jobsNote:"Daftar posisi akan dimuat dari database.",applyTitle:"Mulai perjalanan <em>Anda.</em>",applyIntro:"Buat akun kandidat, lalu lengkapi lamaran. Dokumen hanya dapat diakses oleh kandidat dan petugas HRD berwenang.",
    applicationForm:"Formulir Lamaran",fullName:"Nama lengkap",phone:"Nomor telepon",country:"Negara domisili",position:"Posisi yang dilamar",experience:"Pengalaman kerja (ringkas)",resume:"CV / Resume (PDF, maks. 5 MB)",consent:"Saya menyetujui pemrosesan data untuk tujuan rekrutmen dan telah membaca kebijakan privasi.",submitApplication:"Kirim Lamaran",accountNote:"Anda harus login terlebih dahulu. Gunakan bagian Portal Kandidat di samping.",
    candidatePortal:"Portal Kandidat",portalText:"Masuk atau buat akun untuk mengirim lamaran dan memantau proses seleksi.",password:"Kata sandi",login:"Masuk",createAccount:"Buat Akun",logout:"Keluar",
    newsTitle:"Berita & <em>pengumuman.</em>",adminTitle:"Portal <em>HRD.</em>",adminIntro:"Area ini hanya dapat digunakan akun yang telah diberi peran administrator oleh pengelola sistem.",
    contactTitle:"Mari membangun <em>kepercayaan.</em>",contactCopy:"Hubungi tim TITAN GUARD untuk pertanyaan layanan dan rekrutmen.",contactNote:"Alamat dan kontak di atas adalah placeholder. Ganti dengan informasi perusahaan yang sah sebelum publikasi.",rights:"Hak cipta dilindungi."
  },
  en: {
    navAbout:"About",navServices:"Services",navCareers:"Careers",navNews:"News",navContact:"Contact",applyNow:"Apply Now",
    heroEyebrow:"GLOBAL SECURITY • PROFESSIONAL STANDARDS",heroTitle:"SECURITY IS OUR<br><em>COMMITMENT.</em>",
    heroCopy:"Building trust through integrity, readiness, and responsible professional security services.",discover:"Discover TITAN GUARD",join:"Join Our Team",heroMeta:"PROFESSIONALISM · INTEGRITY · TRUST",
    aboutTitle:"Built on <em>integrity.</em>",aboutIntro:"TITAN GUARD is a professional security company concept focused on protecting people, assets, and workplaces through responsible governance.",
    vision:"Vision",visionText:"To become a trusted professional security provider through service standards, ethics, and accountability.",mission:"Mission",missionText:"To develop capable personnel, measurable processes, and partnerships that respect the law and human rights.",values:"Our Values",valuesText:"Integrity, discipline, professionalism, respect, transparency, and safety.",
    companyNote:"Note: this profile is a proposed company identity. Claims about offices, licences, clients, experience, and operations must only be published after verification.",
    servicesTitle:"Professional security <em>services.</em>",servicesIntro:"Services are designed around risk assessment, legal compliance, and client needs.",
    service1:"Facility security",service1Text:"Access and facility environment security under approved procedures.",service2:"Asset protection",service2Text:"Asset protection support, risk reviews, and incident reporting.",service3:"Event security",service3Text:"Visitor safety planning, coordination, and event access management.",service4:"Risk consulting",service4Text:"Risk assessments and proportionate security improvement recommendations.",
    careerTitle:"A career with <em>purpose.</em>",careerCopy:"We seek people who value integrity, service, safety, and professionalism.",viewJobs:"Explore Roles & Apply",
    jobsTitle:"Open <em>positions.</em>",jobsNote:"Vacancies are loaded from the database.",applyTitle:"Start your <em>journey.</em>",applyIntro:"Create a candidate account and complete your application. Documents are accessible only to the candidate and authorised HR staff.",
    applicationForm:"Application Form",fullName:"Full name",phone:"Phone number",country:"Country of residence",position:"Position applied for",experience:"Work experience (summary)",resume:"CV / Resume (PDF, max. 5 MB)",consent:"I consent to data processing for recruitment and have read the privacy notice.",submitApplication:"Submit Application",accountNote:"You must sign in first. Use the Candidate Portal beside this form.",
    candidatePortal:"Candidate Portal",portalText:"Sign in or create an account to apply and track your recruitment process.",password:"Password",login:"Sign In",createAccount:"Create Account",logout:"Sign Out",
    newsTitle:"News & <em>announcements.</em>",adminTitle:"HR <em>Portal.</em>",adminIntro:"This area is available only to accounts assigned an administrator role by the system owner.",
    contactTitle:"Let's build <em>trust.</em>",contactCopy:"Contact the TITAN GUARD team for service and recruitment enquiries.",contactNote:"The contact details above are placeholders. Replace them with verified company information before publishing.",rights:"All rights reserved."
  }
};
let language = "id";
let currentUser = null;
let currentRole = "candidate";
const $ = (id) => document.getElementById(id);
const msg = (id, text, bad=false) => { const el=$(id); if(el){el.textContent=text;el.style.color=bad?"var(--danger)":"var(--gold2)";} };
function toast(text){const el=$("toast");el.textContent=text;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),3000);}
function setLanguage(next){language=next;document.documentElement.lang=next;document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(translations[next][k])el.innerHTML=translations[next][k];});$("langToggle").textContent=next==="id"?"EN":"ID";}
$("langToggle").addEventListener("click",()=>setLanguage(language==="id"?"en":"id"));
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("open")));
$("year").textContent=new Date().getFullYear();

function readyMessage(){
  if(!db){
    $("jobsList").innerHTML='<div class="empty-state">Hubungkan proyek Supabase untuk mengaktifkan lowongan dan formulir. / Connect Supabase to activate vacancies and applications.</div>';
    $("newsList").innerHTML='<div class="empty-state">Berita akan tampil setelah database dikonfigurasi. / News will appear after database setup.</div>';
    msg("authMessage","Mode pratinjau: konfigurasi Supabase belum diisi.");
  }
}
async function loadJobs(){
  if(!db)return;
  const {data,error}=await db.from("jobs").select("id,title_id,title_en,location_id,location_en,employment_type,is_active").eq("is_active",true).order("created_at",{ascending:false});
  if(error){$("jobsList").innerHTML='<div class="empty-state">Lowongan belum dapat dimuat.</div>';return;}
  $("jobsList").innerHTML="";
  $("jobSelect").innerHTML='<option value="">Pilih posisi / Select position</option>';
  (data||[]).forEach(j=>{
    const title=language==="id"?j.title_id:j.title_en,loc=language==="id"?j.location_id:j.location_en;
    const card=document.createElement("article");card.className="job-card";
    card.innerHTML=`<span class="job-meta">${escapeHtml(j.employment_type||"Full time")} · ${escapeHtml(loc||"International")}</span><h3>${escapeHtml(title)}</h3><p>${language==="id"?"Kesempatan kerja profesional dengan proses seleksi yang transparan.":"Professional opportunity with a transparent recruitment process."}</p><a class="btn btn-outline btn-small" href="#apply">${language==="id"?"Lamar posisi":"Apply for role"}</a>`;
    $("jobsList").appendChild(card);
    const opt=document.createElement("option");opt.value=j.id;opt.textContent=title;$("jobSelect").appendChild(opt);
  });
  if(!data?.length)$("jobsList").innerHTML='<div class="empty-state">Belum ada lowongan aktif. / No active vacancies.</div>';
}
async function loadNews(){
  if(!db)return;
  const {data,error}=await db.from("news").select("id,title_id,title_en,body_id,body_en,published_at").eq("is_published",true).order("published_at",{ascending:false}).limit(6);
  if(error)return;
  $("newsList").innerHTML="";
  (data||[]).forEach(n=>{
    const card=document.createElement("article");card.className="news-card";
    card.innerHTML=`<small>${n.published_at?new Date(n.published_at).toLocaleDateString():"TITAN GUARD"}</small><h3>${escapeHtml(language==="id"?n.title_id:n.title_en)}</h3><p>${escapeHtml((language==="id"?n.body_id:n.body_en)||"").slice(0,180)}</p>`;
    $("newsList").appendChild(card);
  });
  if(!data?.length)$("newsList").innerHTML='<div class="empty-state">Belum ada pengumuman. / No announcements yet.</div>';
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
async function refreshSession(){
  if(!db)return;
  const {data}=await db.auth.getSession();currentUser=data.session?.user||null;
  if(currentUser){
    $("logoutBtn").classList.remove("hidden");
    msg("authMessage",`Login: ${currentUser.email}`);
    const {data:p}=await db.from("profiles").select("role").eq("id",currentUser.id).maybeSingle();
    currentRole=p?.role||"candidate";
    await loadCandidateStatus();
    if(currentRole==="admin")await loadAdminApplications();
  }else{
    $("logoutBtn").classList.add("hidden");$("candidateStatus").classList.add("hidden");
    $("adminApplications").innerHTML='<p class="microcopy">Login menggunakan akun HRD untuk melihat lamaran.</p>';
    currentRole="candidate";
  }
}
async function signUp(){
  if(!db)return msg("authMessage","Supabase belum dikonfigurasi.",true);
  const email=$("authEmail").value.trim(),password=$("authPassword").value;
  if(password.length<8)return msg("authMessage","Gunakan kata sandi minimal 8 karakter.",true);
  const {error}=await db.auth.signUp({email,password});
  if(error)return msg("authMessage",error.message,true);
  msg("authMessage","Pendaftaran akun berhasil dimulai. Periksa email untuk konfirmasi jika diminta.");
}
async function signIn(){
  if(!db)return msg("authMessage","Supabase belum dikonfigurasi.",true);
  const {data,error}=await db.auth.signInWithPassword({email:$("authEmail").value.trim(),password:$("authPassword").value});
  if(error)return msg("authMessage",error.message,true);
  currentUser=data.user;await refreshSession();toast("Login berhasil.");
}
$("signupBtn").addEventListener("click",signUp);
$("loginBtn").addEventListener("click",signIn);
$("logoutBtn").addEventListener("click",async()=>{if(db){await db.auth.signOut();await refreshSession();msg("authMessage","Anda telah keluar.");}});
async function loadCandidateStatus(){
  if(!db||!currentUser)return;
  const {data,error}=await db.from("applications").select("id,status,created_at,review_note").eq("candidate_id",currentUser.id).order("created_at",{ascending:false}).limit(5);
  if(error)return;
  const box=$("candidateStatus");box.classList.remove("hidden");
  box.innerHTML="<strong>Application status / Status lamaran</strong>";
  if(!data?.length){box.innerHTML+="<p>Belum ada lamaran / No applications yet.</p>";return;}
  data.forEach(a=>{const p=document.createElement("p");p.textContent=`${a.status} · ${new Date(a.created_at).toLocaleDateString()}${a.review_note?" · "+a.review_note:""}`;box.appendChild(p);});
}
$("applicationForm").addEventListener("submit",async(e)=>{
  e.preventDefault();
  if(!db)return msg("applicationMessage","Supabase belum dikonfigurasi.",true);
  if(!currentUser)return msg("applicationMessage","Silakan login atau buat akun terlebih dahulu.",true);
  const f=e.currentTarget,fd=new FormData(f),file=$("resumeFile").files[0];
  if(file&&(file.type!=="application/pdf"||file.size>5*1024*1024))return msg("applicationMessage","CV harus PDF dan maksimal 5 MB.",true);
  const payload={candidate_id:currentUser.id,full_name:fd.get("full_name"),email:fd.get("email"),phone:fd.get("phone"),country:fd.get("country"),job_id:fd.get("job_id"),experience:fd.get("experience"),status:"submitted"};
  const {data,error}=await db.from("applications").insert(payload).select("id").single();
  if(error)return msg("applicationMessage",error.message,true);
  if(file){
    const path=`${currentUser.id}/${data.id}/resume.pdf`;
    const upload=await db.storage.from("candidate-documents").upload(path,file,{contentType:"application/pdf",upsert:false});
    if(upload.error){msg("applicationMessage","Lamaran tersimpan, tetapi unggahan CV gagal. Hubungi HRD untuk bantuan.",true);return;}
    const doc=await db.from("application_documents").insert({application_id:data.id,candidate_id:currentUser.id,storage_path:path,document_type:"resume"});
    if(doc.error){msg("applicationMessage","Lamaran tersimpan, tetapi metadata dokumen gagal disimpan. Hubungi HRD.",true);return;}
  }
  f.reset();msg("applicationMessage","Lamaran berhasil dikirim. Anda dapat memantau status melalui portal kandidat.");await loadCandidateStatus();
});
async function loadAdminApplications(){
  if(!db||currentRole!=="admin")return msg("adminMessage","Akses HRD diperlukan.",true);
  const {data,error}=await db.from("applications").select("id,full_name,email,country,status,created_at,jobs(title_id,title_en),application_documents(storage_path,document_type)").order("created_at",{ascending:false}).limit(100);
  if(error)return msg("adminMessage",error.message,true);
  if(!data?.length){$("adminApplications").innerHTML="<p class='microcopy'>Belum ada lamaran.</p>";return;}
  const table=document.createElement("table");
  table.innerHTML="<thead><tr><th>Kandidat</th><th>Email</th><th>Negara</th><th>Posisi</th><th>Tanggal</th><th>Dokumen</th><th>Status</th></tr></thead>";
  const tbody=document.createElement("tbody");
  data.forEach(a=>{
    const tr=document.createElement("tr");
    const job=a.jobs?(language==="id"?a.jobs.title_id:a.jobs.title_en):"—";
    tr.innerHTML=`<td>${escapeHtml(a.full_name)}</td><td>${escapeHtml(a.email)}</td><td>${escapeHtml(a.country)}</td><td>${escapeHtml(job)}</td><td>${new Date(a.created_at).toLocaleDateString()}</td><td></td><td></td>`;
    const select=document.createElement("select");
    ["submitted","under_review","interview","assessment","approved","rejected"].forEach(s=>{const o=document.createElement("option");o.value=s;o.textContent=s;o.selected=s===a.status;select.appendChild(o);});
    select.addEventListener("change",async()=>{
      const {error:upErr}=await db.from("applications").update({status:select.value}).eq("id",a.id);
      if(upErr){toast("Gagal memperbarui status.");select.value=a.status;}else{a.status=select.value;toast("Status lamaran diperbarui.");}
    });
    tr.lastElementChild.appendChild(select);tbody.appendChild(tr);
  });
  table.appendChild(tbody);$("adminApplications").replaceChildren(table);
  msg("adminMessage",`Menampilkan ${data.length} lamaran terbaru.`);
}
$("refreshAdmin").addEventListener("click",loadAdminApplications);
if(db){db.auth.onAuthStateChange(()=>setTimeout(refreshSession,0));}
readyMessage();
if(db){loadJobs();loadNews();refreshSession();}
