using System.ComponentModel.DataAnnotations;
namespace Api.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public List<Budget> Budgets { get; set; } = new List<Budget>();
        public List<UserWallets> UserAccounts { get; set; } = new List<UserWallets>();
        public List<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}