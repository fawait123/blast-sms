const Auth = {
  login: async (req, res) => {
    try {
      return res.respond({ name: 'oke' })
    } catch (error) {
      return res.send({
        code: 500,
        message: error.message,
        data: {},
      })
    }
  },
}

module.exports = Auth
