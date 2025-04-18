using System.ComponentModel.DataAnnotations;
namespace Api.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public List<Budget> Budgets { get; set; } = new List<Budget>();
        public List<User_Account> User_Accounts { get; set; } = new List<User_Account>();
        public List<Category> Categories { get; set; } = new List<Category>();
    }
}