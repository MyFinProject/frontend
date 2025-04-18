using System.ComponentModel.DataAnnotations;
namespace Api.Models
{
    public class User_Account
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public double Balance { get; set; }
        public bool IsActive { get; set; } = true;
        public int Currency { get; set; }
        public User? User { get; set; }
    }
}