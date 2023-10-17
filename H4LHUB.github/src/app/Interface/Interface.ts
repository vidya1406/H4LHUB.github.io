export interface UserDetailsInterface {
  id: string;
  createdDate: string;
  name: string;
  emailID: string;
  address: string;
  gender: string;
  role: string;
  contactNumber: string;
  dateOfBirth: string;
  age: Number;
  isActive: Boolean;
}

export interface AppointmentInterface {
  iD: string;
  createdDate: string;
  patientUserID: string;
  doctorUserID: string;
  appointmentDate: string;
  appointmentTime: string;
  patientDescription: string;
  doctorDescription: string;
  price: string;
  isPayment: Boolean;
  status: string;
  isActive: Boolean;
}

export interface AppointmentInDetailsInterface {
  iD: string;
  createdDate: string;
  patientUserID: string;
  patientUserDetails: UserDetailsInterface;
  doctorUserID: string;
  doctorUserDetails: UserDetailsInterface;
  appointmentDate: string;
  appointmentTime: string;
  patientDescription: string;
  doctorDescription: string;
  price: string;
  isPayment: Boolean;
  status: string;
  isActive: Boolean;
}

export interface FeedbackListInterface {
  id: string;
  createdDate: string;
  patientUserID: string;
  patientUserDetails: UserDetailsInterface;
  doctorUserID: string;
  doctorUserDetails: UserDetailsInterface;
  feedback: string;
}
