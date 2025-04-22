using System.ComponentModel.DataAnnotations;
namespace Api.Models
{
    public class UserWallets
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public double Balance { get; set; }
        public int CurrencieId { get; set; }
        public bool IsActive { get; set; } = true;
        public User? User { get; set; }
        public Currencie? Currencie { get; set; }
    }
}