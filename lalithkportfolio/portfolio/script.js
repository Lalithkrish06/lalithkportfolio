/* ---------- loader ---------- */
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loader').classList.add('hide'),500);
});

/* ---------- cursor ---------- */
const dot=document.getElementById('cursor-dot'), glow=document.getElementById('cursor-glow');
window.addEventListener('mousemove',e=>{
  dot.style.left=e.clientX+'px'; dot.style.top=e.clientY+'px';
  glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px';
});

/* ---------- scroll progress + to-top ---------- */
const progress=document.getElementById('progress'), toTop=document.getElementById('toTop');
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const pct=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  progress.style.width=pct+'%';
  toTop.classList.toggle('show', h.scrollTop>600);
});
toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ---------- theme toggle ---------- */
const themeToggle=document.getElementById('themeToggle');
themeToggle.addEventListener('click',()=>{
  const root=document.documentElement;
  const isLight=root.getAttribute('data-theme')==='light';
  root.setAttribute('data-theme', isLight? '' : 'light');
  themeToggle.textContent = isLight ? '🌙' : '☀️';
});

/* ---------- typing effect ---------- */
const roles=["AI & Data Science Engineer","Aspiring Data Analyst","Python · SQL · Power BI"];
const typedEl=document.getElementById('typed');
let ri=0, ci=0, deleting=false;
function typeLoop(){
  const full=roles[ri];
  typedEl.textContent = deleting ? full.slice(0,ci--) : full.slice(0,ci++);
  if(!deleting && ci>full.length+1){ deleting=true; setTimeout(typeLoop,1200); return; }
  if(deleting && ci<0){ deleting=false; ri=(ri+1)%roles.length; ci=0; }
  setTimeout(typeLoop, deleting?35:65);
}
typeLoop();

/* ---------- scroll reveal ---------- */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- animated counters ---------- */
const counters=document.querySelectorAll('[data-count]');
const cio=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target, target=+el.dataset.count, noComma=el.dataset.nocomma;
      let cur=0; const step=Math.max(1,Math.ceil(target/60));
      const t=setInterval(()=>{
        cur=Math.min(cur+step,target);
        el.textContent = noComma ? cur : cur.toLocaleString();
        if(cur>=target) clearInterval(t);
      },25);
      cio.unobserve(el);
    }
  });
},{threshold:0.5});
counters.forEach(c=>cio.observe(c));

/* ---------- skills data ---------- */
const skillsData=[
  {name:"Python",pct:80,cat:"Programming"},
  {name:"SQL",pct:75,cat:"Programming"},
  {name:"Excel / Power BI",pct:82,cat:"Tools"},
  {name:"Pandas & NumPy",pct:72,cat:"Programming"},
  {name:"Matplotlib / Plotly",pct:70,cat:"Frontend"},
  {name:"Streamlit",pct:68,cat:"Frontend"},
  {name:"Exploratory Data Analysis",pct:85,cat:"AI/ML"},
  {name:"Data Quality Control",pct:83,cat:"AI/ML"},
  {name:"REST APIs / JSON",pct:65,cat:"Backend"},
  {name:"Git & GitHub",pct:70,cat:"Tools"},
  {name:"MySQL",pct:66,cat:"Database"},
  {name:"Analytical Thinking",pct:88,cat:"Soft Skills"},
];
const catOrder=["All","Programming","Frontend","Backend","Database","AI/ML","Tools","Soft Skills"];
const skillsGrid=document.getElementById('skillsGrid');
function renderSkills(filter){
  skillsGrid.innerHTML="";
  skillsData.filter(s=>filter==="All"||s.cat===filter).forEach(s=>{
    const card=document.createElement('div');
    card.className='skill-card';
    card.innerHTML=`<div class="skill-top"><span class="name">${s.name}</span><span class="pct">${s.pct}%</span></div><div class="bar"><span style="width:0"></span></div><div style="margin-top:10px;color:var(--muted);font-size:11.5px;letter-spacing:.05em;">${s.cat.toUpperCase()}</div>`;
    skillsGrid.appendChild(card);
    requestAnimationFrame(()=> setTimeout(()=>{ card.querySelector('.bar span').style.width=s.pct+'%'; },80));
  });
}
const tabsWrap=document.createElement('div');
tabsWrap.className='skill-tabs';
catOrder.forEach((c,i)=>{
  const t=document.createElement('div');
  t.className='tab'+(i===0?' active':'');
  t.textContent=c;
  t.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    renderSkills(c);
  });
  tabsWrap.appendChild(t);
});
skillsGrid.parentElement.insertBefore(tabsWrap, skillsGrid);
renderSkills("All");

/* ---------- projects data ---------- */
const projects=[
  {media:"pm1",badge:"Featured",title:"Sales Data Cleaning & Analysis",problem:"Raw sales exports were inconsistent — duplicate rows, missing values, and mismatched currency formats made revenue reporting unreliable.",solution:"Built a Python pipeline to clean the dataset, standardize fields, and calculate revenue & profit accurately.",features:"Automated cleaning · Revenue/profit calculations · Interactive charts",tech:["Python","Pandas","Matplotlib","Plotly"],github:"https://github.com/Lalithkrish06"},
  {media:"pm2",badge:"Automation",title:"Excel Report Generator",problem:"Combining weekly reports from multiple Excel files by hand took hours and introduced copy-paste errors.",solution:"An automation script that merges multiple workbooks, builds a summary sheet, and emails the finished report on schedule.",features:"Multi-file merge · Auto summaries · Scheduled email delivery",tech:["Python","openpyxl","smtplib"],github:"https://github.com/Lalithkrish06"},
  {media:"pm3",badge:"Web Scraping",title:"Job Finder Web Scraper",problem:"Manually browsing job boards for relevant openings by skill and location was slow and repetitive.",solution:"A scraper that collects live listings, filters by skill set and location, and exports clean results to CSV.",features:"Skill & location filters · CSV export · Scheduled runs",tech:["Python","BeautifulSoup","Requests"],github:"https://github.com/Lalithkrish06"},
  {media:"pm4",badge:"API",title:"Real-Time Weather App",problem:"Wanted a lightweight way to check live conditions without parsing raw API responses by hand.",solution:"A small app that fetches real-time weather via a public API and parses the JSON response into a clean view.",features:"Live weather data · JSON parsing · Simple clean UI",tech:["Python","REST API","JSON"],github:"https://github.com/Lalithkrish06"},
  {media:"pm5",badge:"Dashboard",title:"Student Performance Analyzer",problem:"Instructors needed a fast, visual way to spot performance trends across a class instead of scanning spreadsheets.",solution:"A Streamlit dashboard that visualizes student performance with interactive charts and a clean, simple interface.",features:"Interactive charts · Clean UI · Streamlit deployment",tech:["Python","Streamlit","Pandas"],github:"https://github.com/Lalithkrish06"},
];
const projectsGrid=document.getElementById('projectsGrid');
projects.forEach(p=>{
  const card=document.createElement('div');
  card.className='project-card reveal';
  card.innerHTML=`
    <div class="project-media ${p.media}"><span class="badge">${p.badge}</span>${p.title}</div>
    <div class="project-body">
      <h3>${p.title}</h3>
      <div class="pblock"><div class="k">Problem</div><div class="v">${p.problem}</div></div>
      <div class="pblock"><div class="k">Solution</div><div class="v">${p.solution}</div></div>
      <div class="pblock"><div class="k">Features</div><div class="v">${p.features}</div></div>
      <div class="tag-row">${p.tech.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <div class="project-links">
        <a href="${p.github}" class="plink" target="_blank" rel="noopener">View on GitHub ↗</a>
      </div>
    </div>`;
  projectsGrid.appendChild(card);
  io.observe(card);

  card.addEventListener('mousemove',(e)=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    card.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>{ card.style.transform='perspective(900px) rotateY(0) rotateX(0) translateY(0)'; });
});

/* ---------- contact form (demo) ---------- */
document.getElementById('contactForm').addEventListener('submit',function(){
  const btn=document.getElementById('sendBtn');
  btn.textContent='Sending...';
  setTimeout(()=>{ btn.textContent='Message Sent ✓'; this.reset(); setTimeout(()=>btn.textContent='Send Message →',2200); },900);
});

