function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if(results.length > 0) {  
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist + ", scoreRightWrist = " + scoreRightWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left wrist x: " + leftWristX + ", left wrist y = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("right wrist x: " + rightWristX + ", right wrist y = " + rightWristY);
    }
}

function modelLoaded() {
    console.log("Model has initialized!")
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 500) {
        document.getElementById("songName").innerHTML = "Song Number: Song 1";
        song.stop();
        song.play(song_2);
    }

    else if(scoreLeftWrist > 0.2) {
        if (rightWristY > 0 && rightWristY <= 500) {
        document.getElementById("songName").innerHTML = "Song Number: Song 2";
        song.stop();
        song.play(song_1);
    }}}}


song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song_1 = loadSound("music 1.mp3");
    song_2 = loadSound("music 2.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}