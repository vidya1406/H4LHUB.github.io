using CommonLayer;
using RepositoryLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class ReceptionistSL : IReceptionistSL
    {
        private readonly IReceptionistRL _receptionistRL;
        public ReceptionistSL(IReceptionistRL receptionistRL) 
        {
            _receptionistRL = receptionistRL;
        }

        public async Task<AddPaymentResponse> AddPayment(AddPaymentRequest request)
        {
            return await _receptionistRL.AddPayment(request);
        }

        public async Task<GetAllAppointmentListResponse> GetAllAppointmentList()
        {
            return await _receptionistRL.GetAllAppointmentList();
        }
    }
}
