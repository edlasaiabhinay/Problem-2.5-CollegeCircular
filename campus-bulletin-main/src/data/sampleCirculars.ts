export type Priority = 'urgent' | 'informational' | 'action-required';
export type Department = 'CSE' | 'ECE' | 'MECH' | 'MBA' | 'CIVIL' | 'EEE' | 'IT' | 'All';
export type Year = '1st' | '2nd' | '3rd' | '4th' | 'All';
export type UserRole = 'admin' | 'student';

export interface Comment {
  id: string;
  author: string;
  role: UserRole;
  content: string;
  timestamp: string;
}

export interface Circular {
  id: string;
  title: string;
  content: string;
  priority: Priority;
  department: Department;
  year: Year;
  author: string;
  publishedAt: string;
  scheduledAt?: string;
  isRead: boolean;
  readBy: { name: string; readAt: string }[];
  totalRecipients: number;
  attachments: { name: string; type: string; size: string }[];
  comments: Comment[];
  tags: string[];
  version: number;
  template?: string;
}

export const sampleCirculars: Circular[] = [
  {
    id: "1", title: "End Semester Examination Schedule – December 2025",
    content: "All students are hereby informed that the end semester examinations for the academic year 2025-26 will commence from December 15, 2025. Students must collect their hall tickets from the examination cell by December 10. Those with pending fees will not be issued hall tickets. Ensure all library books are returned before the exam period.",
    priority: "urgent", department: "All", year: "All", author: "Dr. Rajesh Kumar",
    publishedAt: "2025-11-20T09:00:00Z", isRead: false,
    readBy: [{ name: "Priya Sharma", readAt: "2025-11-20T10:30:00Z" }, { name: "Rahul Verma", readAt: "2025-11-20T11:00:00Z" }],
    totalRecipients: 450, attachments: [{ name: "Exam_Schedule.pdf", type: "pdf", size: "2.4 MB" }],
    comments: [{ id: "c1", author: "Priya Sharma", role: "student", content: "Will the practical exams be before or after theory?", timestamp: "2025-11-20T12:00:00Z" }],
    tags: ["examination", "schedule"], version: 2, template: "Exam Notice"
  },
  {
    id: "2", title: "Annual Tech Fest 'InnoVate 2025' Registration Open",
    content: "We are excited to announce that registration for InnoVate 2025 is now open! The fest will feature coding competitions, hackathons, robotics challenges, and guest lectures from industry leaders. Early bird registration closes on November 30.",
    priority: "informational", department: "CSE", year: "All", author: "Prof. Anita Desai",
    publishedAt: "2025-11-18T14:00:00Z", isRead: true,
    readBy: [{ name: "Amit Patel", readAt: "2025-11-18T15:00:00Z" }, { name: "Sneha Iyer", readAt: "2025-11-18T16:30:00Z" }, { name: "Vikram Singh", readAt: "2025-11-19T09:00:00Z" }],
    totalRecipients: 200, attachments: [{ name: "InnoVate_Brochure.pdf", type: "pdf", size: "5.1 MB" }, { name: "Registration_Form.pdf", type: "pdf", size: "1.2 MB" }],
    comments: [], tags: ["techfest", "event", "registration"], version: 1
  },
  {
    id: "3", title: "Fee Payment Deadline Extension",
    content: "In view of the requests received from several students, the last date for payment of tuition fees for the odd semester has been extended to December 5, 2025. Students who fail to pay by the extended deadline will incur a late fee penalty of ₹500 per day.",
    priority: "action-required", department: "All", year: "All", author: "Accounts Department",
    publishedAt: "2025-11-22T08:00:00Z", isRead: false,
    readBy: [{ name: "Meera Nair", readAt: "2025-11-22T09:00:00Z" }],
    totalRecipients: 600, attachments: [],
    comments: [{ id: "c2", author: "Admin", role: "admin", content: "Online payment portal link: payments.college.edu", timestamp: "2025-11-22T10:00:00Z" }],
    tags: ["fees", "deadline"], version: 1, template: "Fee Notice"
  },
  {
    id: "4", title: "Workshop on Machine Learning with Python",
    content: "The CSE department is organizing a 3-day workshop on Machine Learning with Python from December 1-3. Limited seats available. Prior knowledge of Python programming is required. Register through the department office.",
    priority: "informational", department: "CSE", year: "3rd", author: "Dr. Suresh Menon",
    publishedAt: "2025-11-15T10:00:00Z", isRead: true,
    readBy: [{ name: "Arjun Reddy", readAt: "2025-11-15T11:00:00Z" }, { name: "Kavya Gupta", readAt: "2025-11-15T12:00:00Z" }],
    totalRecipients: 80, attachments: [{ name: "Workshop_Details.pdf", type: "pdf", size: "800 KB" }],
    comments: [], tags: ["workshop", "ML", "python"], version: 1
  },
  {
    id: "5", title: "Library Renovation – Temporary Closure",
    content: "The central library will remain closed from November 25 to December 2 for renovation work. Digital library access will continue. Students are advised to return all borrowed books before November 24.",
    priority: "urgent", department: "All", year: "All", author: "Library Committee",
    publishedAt: "2025-11-19T11:00:00Z", isRead: true,
    readBy: [{ name: "Neha Joshi", readAt: "2025-11-19T12:00:00Z" }],
    totalRecipients: 600, attachments: [],
    comments: [{ id: "c3", author: "Neha Joshi", role: "student", content: "Can we access reading rooms during this period?", timestamp: "2025-11-19T14:00:00Z" }],
    tags: ["library", "renovation"], version: 1
  },
  {
    id: "6", title: "Campus Placement Drive – Infosys",
    content: "Infosys will be conducting a campus placement drive on December 8, 2025. Eligible branches: CSE, IT, ECE. Minimum CGPA: 7.0. Register on the placement portal by December 1.",
    priority: "action-required", department: "CSE", year: "4th", author: "Placement Cell",
    publishedAt: "2025-11-21T09:00:00Z", isRead: false,
    readBy: [{ name: "Rohit Mishra", readAt: "2025-11-21T10:00:00Z" }, { name: "Divya Agarwal", readAt: "2025-11-21T11:00:00Z" }],
    totalRecipients: 150, attachments: [{ name: "Infosys_JD.pdf", type: "pdf", size: "1.5 MB" }],
    comments: [], tags: ["placement", "infosys", "campus"], version: 1
  },
  {
    id: "7", title: "Sports Day Celebration Schedule",
    content: "The annual sports day will be held on December 12, 2025. All departments must submit their team lists by December 5. Events include cricket, football, badminton, athletics, and chess tournament.",
    priority: "informational", department: "All", year: "All", author: "Sports Committee",
    publishedAt: "2025-11-17T13:00:00Z", isRead: true,
    readBy: [],
    totalRecipients: 600, attachments: [{ name: "Sports_Events.pdf", type: "pdf", size: "900 KB" }],
    comments: [], tags: ["sports", "event"], version: 1
  },
  {
    id: "8", title: "Anti-Ragging Committee Meeting Notice",
    content: "All members of the Anti-Ragging Committee are requested to attend an emergency meeting on November 25 at 3:00 PM in the Conference Hall. Attendance is mandatory.",
    priority: "urgent", department: "All", year: "All", author: "Dean of Students",
    publishedAt: "2025-11-23T07:00:00Z", isRead: false,
    readBy: [{ name: "Prof. Sharma", readAt: "2025-11-23T08:00:00Z" }],
    totalRecipients: 25, attachments: [],
    comments: [], tags: ["committee", "meeting", "anti-ragging"], version: 1
  },
  {
    id: "9", title: "ECE Department Seminar on IoT",
    content: "The ECE department invites all students to a seminar on 'Internet of Things: Future Perspectives' by Dr. Arun Joshi from IIT Delhi on November 28 at 2:00 PM in the Auditorium.",
    priority: "informational", department: "ECE", year: "All", author: "Prof. Meena Kumari",
    publishedAt: "2025-11-16T09:00:00Z", isRead: true,
    readBy: [{ name: "Karthik R", readAt: "2025-11-16T10:00:00Z" }],
    totalRecipients: 120, attachments: [{ name: "Seminar_Poster.jpg", type: "image", size: "3.2 MB" }],
    comments: [], tags: ["seminar", "IoT", "ECE"], version: 1
  },
  {
    id: "10", title: "Hostel Maintenance – Water Supply Disruption",
    content: "Due to maintenance work, water supply in Boys Hostel Block A and B will be disrupted on November 26 from 9:00 AM to 5:00 PM. Students are advised to store water accordingly.",
    priority: "urgent", department: "All", year: "All", author: "Hostel Administration",
    publishedAt: "2025-11-24T06:00:00Z", isRead: false,
    readBy: [],
    totalRecipients: 300, attachments: [],
    comments: [{ id: "c4", author: "Ravi Kumar", role: "student", content: "Will Girls Hostel also be affected?", timestamp: "2025-11-24T07:30:00Z" }],
    tags: ["hostel", "maintenance"], version: 1
  },
  {
    id: "11", title: "MBA Internship Opportunities – Summer 2026",
    content: "Summer internship applications for MBA students are now open. Partner companies include Deloitte, KPMG, and McKinsey. Apply through the MBA department portal by December 15.",
    priority: "action-required", department: "MBA", year: "2nd", author: "MBA Department",
    publishedAt: "2025-11-20T11:00:00Z", isRead: true,
    readBy: [{ name: "Aisha Khan", readAt: "2025-11-20T12:00:00Z" }, { name: "Sanjay Rao", readAt: "2025-11-20T14:00:00Z" }],
    totalRecipients: 60, attachments: [{ name: "Internship_Guide.pdf", type: "pdf", size: "2.8 MB" }],
    comments: [], tags: ["internship", "MBA", "summer"], version: 1
  },
  {
    id: "12", title: "MECH Department Lab Safety Drill",
    content: "A mandatory fire safety drill will be conducted in all MECH department laboratories on December 3. All students and staff must participate. Safety gear will be provided.",
    priority: "action-required", department: "MECH", year: "All", author: "Safety Officer",
    publishedAt: "2025-11-21T14:00:00Z", isRead: false,
    readBy: [],
    totalRecipients: 180, attachments: [{ name: "Safety_Guidelines.pdf", type: "pdf", size: "1.1 MB" }],
    comments: [], tags: ["safety", "lab", "drill"], version: 1
  },
  {
    id: "13", title: "Cultural Festival 'Rangoli 2025' Auditions",
    content: "Auditions for the annual cultural festival performances will be held from December 5-7. Categories: Dance, Music, Drama, Stand-up Comedy. Register at the cultural committee office.",
    priority: "informational", department: "All", year: "All", author: "Cultural Committee",
    publishedAt: "2025-11-19T15:00:00Z", isRead: true,
    readBy: [{ name: "Pooja Singh", readAt: "2025-11-19T16:00:00Z" }],
    totalRecipients: 600, attachments: [{ name: "Rangoli_Poster.jpg", type: "image", size: "4.5 MB" }],
    comments: [], tags: ["cultural", "fest", "auditions"], version: 1
  },
  {
    id: "14", title: "CIVIL Department Field Visit – Dam Construction Site",
    content: "A field visit to the Sardar Sarovar Dam construction site is scheduled for December 10. Participation limited to 40 students. Priority given to 3rd and 4th year students.",
    priority: "informational", department: "CIVIL", year: "3rd", author: "Prof. Ashok Verma",
    publishedAt: "2025-11-18T10:00:00Z", isRead: false,
    readBy: [{ name: "Mohit Gupta", readAt: "2025-11-18T11:00:00Z" }],
    totalRecipients: 90, attachments: [],
    comments: [], tags: ["field-visit", "civil", "dam"], version: 1
  },
  {
    id: "15", title: "EEE Department – Power Systems Lab Upgrade",
    content: "The Power Systems lab has been upgraded with new equipment. Training sessions for new equipment will be held from November 27-29. All EEE students must attend at least one session.",
    priority: "informational", department: "EEE", year: "All", author: "Dr. Lakshmi Narayan",
    publishedAt: "2025-11-17T08:00:00Z", isRead: true,
    readBy: [],
    totalRecipients: 100, attachments: [],
    comments: [], tags: ["lab", "upgrade", "EEE"], version: 1
  },
  {
    id: "16", title: "Student Council Elections – Nomination Open",
    content: "Nominations for Student Council elections 2025-26 are now open. Interested candidates may collect nomination forms from the Student Affairs office. Last date: December 1.",
    priority: "action-required", department: "All", year: "All", author: "Election Committee",
    publishedAt: "2025-11-22T12:00:00Z", isRead: false,
    readBy: [{ name: "Aniket Jain", readAt: "2025-11-22T13:00:00Z" }],
    totalRecipients: 600, attachments: [{ name: "Nomination_Form.pdf", type: "pdf", size: "500 KB" }],
    comments: [{ id: "c5", author: "Aniket Jain", role: "student", content: "Is there an online nomination option?", timestamp: "2025-11-22T14:00:00Z" }],
    tags: ["elections", "student-council"], version: 1
  },
  {
    id: "17", title: "IT Department – Cloud Computing Workshop",
    content: "A hands-on workshop on AWS Cloud Computing will be conducted on December 6-7. Participants will receive certificates. Limited to 50 seats. Register online.",
    priority: "informational", department: "IT", year: "3rd", author: "Prof. Neeraj Gupta",
    publishedAt: "2025-11-20T16:00:00Z", isRead: true,
    readBy: [{ name: "Tanvi Mehta", readAt: "2025-11-20T17:00:00Z" }],
    totalRecipients: 80, attachments: [{ name: "AWS_Workshop.pdf", type: "pdf", size: "1.8 MB" }],
    comments: [], tags: ["workshop", "cloud", "AWS"], version: 1
  },
  {
    id: "18", title: "Holiday Notice – Republic Day Celebrations",
    content: "The college will remain closed on January 26, 2026 on the occasion of Republic Day. Flag hoisting ceremony will be held at 8:00 AM. All staff members are requested to attend.",
    priority: "informational", department: "All", year: "All", author: "Principal's Office",
    publishedAt: "2025-11-15T07:00:00Z", isRead: true,
    readBy: [],
    totalRecipients: 800, attachments: [],
    comments: [], tags: ["holiday", "republic-day"], version: 1
  },
  {
    id: "19", title: "Research Paper Submission Deadline – IJCSE",
    content: "Students and faculty members interested in submitting research papers to the International Journal of Computer Science & Engineering must submit by December 20, 2025.",
    priority: "action-required", department: "CSE", year: "4th", author: "Research Cell",
    publishedAt: "2025-11-23T10:00:00Z", isRead: false,
    readBy: [],
    totalRecipients: 50, attachments: [{ name: "Submission_Guidelines.pdf", type: "pdf", size: "700 KB" }],
    comments: [], tags: ["research", "journal", "paper"], version: 1
  },
  {
    id: "20", title: "Campus Wi-Fi Upgrade Maintenance",
    content: "The campus Wi-Fi network will undergo scheduled maintenance on November 29 from 11:00 PM to 5:00 AM. Internet services may be intermittent during this period.",
    priority: "urgent", department: "All", year: "All", author: "IT Infrastructure",
    publishedAt: "2025-11-25T09:00:00Z", isRead: false,
    readBy: [],
    totalRecipients: 800, attachments: [],
    comments: [], tags: ["wifi", "maintenance", "IT"], version: 1
  },
  {
    id: "21", title: "Blood Donation Camp – NSS Activity",
    content: "The NSS unit is organizing a Blood Donation Camp on December 14 in collaboration with Red Cross. All willing donors can register at the NSS office. Refreshments will be provided.",
    priority: "informational", department: "All", year: "All", author: "NSS Coordinator",
    publishedAt: "2025-11-21T12:00:00Z", isRead: true,
    readBy: [{ name: "Sakshi Patel", readAt: "2025-11-21T13:00:00Z" }],
    totalRecipients: 600, attachments: [{ name: "Blood_Camp_Poster.jpg", type: "image", size: "2.1 MB" }],
    comments: [], tags: ["NSS", "blood-donation", "social"], version: 1
  },
  {
    id: "22", title: "Scholarship Applications – Merit & Need Based",
    content: "Applications are invited for merit-based and need-based scholarships for the academic year 2025-26. Eligible students must submit their applications with supporting documents by December 10.",
    priority: "action-required", department: "All", year: "All", author: "Scholarship Committee",
    publishedAt: "2025-11-22T08:30:00Z", isRead: false,
    readBy: [{ name: "Farhan Ali", readAt: "2025-11-22T09:30:00Z" }],
    totalRecipients: 600, attachments: [{ name: "Scholarship_Form.pdf", type: "pdf", size: "600 KB" }],
    comments: [], tags: ["scholarship", "merit", "financial-aid"], version: 1, template: "Fee Notice"
  },
];
