const User = require('../models/User');
const Course = require('../models/Course');

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'courses', through: { attributes: [ 'user_id'] } }
        });

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'Curso não encontrado!'
            });
        }

        return res.status(200).send(user.courses);
    },

    async store(req, res) {

      try {

          const { user_id } = req.params;
          const { name } = req.body;

          const user = await User.findByPk(user_id);

          if (!user) {
              return res.status(400).json({
                  status: 0,
                  message: 'Usuário não encontrado!'
              });
          }

          const [ course ] = await Course.findOrCreate({
            where: { name }
          });

          await user.addCourse(course);

          return res.status(200).json({
              status: 1,
              message: "Curso cadastrado com sucesso!",
              course
          });

        } catch (err) {
          return res.status(400).json({ error: err });
      }
    },

    async delete(req, res) {
        try {

          const { user_id } = req.params;
          const { name } = req.body;

          const user = await User.findByPk(user_id);

          if (!user) {
              return res.status(400).json({
                  status: 0,
                  message: 'Usuário não encontrado!'
              });
          }

          const course = await Course.findOrCreate({
            where: { name }
          });

          await user.removeCourse(course);

          return res.status(200).json({
              status: 1,
              message: "Relacionamento deletado com sucesso!"
          });

        } catch (err) {
          return res.status(400).json({ error: err });
      }
    }
};