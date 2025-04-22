namespace Api.Models
{
    public class Transaction
    {
        public string TransactionId { get; set; } = string.Empty;
        public String UserId { get; set; } = string.Empty;
        public string CategoryId { get; set; } = string.Empty;
        public int Amount { get; set; }
        public string CurrencieId { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public string Description { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
        public Category? Category { get; set; }
        public Currencie? Currencie { get; set; }
        public List<Attachment> Attachments { get; set; } = new List<Attachment>();

    }
}
