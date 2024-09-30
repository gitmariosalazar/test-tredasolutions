import { sequelize } from "./infrastructure/database/config/connectdb.js";
import app from "./infrastructure/server/app.js";
import { LISTEN_PORT } from "./settings/config.js";
import { user_types } from "./infrastructure/database/models/UserTypes.js";
import { users } from "./infrastructure/database/models/Users.js";
import { products } from "./infrastructure/database/models/Products.js";
import { orders } from "./infrastructure/database/models/Orders.js";
import { order_items } from "./infrastructure/database/models/OrderItems.js";
import { returns } from "./infrastructure/database/models/Returns.js";
import { refunds } from "./infrastructure/database/models/Refunds.js";

async function main() {
  try {
    await sequelize.sync({ force: false }).then(async () => {
        const count_ut = await user_types.count();
      if(count_ut==0){
        await user_types.bulkCreate([
            { name: "Admin User", description: "Administrator with full access" },
            {
              name: "Common User",
              description: "Customer user with limited access",
            },
          ]);
      }

      const count_p = await products.count();
      if(count_p==0){
        await products.bulkCreate([
            {
              code: "TECH001",
              name: "Laptop",
              description: "High-end laptop",
              price: 1200.0*Math.random(),
              stock: 100,
            },
            {
              code: "TECH002",
              name: "Smartphone",
              description: "Android smartphone",
              price: 600.0*Math.random(),
              stock: 100,
            },
            {
              code: "TECH003",
              name: "Monitor",
              description: "27-inch monitor",
              price: 300.0*Math.random(),
              stock: 100,
            },
            {
              code: "TECH004",
              name: "Mechanical Keyboard",
              description: "Backlit mechanical keyboard",
              price: 100.0*Math.random(),
              stock: 100,
            },
            {
              code: "TECH005",
              name: "Gaming Mouse",
              description: "Mouse with optical sensor",
              price: 50.0*Math.random(),
              stock: 100,
            },
            {
              code: "TECH006",
              name: "Bluetooth Headphones",
              description: "Wireless Bluetooth headphones",
              price: 80.0*Math.random(),
              stock: 100,
            },
            {
              code: "TECH007",
              name: "Smartwatch",
              description: "Smartwatch with fitness tracking",
              price: 150.0*Math.random(),
              stock: 100,
            },
            {
              code: "TECH008",
              name: "Printer",
              description: "Multifunction printer",
              price: 200.0*Math.random(),
              stock: 100,
            },
            {
              code: "TECH009",
              name: "Tablet",
              description: "10-inch tablet",
              price: 300.0*Math.random(),
              stock: 100,
            },
            {
              code: "TECH010",
              name: "Wi-Fi Router",
              description: "High-speed Wi-Fi router",
              price: 75.0*Math.random(),
              stock: 100,
            },
          ]);
      }
      
    });

    app.listen(LISTEN_PORT);
    console.log(`Listening on port http://localhost:${LISTEN_PORT}`);
  } catch (error) {
    console.error(error);
  }
}

main();
