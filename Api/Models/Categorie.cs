using System.ComponentModel.DataAnnotations;
namespace Api.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public List<Budget> Budgets { get; set; } = new List<Budget>();
        public List<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}