module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postAuthor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Posts;
};
