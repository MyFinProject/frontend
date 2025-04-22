using Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<UserWallets> UserWallets { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Currencie> Currencies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppUser>().HasKey(u => u.Id);
            modelBuilder.Entity<Budget>().HasKey(u => u.BudgetId);
            modelBuilder.Entity<Transaction>().HasKey(u => u.TransactionId);
            modelBuilder.Entity<Attachment>().HasKey(u => u.AttachmentId);
            modelBuilder.Entity<UserWallets>().HasKey(u => u.WalletId);
            modelBuilder.Entity<Category>().HasKey(c => c.CategoryId);
            modelBuilder.Entity<Currencie>().HasKey(c => c.CurrencieId);

            modelBuilder.Entity<Budget>()
                .HasOne(b => b.Category)
                .WithMany(c => c.Budgets)
                .HasForeignKey(b => b.CategoryId);
            modelBuilder.Entity<Budget>()
                .HasOne(b => b.AppUser)
                .WithMany(u => u.Budgets)
                .HasForeignKey(b => b.BudgetId);
            modelBuilder.Entity<Budget>()
                .HasOne(b => b.Currencie)
                .WithMany(u => u.Budgets)
                .HasForeignKey(b => b.CurrencyId);

            modelBuilder.Entity<UserWallets>()
                .HasOne(ua => ua.AppUser)
                .WithMany(u => u.UserAccounts)
                .HasForeignKey(ua => ua.WalletId);
            modelBuilder.Entity<UserWallets>()
                .HasOne(ua => ua.Currencie)
                .WithMany(u => u.UserAccounts)
                .HasForeignKey(ua => ua.CurrencieId);

            modelBuilder.Entity<Transaction>()
                .HasOne(a => a.AppUser)
                .WithMany(u => u.Transactions)
                .HasForeignKey(a => a.TransactionId);
            modelBuilder.Entity<Transaction>()
                .HasOne(a => a.Currencie)
                .WithMany(u => u.Transactions)
                .HasForeignKey(a => a.CurrencieId);

            modelBuilder.Entity<Attachment>()
                .HasOne(a => a.Transaction)
                .WithMany(u => u.Attachments)
                .HasForeignKey(a => a.TransactionId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
