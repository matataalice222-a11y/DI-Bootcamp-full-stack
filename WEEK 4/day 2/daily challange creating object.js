// Daily challenge: Creating Objects
class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  watch() {
    console.log(
      `${this.uploader} watched all ${this.time} seconds of ${this.title}!`,
    );
  }
}

const videoOne = new Video('JavaScript Basics', 'Alice', 300);
videoOne.watch();

const videoTwo = new Video('Advanced CSS', 'Bob', 450);
videoTwo.watch();

const videoData = [
  { title: 'React Crash Course', uploader: 'Charlie', time: 600 },
  { title: 'Node.js Tutorial', uploader: 'Diana', time: 720 },
  { title: 'Python for Beginners', uploader: 'Evan', time: 540 },
  { title: 'SQL in 10 Minutes', uploader: 'Fiona', time: 600 },
  { title: 'Git & GitHub Guide', uploader: 'George', time: 480 },
];

const videoInstances = videoData.map(
  ({ title, uploader, time }) => new Video(title, uploader, time),
);

videoInstances.forEach((video) => video.watch());
