class Video {
    constructor(title, uploader, time) {
      this.title = title;
      this.uploader = uploader;
      this.time = time;
    }
    watch() {
      console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
    }
  }
  const video1 = new Video("Learn JavaScript in 10 Minutes", "Alice", 600);
  video1.watch();
  const video2 = new Video("How to Cook Pasta", "Bob", 420);
  video2.watch();
  const videoData = [
    { title: "React Basics", uploader: "Charlie", time: 900 },
    { title: "CSS Grid Tutorial", uploader: "Dana", time: 750 },
    { title: "Python for Beginners", uploader: "Eve", time: 1200 },
    { title: "Vue Crash Course", uploader: "Frank", time: 680 },
    { title: "Debugging Tips", uploader: "Grace", time: 300 }
  ];
  const videos = videoData.map(data => new Video(data.title, data.uploader, data.time));
  videos.forEach(video => video.watch());
  