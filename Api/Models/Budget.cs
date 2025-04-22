using System.ComponentModel.DataAnnotations;
namespace Api.Models
{
    public class Budget
    {
        public string BudgetId { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string CategoryId { get; set; } = string.Empty;
        public int Amount { get; set; }
        public string CurrencyId { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; }
        public AppUser? AppUser { get; set; }
        public Category? Category { get; set; }
        public Currencie? Currencie { get; set; }
    }
}