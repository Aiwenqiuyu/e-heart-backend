const DietLogService = require('../../services/dietLogService');
const DietLogDao = require('../../daos/dietLogDao');

// Mock the DietLog DAO
jest.mock('../../daos/dietLogDao');

describe('DietLogService', () => {
  const dietLogData = {
    id: 1,
    user_id: 1,
    eating_time: '12:00:00',
    food_details: 'Test Food',
    emotion_intensity: 5,
    emotion_type: 'Happy',
    eating_location: 'Home',
    specific_location: 'Kitchen',
    dieting: false,
    binge_eating: false,
    trigger: 'Boredom',
    additional_info: 'No additional info',
  };

  it('should create a new diet log', async () => {
    DietLogDao.createDietLog.mockResolvedValue(dietLogData);
    const dietLog = await DietLogService.createDietLog(dietLogData);
    expect(dietLog).toEqual(dietLogData);
  });

  it('should get all diet logs', async () => {
    DietLogDao.getAllDietLogs.mockResolvedValue([dietLogData]);
    const dietLogs = await DietLogService.getAllDietLogs();
    expect(dietLogs).toEqual([dietLogData]);
  });

  it('should get a diet log by ID', async () => {
    DietLogDao.getDietLogById.mockResolvedValue(dietLogData);
    const dietLog = await DietLogService.getDietLogById(1);
    expect(dietLog).toEqual(dietLogData);
  });

  it('should update a diet log', async () => {
    DietLogDao.updateDietLog.mockResolvedValue({ ...dietLogData, food_details: 'Updated Food' });
    const dietLog = await DietLogService.updateDietLog(1, { food_details: 'Updated Food' });
    expect(dietLog.food_details).toEqual('Updated Food');
  });

  it('should delete a diet log', async () => {
    DietLogDao.deleteDietLog.mockResolvedValue(true);
    const result = await DietLogService.deleteDietLog(1);
    expect(result).toBe(true);
  });
});