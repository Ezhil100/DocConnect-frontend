# DocConnect

## Smart Healthcare Demo

DocConnect is a frontend-only healthcare appointment prototype. It helps patients find nearby hospitals, choose a doctor, book an appointment, describe a health concern, and share a short video before consultation.

## Website Navigation

- Home
- Find Hospitals
- Patient Portal
- Doctor Portal
- Book Appointment

## Home Page

### Main message

**Healthcare that starts before you reach the hospital.**

Find nearby hospitals, share a video of your problem, and book a doctor appointment through one simple patient journey.

### Primary actions

- Find Nearby Hospitals
- Open Doctor Portal

### Notice

Demo environment. Dummy data. No medical records stored.

### How it works

1. **Find a hospital**: Discover nearby hospitals and available specialists.
2. **Book your slot**: Choose a doctor, date, and convenient time.
3. **Share your video**: Upload a short video showing the problem before your visit.
4. **Doctor reviews**: The doctor sees the appointment and video from the Doctor Portal.

### Demo workflow

Patient -> Hospital -> Appointment -> Video -> Doctor

The prototype uses React and browser localStorage. Patient bookings and doctor updates can be demonstrated in the same browser without a database or server.

## Find Hospitals

### Page heading

**Find the right hospital.**

Choose a dummy hospital from the nearby results and continue to doctor selection.

### Search

Search hospital, specialty, or area.

### Location

**Location detected**  
Coimbatore. Using demo location for this prototype.

Three nearby hospitals are displayed.

### Available hospitals

#### MediCare Multispeciality Hospital

- Location: Saravanampatti, Coimbatore
- Distance: 1.2 km
- Rating: 4.8
- Specialties: Orthopedics, Cardiology, Neurology, General Medicine
- Description: A modern multispeciality hospital providing specialist consultation and emergency care.

#### CityCare Hospital

- Location: Peelamedu, Coimbatore
- Distance: 3.4 km
- Rating: 4.6
- Specialties: Orthopedics, Physiotherapy, Dermatology, ENT
- Description: Patient-focused healthcare with specialist doctors and digital appointment services.

#### WellLife Medical Center

- Location: Gandhipuram, Coimbatore
- Distance: 5.1 km
- Rating: 4.7
- Specialties: General Medicine, Pediatrics, Neurology, Cardiology
- Description: A community healthcare center offering convenient outpatient consultations.

## Hospital Details

### Page heading

**Choose your doctor**

The hospital details page displays the selected hospital, location, distance, description, available specialists, ratings, experience, and appointment slots.

### Doctors

- **Dr. Arun Kumar**: Orthopedic Surgeon, 12 years, rating 4.9
- **Dr. Priya Menon**: General Physician, 9 years, rating 4.8
- **Dr. Karthik Raj**: Orthopedic Specialist, 10 years, rating 4.7
- **Dr. Meera Shah**: Neurologist, 14 years, rating 4.9

Patients can select an available doctor and choose **Book with doctor**.

## Book an Appointment

### Page heading

**Book your appointment.**

Enter dummy patient details, select a slot, and optionally upload a short video of the problem.

### Booking sections

1. **Patient details**
   - Full name
   - Age
   - Phone

2. **Choose doctor**
   - Select an available doctor at the chosen hospital.
   - View specialty and experience.

3. **Appointment time**
   - Choose a date.
   - Select an available time slot.

4. **Describe your problem**
   - Add symptoms or other information for the doctor.

5. **Upload a problem video**
   - Optional video upload.
   - Supported examples: MP4, MOV, or WebM.

### Confirmation

After submission, the patient sees:

**Your appointment is booked.**

The confirmation includes the appointment ID, doctor, date and time, and hospital. The appointment is saved in the current browser and is visible in the Patient Portal and Doctor Portal.

## Patient Portal

### Page heading

**Your healthcare dashboard**

Track your appointments and the information shared with your doctor.

### Dashboard information

- Upcoming visits
- Appointment status
- Doctor name and specialty
- Hospital name
- Appointment date and time
- Reported symptoms
- Attached video status

The portal also provides a **New appointment** action.

## Doctor Portal

### Login

**Welcome, Doctor.**

Use the demo login to view patient appointments and uploaded videos.

- Doctor: Select a demo doctor
- Demo password: `demo123`
- Action: Sign in to demo

No real authentication is used.

### Doctor dashboard

**Good morning, Doctor.**

Review upcoming patient visits and the information shared before consultation.

### Doctor tools

- View the appointment queue.
- Select a patient case.
- Review patient age and phone number.
- Play the uploaded problem video.
- Read the reported problem.
- Review hospital and appointment details.
- Add consultation notes.
- Start consultation.
- Mark the appointment as completed.

## Demo Limitations

DocConnect is a demonstration prototype and does not provide:

- Real medical data storage
- Real authentication
- Real hospital integration
- Secure medical record storage
- Production video hosting
- Backend synchronization between devices

Appointments and doctor updates are stored in browser localStorage. Uploaded files are available only in the current browser session. The sample video is located at `/videos/patient-demo.mp4`.

## Technology

- React
- React Router
- Vite
- Lucide React icons
- Browser localStorage
- Responsive desktop, tablet, and mobile interface