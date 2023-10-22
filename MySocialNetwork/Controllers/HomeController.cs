using Microsoft.AspNetCore.Mvc;

namespace MySocialNetwork.Controllers
{
    public class HomeController : Controller
    {
        private static string username;

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Messanger()
        {
            Property property = new()
            {
                Username = HomeController.username
                
            };

            HomeController.username = "";

            return View(property);
        }

        public IActionResult Registration(string username)
        {
            HomeController.username = username;
            UserProperty.UserName = username;

            Property property = new()
            {
                Username = username
            };

            return View(property);
        }
    }
}
