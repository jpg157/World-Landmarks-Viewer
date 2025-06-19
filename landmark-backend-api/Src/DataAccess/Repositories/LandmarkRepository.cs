using landmark_backend_api.Data.Repositories.Config;
using landmark_backend_api.Models;
using Microsoft.EntityFrameworkCore;

namespace landmark_backend_api.Data.Repositories;

public class LandmarkRepository : ILandmarkDataAccessor
{
  private readonly AppDbContext _db;

  public LandmarkRepository(AppDbContext db)
  {
    _db = db;
  }

  public async Task<List<Landmark>> FindAll() //TODO: findAll in specified pagination range (skip and take)
  {
    List<Landmark> landmarks = await _db.Landmarks
                    //todo: add pagination query
                    .ToListAsync();
    return landmarks;
  }

  public async Task<Landmark?> FindById(int id)
  {
    Landmark? landmark = await _db.Landmarks.FindAsync(id);
    return landmark;
  }

  public async Task<Landmark> Create(Landmark landmark)
  {
    // Add to dbContext landmarks
    await _db.Landmarks.AddAsync(landmark);

    // Save changes made to db context to the database 
    // (translates all tracked dbcontext operations to sql db provider statements)
    await _db.SaveChangesAsync();

    return landmark;
  }

  public async Task<IEnumerable<Landmark>> CreateMany(IEnumerable<Landmark> landmarks)
  {
    await _db.Landmarks.AddRangeAsync(landmarks);
    await _db.SaveChangesAsync();
    return landmarks;
  }

  public async Task<Landmark?> UpdateImageSrcUrl(string imageSrcUrl, int landmarkId)
  {
    // execute batch update (where should only return one entry since we're using unique ids)
    int numEntriesUpdated = await _db.Landmarks
          .Where(landmark => landmark.Id == landmarkId)
          .ExecuteUpdateAsync(setters => setters.SetProperty(landmark => landmark.ImageApiUrl, imageSrcUrl));

    // No entry found with the landmarkId
    if (numEntriesUpdated == 0)
    {
      return null;
    }

    // find and return the updated landmark stored in db (query result should not be null)
    Landmark? updatedLandmark = await _db.Landmarks.FindAsync(landmarkId);

    return updatedLandmark;
  }

  public async Task DeleteById(int id)
  {
    // execute batch delete
    int numEntriesDeleted = await _db.Landmarks
          .Where(landmark => landmark.Id == id)
          .ExecuteDeleteAsync();
          
    // No entry found with the id
    if (numEntriesDeleted == 0)
    {
      throw new KeyNotFoundException($"No landmark was found with id {id}");
    }
  }
}
