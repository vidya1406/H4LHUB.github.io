import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private _httpClient: HttpClient) {}

  GetPatientList(data: any) {
    return this._httpClient.get(
      environment.BEServer.DevEnviroment +
        `Doctor/GetPatientList?UserID=${data}`
    );
  }

  UpdateAppointmentStatus(data: any) {
    return this._httpClient.patch(
      environment.BEServer.DevEnviroment +
        `Doctor/UpdateAppointmentStatus?ID=${data.ID}&Status=${data.Status}`,
      null
    );
  }

  UpdateAppointmentByDoctor(data: any) {
    return this._httpClient.patch(
      environment.BEServer.DevEnviroment + `Doctor/UpdateAppointmentByDoctor`,
      data
    );
  }

  GetFeedbackList(data: any) {
    return this._httpClient.get(
      environment.BEServer.DevEnviroment +
        `Doctor/GetFeedbackList?UserID=` +
        data
    );
  }
}
