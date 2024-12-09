import kue from 'kue'

// Create a queue using kue
const queue = kue.createQueue();

// Array of job data
const jobs = [
  {
    phoneNumber: "4153518780",
    message: "This is the code 1234 to verify your account",
  },
  {
    phoneNumber: "4153518781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153518743",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4153538781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153118782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4153718781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4159518782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4158718781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153818782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4154318781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4151218782",
    message: "This is the code 4321 to verify your account",
  },
];

// Loop through the jobs array and add jobs to the queue
jobs.forEach((jobData) => {
  const job = queue.create("push_notification_code_2", jobData).save((err) => {
    if (!err) {
      console.log(`Notificaion job created: ${job.id}`);
    } else {
      console.error(`Failed to create job: ${err}`);
    }
  });

  // Listen for job events
  job
    .on("complete", () => {
      console.log(`Notification job ${job.id} completed`);
    })
    .on("failed", (err) => {
      console.log(`Notification job ${job.id} failed: ${err}`);
    })
    .on("progress", (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
});

