const auth = {
    secret: String(process.env.SECRET),
    expires: '3h',
  };

module.exports = auth;
