import { IAppointment } from "../interfaces/appointment.interface";

export type AppointmentStatus = 'scheduled' | 'completed' | 'canceled' | 'no-show';

export type AppointmentReview = {
    patientName: string;
    patientCPF: string;
    professionalName: string;
    professionalSpecialty: string;
    date: string; 
    time: string; 
    notes: string;
}

export type AppointmentStartDateTime = IAppointment['startDateTime'];

export type AppointmentTimeOptions = { 
    label: string, 
    value: string, 
    disabled: boolean 
}