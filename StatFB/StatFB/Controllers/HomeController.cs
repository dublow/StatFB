using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StatFB.Configurations;

namespace StatFB.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            FacebookSection section = (FacebookSection) ConfigurationManager.GetSection("facebook");
            return View();
        }

        [HttpPost]
        public JsonResult Index(FormCollection coll)
        {
            return Json(new {t = 2});
        }

        [HttpPost]
        public JsonResult Indexthrow(FormCollection coll)
        {
            throw new Exception();
            return Json(new { t = 2 });
        }

        [HttpPost]
        public JsonResult Config()
        {
            FacebookSection section = (FacebookSection)ConfigurationManager.GetSection("facebook");
            return Json(new { appId = section.Config.AppId, scope = section.Config.Scope });
        }
    }
}
