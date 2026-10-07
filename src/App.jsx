import React, { useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Activity, ArrowRight, CalendarDays, CheckCircle2, ChevronRight, Clock3,
  FileVideo, Hospital, MapPin, Menu, PlayCircle, Search, ShieldCheck,
  Stethoscope, UserRound, Video, X, Star, ClipboardList, LogIn, Upload, MessageSquare
} from "lucide-react";
import { hospitals, doctors, getAppointments, addAppointment, updateAppointment } from "./data";

function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const nav = [
    ["/", "Home"],
    ["/hospitals", "Find Hospitals"],
    ["/patient", "Patient Portal"],
    ["/doctor", "Doctor Portal"]
  ];
  return (
    <div className="app-shell">
      <header className="navbar">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-icon"><Stethoscope size={21} /></span>
          <span>Doc<span>Connect</span></span>
        </Link>
        <button className="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          {nav.map(([to, label]) => (
            <Link key={to} className={location.pathname === to ? "active" : ""} to={to} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link className="nav-cta" to="/book" onClick={() => setOpen(false)}>Book Appointment <ArrowRight size={16} /></Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div><div className="brand footer-brand"><span className="brand-icon"><Stethoscope size={18} /></span>Doc<span>Connect</span></div><p>Frontend-only healthcare workflow prototype for demonstration.</p></div>
        <div className="footer-links"><Link to="/hospitals">Hospitals</Link><Link to="/patient">Patient Portal</Link><Link to="/doctor">Doctor Portal</Link></div>
      </footer>
    </div>
  );
}

function Home() {
  return <Layout>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse-dot" /> SMART HEALTHCARE DEMO</div>
        <h1>Healthcare that starts <span>before</span> you reach the hospital.</h1>
        <p>Find nearby hospitals, share a video of your problem, and book a doctor appointment — all through one simple patient journey.</p>
        <div className="hero-actions">
          <Link className="btn primary" to="/hospitals">Find Nearby Hospitals <ArrowRight size={18} /></Link>
          <Link className="btn ghost" to="/doctor">Open Doctor Portal</Link>
        </div>
        <div className="trust-row"><ShieldCheck size={17} /> Demo environment · Dummy data · No medical records stored</div>
      </div>
      <div className="hero-card">
        <div className="map-card">
          <div className="map-grid" />
          <div className="map-pin pin-a"><Hospital size={16} /></div>
          <div className="map-pin pin-b"><Hospital size={16} /></div>
          <div className="map-pin pin-c"><Hospital size={16} /></div>
          <div className="you-pin"><span /><b>You</b></div>
          <div className="location-card"><MapPin size={16} /><div><b>Nearby healthcare</b><small>3 hospitals found near you</small></div></div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="section-heading"><div><div className="eyebrow">HOW IT WORKS</div><h2>From patient to doctor in four steps.</h2></div></div>
      <div className="steps">
        {[
          [MapPin, "Find a hospital", "Discover nearby hospitals and available specialists."],
          [CalendarDays, "Book your slot", "Choose a doctor, date and convenient time."],
          [FileVideo, "Share your video", "Upload a short video showing the problem before your visit."],
          [Stethoscope, "Doctor reviews", "The doctor sees the appointment and video from their portal."]
        ].map(([Icon, title, text], i) => <div className="step-card" key={title}><span className="step-no">0{i + 1}</span><Icon size={26} /><h3>{title}</h3><p>{text}</p></div>)}
      </div>
    </section>

    <section className="section light-panel">
      <div className="split">
        <div><div className="eyebrow">DESIGNED FOR DEMO</div><h2>A realistic workflow without a backend.</h2><p>This prototype uses React and browser localStorage. Patient bookings and doctor updates can be demonstrated in the same browser without a database or server.</p><div className="feature-list"><div><CheckCircle2 /> Dummy patient authentication</div><div><CheckCircle2 /> Appointment workflow</div><div><CheckCircle2 /> Video upload and preview</div><div><CheckCircle2 /> Doctor consultation notes</div></div></div>
        <div className="demo-box"><div className="demo-top"><span className="status-dot" /> Live Demo Flow</div><div className="flow-line">{["Patient", "Hospital", "Appointment", "Video", "Doctor"].map((x, i) => <React.Fragment key={x}><span className="flow-pill">{x}</span>{i < 4 && <ChevronRight size={15} />}</React.Fragment>)}</div><Link className="btn dark" to="/book">Try the workflow <ArrowRight size={17} /></Link></div>
      </div>
    </section>
  </Layout>;
}

function Hospitals() {
  const [query, setQuery] = useState("");
  const filtered = hospitals.filter(h => (h.name + h.area + h.specialties.join(" ")).toLowerCase().includes(query.toLowerCase()));
  return <Layout>
    <PageHero eyebrow="NEARBY CARE" title="Find the right hospital." text="Choose a dummy hospital from the nearby results and continue to doctor selection." />
    <section className="section">
      <div className="search-box"><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search hospital, specialty or area..." /></div>
      <div className="location-banner"><MapPin size={19} /><div><b>Location detected</b><span>Coimbatore · Using demo location for this prototype</span></div><span className="location-ok">3 nearby</span></div>
      <div className="hospital-grid">{filtered.map(h => <HospitalCard key={h.id} hospital={h} />)}</div>
    </section>
  </Layout>;
}

function HospitalCard({ hospital }) {
  return <article className="hospital-card">
    <img src={hospital.image} alt={hospital.name} />
    <div className="hospital-content">
      <div className="card-top"><span className="distance"><MapPin size={14} />{hospital.distance}</span><span className="rating"><Star size={14} fill="currentColor" />{hospital.rating}</span></div>
      <h3>{hospital.name}</h3><p className="muted">{hospital.area}</p><p>{hospital.description}</p>
      <div className="tag-row">{hospital.specialties.slice(0, 3).map(s => <span key={s}>{s}</span>)}</div>
      <Link className="card-action" to={`/hospital/${hospital.id}`}>View doctors <ArrowRight size={16} /></Link>
    </div>
  </article>;
}

function HospitalDetails() {
  const { id } = useParams();
  const hospital = hospitals.find(h => h.id === id) || hospitals[0];
  const list = doctors.filter(d => d.hospitalId === hospital.id);
  return <Layout>
    <section className="detail-hero">
      <img src={hospital.image} alt="" />
      <div><Link className="back-link" to="/hospitals">← Back to hospitals</Link><div className="eyebrow">HOSPITAL</div><h1>{hospital.name}</h1><p><MapPin size={16} /> {hospital.area} · {hospital.distance}</p><p>{hospital.description}</p></div>
    </section>
    <section className="section">
      <div className="section-heading"><div><div className="eyebrow">AVAILABLE SPECIALISTS</div><h2>Choose your doctor</h2></div><span className="mini-badge">{list.length} doctors available</span></div>
      <div className="doctor-grid">{list.map(d => <DoctorCard key={d.id} doctor={d} hospital={hospital} />)}</div>
    </section>
  </Layout>;
}

function DoctorCard({ doctor, hospital }) {
  return <article className="doctor-card"><div className="avatar"><Stethoscope size={27} /></div><div className="doctor-main"><div className="rating"><Star size={14} fill="currentColor" />{doctor.rating}</div><h3>{doctor.name}</h3><p className="accent">{doctor.specialty}</p><p className="muted">{doctor.experience} experience</p><div className="slot-row">{doctor.slots.slice(0, 3).map(s => <span key={s}><Clock3 size={13} />{s}</span>)}</div><Link className="btn small primary" to={`/book?doctor=${doctor.id}&hospital=${hospital.id}`}>Book with doctor <ArrowRight size={15} /></Link></div></article>;
}

function Booking() {
  const params = new URLSearchParams(window.location.search);
  const initialDoctor = doctors.find(d => d.id === params.get("doctor")) || doctors[0];
  const hospital = hospitals.find(h => h.id === params.get("hospital") || h.id === initialDoctor.hospitalId) || hospitals[0];
  const [doctorId, setDoctorId] = useState(initialDoctor.id);
  const doctor = doctors.find(d => d.id === doctorId) || initialDoctor;
  const [form, setForm] = useState({ name: "", age: "", phone: "", date: "2026-10-12", time: doctor.slots[0], symptoms: "" });
  const [video, setVideo] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const submit = e => {
    e.preventDefault();
    const appointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 8999)}`,
      patientName: form.name || "Demo Patient",
      patientAge: form.age || "24",
      patientPhone: form.phone || "+91 98765 43210",
      hospitalId: hospital.id, hospitalName: hospital.name,
      doctorId: doctor.id, doctorName: doctor.name, specialty: doctor.specialty,
      date: form.date, time: form.time,
      symptoms: form.symptoms || "General consultation requested.",
      videoName: video?.name || "No video uploaded",
      videoUrl: video ? URL.createObjectURL(video) : "/videos/patient-demo.mp4",
      status: "Booked", createdAt: new Date().toISOString(), notes: ""
    };
    addAppointment(appointment);
    setSubmitted(appointment);
  };

  if (submitted) return <Layout><section className="success-page"><div className="success-icon"><CheckCircle2 size={44} /></div><div className="eyebrow">APPOINTMENT CONFIRMED</div><h1>Your appointment is booked.</h1><p>The demo appointment has been saved in this browser and is now visible in the Doctor Portal.</p><div className="appointment-summary"><div><span>Appointment ID</span><b>{submitted.id}</b></div><div><span>Doctor</span><b>{submitted.doctorName}</b></div><div><span>Date & time</span><b>{submitted.date} · {submitted.time}</b></div><div><span>Hospital</span><b>{submitted.hospitalName}</b></div></div><div className="hero-actions center"><Link className="btn primary" to="/patient">View Patient Dashboard</Link><Link className="btn ghost" to="/doctor">Open Doctor Portal</Link></div></section></Layout>;

  return <Layout><PageHero eyebrow="BOOK A CONSULTATION" title="Book your appointment." text="Enter dummy patient details, select a slot and optionally upload a short video of your problem." />
    <section className="section booking-layout">
      <form className="booking-form" onSubmit={submit}>
        <div className="form-section"><div className="form-title"><span>01</span><div><h3>Patient details</h3><p>Use demo information — nothing is sent to a server.</p></div></div><div className="form-grid"><label>Full name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ezhil Kumar" /></label><label>Age<input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} placeholder="24" /></label><label>Phone<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" /></label></div></div>
        <div className="form-section"><div className="form-title"><span>02</span><div><h3>Choose doctor</h3><p>Available doctors at {hospital.name}.</p></div></div><select value={doctorId} onChange={e => { const d = doctors.find(x => x.id === e.target.value); setDoctorId(e.target.value); setForm({ ...form, time: d.slots[0] }) }}>{doctors.filter(d => d.hospitalId === hospital.id).map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}</select><div className="selected-doctor"><div className="avatar small-avatar"><Stethoscope size={21} /></div><div><b>{doctor.name}</b><span>{doctor.specialty} · {doctor.experience}</span></div></div></div>
        <div className="form-section"><div className="form-title"><span>03</span><div><h3>Appointment time</h3><p>Pick a date and one of the available slots.</p></div></div><div className="form-grid"><label>Date<input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></label><label>Time<select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>{doctor.slots.map(s => <option key={s}>{s}</option>)}</select></label></div></div>
        <div className="form-section"><div className="form-title"><span>04</span><div><h3>Describe your problem</h3><p>Give the doctor some context before the visit.</p></div></div><textarea value={form.symptoms} onChange={e => setForm({ ...form, symptoms: e.target.value })} placeholder="Example: I have knee pain and swelling after playing football..." /></div>
        <div className="form-section"><div className="form-title"><span>05</span><div><h3>Upload a problem video</h3><p>Optional for this demo. A doctor can preview it before consultation.</p></div></div><label className="upload-box"><Upload size={25} /><b>{video ? video.name : "Choose a video file"}</b><span>{video ? `${(video.size / 1024 / 1024).toFixed(1)} MB selected` : "MP4, MOV or WebM · Demo only"}</span><input type="file" accept="video/*" onChange={e => setVideo(e.target.files?.[0] || null)} /></label></div>
        <button className="btn primary full" type="submit">Confirm Demo Appointment <ArrowRight size={18} /></button>
      </form>
      <aside className="booking-side"><div className="sticky-card"><div className="eyebrow">YOUR VISIT</div><h3>{hospital.name}</h3><p><MapPin size={15} />{hospital.area}</p><hr /><div className="side-row"><span>Doctor</span><b>{doctor.name}</b></div><div className="side-row"><span>Specialty</span><b>{doctor.specialty}</b></div><div className="side-row"><span>Date</span><b>{form.date}</b></div><div className="side-row"><span>Time</span><b>{form.time}</b></div><div className="secure-note"><ShieldCheck size={17} /><span>Prototype only. Data stays in your browser.</span></div></div></aside>
    </section>
  </Layout>;
}

function PatientDashboard() {
  const [items, setItems] = useState(getAppointments());
  return <Layout><DashboardHero role="PATIENT PORTAL" title="Your healthcare dashboard" text="Track your appointments and the information you shared with your doctor." />
    <section className="section dashboard-section"><div className="dashboard-top"><div><div className="eyebrow">MY APPOINTMENTS</div><h2>Upcoming visits</h2></div><Link className="btn primary small" to="/book">+ New appointment</Link></div>
      <div className="appointment-list">{items.map(a => <PatientAppointment key={a.id} appointment={a} refresh={() => setItems(getAppointments())} />)}</div>
    </section></Layout>;
}

function PatientAppointment({ appointment }) {
  return <article className="appointment-card"><div className="appt-date"><CalendarDays /><b>{new Date(appointment.date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</b><span>{appointment.time}</span></div><div className="appt-info"><div className="status">{appointment.status}</div><h3>{appointment.doctorName}</h3><p>{appointment.specialty} · {appointment.hospitalName}</p><p className="symptom"><MessageSquare size={14} /> {appointment.symptoms}</p></div><div className="appt-video">{appointment.videoUrl ? <><Video size={19} /><span>Video attached</span></> : <span>No video</span>}</div></article>;
}

function DoctorLogin() {
  const navigate = useNavigate();
  const [name, setName] = useState("Dr. Arun Kumar");
  return <Layout><section className="login-page"><div className="login-card"><div className="login-logo"><Stethoscope size={30} /></div><div className="eyebrow">DOCTOR PORTAL</div><h1>Welcome, Doctor.</h1><p>Use the demo login to view patient appointments and uploaded videos.</p><label>Doctor<select value={name} onChange={e => setName(e.target.value)}>{doctors.map(d => <option key={d.id}>{d.name}</option>)}</select></label><label>Demo password<input type="password" value="demo123" readOnly /></label><button className="btn primary full" onClick={() => navigate("/doctor/dashboard")}>Sign in to demo <LogIn size={17} /></button><small>Demo credentials are pre-filled. No real authentication is used.</small></div></section></Layout>;
}

function DoctorDashboard() {
  const [items, setItems] = useState(getAppointments());
  const [selected, setSelected] = useState(items[0]?.id);
  const [note, setNote] = useState(items[0]?.notes || "");
  const appointment = items.find(a => a.id === selected) || items[0];
  const refresh = () => { const x = getAppointments(); setItems(x); setNote(x.find(a => a.id === selected)?.notes || ""); };
  const setStatus = status => { if (!appointment) return; updateAppointment(appointment.id, { status }); refresh(); };
  const saveNote = () => { updateAppointment(appointment.id, { notes: note }); refresh(); };
  return <Layout><DashboardHero role="DOCTOR PORTAL" title="Good morning, Doctor." text="Review upcoming patient visits and the information shared before consultation." />
    <section className="section doctor-dashboard"><div className="doctor-columns">
      <aside className="patient-queue"><div className="queue-head"><div><div className="eyebrow">TODAY</div><h3>Appointments</h3></div><span>{items.length}</span></div>{items.map(a => <button key={a.id} className={a.id === appointment?.id ? "queue-item selected" : "queue-item"} onClick={() => { setSelected(a.id); setNote(a.notes || "") }}><div className="queue-avatar">{a.patientName.slice(0, 1)}</div><div><b>{a.patientName}</b><span>{a.time} · {a.specialty}</span></div><ChevronRight size={17} /></button>)}</aside>
      {appointment ? <div className="patient-detail"><div className="detail-header"><div><div className="eyebrow">PATIENT CASE · {appointment.id}</div><h2>{appointment.patientName}</h2><p>{appointment.patientAge} years · {appointment.patientPhone}</p></div><span className="status large">{appointment.status}</span></div>
        <div className="patient-grid"><div className="case-card"><div className="case-head"><div><div className="eyebrow">PATIENT VIDEO</div><h3>Problem video</h3></div><FileVideo /></div><div className="video-player">{appointment.videoUrl ? <video controls src={appointment.videoUrl} poster="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80" /> : <div className="no-video"><Video /><span>No video uploaded</span></div>}</div><div className="video-meta"><span><CheckCircle2 size={15} /> Available for review</span><small>{appointment.videoName}</small></div></div>
          <div className="case-card"><div className="case-head"><div><div className="eyebrow">CASE SUMMARY</div><h3>Patient information</h3></div><ClipboardList /></div><div className="info-block"><span>Reported problem</span><p>{appointment.symptoms}</p></div><div className="info-block"><span>Hospital</span><p>{appointment.hospitalName}</p></div><div className="info-block"><span>Appointment</span><p>{appointment.date} · {appointment.time}</p></div></div></div>
        <div className="consultation-card"><div className="case-head"><div><div className="eyebrow">CONSULTATION</div><h3>Doctor notes</h3></div><MessageSquare /></div><textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add your consultation notes here..." /><div className="consult-actions"><button className="btn ghost small" onClick={saveNote}>Save notes</button><div><button className="btn outline small" onClick={() => setStatus("In Consultation")}>Start consultation</button><button className="btn primary small" onClick={() => setStatus("Completed")}>Mark completed <CheckCircle2 size={15} /></button></div></div></div>
      </div> : <div className="empty-state"><ClipboardList size={40} /><h3>No appointments</h3><p>Book an appointment from the patient portal to populate the demo.</p></div>}
    </div></section>
  </Layout>;
}

function PageHero({ eyebrow, title, text }) { return <section className="page-hero"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{text}</p></section>; }
function DashboardHero({ role, title, text }) { return <section className="dashboard-hero"><div><div className="eyebrow">{role}</div><h1>{title}</h1><p>{text}</p></div><div className="dashboard-mark"><Activity size={30} /></div></section>; }

function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/hospitals" element={<Hospitals />} />
    <Route path="/hospital/:id" element={<HospitalDetails />} />
    <Route path="/book" element={<Booking />} />
    <Route path="/patient" element={<PatientDashboard />} />
    <Route path="/doctor" element={<DoctorLogin />} />
    <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
    <Route path="*" element={<Home />} />
  </Routes>;
}

export default App;