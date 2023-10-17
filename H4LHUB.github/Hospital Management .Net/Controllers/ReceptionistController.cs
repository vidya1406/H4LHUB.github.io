using CommonLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer;

namespace Hospital_Management_.Net.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class ReceptionistController : ControllerBase
    {
        private readonly IReceptionistSL _receptionistSL;
        public ReceptionistController(IReceptionistSL receptionistSL) 
        {
            _receptionistSL = receptionistSL;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAppointmentList()
        {
            GetAllAppointmentListResponse response = new GetAllAppointmentListResponse();
            try
            {
                response = await _receptionistSL.GetAllAppointmentList();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddPayment(AddPaymentRequest request)
        {
            AddPaymentResponse response = new AddPaymentResponse();
            try
            {
                response = await _receptionistSL.AddPayment(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }
/*
        [HttpGet]
        public async Task<IActionResult> GetAllAppointmentList()
        {
            GetAllAppointmentListResponse response = new GetAllAppointmentListResponse();
            try
            {
                response = await _receptionistSL.GetAllAppointmentList();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }*/
    }
}
