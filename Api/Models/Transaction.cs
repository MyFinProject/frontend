namespace Api.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int Amount { get; set; }
        public int CurrencieId { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string Description { get; set; } = string.Empty;
        public User? User { get; set; }
        public Category? Category { get; set; }
        public Currencie? Currencie { get; set; }
        public List<Attachment> Attachments { get; set; } = new List<Attachment>();

    }
}
