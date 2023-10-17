using CommonLayer;
using RepositoryLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class PatientSL : IPatientSL
    {
        private readonly IPatientRL _patientRL;
        public PatientSL(IPatientRL patientRL) 
        {
            _patientRL = patientRL;
        }

        public async Task<AddAppointmentResponse> AddAppointment(AddAppointmentRequest request)
        {
            return await _patientRL.AddAppointment(request);
        }

        public async Task<AddFeedbackResponse> AddFeedback(AddFeedbackRequest request)
        {
            return await _patientRL.AddFeedback(request);
        }

        public async Task<DeleteAppointmentResponse> DeleteAppointment(string Id)
        {
            return await _patientRL.DeleteAppointment(Id);
        }

        public async Task<GetAllDoctorListResponse> GetAllDoctorList()
        {
            return  await _patientRL.GetAllDoctorList();
        }

        public async Task<GetAppointmentResponse> GetAppointment(string UserID)
        {
            return await _patientRL.GetAppointment(UserID);
        }

        public async Task<SubmitPaymentResponse> SubmitPayment(string ID)
        {
            return await _patientRL.SubmitPayment(ID);
        }

        public async Task<UpdateAppointmentResponse> UpdateAppointment(UpdateAppointmentRequest request)
        {
            return await _patientRL.UpdateAppointment(request);
        }
    }
}
