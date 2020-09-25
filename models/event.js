module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    name: DataTypes.STRING,
    eventDate: DataTypes.STRING,
    time: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    fullname: DataTypes.STRING,
  });

  Event.associate = function (models) {
    Event.hasMany(models.Comment, {
      onDelete: "cascade",
    }),
      Event.hasMany(models.Invitee, {
        onDelete: "cascade",
      });
  };

  return Event;
};
