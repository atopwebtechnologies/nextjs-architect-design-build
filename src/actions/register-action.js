"use server";

export async function registerAction(formData) {
  // Insert data into the database. But for simplicity sake I'll just log it to the console
  try {
    console.log(formData);
  } catch (error) {
    console.error(error);
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Registration failed.",
    };
  }
}
