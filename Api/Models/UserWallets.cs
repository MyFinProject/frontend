using System.ComponentModel.DataAnnotations;
namespace Api.Models
{
    public class UserWallets
    {
        public string WalletId { get; set; } = string.Empty;
        public String UserId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public double Balance { get; set; }
        public string CurrencieId { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public AppUser? AppUser { get; set; }
        public Currencie? Currencie { get; set; }
    }
}