using CommonLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer;

namespace Hospital_Management_.Net.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientSL _patientSL;
        public PatientController(IPatientSL patientSL) 
        {
            _patientSL = patientSL;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDoctorList()
        {
            GetAllDoctorListResponse response = new GetAllDoctorListResponse();
            try
            {
                response = await _patientSL.GetAllDoctorList();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddAppointment(AddAppointmentRequest request)
        {
            AddAppointmentResponse response = new AddAppointmentResponse();
            try
            {
                response = await _patientSL.AddAppointment(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAppointment(UpdateAppointmentRequest request)
        {
            UpdateAppointmentResponse response = new UpdateAppointmentResponse();
            try
            {
                response = await _patientSL.UpdateAppointment(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAppointment([FromQuery] string UserID)
        {
            GetAppointmentResponse response = new GetAppointmentResponse();
            try
            {
                response = await _patientSL.GetAppointment(UserID);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAppointment([FromQuery] string Id)
        {
            DeleteAppointmentResponse response = new DeleteAppointmentResponse();
            try
            {
                response = await _patientSL.DeleteAppointment(Id);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddFeedback(AddFeedbackRequest request)
        {
            AddFeedbackResponse response = new AddFeedbackResponse();
            try
            {
                response = await _patientSL.AddFeedback(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpPatch]
        public async Task<IActionResult> SubmitPayment([FromQuery]string ID)
        {
            SubmitPaymentResponse response = new SubmitPaymentResponse();
            try
            {
                response = await _patientSL.SubmitPayment(ID);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

    }
}
