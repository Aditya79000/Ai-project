img ="";
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(300, 300);
    video.hide();
}

function preload(){
    audio = loadSound("mixkit-alert-bells-echo-765.wav")

}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modalLoaded);
    document.getElementById("status").innerHTML ="Status : Detecting Objects"

}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status !="person")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Person found" + object.length;
            audio.stop();

            fill("r,g,b");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x , objects[i].y);
            noFill();
            stroke("r,g,b");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    else{
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Person not found" + object.length;
        audio.play();
    }
}
function modalLoaded(){
    console.log("Modal Loaded!")
    status = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}