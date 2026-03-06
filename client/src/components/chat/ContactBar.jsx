import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const DummyRecentContact = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit.sharma@example.com",
    contactNumber: "9876543210",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@example.com",
    contactNumber: "9876501234",
  },
  {
    id: 3,
    name: "Rahul Singh",
    email: "rahul.singh@example.com",
    contactNumber: "9123456780",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    contactNumber: "9988776655",
  },
  {
    id: 5,
    name: "Vikram Patel",
    email: "vikram.patel@example.com",
    contactNumber: "9898989898",
  },
  {
    id: 6,
    name: "Neha Joshi",
    email: "neha.joshi@example.com",
    contactNumber: "9812345678",
  },
  {
    id: 7,
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    contactNumber: "9001122334",
  },
  {
    id: 8,
    name: "Kavita Nair",
    email: "kavita.nair@example.com",
    contactNumber: "9012345678",
  },
  {
    id: 9,
    name: "Rohit Agarwal",
    email: "rohit.agarwal@example.com",
    contactNumber: "9090909090",
  },
  {
    id: 10,
    name: "Pooja Kapoor",
    email: "pooja.kapoor@example.com",
    contactNumber: "9887766554",
  },
];

const DummyAllContact = [
  {
    id: 11,
    name: "Ankit Tiwari",
    email: "ankit.tiwari@example.com",
    contactNumber: "9876012345",
  },
  {
    id: 12,
    name: "Ritika Saxena",
    email: "ritika.saxena@example.com",
    contactNumber: "9811122233",
  },
  {
    id: 13,
    name: "Manish Yadav",
    email: "manish.yadav@example.com",
    contactNumber: "9822334455",
  },
  {
    id: 14,
    name: "Deepak Choudhary",
    email: "deepak.choudhary@example.com",
    contactNumber: "9833445566",
  },
  {
    id: 15,
    name: "Shalini Mishra",
    email: "shalini.mishra@example.com",
    contactNumber: "9844556677",
  },
  {
    id: 16,
    name: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    contactNumber: "9855667788",
  },
  {
    id: 17,
    name: "Nisha Arora",
    email: "nisha.arora@example.com",
    contactNumber: "9866778899",
  },
  {
    id: 18,
    name: "Sandeep Kulkarni",
    email: "sandeep.kulkarni@example.com",
    contactNumber: "9877889900",
  },
  {
    id: 19,
    name: "Pankaj Bansal",
    email: "pankaj.bansal@example.com",
    contactNumber: "9888990011",
  },
  {
    id: 20,
    name: "Aarti Deshmukh",
    email: "aarti.deshmukh@example.com",
    contactNumber: "9899001122",
  },
  {
    id: 21,
    name: "Varun Khanna",
    email: "varun.khanna@example.com",
    contactNumber: "9900112233",
  },
  {
    id: 22,
    name: "Megha Sinha",
    email: "megha.sinha@example.com",
    contactNumber: "9911223344",
  },
  {
    id: 23,
    name: "Tarun Bhatt",
    email: "tarun.bhatt@example.com",
    contactNumber: "9922334455",
  },
  {
    id: 24,
    name: "Komal Jain",
    email: "komal.jain@example.com",
    contactNumber: "9933445566",
  },
  {
    id: 25,
    name: "Rakesh Pawar",
    email: "rakesh.pawar@example.com",
    contactNumber: "9944556677",
  },
  {
    id: 26,
    name: "Divya Nanda",
    email: "divya.nanda@example.com",
    contactNumber: "9955667788",
  },
  {
    id: 27,
    name: "Saurabh Gupta",
    email: "saurabh.gupta@example.com",
    contactNumber: "9966778899",
  },
  {
    id: 28,
    name: "Isha Kapoor",
    email: "isha.kapoor@example.com",
    contactNumber: "9977889900",
  },
  {
    id: 29,
    name: "Aditya Srivastava",
    email: "aditya.srivastava@example.com",
    contactNumber: "9988990011",
  },
  {
    id: 30,
    name: "Ritu Pandey",
    email: "ritu.pandey@example.com",
    contactNumber: "9999001122",
  },
];

const ContactBar = ({ fetchMode, setReceiver }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = () => {
    // Simulate an API call with a delay
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
        if (fetchMode === "RC") {
          setContacts(DummyRecentContact);
        } else if (fetchMode === "AC") {
          setContacts(DummyAllContact);
        } else {
          setContacts([]);
        }
      }, 1000);
    } catch (error) {
      toast.error("Failed to load contacts. Please try again.");
    } finally {
      //setLoading(true);
    }
  };

  useEffect(() => {
    // Simulate fetching contacts from an API when the component mounts
    fetchContacts();
  }, [fetchMode]);

  if (loading || contacts.length === 0) {
    return (
      <div className="p-2 h-full flex items-center justify-center">
        <span className="text-sm text-primary">Loading contacts...</span>
      </div>
    );
  }

  return (
    <>
      <div className="p-2 bg-accent-content h-full flex flex-col gap-2">
        <div className="overflow-y-auto space-y-1">
          {contacts &&
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-2 bg-accent hover:bg-primary transition-colors rounded-lg cursor-pointer"
                onClick={() => {
                  setReceiver(contact);
                }}
              >
                <h3 className="font-semibold text-accent-content">
                  {contact.name}
                </h3>
                <p className="text-sm text-accent-content">{contact.email}</p>
                <p className="text-lg font-bold text-accent-content">
                  {contact.contactNumber}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ContactBar;