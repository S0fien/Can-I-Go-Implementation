const { Schema } = require('mongoose');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      level: {
        type: Number,
        required: true,
      },
      owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
      },
    },
    { timestamps: true },
  );

  return mongoose.model('pass', schema);
};
