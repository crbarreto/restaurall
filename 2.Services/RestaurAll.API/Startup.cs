using CrossCutting.IoC;
using Domain.Common.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore.Mvc;
using SimpleInjector.Lifestyles;

namespace RestaurAll.API
{
  public class Startup
  {
    private readonly Container _container = new Container();

    public Startup(IConfiguration configuration, IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
        .AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      var appsettings = Configuration.GetSection("AppSettings").Get<AppSettings>();
      services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
      services.Configure<MongoConnection>(Configuration.GetSection("MongoConnection"));

      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

      services.Configure<IISOptions>(options =>
      {
        options.ForwardClientCertificate = false;
      });

      services.Configure<ApiBehaviorOptions>(options => { options.SuppressModelStateInvalidFilter = true; });

      #region Authentication
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt =>
        {
          opt.Authority = $"{appsettings.Firebase.SecureTokenUrl}{appsettings.Firebase.ProjectId}";
          opt.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuer = true,
            ValidIssuer = $"{appsettings.Firebase.SecureTokenUrl}{appsettings.Firebase.ProjectId}",
            ValidateAudience = true,
            ValidAudience = $"{appsettings.Firebase.ProjectId}",
            ValidateLifetime = true
          };
        });
      #endregion

      IntegrateSimpleInjector(services);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      InitializeContainer(app);

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseAuthentication();
      app.UseMvc();

    }

    private void IntegrateSimpleInjector(IServiceCollection services)
    {
      _container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();

      services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

      services.AddSingleton<IControllerActivator>(
          new SimpleInjectorControllerActivator(_container));
      services.AddSingleton<IViewComponentActivator>(
          new SimpleInjectorViewComponentActivator(_container));

      services.EnableSimpleInjectorCrossWiring(_container);
      services.UseSimpleInjectorAspNetRequestScoping(_container);
    }

    private void InitializeContainer(IApplicationBuilder app)
    {
      // Add application presentation components:
      _container.RegisterMvcControllers(app);
      _container.RegisterMvcViewComponents(app);

      // Add application services. For instance:
      _container.RegisterDependenciesScoped();

      // Allow Simple Injector to resolve services from ASP.NET Core.
      _container.AutoCrossWireAspNetComponents(app);
    }
  }
}
