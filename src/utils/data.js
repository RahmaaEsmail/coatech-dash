export const Orders = [
  {
    id: "#6829347018",
    created_at: "2025-04-15T10:45:00Z",
    price: "2500.00",
    response: 1,
    user_id:1,
    notes: "Urgent delivery requested",
    products: [
      {
        id: 1,
        price: 1800,
        banel_img:
          "https://res.cloudinary.com/dbz6ebekj/image/upload/v1744642170/PLSF20216-RAL-5015-removebg-preview_w1qo0u.png",
        color: "PLSF20034-RAL-5013",
        quantity: "75 kg",
        variations: [
          {
            catalog: "RAL",
            powder_type: "Polyester",
            clear_coats: "Glossy Clear",
            finish: "Solid Tone",
            gloss_level: "Flat",
            response: 1,
            attribute: "red",
            color: "PLSF20034-RAL-5013",
          },
        ],
      },
      {
        id: 2,
        price: 400,
        banel_img:
          "https://coatechcoatings.com/wp-content/uploads/2024/12/PRMF97221-Dormant-Yellow.jpg",
        color: "Dormant Yellow",
        quantity: "75 kg",
        variations: [
          {
            color: "Dormant Yellow",
            catalog: "RAL",
            powder_type: "Epoxy",
            clear_coats: "Matte Clear",
            finish: "Metallic",
            gloss_level: "Semi-Gloss",
            response: 0,
            attribute: "green",
          },
        ],
      },
    ],
  },
  {
    user_id:2,
    id: "#6257692438",
    created_at: "2025-04-14T14:30:00Z",
    price: "1800.00",
    response: 0,
    notes: "Standard processing",
    products: [
      {
        id: 3,
        price: 1800,
        banel_img:
          "https://coatechcoatings.com/wp-content/uploads/2024/12/PLSF40105-Tube-Brown-.jpg",
        color: "Tube Brown",
        quantity: "25 kg",
        variations: [
          {
            color: "Tube Brown",
            catalog: "RAL",
            powder_type: "Hybrid",
            clear_coats: "Glossy Clear",
            finish: "Textured",
            gloss_level: "High Gloss",
            attribute: "black",
          },
        ],
      },
    ],
  },
  {
    user_id:1,
    id: "#1927357927",
    created_at: "2025-04-10T09:15:00Z",
    price: "3200.00",
    response: 1,
    notes: "Repeat customer",
    products: [
      {
        id: 4,
        price: 1200,
        banel_img:
          "https://res.cloudinary.com/dbz6ebekj/image/upload/v1744640752/RAL_5026_Pearl_Night_Blue_pnlfei.jpg",
        color: "Pearl Night Blue",
        quantity: "50 kg",
        variations: [
          {
            color: "Pearl Night Blue",
            catalog: "RAL",
            powder_type: "Polyester",
            clear_coats: "None",
            finish: "Smooth",
            gloss_level: "Glossy",
            attribute: "blue",
          },
        ],
      },
      {
        id: 5,
        price: 2000,
        banel_img:
          "https://res.cloudinary.com/dbz6ebekj/image/upload/v1744642183/PLSF7035-RAL-7035-removebg-preview_jyahvp.png",
        color: "Shadow Black FX",
        quantity: "100 kg",
        variations: [
          {
            color: "Shadow Black FX",
            catalog: "Special Effects",
            powder_type: "Hybrid",
            clear_coats: "Tinted",
            finish: "Sparkle",
            gloss_level: "Matte",
            attribute: "black",
          },
        ],
      },
    ],
  },
  {
    user_id:1,
    id: "#782905178",
    created_at: "2025-04-08T16:45:00Z",
    price: "950.00",
    response: 0,
    notes: "First order from client",
    products: [
      {
        id: 6,
        price: 950,
        banel_img:
          "https://coatechcoatings.com/wp-content/uploads/2024/12/SRSL46636-Seawolf.jpg",
        color: "Walnut Brown",
        quantity: "25 kg",
        variations: [
          {
            color: "Walnut Brown",
            catalog: "Wood Finish Collection",
            powder_type: "Polyester",
            clear_coats: "Clear",
            finish: "Woodgrain",
            gloss_level: "Satin",
            attribute: "brown",
          },
        ],
      },
    ],
  },
];

export const ALL_USERS = 
[
  {
    id: 1,
    email: "rahma@gmail.com",
    phone: "012329765382",
    company_name: "Camp Co.",
    city: "Tanta",
    region: "Gharbia",
    address: "10 El Galaa St",
  },
  {
    id: 2,
    email: "mohamed@steeltech.com",
    phone: "01004567891",
    company_name: "SteelTech",
    city: "Cairo",
    region: "Nasr City",
    address: "25 Industrial Zone",
  },
  {
    id: 3,
    email: "salma@metalworks.net",
    phone: "01111222333",
    company_name: "MetalWorks Egypt",
    city: "Alexandria",
    region: "Borg El Arab",
    address: "Free Zone Area",
  },
  {
    id: 4,
    email: "ahmed@alphaindustries.com",
    phone: "01099887766",
    company_name: "Alpha Industries",
    city: "6th October",
    region: "Giza",
    address: "Plot 14, Industrial Area",
  },
  {
    id: 5,
    email: "eman@powdercoats.org",
    phone: "01233445566",
    company_name: "PowderCoats Ltd.",
    city: "Mansoura",
    region: "Dakahlia",
    address: "15 Shabab St",
  },
];
