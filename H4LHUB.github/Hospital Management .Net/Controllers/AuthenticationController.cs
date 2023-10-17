using CommonLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ServiceLayer;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Member_Registration_Portal_.Net.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationSL _authenticationSL;
        private readonly IConfiguration _configuration;
        public AuthenticationController(IAuthenticationSL authenticationSL, IConfiguration configuration)
        {
            _authenticationSL = authenticationSL;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(SignUpRequest request)
        {
            SignUpResponse response = new SignUpResponse();
            try
            {
                response = await _authenticationSL.SignUp(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> SignIn([FromQuery] SignInRequest request)
        {
            SignInResponse response = new SignInResponse();
            try
            {
                response = await _authenticationSL.SignIn(request);
                if (response.IsSuccess)
                {
                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Email, request.EmailId),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };
                    response.Token = GetToken(response, authClaims);
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }

        /*[HttpGet]
        public async Task<IActionResult> GetUserDetailsByID([FromQuery] string? ID)
        {
            GetUserDetailsByIDResponse response = new GetUserDetailsByIDResponse();
            try
            {
                response = await _authenticationSL.GetUserDetailsByID(ID);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }


        [HttpPut]
        public async Task<IActionResult> UpdateUserDetails(UpdateUserDetailsRequest request)
        {
            UpdateUserDetailsResponse response = new UpdateUserDetailsResponse();
            try
            {
                response = await _authenticationSL.UpdateUserDetails(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return Ok(response);
        }
*/
        private string GetToken(SignInResponse response, List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            var _decodedToken = new JwtSecurityTokenHandler().WriteToken(token).ToString();
            return _decodedToken + "#" + GetUserName();
        }

        private string GetUserName()
        {
            byte[] iv = new byte[16];
            byte[] array;

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(_configuration["JWT:UserSecret"]);
                aes.IV = iv;
                aes.Padding = PaddingMode.PKCS7;
                aes.Mode = CipherMode.CBC;

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
                        {
                            streamWriter.Write(Environment.MachineName);
                        }

                        array = memoryStream.ToArray();
                    }
                }
            }

            return Convert.ToBase64String(array);
        }


    }
}
