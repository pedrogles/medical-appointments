export interface CreateAppointmentDTO {
    patientId: string;
    professionalId: string;
    startDateTime: string; // ISO 8601 (ex: 2026-02-12T14:00:00)
    notes: string;
}