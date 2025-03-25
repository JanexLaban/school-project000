import fetch from "node-fetch";

async function initializeDatabase() {
  try {
    console.log("Initializing database...");

    // Create data directory if it doesn't exist
    const response = await fetch("http://0.0.0.0:3000/api/db/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log("✅ Database initialized and seeded successfully!");
      console.log("\nSample users created:");
      console.log("- Admin: admin@hospital.com / password123");
      console.log("- Doctor: wanjiku.kimani@hospital.com / password123");
      console.log("- Nurse: akinyi.nurse@hospital.com / password123");
      console.log("- Reception: otieno.reception@hospital.com / password123");
      console.log("- Patient: nyambura.patient@hospital.com / password123");
    } else {
      console.error("❌ Failed to initialize database:", data.error);
    }
  } catch (error) {
    console.error("❌ Error connecting to the API:", error.message);
    console.log(
      "\nMake sure your Next.js application is running on http://0.0.0.0:3000",
    );
  }
}

initializeDatabase();
