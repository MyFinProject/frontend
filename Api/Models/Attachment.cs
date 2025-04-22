namespace Api.Models
{
    public class Attachment
    {
        public string AttachmentId { get; set; } = string.Empty;
        public string TransactionId { get; set; } = string.Empty;
        public string FilePath { get; set; } = String.Empty;
        public DateTime UploadedAt { get; set; } = DateTime.Now;

        public Transaction? Transaction { get; set; }

    }
}
