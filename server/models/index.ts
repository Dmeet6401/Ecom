// const dbConfig = require("../config/dbConfig");

// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,
  
//     pool: {
//       max: dbConfig.pool.max,
//       min: dbConfig.pool.min,
//       acquire: dbConfig.pool.acquire,
//       idle: dbConfig.pool.idle,
//     },
//   });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connected");
//   })
//   .catch((err : any) => {
//     console.log(err);
//   });

// const orderDetails = sequelize.define("orderDetails", {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     order_id: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     order_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     total_amount: {
//       type: DataTypes.NUMERIC,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     country: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     city: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
   
//     pincode: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     payment_type: {
//       type: DataTypes.ENUM,
//       values: ['cash', 'upi', 'credit card', 'debit card'],
//       allowNull: false,
//     },
//     payment_status: {
//       type: DataTypes.ENUM,
//       values: ['pending', 'completed'],
//       allowNull: false,
//     },
//     delivery_status: {
//       type: DataTypes.ENUM,
//       values: ['pending', 'shipped', 'delivered'],
//       allowNull: false,
//     },
//   });

// orderDetails.sync({ alter: true })
//   .then(() => {
//     console.log("orderDetails table created or updated");
//   })
//   .catch((err: any) => {
//     console.log(err);
//   });

// module.exports = { sequelize, orderDetails };

const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to the database.");
    })
    .catch((err : any) => {
        console.log("Database connection error:", err);
    });

const OrderDetails = sequelize.define("OrderDetails", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_type: {
        type: DataTypes.ENUM("cash", "upi", "credit card", "debit card"),
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.ENUM("pending", "completed"),
        allowNull: false,
    },
    delivery_status: {
        type: DataTypes.ENUM("pending", "shipped", "delivered"),
        allowNull: false,
    },
    products: {
        type: DataTypes.JSON, // Use JSONB for PostgreSQL
        allowNull: false,
    },
});

OrderDetails.sync({ alter: true })
    .then(() => {
        console.log("OrderDetails table created or updated successfully.");
    })
    .catch((err : any) => {
        console.log("Error creating/updating OrderDetails table:", err);
    });

module.exports = { sequelize, OrderDetails };
