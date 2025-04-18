using System.ComponentModel.DataAnnotations;
namespace Api.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public int UserId { get; set; }

        public User? User { get; set; }
        public List<Budget> Budgets { get; set; } = new List<Budget>();
    }
}