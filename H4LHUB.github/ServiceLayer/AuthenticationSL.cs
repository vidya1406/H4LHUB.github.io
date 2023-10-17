using CommonLayer;
using RepositoryLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class AuthenticationSL : IAuthenticationSL
    {
        private readonly IAuthenticationRL _authenticationRL;
        public AuthenticationSL(IAuthenticationRL authenticationRL) 
        {
            _authenticationRL = authenticationRL;
        }

        /*public async Task<GetUserDetailsByIDResponse> GetUserDetailsByID(string? ID)
        {
            return await _authenticationRL.GetUserDetailsByID(ID);
        }*/

        public async Task<SignInResponse> SignIn(SignInRequest request)
        {
            return await _authenticationRL.SignIn(request);
        }

        public async Task<SignUpResponse> SignUp(SignUpRequest request)
        {
            return await _authenticationRL.SignUp(request);
        }

        /*public async Task<UpdateUserDetailsResponse> UpdateUserDetails(UpdateUserDetailsRequest request)
        {
            return await _authenticationRL.UpdateUserDetails(request);
        }*/
    }
}
