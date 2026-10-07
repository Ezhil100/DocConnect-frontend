export const hospitals = [
  {
    id: "h1",
    name: "MediCare Multispeciality Hospital",
    area: "Saravanampatti, Coimbatore",
    distance: "1.2 km",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80",
    specialties: ["Orthopedics", "Cardiology", "Neurology", "General Medicine"],
    description: "A modern multispeciality hospital providing specialist consultation and emergency care."
  },
  {
    id: "h2",
    name: "CityCare Hospital",
    area: "Peelamedu, Coimbatore",
    distance: "3.4 km",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
    specialties: ["Orthopedics", "Physiotherapy", "Dermatology", "ENT"],
    description: "Patient-focused healthcare with specialist doctors and digital appointment services."
  },
  {
    id: "h3",
    name: "WellLife Medical Center",
    area: "Gandhipuram, Coimbatore",
    distance: "5.1 km",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80",
    specialties: ["General Medicine", "Pediatrics", "Neurology", "Cardiology"],
    description: "A community healthcare center offering convenient outpatient consultations."
  }
];

export const doctors = [
  { id: "d1", hospitalId: "h1", name: "Dr. Arun Kumar", specialty: "Orthopedic Surgeon", experience: "12 years", rating: 4.9, slots: ["10:00 AM", "10:30 AM", "11:30 AM", "4:00 PM"] },
  { id: "d2", hospitalId: "h1", name: "Dr. Priya Menon", specialty: "General Physician", experience: "9 years", rating: 4.8, slots: ["9:30 AM", "11:00 AM", "2:30 PM", "5:00 PM"] },
  { id: "d3", hospitalId: "h2", name: "Dr. Karthik Raj", specialty: "Orthopedic Specialist", experience: "10 years", rating: 4.7, slots: ["10:00 AM", "12:00 PM", "3:30 PM", "6:00 PM"] },
  { id: "d4", hospitalId: "h3", name: "Dr. Meera Shah", specialty: "Neurologist", experience: "14 years", rating: 4.9, slots: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"] }
];

export const seedAppointments = [
  {
    id: "APT-1042",
    patientName: "Demo Patient",
    patientAge: "24",
    patientPhone: "+91 98765 43210",
    hospitalId: "h1",
    hospitalName: hospitals[0].name,
    doctorId: "d1",
    doctorName: "Dr. Arun Kumar",
    specialty: "Orthopedic Surgeon",
    date: "2026-10-12",
    time: "10:30 AM",
    symptoms: "Knee pain and mild swelling after an injury.",
    videoName: "knee-pain-demo.mp4",
    videoUrl: "/videos/patient-demo.mp4",
    status: "Booked",
    createdAt: new Date().toISOString(),
    notes: ""
  }
];

export function getAppointments() {
  const raw = localStorage.getItem("mediconnect_appointments");
  if (!raw) {
    localStorage.setItem("mediconnect_appointments", JSON.stringify(seedAppointments));
    return seedAppointments;
  }
  return JSON.parse(raw);
}

export function saveAppointments(items) {
  localStorage.setItem("mediconnect_appointments", JSON.stringify(items));
}

export function addAppointment(item) {
  const items = getAppointments();
  items.unshift(item);
  saveAppointments(items);
}

export function updateAppointment(id, patch) {
  const items = getAppointments().map(a => a.id === id ? { ...a, ...patch } : a);
  saveAppointments(items);
  return items.find(a => a.id === id);
}