// import axios from "axios";

// export const authenticateUser = async (username, password) => {
//   try {
//     // Fetch customer users from the database
//     const response = await axios.get("http://localhost:8081/customer-user");
//     const customers = response.data;

//     // Find a user with the matching username and password
//     const authenticatedUser = customers.find(
//       (user) => user.username === username && user.password === password
//     );

//     return authenticatedUser; // Return the authenticated user or undefined
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return null; // Handle error case appropriately
//   }
// };

import axios from "axios";

export const authenticateUser = async (username, password) => {
  try {
    // Fetch customer users from the database
    const response = await axios.get("http://localhost:8081/customer-user");
    const customers = response.data;

    // Find a user with the matching username and password
    const authenticatedUser = customers.find(
      (user) => user.username === username && user.password === password
    );

    if (authenticatedUser) {
      // Update the user's online status
      await axios.post(
        `http://localhost:8081/customer-user/${authenticatedUser.id}/online`,
        {
          is_online: 1,
        }
      );
    }

    return authenticatedUser; // Return the authenticated user or undefined
  } catch (error) {
    console.error("Error fetching users:", error);
    return null; // Handle error case appropriately
  }
};
