using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StatFB.Controllers
{
    public class TestController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
	}
}