import { Component } from '@angular/core';
declare var $: any; // Use same as jquery
import * as bootstrap from 'bootstrap';
import { NgForm } from '@angular/forms';
import {
  AppointmentInDetailsInterface,
  AppointmentInterface,
  FeedbackListInterface,
  UserDetailsInterface,
} from 'src/app/Interface/Interface';
import { AuthenticationService } from 'src/services/authentication.service';
import { DashboardService } from 'src/services/dashboard.service';
import { DoctorService } from 'src/services/doctor.service';
import { interval, Subscription } from 'rxjs';

const NameRegex = /^[a-zA-Z ]*$/;
const EmailRegex = /^\S+@\S+\.\S+$/;
const MobileRegex = /^\d{10}$/;
const PANRegex = /^[A-Z0-9]{12}$/;

@Component({
  selector: 'app-doctordashboard',
  templateUrl: './doctordashboard.component.html',
  styleUrls: ['./doctordashboard.component.scss'],
})
export class DoctordashboardComponent {
  doctorListColumns: string[] = [
    'id',
    'createdDate',
    'patientName',
    'patientEmail',
    'appointmentDate',
    'appointmentTime',
    'status',
    'bill',
    'paymentStatus',
    'setting',
  ];

  feedbackColumns: string[] = ['id', 'createdDate', 'patientName', 'feedback'];

  List: AppointmentInDetailsInterface[] = [];
  UserDetails: UserDetailsInterface[] = [];
  FeedbackList: FeedbackListInterface[] = [];
  _userID = localStorage.getItem('doctor-user-id') || '{}';

  id: String = '';
  userID: String = '';

  IsHome: Boolean = true;
  IsFeedback: Boolean = false;
  IsEdit: Boolean = false;
  IsPayment: Boolean = false;
  mySubscription: Subscription;

  constructor(private _dashboardServices: DoctorService) {
    this.mySubscription = interval(5000).subscribe((x) => {
      if (localStorage.getItem('doctor-home') === 'true') {
        this.handleHome();
      }
      if (localStorage.getItem('doctor-feedback') === 'true') {
        this.handleFeedback();
      }
    });
  }

  //
  async ngOnInit() {
    console.log(localStorage.getItem('doctor-jwt-token'));
    if (localStorage.getItem('doctor-jwt-token') === null) {
      window.location.href = '/';
    }
    if (localStorage.getItem('doctor-home') === 'true') {
      await this.handleHome();
    }
    if (localStorage.getItem('doctor-feedback') === 'true') {
      await this.handleFeedback();
    }
  }

  //
  async handleHome() {
    this.IsHome = true;
    this.IsFeedback = false;
    $('#home-menu').addClass('active');
    $('#home-feedback').removeClass('active');
    //set local storage flag
    localStorage.setItem('doctor-home', 'true');
    localStorage.setItem('doctor-feedback', 'false');
    this.GetPatientList();
  }

  async handleFeedback() {
    this.IsHome = false;
    this.IsFeedback = true;

    $('#home-menu').removeClass('active');
    $('#home-feedback').addClass('active');
    //set local storage flag
    localStorage.setItem('doctor-home', 'false');
    localStorage.setItem('doctor-feedback', 'true');

    this.GetFeedbackList();
  }

  //
  UpdateAppointmentStatus(iD: string, status: string) {
    console.log('Status : ', status);
    let data = {
      ID: iD,
      Status: status,
    };
    this._dashboardServices.UpdateAppointmentStatus(data).subscribe(
      (result: any) => {
        console.log('UpdateAppointmentStatus Data : ', result);
        $('.toast-body').text(result.message);
        $('.toast-title').text(result.isSuccess ? 'Success' : 'Error');
        $('#ToastOperation')
          .addClass(result.isSuccess ? 'bg-success' : 'bg-danger')
          .toast('show');
        this.handleHome();
      },
      (error: any) => {
        $('.toast-title').text('Error');
        $('.toast-body').text('Something went wrong');
        $('#ToastOperation').addClass('bg-danger').toast('show');
      }
    );
  }

  //
  handleAddAppointment(data: any) {
    $('._header').html('Edit Appointment');

    this.id = data.id;
    this.IsPayment = data.isPayment;
    
    $('#patientName').val(data.patientUserDetails.name);
    $('#appointmentDate').val(data.appointmentDate);
    $('#appointmentTime').val(data.appointmentTime);
    $('#patientDescription').val(data.patientDescription);
    $('#doctorDescription').val(data.doctorDescription);

    $('#buttonOperation').html('Edit');

    this.IsEdit = false;
    $('#exampleModal').modal('show');
  }

  //
  GetPatientList() {
    this._dashboardServices.GetPatientList(this._userID).subscribe(
      (result: any) => {
        //
        console.log('GetPatientList Data : ', result);
        this.List = [];

        if (result.isSuccess) {
          this.List = result.data as AppointmentInDetailsInterface[];
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
  GetFeedbackList() {
    this._dashboardServices.GetFeedbackList(this._userID).subscribe(
      (result: any) => {
        //
        console.log('GetPatientList Data : ', result);
        this.FeedbackList = [];

        if (result.isSuccess) {
          this.FeedbackList = result.data as FeedbackListInterface[];
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
      appointmentDate: $('#appointmentDate').val(),
      appointmentTime: $('#appointmentTime').val(),
      doctorDescription: $('#doctorDescription').val(),
    };
  }

  //
  UpdateAppointment() {
    let _data = this.prepareDataBody();

    this._dashboardServices.UpdateAppointmentByDoctor(_data).subscribe(
      (result: any) => {
        console.log('UpdateAppointment Data : ', result);
        $('.toast-body').text(result.message);
        $('.toast-title').text(result.isSuccess ? 'Success' : 'Error');
        $('#ToastOperation')
          .addClass(result.isSuccess ? 'bg-success' : 'bg-danger')
          .toast('show');
        if (result.isSuccess) {
          $('#exampleModal').modal('hide');
          this.handleClearData();
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
  handleDelete(id: String) {
    // this._dashboardServices.DeleteAppointment(id).subscribe((result: any) => {
    //   console.log('handle Delete Appointment : ', result);
    //   $('.toast-title').text(result?.isSuccess ? 'Success' : 'Error');
    //   $('.toast-body').text(result?.message);
    //   $('#ToastOperation')
    //     .addClass(result?.isSuccess ? 'bg-success' : 'bg-danger')
    //     .toast('show');
    //   this.GetAppointment();
    // });
  }

  //
  handleEdit(data: any) {
    console.log(' Editing Data : ', data);

    this.id = data.id;
    this.userID = data.userID;

    $('._header').html('Update Appointment');

    $('#appointmentDate').val(data.appointmentDate);
    $('#appointmentTime').val(data.appointmentTime);
    $('#description').val(data.description);

    $('#buttonOperation').html('Update');

    this.IsEdit = true;
    $('#exampleModal').modal('show');
  }

  //
  handleClearData() {
    this.id = '';

    $('#appointmentDate').val('');
    $('#appointmentTime').val('');
    $('#description').val('');

    this.IsEdit = false;
  }

  //
  Validation() {
    $('#appointmentDateText').hide();
    $('#appointmentTimeText').hide();
    $('#descriptionText').hide();

    let Value = true;

    let appointmentDate = $('#appointmentDate').val();
    if (!$('#appointmentDate').val()) {
      $('#appointmentDateText').show();
      $('#appointmentDate').addClass('ng-invalid ng-touched');
      Value = false;
    }
    let appointmentTime = $('#appointmentTime').val();
    if (!$('#appointmentTime').val()) {
      $('#appointmentTimeText').show();
      $('#appointmentTime').addClass('ng-invalid ng-touched');
      Value = false;
    }
    let description = $('#doctorDescription').val();
    if (!$('#doctorDescription').val()) {
      $('#doctorDescriptionText').show();
      $('#doctorDescription').addClass('ng-invalid ng-touched');
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

  handleOpenFeedback() {
    this.handleFeedback();
  }

  handleSignOut() {
    localStorage.removeItem('doctor-user-id');
    localStorage.removeItem('doctor-email');
    localStorage.removeItem('doctor-jwt-token');
    localStorage.removeItem('doctor-home');
    localStorage.removeItem('doctor-order');
    if (localStorage.getItem('doctor-jwt-token') === null) {
      localStorage.removeItem('common-jwt-token');
    }
    window.location.href = '/';
  }
}
