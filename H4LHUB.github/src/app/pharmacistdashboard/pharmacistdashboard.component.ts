import { Component } from '@angular/core';
declare var $: any; // Use same as jquery
import * as bootstrap from 'bootstrap';
import { NgForm } from '@angular/forms';
import {
  AppointmentInDetailsInterface,
  AppointmentInterface,
  UserDetailsInterface,
} from 'src/app/Interface/Interface';
import { AuthenticationService } from 'src/services/authentication.service';
import { DashboardService } from 'src/services/dashboard.service';
import { ReceptionistService } from 'src/services/receptionist.service';
import { interval, Subscription } from 'rxjs';

const NameRegex = /^[a-zA-Z ]*$/;
const EmailRegex = /^\S+@\S+\.\S+$/;
const MobileRegex = /^\d{10}$/;
const PANRegex = /^[A-Z0-9]{12}$/;
@Component({
  selector: 'app-pharmacistdashboard',
  templateUrl: './pharmacistdashboard.component.html',
  styleUrls: ['./pharmacistdashboard.component.scss'],
})
export class PharmacistdashboardComponent {
  doctorListColumns: string[] = [
    'id',
    'createdDate',
    'patientName',
    'doctorName',
    'status',
    'setting',
  ];

  List: AppointmentInterface[] = [];
  UserDetails: AppointmentInDetailsInterface[] = [];

  _userID = localStorage.getItem('pharmacist-user-id') || '{}';

  id: String = '';
  userID: String = '';

  IsHome: Boolean = true;
  IsMyAppointment: Boolean = false;
  IsEdit: Boolean = false;

  mySubscription: Subscription;

  constructor(private _dashboardServices: ReceptionistService) {
    this.mySubscription = interval(5000).subscribe((x) => {
      if (localStorage.getItem('pharmacist-home') === 'true') {
        this.handleHome();
      }
      if (localStorage.getItem('pharmacist-myAppointment') === 'true') {
        this.handleMyAppointment();
      }
    });
  }

  //
  async ngOnInit() {
    console.log(localStorage.getItem('pharmacist-jwt-token'));
    if (localStorage.getItem('pharmacist-jwt-token') === null) {
      window.location.href = '/';
    }
    if (localStorage.getItem('pharmacist-home') === 'true') {
      await this.handleHome();
    }
    if (localStorage.getItem('pharmacist-myAppointment') === 'true') {
      await this.handleMyAppointment();
    }
  }

  //
  async handleHome() {
    this.IsHome = true;
    $('#home-menu').addClass('active');
    $('#home-myAppointment').removeClass('active');
    //set local storage flag
    localStorage.setItem('pharmacist-home', 'true');
    localStorage.setItem('pharmacist-myAppointment', 'false');

    this.GetAllAppointmentList();
  }

  async handleMyAppointment() {
    this.IsHome = false;
    this.IsMyAppointment = true;

    $('#home-menu').removeClass('active');
    $('#home-myAppointment').addClass('active');
    //set local storage flag
    localStorage.setItem('pharmacist-home', 'false');
    localStorage.setItem('pharmacist-myAppointment', 'true');
  }

  //
  handleAddAppointment() {
    $('._header').html('Add Appointment');
    $('#patientName').val('');
    $('#appointmentDate').val('');
    $('#appointmentTime').val('');
    $('#clinicAddress').val('');
    $('#appointmentService').val('');

    $('#buttonOperation').html('Save');

    this.IsEdit = false;
    $('#exampleModal').modal('show');
  }

  //
  GetAllAppointmentList() {
    this._dashboardServices.GetAllAppointmentList().subscribe(
      (result: any) => {
        
        console.log('GetAllAppointmentList Data : ', result);
        this.UserDetails = [];
        if (result.isSuccess) {
          this.UserDetails = result.data.filter(
            (x: any) => x.status === 'ACCEPT'
          );
        }
      },
      (error: any) => {
        $('.toast-title').text('Error');
        $('.toast-body').text('Something went wrong');
        $('#ToastOperation').addClass('bg-danger').toast('show');
      }
    );
  }

  //
  handleSubmit(formData: NgForm) {
    console.log('formData : ', formData);
    if (this.Validation()) {
      this.UpdateAppointment();
    } else {
      $('.toast-title').text('Error');
      $('.toast-body').text('Please Enter Required Field');
      $('#ToastOperation').addClass('bg-danger').toast('show');
    }
  }

  //
  prepareDataBody() {
    return {
      id: this.id,
      userID: this._userID,
      price: $('#price').val(),
    };
  }

  //
  UpdateAppointment() {
    let _data = this.prepareDataBody();
    this._dashboardServices.AddPayment(_data).subscribe(
      (result: any) => {
        console.log('AddPayment Data : ', result);
        $('.toast-body').text(result.message);
        $('.toast-title').text(result.isSuccess ? 'Success' : 'Error');
        $('#ToastOperation')
          .addClass(result.isSuccess ? 'bg-success' : 'bg-danger')
          .toast('show');
        if (result.isSuccess) {
          $('#exampleModal').modal('hide');
          this.handleClearData();
          this.GetAllAppointmentList();
          this.handleHome();
        }
      },
      (error: any) => {
        $('.toast-title').text('Error');
        $('.toast-body').text('Something went wrong');
        $('#ToastOperation').addClass('bg-danger').toast('show');
      }
    );
  }

  //
  handleEdit(data: any) {
    console.log(' Editing Data : ', data);

    this.id = data.id;
    this.userID = data.userID;

    $('._header').html('Report');

    $('#appointmentDate').val(data.appointmentDate);
    $('#appointmentTime').val(data.appointmentTime);
    $('#patienDescription').val(data.patientDescription);
    $('#doctorDescription').val(data.doctorDescription);
    $('#price').val(data.price);

    // $('#buttonOperation').html('Update');

    this.IsEdit = true;
    $('#exampleModal').modal('show');
  }

  //
  handleClearData() {
    this.id = '';

    $('#price').val('');

    this.IsEdit = false;
  }

  //
  Validation() {
    $('#priceText').hide();

    
    let Value = true;

    let price = $('#price').val();
    if (!$('#price').val()) {
      $('#priceText').show();
      $('#price').addClass('ng-invalid ng-touched');
      Value = false;
    }

    return Value;
  }

  commonClearErrorjQuery(_id: string) {
    $('#' + _id).removeClass('ng-invalid ng-touched');
    $('#' + _id + 'Text').hide();
  }

  commonErrorjQuery(_id: string, _message: string) {
    $('#' + _id).addClass('ng-invalid ng-touched');
    $('#' + _id + 'Text')
      .text(_message)
      .css('color', 'red')
      .show();
  }

  handleSignOut() {
    localStorage.removeItem('pharmacist-user-id');
    localStorage.removeItem('pharmacist-email');
    localStorage.removeItem('pharmacist-jwt-token');
    localStorage.removeItem('pharmacist-home');
    localStorage.removeItem('pharmacist-order');
    if (localStorage.getItem('pharmacist-jwt-token') === null) {
      localStorage.removeItem('common-jwt-token');
    }
    window.location.href = '/';
  }
}
