using AutoMapper;
using ClinicAppointmentBookingSystem.Model;
using CommonLayer;
using CommonLayer.Model;

namespace ClinicAppointmentBookingSystem.Mapper
{
    public class PatientProfile : Profile
    {
        public PatientProfile()
        {
            CreateMap<AddAppointmentRequest, AppointmentDetails>();
            CreateMap<UpdateAppointmentRequest, AppointmentDetails>();
            CreateMap<AddFeedbackRequest ,FeedbackDetails>();
        }
    }
}
