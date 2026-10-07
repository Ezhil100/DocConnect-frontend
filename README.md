# DocConnect Demo

Frontend-only healthcare appointment prototype for DocConnect.

## Features

- Nearby hospital discovery with dummy location
- Hospital and doctor selection
- Appointment booking
- Patient symptom description
- Patient video upload/preview
- Patient dashboard
- Doctor demo login
- Doctor appointment queue
- Doctor can view patient video
- Doctor consultation notes
- Appointment status updates
- Browser localStorage persistence
- Responsive mobile/tablet/desktop UI
- Vercel-ready

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Demo flow

1. Home → Find Nearby Hospitals
2. Select a hospital
3. Select a doctor
4. Book an appointment
5. Enter patient details
6. Upload a video (optional)
7. Confirm appointment
8. Open Patient Portal
9. Open Doctor Portal → Sign in
10. Select the appointment and review the case

## Important

This is a demonstration prototype. It does not provide real medical data storage, real authentication, real hospital integration, secure medical record storage, or production video hosting.

The sample video path is `/videos/patient-demo.mp4`. Replace the empty placeholder with any short MP4 if you want the pre-seeded appointment to play a video. Uploaded files are only available to the current browser session because this demo has no backend.
