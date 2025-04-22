namespace Api.Models
{
    public class Attachment
    {
        public int Id { get; set; }
        public int TransactionId { get; set; }
        public string FilePath { get; set; } = String.Empty;
        public DateTime UploadedAt { get; set; } = DateTime.Now;

        public Transaction? Transaction { get; set; }

    }
}
