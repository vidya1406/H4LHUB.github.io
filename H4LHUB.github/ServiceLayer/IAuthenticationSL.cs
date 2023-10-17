using CommonLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public interface IAuthenticationSL
    {
        Task<SignUpResponse> SignUp(SignUpRequest request);
        Task<SignInResponse> SignIn(SignInRequest request);
        /*Task<GetUserDetailsByIDResponse> GetUserDetailsByID(string? ID);
        Task<UpdateUserDetailsResponse> UpdateUserDetails(UpdateUserDetailsRequest request);*/
    }
}
