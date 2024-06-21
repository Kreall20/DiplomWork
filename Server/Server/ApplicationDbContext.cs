using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using App.Models;
using System;

namespace Server
{
    public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
       /* public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

        public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

        public virtual DbSet<AspNetUserRole> AspNetUserRoles { get; set; }

        public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }*/

        public virtual DbSet<Doctor> Doctors { get; set; }

        public virtual DbSet<MedicalBook> MedicalBooks { get; set; }

        public virtual DbSet<MedicalRecord> MedicalRecords { get; set; }

        public virtual DbSet<PastScheduleRecord> PastScheduleRecords { get; set; }

        public virtual DbSet<Patient> Patients { get; set; }

        public virtual DbSet<ScheduleRecord> ScheduleRecords { get; set; }

        public virtual DbSet<Tooth> Teeth { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<IdentityUserLogin<string>>();
            modelBuilder.Ignore<IdentityUserRole<string>>();
            modelBuilder.Ignore<IdentityUserClaim<string>>();
            modelBuilder.Ignore<IdentityUserToken<string>>();
            modelBuilder.Ignore<IdentityUser<string>>();
            //modelBuilder.Ignore<ApplicationUser>();
            /*// Composite key definition for IdentityUserLogin
            modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(x => new { x.LoginProvider, x.ProviderKey });

            // Composite key definition for IdentityUserRole
            modelBuilder.Entity<IdentityUserRole<string>>().HasKey(x => new { x.UserId, x.RoleId });

            // Define that AspNetUserLogin is a keyless entity
            modelBuilder.Entity<AspNetUserLogin>().HasNoKey();*/


            /*// Relationships
            modelBuilder.Entity<Doctor>()
                .HasOne(d => d.User)
                .WithOne()
                .HasForeignKey<Doctor>(d => d.UserId);*/

            // Define relationships and primary keys for other entities
           /* modelBuilder.Entity<Patient>().HasKey(p => p.PatientId);
            modelBuilder.Entity<Tooth>().HasKey(t => t.ToothId);*/
        }
    }
}
