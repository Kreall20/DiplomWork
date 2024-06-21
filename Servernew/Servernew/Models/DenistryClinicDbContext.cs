using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Servernew.Models;

public partial class DenistryClinicDbContext : DbContext
{
    public DenistryClinicDbContext()
    {
    }

    public DenistryClinicDbContext(DbContextOptions<DenistryClinicDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Doctor> Doctors { get; set; }

    public virtual DbSet<MedicalBook> MedicalBooks { get; set; }

    public virtual DbSet<MedicalRecord> MedicalRecords { get; set; }

    public virtual DbSet<PastScheduleRecord> PastScheduleRecords { get; set; }

    public virtual DbSet<Patient> Patients { get; set; }

    public virtual DbSet<ScheduleRecord> ScheduleRecords { get; set; }

    public virtual DbSet<Tooth> Teeth { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-25F9MOP\\SQLEXPRESS;Database=Denistry_clinic_DB;Trusted_Connection=True;TrustServerCertificate=true;;MultipleActiveResultSets=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.HasKey(e => e.DoctorId).HasName("PK__Doctor__F3993564871CC89B");

            entity.Property(e => e.DoctorId).HasColumnName("doctor_id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("last_name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.UserId).HasColumnName("user_Id");
        });

        modelBuilder.Entity<MedicalBook>(entity =>
        {
            entity.HasKey(e => e.MedicalBookId).HasName("PK__MedicalB__D91EE3568BD3E3CD");

            entity.Property(e => e.MedicalBookId).HasColumnName("medical_book_id");
            entity.Property(e => e.PatientId).HasColumnName("patient_id");

            entity.HasOne(d => d.Patient).WithMany(p => p.MedicalBooks)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__MedicalBo__patie__5812160E");
        });

        modelBuilder.Entity<MedicalRecord>(entity =>
        {
            entity.HasKey(e => e.MedicalRecordId).HasName("PK__MedicalR__05C4C30AC3AEF2BE");

            entity.ToTable("MedicalRecord");

            entity.HasIndex(e => e.MedicalBookId, "idx_medical_book_id");

            entity.Property(e => e.MedicalRecordId).HasColumnName("medical_record_id");
            entity.Property(e => e.MedicalBookId).HasColumnName("medical_book_id");

            entity.HasOne(d => d.MedicalBook).WithMany(p => p.MedicalRecords)
                .HasForeignKey(d => d.MedicalBookId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__MedicalRe__medic__5AEE82B9");
        });

        modelBuilder.Entity<PastScheduleRecord>(entity =>
        {
            entity.Property(e => e.PastscheduleRecordId).HasColumnName("pastschedule_record_id");
            entity.Property(e => e.PaymentAmount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.ScheduleRecordId).HasColumnName("schedule_record_id");

            entity.HasOne(d => d.ScheduleRecord).WithMany(p => p.PastScheduleRecords)
                .HasForeignKey(d => d.ScheduleRecordId)
                .HasConstraintName("FK_PastAppointments_ScheduleRecords");
        });

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.HasKey(e => e.PatientId).HasName("PK__Patient__4D5CE47692682678");

            entity.Property(e => e.PatientId)
                .ValueGeneratedNever()
                .HasColumnName("patient_id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("last_name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone_number");
        });

        modelBuilder.Entity<ScheduleRecord>(entity =>
        {
            entity.HasKey(e => e.ScheduleRecordId).HasName("PK__Schedule__39BE1E0BF5C64F31");

            entity.ToTable(tb => tb.HasTrigger("trg_CheckAppointmentTime"));

            entity.HasIndex(e => e.AppointmentDate, "idx_appointment_date");

            entity.HasIndex(e => e.DoctorId, "idx_doctor_id");

            entity.HasIndex(e => e.PatientId, "idx_patient_id");

            entity.Property(e => e.ScheduleRecordId).HasColumnName("schedule_record_id");
            entity.Property(e => e.AppointmentDate)
                .HasColumnType("datetime")
                .HasColumnName("appointment_date");
            entity.Property(e => e.DoctorId).HasColumnName("doctor_id");
            entity.Property(e => e.PatientId).HasColumnName("patient_id");

            entity.HasOne(d => d.Doctor).WithMany(p => p.ScheduleRecords)
                .HasForeignKey(d => d.DoctorId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__ScheduleR__docto__5441852A");

            entity.HasOne(d => d.Patient).WithMany(p => p.ScheduleRecords)
                .HasForeignKey(d => d.PatientId)
                .HasConstraintName("FK__ScheduleR__patie__5535A963");
        });

        modelBuilder.Entity<Tooth>(entity =>
        {
            entity.HasKey(e => e.ToothId).HasName("PK__Tooth__B5897CE33D0479CD");

            entity.ToTable("Tooth");

            entity.HasIndex(e => e.MedicalRecordId, "idx_medical_record_id");

            entity.Property(e => e.ToothId).HasColumnName("tooth_id");
            entity.Property(e => e.DescriptionTooth)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MedicalRecordId).HasColumnName("medical_record_id");
            entity.Property(e => e.ToothNumber).HasColumnName("tooth_number");

            entity.HasOne(d => d.MedicalRecord).WithMany(p => p.Teeth)
                .HasForeignKey(d => d.MedicalRecordId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Tooth__medical_r__5DCAEF64");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
