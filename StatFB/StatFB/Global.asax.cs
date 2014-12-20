using StatFB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using StatFB.Extensions;

namespace StatFB
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            var httpRequestBase = new HttpRequestWrapper(Request);
            if (httpRequestBase.IsAjaxRequest())
            {
                Exception exception = Server.GetLastError();

                ErrorModel errorModel = new ErrorModel(
                    exception.GetType().FullName,
                    exception.StackTrace,
                    exception.Message);

                Response.ContentType = "application/json";
                Response.Write(errorModel.ToJson());

                HttpException httpException = exception as HttpException;

                Response.StatusCode = httpException != null 
                    ? httpException.GetHttpCode() 
                    : 500;

                Server.ClearError();
            }
        }
    }
}