using System.ComponentModel.DataAnnotations;
namespace Api.Models
{
    public class Budget
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int Amount { get; set; }
        public int CurrencyId { get; set; }
        public string Period { get; set; } = string.Empty;
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; }
        public User? User { get; set; }
        public Category? Category { get; set; }
        public Currencie? Currencie { get; set; }
    }
}