using CommonLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public interface IReceptionistSL
    {
        Task<GetAllAppointmentListResponse> GetAllAppointmentList();
        Task<AddPaymentResponse> AddPayment(AddPaymentRequest request);
    }
}
