using Microsoft.Extensions.DependencyInjection;
using RepositoryLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public static class ServiceLayerDependenciesExtension
    {
        public static void ConfigureService(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationSL, AuthenticationSL>();
            services.AddScoped<IPatientSL,  PatientSL>();
            services.AddScoped<IDoctorSL, DoctorSL>();
            services.AddScoped<IPharmacistSL, PharmacistSL>();
            services.AddScoped<IReceptionistSL, ReceptionistSL>();
        }
    }
}
