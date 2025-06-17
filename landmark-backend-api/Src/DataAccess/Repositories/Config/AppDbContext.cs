using landmark_backend_api.Models;
using Microsoft.EntityFrameworkCore;

namespace landmark_backend_api.Data.Repositories.Config;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
  
  public DbSet<Landmark> Landmarks { get; set; }
  public DbSet<LandmarkLocationData> LandmarkLocationData { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<LandmarkLocationData>()
                .HasOne<Landmark>(e => e.Landmark)
                .WithOne(e => e.LandmarkLocation)
                .HasForeignKey<LandmarkLocationData>(e => e.LandmarkId)
                .OnDelete(DeleteBehavior.Cascade); // 1:1 relationship

    modelBuilder.Entity<Landmark>()
                .Property<DateTime>(p => p.LandmarkCreationDate)
                .HasDefaultValueSql("NOW()");
  }
}
