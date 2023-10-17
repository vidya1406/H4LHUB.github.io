using CommonLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer;

namespace Hospital_Management_.Net.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorSL _doctorSL;
        public DoctorController(IDoctorSL doctorSL)
        {

            _doctorSL = doctorSL;
        }

        [HttpGet]
        public async Task<IActionResult> GetPatientList([FromQuery] string UserID)
        {
            GetPatientListResponse response = new GetPatientListResponse();
            try
            {
                response = await _doctorSL.GetPatientList(UserID);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateAppointmentStatus([FromQuery] string ID, string Status)
        {
            UpdateAppointmentStatusResponse response = new UpdateAppointmentStatusResponse();
            try
            {
                response = await _doctorSL.UpdateAppointmentStatus(ID, Status);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateAppointmentByDoctor(UpdateAppointmentByDoctorRequest request)
        {
            UpdateAppointmentByDoctorResponse response = new UpdateAppointmentByDoctorResponse();
            try
            {
                response = await _doctorSL.UpdateAppointmentByDoctor(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetFeedbackList([FromQuery] string UserID)
        {
            GetFeedbackListResponse response = new GetFeedbackListResponse();
            try
            {
                response = await _doctorSL.GetFeedbackList(UserID);
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
