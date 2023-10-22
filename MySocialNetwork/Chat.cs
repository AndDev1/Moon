using Microsoft.AspNetCore.SignalR;
using MySocialNetwork;
using System.Threading.Tasks;

namespace MyProject.Hubs
{
    public class Chat: Hub
    {
        private static long msgCount = 0;

        public async Task SendMessage(string user, string message)
        {
            msgCount += 1;
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public override async Task OnConnectedAsync()
        {
            if (!string.IsNullOrEmpty(UserProperty.UserName))
            {
                await Clients.All.SendAsync("NewUserInChat", UserProperty.UserName);
                await base.OnConnectedAsync();
            }

            UserProperty.UserName = "";
        }

        public long AllMsg()
        {
            return msgCount;
        }
    }
}
