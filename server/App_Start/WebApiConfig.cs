using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Routing.Constraints;

namespace Server
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors();
            // Маршруты веб-API
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "AdditionEntitiesApi",
                routeTemplate: "api/{controller}/{action}/{idEntity}",
                defaults: new {},
                constraints: new { idEntity = new IntRouteConstraint() }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
