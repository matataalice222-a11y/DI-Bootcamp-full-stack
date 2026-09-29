const pool = require('../config/db');

const getQuestion = async (id) => {
  const questionResult = await pool.query('SELECT * FROM questions WHERE id=$1', [id]);
  const optionsResult = await pool.query(
    'SELECT o.id, o.option FROM options o JOIN questions_options qo ON o.id=qo.option_id WHERE qo.question_id=$1',
    [id]
  );
  return { ...questionResult.rows[0], options: optionsResult.rows };
};

const getAllQuestions = async () => {
  const result = await pool.query('SELECT * FROM questions');
  return result.rows;
};

module.exports = { getQuestion, getAllQuestions };
