using CommonLayer;
using RepositoryLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class DoctorSL : IDoctorSL
    {
        private readonly IDoctorRL _doctorRL;
        public DoctorSL(IDoctorRL doctorRL)
        {
            _doctorRL = doctorRL;
        }

        public async Task<GetFeedbackListResponse> GetFeedbackList(string UserID)
        {
            return await _doctorRL.GetFeedbackList(UserID);
        }

        public async Task<GetPatientListResponse> GetPatientList(string UserID)
        {
            return await _doctorRL.GetPatientList(UserID);  
        }

        public async Task<UpdateAppointmentByDoctorResponse> UpdateAppointmentByDoctor(UpdateAppointmentByDoctorRequest request)
        {
            return await _doctorRL.UpdateAppointmentByDoctor(request);
        }

        public async Task<UpdateAppointmentStatusResponse> UpdateAppointmentStatus(string UserID, string Status)
        {
            return await _doctorRL.UpdateAppointmentStatus(UserID, Status);
        }
    }
}
