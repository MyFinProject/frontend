namespace Api.Models
{
    public class Currencie
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public decimal Rate { get; set; }
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public List<UserWallets> UserAccounts { get; set; } = new List<UserWallets>();
        public List<Transaction> Transactions { get; set; } = new List<Transaction>();
        public List<Budget> Budgets { get; set; } = new List<Budget>();
    }
}
