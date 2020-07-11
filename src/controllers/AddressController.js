const User = require('../models/User');
const Address = require('../models/Address');

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'address'}
        });

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'Produtos não encontrado!'
            });
        }

        return res.status(200).send(user);
    },

    async store(req, res) {

      try {

          const { user_id } = req.params;
          const { street, number, district, city } = req.body;

          const user = await User.findByPk(user_id);

          if (!user) {
              return res.status(400).json({
                  status: 0,
                  message: 'Usuário não encontrado!'
              });
          }

          const address = await Address.create({
            street,
            number,
            district,
            city,
            user_id,
          });

          return res.status(200).json({
              status: 1,
              message: "Address cadastrado com sucesso!",
              address
          });

        } catch (err) {
          return res.status(400).json({ error: err });
      }
    },

    async delete(req, res) {
        const id = req.params.id;

        try {
            const address = await Address.findByPk(id);

            if (address) {
                await Address.destroy({ where: { id } });

                return res.status(200).json({
                    status: 1,
                    message: "Address apagado com sucesso!",
                });

            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'Address não encontrado!'
                });
            }


        } catch (err) {
            return res.status(400).json({ error: err });
        }
    },

    async update(req, res) {
        const id = req.params.id;
        const { street, number, district, city } = req.body;

        try {
            const address = await Address.findByPk(id);

            if (address) {
                await Address.update({ street, number, district, city }, { where: { id } });

                return res.status(200).json({
                    status: 1,
                    message: "Address atualizado com sucesso!",
                });

            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'Address não encontrado!'
                });
            }


        } catch (err) {
            return res.status(400).json({
                status: 0,
                message: 'Erro ao atualizar Address!'
            });
        }
    }
};