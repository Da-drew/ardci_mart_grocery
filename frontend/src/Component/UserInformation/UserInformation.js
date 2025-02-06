// UserInformation.js
import userProfileId1 from "../Assets/andrew-profile.png";
import userProfileId3 from "../Assets/dp.jpg";

const users = [
  {
    id: 1,
    username: "john",
    password: "john321",
    email: "john@example.com",
    fullName: "John Doe",
    address: "123 Main St, Anytown, USA",
    zipCode: 2801,
    phoneNumber: "555-1234",
    avatar: userProfileId1,
  },
  {
    id: 2,
    username: "jane_does",
    password: "securepassword",
    email: "jane@example.com",
    fullName: "Jane Doe",
    address: "456 Elm St, Othertown, USA",
    zipCode: 2801,
    phoneNumber: "555-5678",
  },
  {
    id: 3,
    username: "bob_smith",
    password: "mypassword",
    email: "bob@example.com",
    fullName: "Bob Smith",
    address: "789 Oak St, Thistown, USA",
    zipCode: 2801,
    phoneNumber: "555-9876",
  },
  {
    id: 4,
    username: "andrew",
    password: "andrew123",
    email: "bellezaandrew@gmail.com",
    fullName: "Andrew Belleza",
    address: "165 Purok 3, Danicop Virac Catanduanes",
    zipCode: 4800,
    phoneNumber: "(+63)907 482 6835",
    avatar: userProfileId3,
  },
];

export default users;
