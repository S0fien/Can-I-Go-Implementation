module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      address: String,
      name: {
        type: String,
        required: true,
      },
      phone: String,
      minimumSecurityLevel: {
        type: Number,
        required: true,
      },
      ageRating: {
        type: Number,
        required: true,
      },
    },
  );

  return mongoose.model('place', schema);
};
