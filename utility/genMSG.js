module.exports = {
  message: (email, body) => {
    const message = `message from: **${email}**\n**content:**\n${body}`;
    return message;
  },
};
