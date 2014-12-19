using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StatFB.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
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
    }
}
