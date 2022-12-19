const { Schema } = require('mongoose');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      phone: String,
      address: String,
      passes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'pass',
        },
      ],
    },
  );

  return mongoose.model('user', schema);
};
