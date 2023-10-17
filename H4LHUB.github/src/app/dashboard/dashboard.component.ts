import { Component } from '@angular/core';
declare var $: any; // Use same as jquery
import * as bootstrap from 'bootstrap';
import { NgForm } from '@angular/forms';
import {
  AppointmentInterface,
  UserDetailsInterface,
} from 'src/app/Interface/Interface';
import { AuthenticationService } from 'src/services/authentication.service';
import { DashboardService } from 'src/services/dashboard.service';
import { interval, Subscription } from 'rxjs';

const NameRegex = /^[a-zA-Z ]*$/;
const EmailRegex = /^\S+@\S+\.\S+$/;
const MobileRegex = /^\d{10}$/;
const PANRegex = /^[A-Z0-9]{12}$/;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  doctorListColumns: string[] = [
    'id',
    // 'createdDate',
    'doctorName',
    'address',
    'setting',
  ];

  myAppointmentColumns: string[] = [
    'id',
    'createdDate',
    'appointmentDate',
    'appointmentTime',
    'status',
    'price',
    'paymentStatus',
    'setting',
  ];

  List: AppointmentInterface[] = [];
  UserDetails: UserDetailsInterface[] = [];

  _userID = localStorage.getItem('patient-user-id') || '{}';

  id: String = '';
  patientUserID: String = '';
  doctorUserID: string = '';

  IsHome: Boolean = true;
  IsMyAppointment: Boolean = false;
  IsEdit: Boolean = false;

  mySubscription: Subscription;

  constructor(private _dashboardServices: DashboardService) {
    this.mySubscription = interval(5000).subscribe((x) => {
      if (localStorage.getItem('patient-home') === 'true') {
        this.handleHome();
      }
      if (localStorage.getItem('patient-myAppointment') === 'true') {
        this.handleMyAppointment();
      }
    });
  }

  //
  async ngOnInit() {
    console.log(localStorage.getItem('patient-jwt-token'));
    if (localStorage.getItem('patient-jwt-token') === null) {
      window.location.href = '/';
    }
    if (localStorage.getItem('patient-home') === 'true') {
      await this.handleHome();
    }
    if (localStorage.getItem('patient-myAppointment') === 'true') {
      await this.handleMyAppointment();
    }
  }

  //
  GetAppointment() {
    this._dashboardServices.GetAppointment(this._userID).subscribe(
      (result: any) => {
        console.log('GetAppointment Data : ', result);
        this.List = [];
        if (result.isSuccess) {
          this.List = result.data as AppointmentInterface[];
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
  async handleHome() {
    this.IsHome = true;
    this.IsMyAppointment = false;
    $('#home-menu').addClass('active');
    $('#home-myAppointment').removeClass('active');
    //set local storage flag
    localStorage.setItem('patient-home', 'true');
    localStorage.setItem('patient-myAppointment', 'false');
    this.GetAllDoctorList();
  }

  async handleMyAppointment() {
    this.IsHome = false;
    this.IsMyAppointment = true;
    $('#home-menu').removeClass('active');
    $('#home-myAppointment').addClass('active');
    //set local storage flag
    localStorage.setItem('patient-home', 'false');
    localStorage.setItem('patient-myAppointment', 'true');

    this.GetAppointment();
  }

  //
  GetAllDoctorList() {
    this._dashboardServices.GetAllDoctorList().subscribe(
      (result: any) => {
        console.log('GetClaimList Data : ', result);
        this.UserDetails = [];
        if (result.isSuccess) {
          this.UserDetails = result.data as UserDetailsInterface[];
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
  handleUpdateProfile() {
    $('#exampleEditFeedback').modal('show');
  }

  //
  handleAddAppointment(_doctorData: any) {
    $('._header').html('Add Appointment');

    $('#patientName').val('');
    $('#appointmentDate').val('');
    $('#appointmentTime').val('');
    $('#clinicAddress').val('');

    $('#buttonOperation').html('Save');

    this.doctorUserID = _doctorData.id;
    this.IsEdit = false;
    $('#exampleModal').modal('show');
  }

  //
  handleSubmit(formData: NgForm) {
    if (this.Validation()) {
      if (!this.IsEdit) {
        this.AddAppointment();
      } else {
        this.UpdateAppointment();
      }
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
      patientUserID: this._userID,
      doctorUserID: this.doctorUserID,
      appointmentDate: $('#appointmentDate').val(),
      appointmentTime: $('#appointmentTime').val(),
      patientDescription: $('#description').val(),
    };
  }
  //
  AddAppointment() {
    let _data = this.prepareDataBody();
    this._dashboardServices.AddAppointment(_data).subscribe(
      (result: any) => {
        console.log('AddAppointment Data : ', result);
        $('.toast-body').text(result.message);
        $('.toast-title').text(result.isSuccess ? 'Success' : 'Error');
        $('#ToastOperation')
          .addClass(result.isSuccess ? 'bg-success' : 'bg-danger')
          .toast('show');
        if (result.isSuccess) {
          $('#exampleModal').modal('hide');
          this.handleClearData();
          this.GetAppointment();
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
  UpdateAppointment() {
    let _data = this.prepareDataBody();
    this._dashboardServices.UpdateAppointment(_data).subscribe(
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
          this.GetAppointment();
          this.handleMyAppointment();
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
    this._dashboardServices.DeleteAppointment(id).subscribe((result: any) => {
      console.log('handle Delete Appointment : ', result);
      $('.toast-title').text(result?.isSuccess ? 'Success' : 'Error');
      $('.toast-body').text(result?.message);
      $('#ToastOperation')
        .addClass(result?.isSuccess ? 'bg-success' : 'bg-danger')
        .toast('show');
      this.GetAppointment();
    });
  }

  //
  handleEdit(data: any) {
    console.log(' Editing Data : ', data);

    this.id = data.id;
    this.patientUserID = data.userID;

    $('._header').html('Update Appointment');

    $('#appointmentDate').val(data.appointmentDate);
    $('#appointmentTime').val(data.appointmentTime);
    $('#description').val(data.patientDescription);

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
    let description = $('#description').val();
    if (!$('#description').val()) {
      $('#descriptionText').show();
      $('#description').addClass('ng-invalid ng-touched');
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

  handleFeedback(data: any) {
    this.patientUserID = data.patientUserID;
    this.doctorUserID = data.doctorUserID;
    $('#exampleEditFeedback').modal('show');
  }

  handleSubmitFeedback(formData: NgForm) {
    if (this.FeedbackValidation()) {
      let _data = {
        patientUserID: this.patientUserID,
        doctorUserID: this.doctorUserID,
        feedback: $('#feedback').val(),
      };
      this._dashboardServices.AddFeedback(_data).subscribe(
        (result: any) => {
          console.log('AddAppointment Data : ', result);
          $('.toast-body').text(result.message);
          $('.toast-title').text(result.isSuccess ? 'Success' : 'Error');
          $('#ToastOperation')
            .addClass(result.isSuccess ? 'bg-success' : 'bg-danger')
            .toast('show');
          if (result.isSuccess) {
            $('#exampleModal').modal('hide');
            this.handleClearData();
            this.GetAppointment();
            this.handleMyAppointment();
            $('#exampleEditFeedback').modal('hide');
          }
        },
        (error: any) => {
          $('.toast-title').text('Error');
          $('.toast-body').text('Something went wrong');
          $('#ToastOperation').addClass('bg-danger').toast('show');
        }
      );
    }
  }

  FeedbackValidation() {
    $('#FeedbackText').hide();
    let Value = true;
    if (!$('#feedback').val()) {
      $('#FeedbackText').show();
      $('#feedback').addClass('ng-invalid ng-touched');
      Value = false;
    }

    return Value;
  }

  handleViewReport(data: any) {
    $('._header').html('View Report');
    $('#vappointmentDate').val(data.appointmentDate);
    $('#vappointmentTime').val(data.appointmentTime);
    $('#vpatientDescription').val(data.patientDescription);
    $('#vdoctorDescription').val(data.doctorDescription);

    $('#exampleViewData').modal('show');
  }

  handlePayment(data: any) {
    $('._header').html('Payment Process');
    this.id = data.id;
    $('#pappointmentDate').val(data.appointmentDate);
    $('#pappointmentTime').val(data.appointmentTime);
    $('#ppatientDescription').val(data.patientDescription);
    $('#pdoctorDescription').val(data.doctorDescription);
    $('#pTotalBill').val(data.price);
    $('#pbuttonOperation').html('Pay');
    $('#examplePaymentData').modal('show');
  }

  handleSubmitPayment(formData: NgForm) {
    this._dashboardServices.SubmitPayment(this.id).subscribe(
      (result: any) => {
        console.log('SubmitPayment Data : ', result);
        $('.toast-body').text(result.message);
        $('.toast-title').text(result.isSuccess ? 'Success' : 'Error');
        $('#ToastOperation')
          .addClass(result.isSuccess ? 'bg-success' : 'bg-danger')
          .toast('show');
        if (result.isSuccess) {
          $('#examplePaymentData').modal('hide');
          this.handleClearData();
          this.GetAppointment();
          this.handleMyAppointment();
          $('#examplePaymentData').modal('hide');
        }
      },
      (error: any) => {
        $('.toast-title').text('Error');
        $('.toast-body').text('Something went wrong');
        $('#ToastOperation').addClass('bg-danger').toast('show');
      }
    );
  }

  handleSignOut() {
    localStorage.removeItem('patient-user-id');
    localStorage.removeItem('patient-email');
    localStorage.removeItem('patient-jwt-token');
    localStorage.removeItem('patient-home');
    localStorage.removeItem('patient-myAppointment');
    if (localStorage.getItem('patient-jwt-token') === null) {
      localStorage.removeItem('common-jwt-token');
    }
    window.location.href = '/';
  }
}
