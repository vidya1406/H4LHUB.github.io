import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _httpClient: HttpClient) {}

  // AddAppointment(data: any) {
  //   return this._httpClient.post(
  //     environment.BEServer.DevEnviroment + `Appointment/AddAppointment`,
  //     data
  //   );
  // }

  // UpdateAppointment(data: any) {
  //   return this._httpClient.put(
  //     environment.BEServer.DevEnviroment + `Appointment/UpdateAppointment`,
  //     data
  //   );
  // }

  // GetAppointment(data: string) {
  //   return this._httpClient.get(
  //     environment.BEServer.DevEnviroment +
  //       `Appointment/GetAppointment?userID=` +
  //       data
  //   );
  // }

  // DeleteAppointment(data: any) {
  //   return this._httpClient.delete(
  //     environment.BEServer.DevEnviroment +
  //       `Appointment/DeleteAppointment?Id=` +
  //       data
  //   );
  // }

  GetAllDoctorList() {
    return this._httpClient.get(
      environment.BEServer.DevEnviroment + `Patient/GetAllDoctorList`
    );
  }

  AddAppointment(data: any) {
    return this._httpClient.post(
      environment.BEServer.DevEnviroment + `Patient/AddAppointment`,
      data
    );
  }

  UpdateAppointment(data: any) {
    return this._httpClient.put(
      environment.BEServer.DevEnviroment + `Patient/UpdateAppointment`,
      data
    );
  }

  GetAppointment(data: any) {
    return this._httpClient.get(
      environment.BEServer.DevEnviroment +
        `Patient/GetAppointment?UserID=` +
        data
    );
  }

  DeleteAppointment(data: any) {
    return this._httpClient.delete(
      environment.BEServer.DevEnviroment +
        `Patient/DeleteAppointment?Id=` +
        data
    );
  }

  AddFeedback(data: any) {
    return this._httpClient.post(
      environment.BEServer.DevEnviroment + `Patient/AddFeedback`,
      data
    );
  }

  SubmitPayment(data: any) {
    return this._httpClient.patch(
      environment.BEServer.DevEnviroment + `Patient/SubmitPayment?ID=` + data,
      null
    );
  }
}
