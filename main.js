song1="";
song2="";
song1_status="";
song2_status="";
leftWristX=0;
leftWristy=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;

function preload(){
  song1=loadSound("song_1.mp3");
  song2=loadSound("song_2.mp3");
}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){

console.log("Posenet is Initialied");
}

function draw(){
    image(video,0,0,400,300);

    fill("#FF0000");
    stroke("#FF0000");

      song1_status=song1.isPlaying();
      song1_status=song2.isPlaying();
    
    if(scoreleftWrist > 0.2 ){
      circle(leftWristX,leftWristY,20);
      song2.stop();

      if(song2_status== false){
        song1.play();
        document.getElementById("song_name").innerHTML= "Param Sundari" + " song is playing";
      }
  }

  if(scorerightWrist > 0.2 ){
    circle(rightWristX,rightWristY,20);
    song2.stop();

    if(song1_status== false){
      song2.play();
      document.getElementById("song_name").innerHTML= "Dil ha chotta sa chotti si assha" + " song is playing";
    }
}

}

function play(){
  song.play();
  song.setVolume(1);
  song.rate(1);
}



function gotPoses(results){
  if(results.length > 0 ){

      console.log(results);

      console.log(results);
      scoreleftWrist=results[0].pose.keypoints[9].score;
      scorerightWrist=results[0].pose.keypoints[10].score;
      console.log("scoreleftWrist = " + scoreleftWrist + "scorerightWrist = " + scorerightWrist );

      leftWristX=results[0].pose.leftWrist.x;
      leftWristY=results[0].pose.leftWrist.y;

      console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

      rightWristX=results[0].pose.rightWrist.x;
      rightWristY=results[0].pose.rightWrist.y;

      console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

  }
}
  