using Amazon.Runtime.Internal;
using AutoMapper;
using ClinicAppointmentBookingSystem.Model;
using CommonLayer;
using CommonLayer.Model;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer
{
    public class PatientRL : IPatientRL
    {
        private readonly IConfiguration _configuration;
        private readonly MongoClient _mongoConnection;
        private readonly IMongoCollection<UserDetails> _userDetails;
        private readonly IMongoCollection<AppointmentDetails> _appointmentDetails;
        private readonly IMongoCollection<FeedbackDetails> _feedbackDetails;
        private readonly IMapper _mapper;
        public PatientRL(IConfiguration configuration, IMapper mapper)
        {
            _configuration = configuration;
            _mapper = mapper;
            _mongoConnection = new MongoClient(_configuration["MemberRegistrationPortalDatabase:ConnectionString"]);
            var MongoDataBase = _mongoConnection.GetDatabase(_configuration["MemberRegistrationPortalDatabase:DatabaseName"]);
            _userDetails = MongoDataBase.GetCollection<UserDetails>(_configuration["MemberRegistrationPortalDatabase:UserCollectionName"]);
            _appointmentDetails = MongoDataBase.GetCollection<AppointmentDetails>(_configuration["MemberRegistrationPortalDatabase:AppointmentCollectionName"]);
            _feedbackDetails = MongoDataBase.GetCollection<FeedbackDetails>(_configuration["MemberRegistrationPortalDatabase:FeedbackCollectionName"]);
        }

        public async Task<AddAppointmentResponse> AddAppointment(AddAppointmentRequest request)
        {
            AddAppointmentResponse response = new AddAppointmentResponse();
            try
            {
                AppointmentDetails userDetails = new AppointmentDetails();
                userDetails = _mapper.Map<AppointmentDetails>(request);
                userDetails.Status = "BOOKED";
                await _appointmentDetails.InsertOneAsync(userDetails);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<AddFeedbackResponse> AddFeedback(AddFeedbackRequest request)
        {
            AddFeedbackResponse response = new AddFeedbackResponse();
            try
            {
                FeedbackDetails userDetails = new FeedbackDetails();
                userDetails = _mapper.Map<FeedbackDetails>(request);
                await _feedbackDetails.InsertOneAsync(userDetails);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response; throw new NotImplementedException();
        }

        public async Task<DeleteAppointmentResponse> DeleteAppointment(string Id)
        {
            DeleteAppointmentResponse response = new DeleteAppointmentResponse();
            try
            {
                var IsRecord = _appointmentDetails.Find(x => x.ID == Id).FirstOrDefaultAsync().Result;
                if (IsRecord == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Something went wrong";
                }

                IsRecord.Status = "CANCELLED";
                var IsUpdate = _appointmentDetails.ReplaceOneAsync(x => x.ID == Id, IsRecord).Result;
                if (!IsUpdate.IsAcknowledged)
                {
                    response.IsSuccess = false;
                    response.Message = "Something went wrong";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<GetAllDoctorListResponse> GetAllDoctorList()
        {
            GetAllDoctorListResponse response = new GetAllDoctorListResponse();
            try
            {

                response.data = _userDetails.Find(x=>x.Role.ToLower()=="doctor").ToList();
                if(response.data.Count==0) 
                {
                    response.IsSuccess = false;
                    response.Message = "Doctor Record Not Found";
                }

            }catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<GetAppointmentResponse> GetAppointment(string UserID)
        {
            GetAppointmentResponse response = new GetAppointmentResponse();
            try
            {
                response.data = _appointmentDetails.Find(x => x.PatientUserID == UserID).SortByDescending(x => x.ID).ToList();
                if (response.data.Count == 0)
                {
                    response.IsSuccess = false;
                    response.Message = "Record Not Found";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<SubmitPaymentResponse> SubmitPayment(string ID)
        {
            SubmitPaymentResponse response = new SubmitPaymentResponse();
            try
            {
                var _appointmentExist = _appointmentDetails
                   .Find(x => x.ID == ID).FirstOrDefaultAsync().Result;
                if (_appointmentExist == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Appointment Record Not Present";
                    return response;
                }

                _appointmentExist.IsPayment = true; 
                var IsUpdate = _appointmentDetails.ReplaceOneAsync(x => x.ID == ID, _appointmentExist).Result;
                if (!IsUpdate.IsAcknowledged)
                {
                    response.IsSuccess = false;
                    response.Message = "Something went wrong";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<UpdateAppointmentResponse> UpdateAppointment(UpdateAppointmentRequest request)
        {
            UpdateAppointmentResponse response = new UpdateAppointmentResponse();
            try
            {
                var _appointmentExist = _appointmentDetails
                   .Find(x => x.ID == request.ID).FirstOrDefaultAsync().Result;
                if (_appointmentExist == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Appointment Record Not Present";
                    return response;
                }

                _appointmentExist.AppointmentDate = request.AppointmentDate;
                _appointmentExist.AppointmentTime = request.AppointmentTime;
                _appointmentExist.PatientDescription = request.PatientDescription;
                var IsUpdate = _appointmentDetails.ReplaceOneAsync(x => x.ID == request.ID, _appointmentExist).Result;
                if (!IsUpdate.IsAcknowledged)
                {
                    response.IsSuccess = false;
                    response.Message = "Something went wrong";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}
