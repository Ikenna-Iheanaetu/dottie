import { v4 as uuidv4 } from 'uuid';
import db from '../db/index.js';

// In-memory store for tests
const testAssessments = {};

// Check if we're in test mode
const isTestMode = process.env.NODE_ENV === 'test' || process.env.TEST_MODE === 'true';

class Assessment {
  /**
   * Find an assessment by ID
   * @param {string} id - Assessment ID
   * @returns {Promise<Object|null>} Assessment object or null if not found
   */
  static async findById(id) {
    try {
      // Use in-memory store for tests
      if (isTestMode && testAssessments[id]) {
        return testAssessments[id];
      }

      // Placeholder implementation - replace with actual database query
      const assessment = await db.query(
        'SELECT * FROM assessments WHERE id = ?',
        [id]
      );
      
      if (assessment && assessment.length > 0) {
        return assessment[0];
      }
      return null;
    } catch (error) {
      console.error('Error finding assessment by ID:', error);
      throw error;
    }
  }

  /**
   * Create a new assessment
   * @param {Object} assessmentData - Assessment data
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Created assessment object
   */
  static async create(assessmentData, userId) {
    try {
      const id = uuidv4();
      const now = new Date();
      
      // Use in-memory store for tests
      if (isTestMode) {
        const assessment = {
          id,
          userId,
          assessmentData,
          createdAt: now,
          updatedAt: now
        };
        testAssessments[id] = assessment;
        return assessment;
      }

      // Placeholder implementation - replace with actual database query
      await db.query(
        'INSERT INTO assessments (id, user_id, assessment_data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
        [id, userId, JSON.stringify(assessmentData), now, now]
      );
      
      return {
        id,
        userId,
        assessmentData,
        createdAt: now,
        updatedAt: now
      };
    } catch (error) {
      console.error('Error creating assessment:', error);
      throw error;
    }
  }

  /**
   * List all assessments for a user
   * @param {string} userId - User ID
   * @returns {Promise<Array>} Array of assessment objects
   */
  static async listByUser(userId) {
    try {
      // Use in-memory store for tests
      if (isTestMode) {
        return Object.values(testAssessments)
          .filter(assessment => assessment.userId === userId);
      }

      // Placeholder implementation - replace with actual database query
      const assessments = await db.query(
        'SELECT * FROM assessments WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      
      return assessments.map(assessment => ({
        ...assessment,
        assessmentData: JSON.parse(assessment.assessment_data)
      }));
    } catch (error) {
      console.error('Error listing assessments by user:', error);
      throw error;
    }
  }

  /**
   * Update an assessment
   * @param {string} id - Assessment ID
   * @param {Object} assessmentData - Updated assessment data
   * @returns {Promise<Object>} Updated assessment object
   */
  static async update(id, assessmentData) {
    try {
      const now = new Date();
      
      // Use in-memory store for tests
      if (isTestMode) {
        if (!testAssessments[id]) {
          throw new Error(`Assessment with ID ${id} not found`);
        }
        
        testAssessments[id] = {
          ...testAssessments[id],
          assessmentData,
          updatedAt: now
        };
        
        return testAssessments[id];
      }

      // Placeholder implementation - replace with actual database query
      await db.query(
        'UPDATE assessments SET assessment_data = ?, updated_at = ? WHERE id = ?',
        [JSON.stringify(assessmentData), now, id]
      );
      
      const updatedAssessment = await this.findById(id);
      return {
        ...updatedAssessment,
        assessmentData
      };
    } catch (error) {
      console.error('Error updating assessment:', error);
      throw error;
    }
  }

  /**
   * Delete an assessment
   * @param {string} id - Assessment ID
   * @returns {Promise<boolean>} True if successful
   */
  static async delete(id) {
    try {
      // Use in-memory store for tests
      if (isTestMode) {
        if (!testAssessments[id]) {
          throw new Error(`Assessment with ID ${id} not found`);
        }
        
        delete testAssessments[id];
        return true;
      }

      // Placeholder implementation - replace with actual database query
      await db.query(
        'DELETE FROM assessments WHERE id = ?',
        [id]
      );
      
      return true;
    } catch (error) {
      console.error('Error deleting assessment:', error);
      throw error;
    }
  }
}

export default Assessment; 