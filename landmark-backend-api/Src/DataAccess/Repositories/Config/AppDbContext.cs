using Microsoft.EntityFrameworkCore;

namespace landmark_backend_api.Data.Repositories.Config;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
  {
    // todo: add data models and config methods here
  }
}
