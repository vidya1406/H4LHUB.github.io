import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ReceptionistService {
  constructor(private _httpClient: HttpClient) {}

  GetAllAppointmentList() {
    return this._httpClient.get(
      environment.BEServer.DevEnviroment + `Receptionist/GetAllAppointmentList`
    );
  }

  AddPayment(data: any) {
    return this._httpClient.post(
      environment.BEServer.DevEnviroment + `Receptionist/AddPayment`,
      data
    );
  }
}
