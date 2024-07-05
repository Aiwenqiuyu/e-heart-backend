const dietLogReflectionService = require('../services/dietLogReflectionService');

class DietLogReflectionController {
  async getAllDietLogReflections(req, res) {
    try {
      const reflections = await dietLogReflectionService.getAllDietLogReflections();
      res.json(reflections);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDietLogReflectionById(req, res) {
    try {
      const reflection = await dietLogReflectionService.getDietLogReflectionById(req.params.id);
      if (reflection) {
        res.json(reflection);
      } else {
        res.status(404).json({ error: 'Diet Log Reflection not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDietLogReflection(req, res) {
    try {
      const reflection = await dietLogReflectionService.createDietLogReflection(req.body);
      res.status(201).json(reflection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDietLogReflection(req, res) {
    try {
      const reflection = await dietLogReflectionService.updateDietLogReflection(req.params.id, req.body);
      res.json(reflection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDietLogReflection(req, res) {
    try {
      await dietLogReflectionService.deleteDietLogReflection(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getDietingDayOfWeek(req, res) {
    try {
      const { start_date, end_date, user_id } = req.query;
      const data = await dietLogReflectionService.getDietingDayOfWeek(user_id, start_date, end_date);
      res.json({ dietingDayOfWeek: data });
    } catch (error) {
      res.status(500).json({ error_msg: error.message });
    }
  }
}

module.exports = new DietLogReflectionController();
