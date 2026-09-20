// =============================================================================
// SITE CONFIG
// This is the only file most people need to edit. Fill in your own class
// schedule, courses, academic calendar, and (optionally) your Cloudflare
// Worker URL below, then open index.html — no other file needs to change.
// See README.md for step-by-step setup instructions.
// =============================================================================

// Shown in the browser tab and the two panel headers ("<SITE_TITLE> Class
// Schedule" / "<SITE_TITLE> Task Tracker"). Usually your section/class name.
const SITE_TITLE = "My Class";

// A short, unique prefix used to namespace this site's saved data in the
// browser (localStorage/sessionStorage keys, backup filenames). Only matters
// if you're running more than one copy of this template in the same browser.
const STORAGE_PREFIX = "class_tracker";

// -----------------------------------------------------------------------
// CLOUD SYNC (optional)
// Leave this placeholder as-is to run in local-only mode: the tracker still
// works, but each device/browser keeps its own separate copy with nothing
// shared between them. To sync across devices (e.g. with classmates), deploy
// worker.js to Cloudflare Workers (see README.md) and paste its URL here.
// -----------------------------------------------------------------------
const WORKER_URL = "https://your-worker-subdomain.your-name.workers.dev/";

// -----------------------------------------------------------------------
// COURSES
// Shown in the "Course / Subject" dropdowns on the tracker. Use whatever
// short codes make sense to you — these are just labels, not IDs.
// -----------------------------------------------------------------------
const AVAILABLE_COURSES = [
    "Course 101",
    "Course 102",
    "Course 103",
];

// -----------------------------------------------------------------------
// WEEKLY CLASS SCHEDULE
// One object per class meeting. Days with no entries automatically show
// "No Classes Scheduled".
//   day    : 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday,
//            5=Friday, 6=Saturday
//   time   : must look exactly like "10:30 AM - 1:30 PM" — this exact
//            format is what lets the page highlight your current class live
//   code   : the class/course title shown in bold
//   subject: the short course code shown under the title
//   units  : e.g. "3 Units"
//   room   : room / building label
//   isLab  : optional — set true to add a "LAB" tag and accent color
// -----------------------------------------------------------------------
const CLASS_SCHEDULE = [
    { day: 1, time: "9:00 AM - 12:00 PM", code: "Example Lecture Course", subject: "Course 101", units: "3 Units", room: "Room 101" },
    { day: 3, time: "1:00 PM - 4:00 PM", code: "Example Lab Course", subject: "Course 102", units: "1 Unit", room: "Lab 2", isLab: true },
    // Add, remove, or edit entries above to match your real schedule.
];

// -----------------------------------------------------------------------
// ACADEMIC CALENDAR
// Powers the year calendar view and the "Upcoming" events list. Each entry
// needs either "specificDates" (one or more exact days) or "range"
// ([startISO, endISO]) — not both. "dates" is just the human-readable label
// shown in the events list; it isn't parsed, so it can say anything.
// -----------------------------------------------------------------------
const ACADEMIC_CALENDAR = [
    { term: "First Semester", dates: "August 10, 2026", desc: "Start of Classes", specificDates: ["2026-08-10"] },
    { term: "First Semester", dates: "October 5-10, 2026", desc: "Midterm Examination", range: ["2026-10-05", "2026-10-10"] },
    { term: "First Semester", dates: "December 1-12, 2026", desc: "Final Examination", range: ["2026-12-01", "2026-12-12"] },
    { term: "Second Semester", dates: "January 11, 2027", desc: "Start of Classes", specificDates: ["2027-01-11"] },
    // Replace these with your own school's academic calendar. "term" is
    // just a grouping label used for the tabs above the year calendar.
];

// -----------------------------------------------------------------------
// STARTING TRACKER DATA
// What a brand-new visitor sees before adding their own tasks. Safe to
// leave empty — people can add items with the "+" button once the page
// loads. Shape of one item, for reference if you want to pre-seed some:
//   { id: "t1", course: "Course 101", desc: "Reading assignment",
//     given: "", date: "Sep 1, 2026", status: "to be submitted", done: false }
// -----------------------------------------------------------------------
const DEFAULT_TRACKER_DATA = {
    tasks: [],
    quizzes: [],
    projects: [],
    archives: []
};
